import os
import pickle
import tensorflow as tf
from tensorflow import keras
import numpy as np

def diagnose_tabular_model():
    """Diagnose issues with tabular model loading"""
    print("=== Diagnosing Tabular Model ===")
    
    # Check if files exist
    model_path = os.path.join("models", "best_tabular_model.pkl")
    scaler_path = os.path.join("models", "tabular_scaler.pkl")
    
    print(f"Model file exists: {os.path.exists(model_path)}")
    print(f"Scaler file exists: {os.path.exists(scaler_path)}")
    
    if os.path.exists(model_path):
        print(f"Model file size: {os.path.getsize(model_path)} bytes")
        
        # Try to read file header
        try:
            with open(model_path, 'rb') as f:
                header = f.read(10)
                print(f"File header (first 10 bytes): {header}")
                print(f"File header (hex): {header.hex()}")
        except Exception as e:
            print(f"Failed to read file header: {e}")
        
        # Try with pickle
        try:
            print("Attempting to load model with pickle...")
            with open(model_path, 'rb') as f:
                model = pickle.load(f)
            print(f"Successfully loaded with pickle: {type(model)}")
        except Exception as e:
            print(f"Pickle loading failed: {e}")
            print(f"Error type: {type(e).__name__}")
    
    if os.path.exists(scaler_path):
        print(f"Scaler file size: {os.path.getsize(scaler_path)} bytes")
        
        # Try to read file header
        try:
            with open(scaler_path, 'rb') as f:
                header = f.read(10)
                print(f"Scaler header (first 10 bytes): {header}")
                print(f"Scaler header (hex): {header.hex()}")
        except Exception as e:
            print(f"Failed to read scaler header: {e}")
        
        # Try with pickle
        try:
            print("Attempting to load scaler with pickle...")
            with open(scaler_path, 'rb') as f:
                scaler = pickle.load(f)
            print(f"Successfully loaded scaler with pickle: {type(scaler)}")
        except Exception as e:
            print(f"Pickle scaler loading failed: {e}")
            print(f"Error type: {type(e).__name__}")

def diagnose_ecg_model():
    """Diagnose issues with ECG model loading"""
    print("\n=== Diagnosing ECG Model ===")
    
    model_path = os.path.join("models", "best_ecg_model.h5")
    print(f"ECG model file exists: {os.path.exists(model_path)}")
    
    if os.path.exists(model_path):
        print(f"ECG model file size: {os.path.getsize(model_path)} bytes")
        
        try:
            print("Attempting to load ECG model...")
            model = keras.models.load_model(model_path)
            print(f"Successfully loaded ECG model: {type(model)}")
            print(f"Model input shape: {model.input_shape}")
            print(f"Model output shape: {model.output_shape}")
            
            # Try compiling the model
            try:
                model.compile(
                    optimizer='adam',
                    loss='binary_crossentropy',
                    metrics=['accuracy']
                )
                print("Model compiled successfully")
            except Exception as e:
                print(f"Model compilation failed: {e}")
                
        except Exception as e:
            print(f"ECG model loading failed: {e}")
            print(f"Error type: {type(e).__name__}")

def check_tensorflow_gpu():
    """Check TensorFlow GPU availability"""
    print("\n=== Checking TensorFlow GPU ===")
    print(f"TensorFlow version: {tf.__version__}")
    print(f"Built with CUDA: {tf.test.is_built_with_cuda()}")
    
    # List physical devices
    devices = tf.config.list_physical_devices()
    print(f"All devices: {devices}")
    
    gpu_devices = tf.config.list_physical_devices('GPU')
    print(f"GPU devices: {gpu_devices}")
    
    # Check if CUDA_VISIBLE_DEVICES is set
    cuda_visible = os.environ.get('CUDA_VISIBLE_DEVICES', 'Not set')
    print(f"CUDA_VISIBLE_DEVICES: {cuda_visible}")

if __name__ == "__main__":
    # Set environment variables to suppress CUDA warnings
    os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
    
    diagnose_tabular_model()
    diagnose_ecg_model()
    check_tensorflow_gpu()
    
    print("\n=== Diagnosis Complete ===")