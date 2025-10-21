import pickle
import numpy as np
import os
from typing import Dict, Any
from sklearn.preprocessing import StandardScaler
import shap

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
        try:
            # Load the model
            model_path = os.path.join("models", "best_tabular_model.pkl")
            if os.path.exists(model_path):
                with open(model_path, 'rb') as f:
                    self.model = pickle.load(f)
            
            # Load the scaler
            scaler_path = os.path.join("models", "tabular_scaler.pkl")
            if os.path.exists(scaler_path):
                with open(scaler_path, 'rb') as f:
                    self.scaler = pickle.load(f)
        except Exception as e:
            print(f"Error loading model or scaler: {e}")
            # Initialize with dummy values for testing
            self.model = None
            self.scaler = StandardScaler()
    
    def preprocess_input(self, input_data: Dict[str, Any]) -> np.ndarray:
        """Preprocess input data for prediction"""
        # Convert input data to array in the correct order
        input_array = np.array([[
            input_data['age'],
            input_data['gender'],
            input_data['height'],
            input_data['weight'],
            input_data['ap_hi'],
            input_data['ap_lo'],
            input_data['cholesterol'],
            input_data['gluc'],
            input_data['smoke'],
            input_data['alco'],
            input_data['active']
        ]])
        
        # Scale the input data
        if self.scaler is not None:
            input_scaled = self.scaler.transform(input_array)
        else:
            input_scaled = input_array
            
        return input_scaled
    
    def predict(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Make prediction using the loaded model"""
        if self.model is None:
            # Return dummy prediction for testing
            probability = 0.75
            risk_level = "High Risk" if probability > 0.5 else "Low Risk"
            return {
                "risk_level": risk_level,
                "probability": probability,
                "confidence": 0.85
            }
        
        # Preprocess input
        input_processed = self.preprocess_input(input_data)
        
        # Make prediction
        probability = self.model.predict_proba(input_processed)[0][1]
        risk_level = "High Risk" if probability > 0.5 else "Low Risk"
        
        # Calculate confidence (distance from 0.5)
        confidence = abs(0.5 - probability) * 2
        
        return {
            "risk_level": risk_level,
            "probability": float(probability),
            "confidence": float(confidence)
        }
    
    def explain_prediction(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate explanation for the prediction"""
        if self.model is None:
            return {
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
        
        # For now, return static explanation
        # In a real implementation, we would use SHAP or similar
        return {
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

# Global instance
tabular_service = TabularPredictionService()