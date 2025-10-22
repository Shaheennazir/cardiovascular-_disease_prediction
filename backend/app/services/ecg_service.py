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
            # Get the absolute base path (without extension)
            logger.info(f"🧩 DEBUG: file_path received -> {file_path}")
            abs_file_path = os.path.abspath(file_path)
            logger.info(f"🧩 DEBUG: absolute path -> {abs_file_path}")
            base_path = os.path.splitext(abs_file_path)[0]
            logger.debug("Base path for wfdb", base_path=base_path)
            
            # Safety check to ensure files exist before calling wfdb
            dat_file = base_path + ".dat"
            hea_file = base_path + ".hea"
            
            if not os.path.exists(dat_file):
                raise FileNotFoundError(f"ECG data file not found: {dat_file}")
            if not os.path.exists(hea_file):
                raise FileNotFoundError(f"ECG header file not found: {hea_file}")
            
            # --- COMPREHENSIVE HEADER FIX ---
            try:
                expected_name = os.path.basename(base_path)
                
                # Read the entire header file
                with open(hea_file, "r", encoding="utf-8") as f:
                    header_lines = f.readlines()
                
                if not header_lines:
                    raise ValueError("Header file is empty")
                
                logger.info(f"📄 Original header first line: {header_lines[0].strip()}")
                
                # Parse the first line
                first_line_parts = header_lines[0].strip().split()
                old_record_name = first_line_parts[0]
                
                # If the record name doesn't match, update the entire header
                if old_record_name != expected_name:
                    logger.info(f"🔧 Fixing header: '{old_record_name}' → '{expected_name}'")
                    
                    # Update first line
                    first_line_parts[0] = expected_name
                    header_lines[0] = " ".join(first_line_parts) + "\n"
                    
                    # Update any other lines that reference the old filename
                    for i in range(1, len(header_lines)):
                        if old_record_name in header_lines[i]:
                            header_lines[i] = header_lines[i].replace(old_record_name, expected_name)
                            logger.info(f"📝 Updated line {i+1}: {header_lines[i].strip()}")
                    
                    # Write the corrected header back
                    with open(hea_file, "w", encoding="utf-8") as f:
                        f.writelines(header_lines)
                    
                    logger.info(f"✅ Header file updated successfully")
                    
                    # Verify the fix
                    with open(hea_file, "r", encoding="utf-8") as f:
                        verify_line = f.readline().strip()
                    logger.info(f"📄 Verified header first line: {verify_line}")
                else:
                    logger.info(f"✅ Header already correct: {expected_name}")
                    
            except Exception as e:
                logger.error("Error fixing header file", error=str(e), exc_info=True)
                raise
            # --- END COMPREHENSIVE HEADER FIX ---
            
            # Now read with wfdb
            logger.info(f"🔍 Calling wfdb.rdrecord with base_path: {base_path}")
            logger.info(f"🔍 Directory contents: {os.listdir(os.path.dirname(base_path))}")
            
            # Use wfdb.rdrecord with just the base path (no pn_dir to avoid PhysioNet downloads)
            record = wfdb.rdrecord(base_path)
            
            logger.info(f"✅ Successfully loaded record with {len(record.sig_name)} signals")
            
            # Extract signal data
            signal = record.p_signal
            logger.debug("ECG signal extracted", signal_shape=signal.shape)
            
            # Normalize signal
            signal = (signal - np.mean(signal)) / np.std(signal)
            logger.debug("ECG signal normalized")
            
            # Reshape for model input
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