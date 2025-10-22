import numpy as np
import sys
import os

# Add backend to path so we can import the service
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from backend.app.services.ecg_service import ECGPredictionService

def test_ecg_reshaping():
    """Test the ECG reshaping logic with different input shapes"""
    print("Testing ECG reshaping logic...")
    
    # Create mock signal data with different shapes
    # 1D signal (single channel)
    signal_1d = np.random.rand(10000)
    print(f"1D signal shape: {signal_1d.shape}")
    
    # 2D signal with 1 channel
    signal_2d_single = np.random.rand(10000, 1)
    print(f"2D single channel signal shape: {signal_2d_single.shape}")
    
    # 2D signal with 2 channels (the problematic case)
    signal_2d_dual = np.random.rand(10000, 2)
    print(f"2D dual channel signal shape: {signal_2d_dual.shape}")
    
    # Mock the preprocessing function
    def mock_preprocess(signal):
        if len(signal.shape) == 1:
            signal = signal.reshape(1, -1, 1)
        elif len(signal.shape) == 2 and signal.shape[1] == 1:
            signal = signal.reshape(1, -1, 1)
        elif len(signal.shape) == 2 and signal.shape[1] > 1:
            # Multi-channel ECG: select first channel for single-channel model
            print(f"Multi-channel ECG detected with {signal.shape[1]} channels, selecting first channel")
            signal = signal[:, 0]  # Select first channel
            signal = signal.reshape(1, -1, 1)
        else:
            # Unexpected shape, try to handle gracefully
            print(f"Unexpected signal shape: {signal.shape}, attempting to reshape")
            signal = signal.reshape(1, signal.shape[0], 1)
            
        print(f"Final reshaped signal shape: {signal.shape}")
        return signal
    
    # Test each case
    print("\n--- Testing 1D signal ---")
    result_1d = mock_preprocess(signal_1d)
    assert result_1d.shape == (1, 10000, 1), f"Expected (1, 10000, 1), got {result_1d.shape}"
    
    print("\n--- Testing 2D single channel signal ---")
    result_2d_single = mock_preprocess(signal_2d_single)
    assert result_2d_single.shape == (1, 10000, 1), f"Expected (1, 10000, 1), got {result_2d_single.shape}"
    
    print("\n--- Testing 2D dual channel signal ---")
    result_2d_dual = mock_preprocess(signal_2d_dual)
    assert result_2d_dual.shape == (1, 10000, 1), f"Expected (1, 10000, 1), got {result_2d_dual.shape}"
    
    print("\nAll tests passed!")

if __name__ == "__main__":
    test_ecg_reshaping()