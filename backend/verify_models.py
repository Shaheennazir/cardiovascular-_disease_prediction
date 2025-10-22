"""
Simple script to verify model files without requiring all dependencies
"""

import os
import pickle
import struct

def check_file_exists(path):
    """Check if file exists and print basic info"""
    exists = os.path.exists(path)
    print(f"File exists: {exists} | {path}")
    if exists:
        size = os.path.getsize(path)
        print(f"File size: {size} bytes ({size/1024:.1f} KB)")
    return exists

def read_file_header(path, num_bytes=16):
    """Read and display file header"""
    try:
        with open(path, 'rb') as f:
            header = f.read(num_bytes)
            print(f"File header: {header}")
            print(f"Hex representation: {header.hex()}")
            return header
    except Exception as e:
        print(f"Error reading file header: {e}")
        return None

def try_pickle_load(path):
    """Try to load file with pickle"""
    try:
        with open(path, 'rb') as f:
            obj = pickle.load(f)
        print(f"Successfully loaded with pickle: {type(obj)}")
        return obj
    except Exception as e:
        print(f"Failed to load with pickle: {e}")
        return None

def detect_pickle_protocol(path):
    """Detect pickle protocol version"""
    try:
        with open(path, 'rb') as f:
            # Read the first byte to determine protocol
            first_byte = f.read(1)
            if first_byte:
                protocol = ord(first_byte)
                print(f"Detected pickle protocol: {protocol}")
                if protocol > 2:
                    print("Note: Protocol > 2 requires Python 3.4+")
                return protocol
    except Exception as e:
        print(f"Error detecting protocol: {e}")
    return None

def main():
    print("=== Model File Verification ===\n")
    
    # Check tabular model
    model_path = os.path.join("models", "best_tabular_model.pkl")
    print("1. TABULAR MODEL FILE")
    print("-" * 30)
    if check_file_exists(model_path):
        read_file_header(model_path)
        detect_pickle_protocol(model_path)
        print()
    
    # Check tabular scaler
    scaler_path = os.path.join("models", "tabular_scaler.pkl")
    print("2. TABULAR SCALER FILE")
    print("-" * 30)
    if check_file_exists(scaler_path):
        read_file_header(scaler_path)
        detect_pickle_protocol(scaler_path)
        print()
    
    # Check ECG model
    ecg_path = os.path.join("models", "best_ecg_model.h5")
    print("3. ECG MODEL FILE")
    print("-" * 30)
    if check_file_exists(ecg_path):
        read_file_header(ecg_path)
        # Check if it looks like an HDF5 file
        header = read_file_header(ecg_path, 8)
        if header and header.startswith(b'\x89HDF\r\n\x1a\n'):
            print("File appears to be a valid HDF5 file")
        print()
    
    print("=== Verification Complete ===")

if __name__ == "__main__":
    main()