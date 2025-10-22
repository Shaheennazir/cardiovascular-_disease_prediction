#!/usr/bin/env python3
"""
Test script to verify local ECG file reading functionality.
This script tests the fix for the file path handling issue.
"""

import os
import sys
import tempfile
import shutil
from pathlib import Path

# Add backend to path so we can import the services
sys.path.insert(0, 'backend')

from backend.app.services.ecg_service import ecg_service
from backend.app.services.visualization_service import visualization_service

def test_file_path_handling():
    """Test that the services correctly handle file paths with UUID prefixes."""
    print("Testing ECG file path handling...")
    
    # Create a temporary directory for our test files
    test_dir = tempfile.mkdtemp(prefix="ecg_test_")
    print(f"Created test directory: {test_dir}")
    
    try:
        # Create mock ECG files with UUID-like naming
        uuid_prefix = "2122602e-d6ef-4bdc-85eb-b149cff02458"
        dat_filename = f"{uuid_prefix}_rec_1.dat"
        hea_filename = f"{uuid_prefix}_rec_1.hea"
        
        dat_file_path = os.path.join(test_dir, dat_filename)
        hea_file_path = os.path.join(test_dir, hea_filename)
        
        print(f"Creating mock files:")
        print(f"  DAT file: {dat_file_path}")
        print(f"  HEA file: {hea_file_path}")
        
        # Create mock .hea file content (minimal valid header)
        hea_content = f"""{uuid_prefix}_rec_1 1 250 250.000
0.954314720812182 0.954314720812182 0 0 0 0 0 0
EOF
"""
        
        # Write the header file
        with open(hea_file_path, 'w') as f:
            f.write(hea_content)
        
        # Create a small mock .dat file (just some bytes)
        # In reality, this would be actual ECG data
        with open(dat_file_path, 'wb') as f:
            f.write(b'\x00' * 1000)  # 1000 zero bytes as mock data
        
        print("Mock files created successfully")
        
        # Test that the file paths are handled correctly
        # The services should be able to process these files without errors
        print("\nTesting ECG service preprocessing...")
        try:
            # This should work without trying to access physionet.org or look in wrong directories
            signal = ecg_service.preprocess_ecg_file(dat_file_path)
            print(f"✓ ECG preprocessing successful. Signal shape: {signal.shape}")
        except Exception as e:
            print(f"✗ ECG preprocessing failed: {e}")
            return False
            
        print("\nTesting visualization service loading...")
        try:
            # This should also work without trying to access physionet.org or look in wrong directories
            time_points, signal = visualization_service.load_ecg_signal(dat_file_path)
            print(f"✓ Visualization loading successful. Time points shape: {time_points.shape}, Signal shape: {signal.shape}")
        except Exception as e:
            print(f"✗ Visualization loading failed: {e}")
            return False
            
        print("\nAll tests passed! File path handling is working correctly.")
        return True
        
    finally:
        # Clean up test directory
        print(f"\nCleaning up test directory: {test_dir}")
        shutil.rmtree(test_dir)

if __name__ == "__main__":
    print("ECG File Path Handling Test")
    print("=" * 40)
    
    success = test_file_path_handling()
    
    if success:
        print("\n🎉 SUCCESS: All tests passed!")
        sys.exit(0)
    else:
        print("\n❌ FAILURE: Tests failed!")
        sys.exit(1)