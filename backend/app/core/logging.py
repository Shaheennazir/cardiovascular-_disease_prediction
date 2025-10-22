import logging
import sys
from typing import Optional
from pathlib import Path
import json
from datetime import datetime

class CustomFormatter(logging.Formatter):
    """Custom formatter with color coding for different log levels"""
    
    grey = "\x1b[38;20m"
    yellow = "\x1b[33;20m"
    red = "\x1b[31;20m"
    bold_red = "\x1b[31;1m"
    reset = "\x1b[0m"
    
    FORMATS = {
        logging.DEBUG: grey + "%(asctime)s - %(name)s - %(levelname)s - %(message)s" + reset,
        logging.INFO: grey + "%(asctime)s - %(name)s - %(levelname)s - %(message)s" + reset,
        logging.WARNING: yellow + "%(asctime)s - %(name)s - %(levelname)s - %(message)s" + reset,
        logging.ERROR: red + "%(asctime)s - %(name)s - %(levelname)s - %(message)s" + reset,
        logging.CRITICAL: bold_red + "%(asctime)s - %(name)s - %(levelname)s - %(message)s" + reset
    }

    def format(self, record):
        log_fmt = self.FORMATS.get(record.levelno)
        formatter = logging.Formatter(log_fmt)
        return formatter.format(record)


class StructuredLogger:
    """Structured logger for consistent logging across the application"""
    
    def __init__(self, name: str, level: int = logging.INFO):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level)
        
        # Prevent adding multiple handlers if logger already exists
        if not self.logger.handlers:
            self._setup_handlers()
    
    def _setup_handlers(self):
        """Setup console handler with custom formatting"""
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setFormatter(CustomFormatter())
        self.logger.addHandler(console_handler)
        
        # Also add a file handler for persistent logging
        log_dir = Path("logs")
        log_dir.mkdir(exist_ok=True)
        file_handler = logging.FileHandler(log_dir / "application.log")
        file_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        file_handler.setFormatter(file_formatter)
        self.logger.addHandler(file_handler)
    
    def debug(self, message: str, **kwargs):
        """Log debug message with optional structured data"""
        if kwargs:
            message = f"{message} | Context: {json.dumps(kwargs, default=str)}"
        self.logger.debug(message)
    
    def info(self, message: str, **kwargs):
        """Log info message with optional structured data"""
        if kwargs:
            message = f"{message} | Context: {json.dumps(kwargs, default=str)}"
        self.logger.info(message)
    
    def warning(self, message: str, **kwargs):
        """Log warning message with optional structured data"""
        if kwargs:
            message = f"{message} | Context: {json.dumps(kwargs, default=str)}"
        self.logger.warning(message)
    
    def error(self, message: str, **kwargs):
        """Log error message with optional structured data"""
        if kwargs:
            message = f"{message} | Context: {json.dumps(kwargs, default=str)}"
        self.logger.error(message)
    
    def critical(self, message: str, **kwargs):
        """Log critical message with optional structured data"""
        if kwargs:
            message = f"{message} | Context: {json.dumps(kwargs, default=str)}"
        self.logger.critical(message)
    
    def exception(self, message: str, **kwargs):
        """Log exception with traceback"""
        if kwargs:
            message = f"{message} | Context: {json.dumps(kwargs, default=str)}"
        self.logger.exception(message)


def get_logger(name: str) -> StructuredLogger:
    """Get a structured logger instance"""
    return StructuredLogger(name)


def log_request_response(logger: StructuredLogger, request_info: dict, response_info: dict = None, error_info: dict = None):
    """Helper function to log request/response information"""
    log_data = {
        "request": request_info,
        "timestamp": datetime.utcnow().isoformat()
    }
    
    if response_info:
        log_data["response"] = response_info
        logger.info("Request processed successfully", **log_data)
    elif error_info:
        log_data["error"] = error_info
        logger.error("Request processing failed", **log_data)
    else:
        logger.info("Request received", **log_data)


# Configure root logger
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)


def performance_monitor(logger: StructuredLogger):
    """Decorator to monitor function execution time"""
    def decorator(func):
        import functools
        import time
        
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.time()
            func_name = f"{func.__module__}.{func.__name__}"
            logger.debug(f"Starting execution of {func_name}")
            
            try:
                result = func(*args, **kwargs)
                execution_time = time.time() - start_time
                logger.debug(f"Completed execution of {func_name}", execution_time_seconds=execution_time)
                return result
            except Exception as e:
                execution_time = time.time() - start_time
                logger.error(f"Failed execution of {func_name}",
                           execution_time_seconds=execution_time,
                           error_type=type(e).__name__,
                           error_message=str(e))
                raise
        return wrapper
    return decorator