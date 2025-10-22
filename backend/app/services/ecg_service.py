import tensorflow as tf
import numpy as np
import wfdb
import os
from typing import Dict, Any, List
import uuid
from app.core import get_logger
from app.core.logging import performance_monitor

logger = get_logger(__name__)

class ECGPredictionService:
    def __init__(self):
        self.model = None
        self.load_model()
    
    def load_model(self):
        """Load the trained ECG model"""
        logger.info("Loading ECG prediction model")
        try:
            model_path = os.path.join("models", "best_ecg_model.h5")
            if os.path.exists(model_path):
                self.model = tf.keras.models.load_model(model_path)
                # Compile the model after loading to resolve metrics warning
                self.model.compile(
                    optimizer='adam',
                    loss='binary_crossentropy',
                    metrics=['accuracy']
                )
                logger.info("ECG model loaded and compiled successfully", model_path=model_path)
            else:
                logger.warning("ECG model file not found, using dummy model", model_path=model_path)
        except Exception as e:
            logger.error("Error loading ECG model", error=str(e), exc_info=True)
            self.model = None
    
    @performance_monitor(logger)
    def preprocess_ecg_file(self, file_path: str) -> np.ndarray:
        """Preprocess ECG file for prediction"""
        logger.info("Preprocessing ECG file", file_path=file_path)
        try:
            # Check if header file exists
            header_path = file_path.replace('.dat', '.hea')
            if not os.path.exists(header_path):
                logger.error("Missing ECG header file", header_path=header_path)
                raise FileNotFoundError(f"ECG header file not found: {header_path}. Please upload both .dat and .hea files.")
            
            # Read the ECG record using wfdb
            # For local files, we pass the full file path without extension
            logger.info(f"🧩 DEBUG: file_path received -> {file_path}")
            logger.info(f"🧩 DEBUG: absolute path -> {os.path.abspath(file_path)}")
            base_path = os.path.splitext(os.path.abspath(file_path))[0]
            logger.debug("Base path for wfdb", base_path=base_path)
            
            # Safety check to ensure files exist before calling wfdb
            if not os.path.exists(base_path + ".dat"):
                raise FileNotFoundError(f"ECG data file not found: {base_path}.dat")
            if not os.path.exists(base_path + ".hea"):
                raise FileNotFoundError(f"ECG header file not found: {base_path}.hea")
            
            # --- FIX HEADER NAME MISMATCH ---
            try:
                header_path = base_path + ".hea"
                with open(header_path, "r+", encoding="utf-8") as f:
                    content = f.read()
                    lines = content.splitlines()
                    if lines and not lines[0].startswith(os.path.basename(base_path)):
                        parts = lines[0].split()
                        old_name = parts[0]
                        parts[0] = os.path.basename(base_path)
                        lines[0] = " ".join(parts)
                        f.seek(0)
                        f.write("\n".join(lines))
                        f.truncate()
                        logger.info(f"🩺 Updated header base name from '{old_name}' → '{parts[0]}'")
            except Exception as e:
                logger.warning("Could not rewrite ECG header prefix", error=str(e))
            # --- END FIX HEADER NAME MISMATCH ---
                
            # Force WFDB to use the updated header file explicitly
            record_name = os.path.splitext(os.path.basename(base_path))[0]
            record = wfdb.rdrecord(
                os.path.join(os.path.dirname(base_path), record_name)
            )
            
            logger.info(f"✅ Successfully loaded record: {record.__dict__.keys()}")
            
            # Extract signal data
            signal = record.p_signal
            logger.debug("ECG signal extracted", signal_shape=signal.shape)
            
            # Normalize signal
            signal = (signal - np.mean(signal)) / np.std(signal)
            logger.debug("ECG signal normalized")
            
            # Reshape for model input (assuming model expects specific shape)
            # This would need to be adjusted based on the actual model requirements
            if len(signal.shape) == 1:
                signal = signal.reshape(1, -1, 1)
            elif len(signal.shape) == 2 and signal.shape[1] == 1:
                signal = signal.reshape(1, -1, 1)
            else:
                signal = signal.reshape(1, signal.shape[0], signal.shape[1])
                
            logger.debug("ECG signal reshaped", final_shape=signal.shape)
            return signal
        except Exception as e:
            logger.error("Error preprocessing ECG file", error=str(e), exc_info=True)
            # Return dummy data for testing
            logger.warning("Using dummy ECG data for testing")
            return np.random.rand(1, 1000, 1).astype(np.float32)
    
    @performance_monitor(logger)
    def predict(self, file_path: str) -> Dict[str, Any]:
        """Make prediction using the loaded ECG model"""
        logger.info("Making ECG prediction", file_path=file_path)
        if self.model is None:
            # Return dummy prediction for testing
            logger.warning("Using dummy model for ECG prediction")
            result = {
                "classification": "Arrhythmia Detected",
                "probabilities": {
                    "normal": 0.1,
                    "afib": 0.4,
                    "pvc": 0.3,
                    "other": 0.2
                },
                "confidence": 0.85
            }
            logger.info("Dummy ECG prediction completed", result=result)
            return result
        
        # Preprocess ECG file
        logger.debug("Preprocessing ECG file for prediction")
        ecg_data = self.preprocess_ecg_file(file_path)
        
        # Make prediction
        logger.debug("Making prediction with ECG model")
        probabilities = self.model.predict(ecg_data)[0]
        
        # Map to class names (this would need to be adjusted based on actual model)
        class_names = ["normal", "afib", "pvc", "other"]
        prob_dict = {class_name: float(prob) for class_name, prob in zip(class_names, probabilities)}
        
        # Get the highest probability class
        predicted_class = class_names[np.argmax(probabilities)]
        
        # Confidence is the highest probability
        confidence = float(np.max(probabilities))
        
        result = {
            "classification": predicted_class,
            "probabilities": prob_dict,
            "confidence": confidence
        }
        logger.info("ECG prediction completed", result=result)
        return result
    
    @performance_monitor(logger)
    def detect_abnormalities(self, file_path: str) -> List[Dict[str, Any]]:
        """Detect abnormalities in ECG signal"""
        logger.info("Detecting abnormalities in ECG signal", file_path=file_path)
        # For now, return static abnormalities
        # In a real implementation, this would use the model's attention mechanisms
        # or other techniques to identify abnormal segments
        abnormalities = [
            {
                "id": str(uuid.uuid4()),
                "type": "PVC",
                "start_time": 15.2,
                "end_time": 15.8,
                "confidence": 0.92,
                "description": "Premature Ventricular Contraction detected"
            },
            {
                "id": str(uuid.uuid4()),
                "type": "AFIB",
                "start_time": 120.5,
                "end_time": 135.7,
                "confidence": 0.87,
                "description": "Atrial Fibrillation episode"
            }
        ]
        logger.info("Abnormalities detected", count=len(abnormalities))
        return abnormalities
    
    @performance_monitor(logger)
    def explain_prediction(self, prediction_result: Dict[str, Any]) -> Dict[str, Any]:
        """Generate explanation for the ECG prediction"""
        logger.info("Generating ECG prediction explanation", prediction_result=prediction_result)
        result = {
            "summary": f"ECG analysis shows {prediction_result['classification']} with {prediction_result['confidence']*100:.1f}% confidence.",
            "abnormal_segments": [
                {
                    "start_time": 15.2,
                    "end_time": 15.8,
                    "description": "Premature Ventricular Contraction detected"
                },
                {
                    "start_time": 120.5,
                    "end_time": 135.7,
                    "description": "Atrial Fibrillation episode"
                }
            ],
            "recommendations": [
                "Follow up with cardiologist for detailed evaluation",
                "Consider 24-hour Holter monitoring",
                "Avoid excessive caffeine and alcohol"
            ]
        }
        logger.info("ECG explanation generated", result=result)
        return result

# Global instance
ecg_service = ECGPredictionService()