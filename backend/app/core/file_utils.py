import os
from pathlib import Path

def get_absolute_file_path(file_path: str) -> str:
    """
    Convert a file path to an absolute path, handling Docker container environments.
    
    Args:
        file_path (str): The file path to convert
        
    Returns:
        str: The absolute file path without extension
    """
    # Convert to absolute path
    abs_path = os.path.abspath(file_path)
    
    # Remove extension if present
    abs_path_without_ext = os.path.splitext(abs_path)[0]
    
    return abs_path_without_ext

def ensure_directory_exists(directory_path: str) -> None:
    """
    Ensure a directory exists, creating it if necessary.
    
    Args:
        directory_path (str): The directory path to ensure exists
    """
    Path(directory_path).mkdir(parents=True, exist_ok=True)

def get_upload_directory() -> str:
    """
    Get the standardized upload directory path.
    
    Returns:
        str: The upload directory path
    """
    upload_dir = os.path.join("uploads", "ecg_files")
    ensure_directory_exists(upload_dir)
    return upload_dir

def get_visualization_directory() -> str:
    """
    Get the standardized visualization directory path.
    
    Returns:
        str: The visualization directory path
    """
    viz_dir = os.path.join("uploads", "visualizations")
    ensure_directory_exists(viz_dir)
    return viz_dir