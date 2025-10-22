# ECG Service Fixes for Local File Reading

## Issue Description

The ECG services were incorrectly attempting to access PhysioNet remote servers when processing local ECG files, resulting in 404 errors and fallback to dummy data. This was happening because the code was using the `pn_dir` parameter in `wfdb.rdrecord()` which instructs the WFDB library to look for files on remote PhysioNet servers.

## Root Cause

In both `ecg_service.py` and `visualization_service.py`, the code was using:
```python
record = wfdb.rdrecord(record_name, pn_dir=directory)
```

This tells the WFDB library to look for the record on PhysioNet remote servers at URLs like `https://physionet.org/content/uploads/`, which resulted in 404 errors when trying to process local files.

## Solution

Changed the approach to pass the full file path directly to `rdrecord()` without using the `pn_dir` parameter:

### Before (Incorrect):
```python
# Get the directory and filename without extension
directory = os.path.dirname(file_path)
record_name = os.path.basename(get_absolute_file_path(file_path))
logger.debug("Directory and record name for wfdb", directory=directory, record_name=record_name)
record = wfdb.rdrecord(record_name, pn_dir=directory)
```

### After (Correct):
```python
# For local files, we pass the full file path without extension
file_path_no_ext = os.path.splitext(file_path)[0]
logger.debug("File path for wfdb", file_path_no_ext=file_path_no_ext)
record = wfdb.rdrecord(file_path_no_ext)
```

## Changes Made

1. **backend/app/services/ecg_service.py**:
   - Modified `preprocess_ecg_file()` method to correctly read local files
   - Removed unused import of `get_absolute_file_path`

2. **backend/app/services/visualization_service.py**:
   - Modified `load_ecg_signal()` method to correctly read local files
   - Removed unused import of `get_absolute_file_path`

## Verification

The fix ensures that:
1. Local ECG files (.dat and .hea pairs) are properly read without attempting to access remote servers
2. No more 404 errors when processing ECG files
3. No fallback to dummy data in normal operation
4. The services work as expected with locally uploaded ECG files

## Testing

While we couldn't run a full integration test due to environment constraints, the code changes follow the correct WFDB library usage pattern for local file reading and should resolve the reported issue.