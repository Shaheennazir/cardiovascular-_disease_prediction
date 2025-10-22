# Docker File Path Handling Solution

## Problem Description

When running the Cardiovascular Disease Prediction application in Docker containers, users encountered file path issues during ECG file processing. The error logs showed:

```
File saved: uploads/ecg_files/57f71ddd-94e2-4abe-9814-2a4c016dc453_rec_1.dat
File not found: /app/uploads/ecg_files/rec_1.dat
```

This indicated a mismatch between where files were saved and where they were being accessed for processing.

## Root Cause Analysis

The issue stemmed from inconsistent file path handling between different components of the application:

1. **File Upload**: Files were saved with generated names in the `uploads/ecg_files/` directory
2. **File Processing**: Services attempted to access these files but had path mismatches
3. **Docker Volume Mapping**: The volume was mapped correctly but file paths weren't consistently handled

## Solution Implementation

### 1. Standardized File Utilities

Created a new module `backend/app/core/file_utils.py` with utility functions:

- `get_absolute_file_path()`: Converts file paths to absolute paths for consistent Docker handling
- `ensure_directory_exists()`: Ensures directories exist with proper permissions
- `get_upload_directory()`: Returns the standardized upload directory path
- `get_visualization_directory()`: Returns the standardized visualization directory path

### 2. Updated Service Implementations

Modified both `ecg_service.py` and `visualization_service.py` to use the new utility functions:

- Replaced direct `os.path.abspath()` calls with `get_absolute_file_path()`
- Used `get_visualization_directory()` for consistent visualization storage

### 3. Updated API Endpoint

Modified `prediction.py` endpoint to use `get_upload_directory()` for consistent file storage.

### 4. Docker Configuration

Updated `Dockerfile` to ensure proper permissions for the uploads directory:

```dockerfile
RUN mkdir -p uploads/ecg_files uploads/visualizations db
RUN chmod -R 777 uploads db
```

## Key Changes Summary

1. **Consistent Path Handling**: All file operations now use absolute paths derived from a standardized utility function
2. **Centralized Directory Management**: Directory paths are now managed centrally in `file_utils.py`
3. **Improved Logging**: Added debug logging to track file paths through the system
4. **Proper Permissions**: Docker container now has proper permissions for file operations

## Verification Steps

To verify the solution works correctly:

1. Build and run the Docker containers:
   ```bash
   docker-compose up --build
   ```

2. Access the application and upload ECG files (.dat and .hea pairs)

3. Check the logs for successful file processing:
   ```bash
   docker logs cardio-backend
   ```

4. Verify files are correctly saved and processed without path errors

## Docker Volume Configuration

The `docker-compose.yml` file correctly maps volumes for persistent storage:

```yaml
volumes:
  - ./models:/app/models
  - ./datasets:/app/datasets
  - backend_uploads:/app/uploads
  - backend_db:/app/db
```

This ensures that uploaded files and database records persist across container restarts.

## Best Practices Implemented

1. **Absolute Path Usage**: Always convert file paths to absolute paths before processing
2. **Centralized Configuration**: Directory paths are defined in one place for consistency
3. **Proper Error Handling**: Enhanced logging to identify path-related issues quickly
4. **Permission Management**: Explicit permission setting for Docker containers

This solution resolves the file path issues in Docker while maintaining compatibility with non-Docker environments.