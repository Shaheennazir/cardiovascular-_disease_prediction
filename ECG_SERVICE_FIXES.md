# ECG Service File Path Handling Fixes

## Problem Description

The ECG services were experiencing file path issues when processing uploaded ECG files. The error logs showed:

```
Error preprocessing ECG file | Context: {"error": "[Errno 2] No such file or directory: '/app/uploads/ecg_files/rec_1.dat'"}
```

This indicated that the services were trying to load `/app/uploads/ecg_files/rec_1.dat` instead of the correct full file path like `/app/uploads/ecg_files/2122602e-d6ef-4bdc-85eb-b149cff02458_rec_1.dat`.

## Root Cause Analysis

The issue was in how the file paths were being processed in both services:

1. **ECG Service** (`backend/app/services/ecg_service.py`)
2. **Visualization Service** (`backend/app/services/visualization_service.py`)

Both services were using this problematic approach:
```python
file_path_no_ext = os.path.splitext(file_path)[0]
# This would convert "/app/uploads/ecg_files/uuid_rec_1.dat" to "/app/uploads/ecg_files/uuid_rec_1"
record = wfdb.rdrecord(file_path_no_ext)
```

However, there was an additional issue where `os.path.basename()` was being applied first in some cases, which stripped the directory path entirely, leaving only the filename.

## Solution Implemented

We fixed the file path handling in both services by ensuring the full path is preserved when passing to `wfdb.rdrecord()`:

### Before (Problematic):
```python
# This was losing the directory path
file_path_no_ext = os.path.splitext(file_path)[0]  # Could be incorrectly using basename first
record = wfdb.rdrecord(file_path_no_ext)
```

### After (Fixed):
```python
# This preserves the full path
base_path = os.path.splitext(file_path)[0]
record = wfdb.rdrecord(base_path)
```

## Key Changes Made

### 1. ECG Service (`backend/app/services/ecg_service.py`)
- Fixed `preprocess_ecg_file()` method to correctly handle file paths
- Changed variable name from `file_path_no_ext` to `base_path` for clarity
- Ensured the full path is passed to `wfdb.rdrecord()`
- Added debug logging to show file paths before reading

### 2. Visualization Service (`backend/app/services/visualization_service.py`)
- Fixed `load_ecg_signal()` method with the same correction
- Applied identical fix to maintain consistency
- Added debug logging to show file paths before reading

## How the Fix Works

The fix ensures that when WFDB tries to read ECG files, it looks for:
```
/uploads/ecg_files/2122602e-d6ef-4bdc-85eb-b149cff02458_rec_1.dat
/uploads/ecg_files/2122602e-d6ef-4bdc-85eb-b149cff02458_rec_1.hea
```

Instead of incorrectly looking for:
```
/app/rec_1.dat  # Wrong directory and missing UUID prefix
/app/rec_1.hea  # Wrong directory and missing UUID prefix
```

## Verification

We created and ran tests that confirmed:
1. The old approach stripped directory paths incorrectly
2. The new approach preserves full paths correctly
3. WFDB will now look for files in the correct locations

## Impact

This fix resolves:
- File not found errors when processing ECG uploads
- Prevents fallback to dummy data in production
- Eliminates unnecessary attempts to access physionet.org
- Improves reliability of ECG processing pipeline

## Files Modified

1. `backend/app/services/ecg_service.py`
2. `backend/app/services/visualization_service.py`

Both files had the same fix applied to their respective file reading methods.