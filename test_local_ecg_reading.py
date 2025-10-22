#!/usr/bin/env python3
"""
Test script to verify that the ECG services can read local files properly
without accessing physionet.org
"""

import sys
import os
import tempfile
import numpy as np
import wfdb

# Add the backend directory to the path so we can import our modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from app.services.ecg_service import ECGPredictionService
from app.services.visualization_service import ECGVisualizationService

def create_test_ecg_file():
    """Create a simple test ECG file in WFDB format"""
    # Create temporary directory
    temp_dir = tempfile.mkdtemp()
    
    # Create sample ECG data
    fs = 360  # Sampling frequency
    duration = 10  # seconds
    samples = fs * duration
    
    # Generate synthetic ECG signal
    t = np.linspace(0, duration, samples)
    ecg_signal = np.sin(2 * np.pi * 1 * t) + 0.5 * np.sin(2 * np.pi * 2 * t)
    
    # Create WFDB record
    record_name = 'test_ecg'
    file_path_no_ext = os.path.join(temp_dir, record_name)
    
    # Save record files
    wfdb.wrsamp(
        record_name=record_name,
        fs=fs,
        units=['mV'],
        sig_name=['MLII'],
        p_signal=ecg_signal.reshape(-1, 1),
        write_dir=temp_dir
    )
    
    dat_path = os.path.join(temp_dir, f'{record_name}.dat')
    hea_path = os.path.join(temp_dir, f'{record_name}.hea')
    
    return temp_dir, dat_path, hea_path, file_path_no_ext

def test_ecg_services():
    """Test both ECG services with local files"""
    print("Creating test ECG file...")
    temp_dir, dat_path, hea_path, file_path_no_ext = create_test_ecg_file()
    
    print(f"Test files created:")
    print(f"  DAT file: {dat_path}")
    print(f"  HEA file: {hea_path}")
    print(f"  File path without extension: {file_path_no_ext}")
    
    try:
        # Test reading the file directly with wfdb
        print("\nTesting direct WFDB reading...")
        record = wfdb.rdrecord(file_path_no_ext)
        print(f"Successfully read record with {record.sig_len} samples")
        print(f"Signal shape: {record.p_signal.shape}")
        
        # Test ECG prediction service
        print("\nTesting ECG prediction service...")
        ecg_service = ECGPredictionService()
        # Use the .dat file path as that's what the service expects
        prediction = ecg_service.predict(dat_path)
        print(f"Prediction result: {prediction}")
        
        # Test visualization service
        print("\nTesting visualization service...")
        viz_service = ECGVisualizationService()
        # Use the .dat file path as that's what the service expects
        abnormalities = [
            {
                "start_time": 1.0,
                "end_time": 2.0,
                "type": "PVC",
                "description": "Test abnormality"
            }
        ]
        viz_path = viz_service.generate_visualization(dat_path, abnormalities)
        print(f"Visualization saved to: {viz_path}")
        
        print("\nAll tests passed! The services can read local files properly.")
        return True
        
    except Exception as e:
        print(f"\nError during testing: {e}")
        import traceback
        traceback.print_exc()
        return False
    finally:
        # Clean up temporary files
        try:
            os.remove(dat_path)
            os.remove(hea_path)
            os.rmdir(temp_dir)
            # Clean up any visualization files created
            if 'viz_path' in locals() and viz_path and os.path.exists(viz_path):
                os.remove(viz_path)
                viz_dir = os.path.dirname(viz_path)
                if os.path.exists(viz_dir) and not os.listdir(viz_dir):
                    os.rmdir(viz_dir)
        except Exception as e:
            print(f"Warning: Could not clean up temporary files: {e}")

if __name__ == "__main__":
    success = test_ecg_services()
    sys.exit(0 if success else 1)