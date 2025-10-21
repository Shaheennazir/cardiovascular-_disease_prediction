#!/bin/bash

# Exit on any error
set -e

# Function to print messages
print_message() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Check if we're running on Windows (Git Bash) or Unix-like system
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    IS_WINDOWS=1
else
    IS_WINDOWS=0
fi

# Create virtual environment
print_message "Creating virtual environment..."
if [[ $IS_WINDOWS -eq 1 ]]; then
    python -m venv venv
else
    python3 -m venv venv
fi

# Activate virtual environment
print_message "Activating virtual environment..."
if [[ $IS_WINDOWS -eq 1 ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Upgrade pip
print_message "Upgrading pip..."
pip install --upgrade pip

# Install dependencies
print_message "Installing dependencies..."
pip install --use-deprecated=legacy-resolver -r requirements.txt

# Install additional dependencies that resolve conflicts
print_message "Installing additional dependencies..."
pip install pydantic-settings
pip install 'pydantic[email]'
pip install numpy==1.24.3
pip install scipy==1.10.1
pip install contourpy==1.1.1

# Copy .env.example to .env if .env doesn't exist
if [ ! -f ".env" ]; then
    print_message "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please update the .env file with your configuration!"
fi

print_message "Setup completed successfully!"
print_message "To activate the environment, run:"
if [[ $IS_WINDOWS -eq 1 ]]; then
    echo "source venv/Scripts/activate"
else
    echo "source venv/bin/activate"
fi
print_message "To start the server, run:"
echo "uvicorn main:app --reload"