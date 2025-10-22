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
    record = wfdb.Record(
        record_name='test_ecg',
        n_sig=1,
        sig_len=samples,
        fs=fs,
        units=['mV'],
        sig_name=['MLII'],
        p_signal=ecg_signal.reshape(-1, 1)
    )
    
    # Save record files
    dat_path = os.path.join(temp_dir, 'test_ecg.dat')
    hea_path = os.path.join(temp_dir, 'test_ecg.hea')
    
    wfdb.wrsamp('test_ecg', fs=fs, units=['mV'], sig_name=['MLII'], 
                p_signal=ecg_signal.reshape(-1, 1), 
                directory=temp_dir)
    
    return temp_dir, dat_path, hea_path

def test_missing_header_file():
    """Test the case where header file is missing"""
    temp_dir, dat_path, hea_path = create_test_ecg_files()
    
    # Remove header file to simulate the error condition
    os.remove(hea_path)
    
    print(f"Created test files in: {temp_dir}")
    print(f"DAT file exists: {os.path.exists(dat_path)}")
    print(f"HEA file exists: {os.path.exists(hea_path)}")
    
    # Try to read the record (this should fail)
    try:
        record = wfdb.rdrecord(os.path.join(temp_dir, 'test_ecg'))
        print("Record read successfully (unexpected)")
    except Exception as e:
        print(f"Expected error when reading record without header: {e}")
    
    return temp_dir

if __name__ == "__main__":
    test_dir = test_missing_header_file()
    print(f"\nTest files are in: {test_dir}")
    print("You can manually test the upload with:")
    print(f"  DAT file: {os.path.join(test_dir, 'test_ecg.dat')}")
    print("(Note: HEA file was deleted to simulate the error condition)")