@echo off
REM Windows setup script for Cardiovascular Disease Prediction Backend

echo [%date% %time%] Creating virtual environment...
python -m venv venv

echo [%date% %time%] Activating virtual environment...
call venv\Scripts\activate

echo [%date% %time%] Upgrading pip...
pip install --upgrade pip

echo [%date% %time%] Installing dependencies...
pip install --use-deprecated=legacy-resolver -r requirements.txt

echo [%date% %time%] Installing additional dependencies...
pip install pydantic-settings
pip install pydantic[email]
pip install numpy==1.24.3
pip install scipy==1.10.1
pip install contourpy==1.1.1
pip install joblib

REM Copy .env.example to .env if .env doesn't exist
if not exist ".env" (
    echo [%date% %time%] Creating .env file from .env.example...
    copy .env.example .env
    echo Please update the .env file with your configuration!
)

echo [%date% %time%] Setup completed successfully!
echo To activate the environment, run:
echo call venv\Scripts\activate
echo To start the server, run:
echo uvicorn main:app --reload