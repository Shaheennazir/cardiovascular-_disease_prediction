#!/bin/bash

# Installation script for backend dependencies
echo "Installing backend dependencies..."

# Check if python3 is available
if ! command -v python3 &> /dev/null
then
    echo "python3 could not be found"
    exit 1
fi

# Try to install pip if not available
if ! python3 -m pip --version &> /dev/null
then
    echo "pip not found, trying to install..."
    python3 -m ensurepip --upgrade
fi

# Install required packages
echo "Installing required packages..."
python3 -m pip install --user -r diagnostic_requirements.txt

echo "Installation complete!"
echo "To run diagnostics, use: python3 diagnose_models.py"