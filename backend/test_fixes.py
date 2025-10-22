"""
Test script to verify that the model loading fixes work correctly
"""

import os
import sys
import traceback

def test_environment_setup():
    """Test that environment variables are set correctly"""
    print("=== Testing Environment Setup ===")
    
    cuda_visible = os.environ.get('CUDA_VISIBLE_DEVICES')
    tf_log_level = os.environ.get('TF_CPP_MIN_LOG_LEVEL')
    
    print(f"CUDA_VISIBLE_DEVICES: {cuda_visible}")
    print(f"TF_CPP_MIN_LOG_LEVEL: {tf_log_level}")
    
    if cuda_visible == '-1':
        print("✅ CUDA environment variable set correctly")
    else:
        print("⚠️  CUDA environment variable not set (may cause warnings)")
    
    if tf_log_level == '2':
        print("✅ TensorFlow logging level set correctly")
    else:
        print("⚠️  TensorFlow logging level not set (may see verbose logs)")

def test_imports():
    """Test that all required modules can be imported"""
    print("\n=== Testing Imports ===")
    
    imports = [
        ('pickle', 'Pickle module'),
        ('joblib', 'Joblib module'),
        ('numpy', 'NumPy'),
        ('sklearn.ensemble', 'Scikit-learn'),
        ('tensorflow', 'TensorFlow')
    ]
    
    for module, description in imports:
        try:
            __import__(module)
            print(f"✅ {description} imported successfully")
        except ImportError as e:
            print(f"❌ {description} import failed: {e}")

def test_model_loading():
    """Test that model loading works with the new code"""
    print("\n=== Testing Model Loading Logic ===")
    
    # Add backend to path
    backend_path = os.path.join(os.path.dirname(__file__))
    if backend_path not in sys.path:
        sys.path.insert(0, backend_path)
    
    try:
        # Import the tabular service
        from app.services.tabular_service import TabularPredictionService
        
        # Create service instance (this will trigger model loading)
        print("Creating TabularPredictionService instance...")
        service = TabularPredictionService()
        
        print(f"Model loaded: {service.model is not None}")
        print(f"Scaler loaded: {service.scaler is not None}")
        
        if service.model is None:
            print("⚠️  Model not loaded (using dummy model)")
        else:
            print("✅ Model loaded successfully")
            
        if service.scaler is None:
            print("⚠️  Scaler not loaded (using default scaler)")
        else:
            print("✅ Scaler loaded successfully")
            
    except Exception as e:
        print(f"❌ Error testing model loading: {e}")
        traceback.print_exc()

def test_file_verification():
    """Test that model files exist"""
    print("\n=== Verifying Model Files ===")
    
    model_files = [
        ("models/best_tabular_model.pkl", "Tabular model"),
        ("models/tabular_scaler.pkl", "Tabular scaler"),
        ("models/best_ecg_model.h5", "ECG model")
    ]
    
    for file_path, description in model_files:
        exists = os.path.exists(file_path)
        if exists:
            size = os.path.getsize(file_path)
            print(f"✅ {description} exists ({size} bytes)")
        else:
            print(f"❌ {description} not found")

def main():
    """Run all tests"""
    print("Testing Model Loading Fixes")
    print("=" * 50)
    
    test_environment_setup()
    test_imports()
    test_file_verification()
    test_model_loading()
    
    print("\n" + "=" * 50)
    print("Testing complete!")

if __name__ == "__main__":
    # Set environment variables if not already set
    if 'CUDA_VISIBLE_DEVICES' not in os.environ:
        os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
    if 'TF_CPP_MIN_LOG_LEVEL' not in os.environ:
        os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
    
    main()