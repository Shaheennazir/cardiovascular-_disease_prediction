import pickle
import joblib
import numpy as np
import pandas as pd
import os
from typing import Dict, Any
from sklearn.preprocessing import StandardScaler
import shap
from app.core import get_logger
from app.core.logging import performance_monitor

logger = get_logger(__name__)

class TabularPredictionService:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.feature_names = [
            'age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo',
            'cholesterol', 'gluc', 'smoke', 'alco', 'active'
        ]
        self.load_model()
    
    def load_model(self):
        """Load the trained model and scaler"""
        logger.info("Loading tabular prediction model and scaler")
        try:
            # Load the model
            model_path = os.path.join("models", "best_tabular_model.pkl")
            if os.path.exists(model_path):
                try:
                    self.model = joblib.load(model_path)
                    logger.info("Model loaded successfully with joblib", model_path=model_path)
                except Exception as e:
                    logger.warning(f"Failed to load model with joblib: {e}, trying pickle", model_path=model_path)
                    with open(model_path, 'rb') as f:
                        self.model = pickle.load(f)
                    logger.info("Model loaded successfully with pickle", model_path=model_path)
            else:
                logger.warning("Model file not found, using dummy model", model_path=model_path)
            
            # Load the scaler
            scaler_path = os.path.join("models", "tabular_scaler.pkl")
            if os.path.exists(scaler_path):
                try:
                    self.scaler = joblib.load(scaler_path)
                    logger.info("Scaler loaded successfully with joblib", scaler_path=scaler_path)
                except Exception as e:
                    logger.warning(f"Failed to load scaler with joblib: {e}, trying pickle", scaler_path=scaler_path)
                    with open(scaler_path, 'rb') as f:
                        self.scaler = pickle.load(f)
                    logger.info("Scaler loaded successfully with pickle", scaler_path=scaler_path)
            else:
                logger.warning("Scaler file not found, using default scaler", scaler_path=scaler_path)
        except Exception as e:
            logger.error("Error loading model or scaler", error=str(e), exc_info=True)
            # Initialize with dummy values for testing
            self.model = None
            self.scaler = StandardScaler()
    
    @performance_monitor(logger)
    def preprocess_input(self, input_data: Dict[str, Any]) -> np.ndarray:
        """Preprocess input data for prediction"""
        # Convert input data to DataFrame with proper feature names
        input_df = pd.DataFrame([input_data])[self.feature_names]
        
        # Scale the input data
        if self.scaler is not None:
            input_scaled = self.scaler.transform(input_df)
        else:
            input_scaled = input_df.values
            
        return input_scaled
    
    @performance_monitor(logger)
    def predict(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Make prediction using the loaded model"""
        logger.info("Making tabular prediction", input_data=input_data)
        if self.model is None:
            # Return dummy prediction for testing
            logger.warning("Using dummy model for prediction")
            probability = 0.75
            risk_level = "High Risk" if probability > 0.5 else "Low Risk"
            result = {
                "risk_level": risk_level,
                "probability": probability,
                "confidence": 0.85
            }
            logger.info("Dummy prediction completed", result=result)
            return result
        
        # Preprocess input
        logger.debug("Preprocessing input data")
        input_processed = self.preprocess_input(input_data)
        
        # Make prediction
        logger.debug("Making prediction with model")
        # Convert to DataFrame with feature names to avoid warnings
        if hasattr(self.model, 'feature_names_in_'):
            input_df = pd.DataFrame(input_processed, columns=self.model.feature_names_in_)
            probability = self.model.predict_proba(input_df)[0][1]
        else:
            probability = self.model.predict_proba(input_processed)[0][1]
        risk_level = "High Risk" if probability > 0.5 else "Low Risk"
        
        # Calculate confidence (distance from 0.5)
        confidence = abs(0.5 - probability) * 2
        
        result = {
            "risk_level": risk_level,
            "probability": float(probability),
            "confidence": float(confidence)
        }
        logger.info("Prediction completed", result=result)
        return result
    
    @performance_monitor(logger)
    def explain_prediction(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate explanation for the prediction"""
        logger.info("Generating prediction explanation", input_data=input_data)
        if self.model is None:
            logger.warning("Using static explanation for dummy model")
            result = {
                "summary": "Based on the patient data, there is a high risk of cardiovascular disease.",
                "feature_importance": [
                    {"feature": "Systolic Blood Pressure", "importance": 0.3},
                    {"feature": "Age", "importance": 0.25},
                    {"feature": "Cholesterol", "importance": 0.2},
                    {"feature": "Gender", "importance": 0.15},
                    {"feature": "Smoking", "importance": 0.1}
                ],
                "recommendations": [
                    "Consult with a cardiologist for comprehensive evaluation",
                    "Monitor blood pressure regularly",
                    "Maintain current physical activity level"
                ]
            }
            logger.info("Static explanation generated", result=result)
            return result
        
        # For now, return static explanation
        # In a real implementation, we would use SHAP or similar
        logger.debug("Generating static explanation")
        result = {
            "summary": "Based on the patient data, there is a high risk of cardiovascular disease.",
            "feature_importance": [
                {"feature": "Systolic Blood Pressure", "importance": 0.3},
                {"feature": "Age", "importance": 0.25},
                {"feature": "Cholesterol", "importance": 0.2},
                {"feature": "Gender", "importance": 0.15},
                {"feature": "Smoking", "importance": 0.1}
            ],
            "recommendations": [
                "Consult with a cardiologist for comprehensive evaluation",
                "Monitor blood pressure regularly",
                "Maintain current physical activity level"
            ]
        }
        logger.info("Explanation generated", result=result)
        return result

# Global instance
tabular_service = TabularPredictionService()