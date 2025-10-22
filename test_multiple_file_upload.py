import os
import tempfile
import numpy as np
import wfdb

def create_test_ecg_files():
    """Create test ECG files (.dat and .hea) for testing"""
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
    
    # Save record files
    wfdb.wrsamp(record_name, fs=fs, units=['mV'], sig_name=['MLII'], 
                p_signal=ecg_signal.reshape(-1, 1), 
                directory=temp_dir)
    
    dat_path = os.path.join(temp_dir, f'{record_name}.dat')
    hea_path = os.path.join(temp_dir, f'{record_name}.hea')
    
    return temp_dir, dat_path, hea_path

if __name__ == "__main__":
    temp_dir, dat_path, hea_path = create_test_ecg_files()
    
    print(f"Created test files:")
    print(f"  DAT file: {dat_path}")
    print(f"  HEA file: {hea_path}")
    print(f"  Directory: {temp_dir}")
    print("\nTo test the upload functionality:")
    print("1. Start the backend server")
    print("2. Navigate to the ECG analysis page in the frontend")
    print("3. Select both files for upload")
    print("4. Verify that the upload succeeds and processing works correctly")
    
    # Verify files exist
    print(f"\nVerification:")
    print(f"  DAT file exists: {os.path.exists(dat_path)}")
    print(f"  HEA file exists: {os.path.exists(hea_path)}")
    
    # Try to read the record to verify it's valid
    try:
        record = wfdb.rdrecord(os.path.join(temp_dir, 'test_ecg'))
        print(f"  Record can be read successfully: True")
        print(f"  Signal shape: {record.p_signal.shape}")
    except Exception as e:
        print(f"  Error reading record: {e}")