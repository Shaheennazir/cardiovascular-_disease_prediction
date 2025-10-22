import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.services.tabular_service import TabularPredictionService
import numpy as np

def test_feature_names_fix():
    """Test that the feature names fix works correctly"""
    print("=== Testing Feature Names Fix ===")
    
    # Create service instance
    service = TabularPredictionService()
    
    # Sample input data
    input_data = {
        'age': 55,
        'gender': 1,
        'height': 170,
        'weight': 75,
        'ap_hi': 140,
        'ap_lo': 90,
        'cholesterol': 2,
        'gluc': 1,
        'smoke': 1,
        'alco': 0,
        'active': 1
    }
    
    print("Testing preprocess_input method...")
    try:
        processed = service.preprocess_input(input_data)
        print(f"✓ preprocess_input works correctly. Shape: {processed.shape}")
    except Exception as e:
        print(f"✗ preprocess_input failed: {e}")
        return False
    
    print("Testing predict method...")
    try:
        result = service.predict(input_data)
        print(f"✓ predict works correctly. Result keys: {list(result.keys())}")
    except Exception as e:
        print(f"✗ predict failed: {e}")
        return False
    
    print("=== Test Completed Successfully ===")
    return True

if __name__ == "__main__":
    test_feature_names_fix()