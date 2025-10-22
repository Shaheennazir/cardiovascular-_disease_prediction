"""
Script to regenerate model files with proper serialization
This script should be run after training your models to save them in a compatible format
"""

import pickle
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_classification
import os

def create_sample_tabular_model():
    """Create and save a sample tabular model for testing purposes"""
    print("Creating sample tabular model...")
    
    # Generate sample data
    X, y = make_classification(n_samples=1000, n_features=11, n_informative=8, 
                              n_redundant=3, random_state=42)
    
    # Create and train a simple model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    # Create and fit scaler
    scaler = StandardScaler()
    scaler.fit(X)
    
    # Save model with joblib (recommended for sklearn models)
    model_path = os.path.join("models", "best_tabular_model.pkl")
    joblib.dump(model, model_path, compress=3)
    print(f"Model saved to {model_path}")
    
    # Save scaler with joblib
    scaler_path = os.path.join("models", "tabular_scaler.pkl")
    joblib.dump(scaler, scaler_path, compress=3)
    print(f"Scaler saved to {scaler_path}")
    
    # Test loading
    try:
        loaded_model = joblib.load(model_path)
        loaded_scaler = joblib.load(scaler_path)
        print("Model and scaler loaded successfully!")
        print(f"Model type: {type(loaded_model)}")
        print(f"Scaler type: {type(loaded_scaler)}")
        
        # Test prediction
        sample_input = np.array([[50, 1, 170, 70, 140, 90, 2, 1, 1, 0, 1]])
        scaled_input = loaded_scaler.transform(sample_input)
        prediction_proba = loaded_model.predict_proba(scaled_input)
        print(f"Sample prediction probability: {prediction_proba}")
        
    except Exception as e:
        print(f"Error loading model or scaler: {e}")

def verify_model_files():
    """Verify that model files exist and can be loaded"""
    print("\nVerifying model files...")
    
    model_path = os.path.join("models", "best_tabular_model.pkl")
    scaler_path = os.path.join("models", "tabular_scaler.pkl")
    
    print(f"Model file exists: {os.path.exists(model_path)}")
    print(f"Scaler file exists: {os.path.exists(scaler_path)}")
    
    if os.path.exists(model_path):
        print(f"Model file size: {os.path.getsize(model_path)} bytes")
    
    if os.path.exists(scaler_path):
        print(f"Scaler file size: {os.path.getsize(scaler_path)} bytes")

if __name__ == "__main__":
    # Create models directory if it doesn't exist
    os.makedirs("models", exist_ok=True)
    
    # Create sample models
    create_sample_tabular_model()
    
    # Verify files
    verify_model_files()
    
    print("\nModel regeneration complete!")