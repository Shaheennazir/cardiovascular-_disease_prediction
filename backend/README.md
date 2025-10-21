# Cardiovascular Disease Prediction Backend

## Overview
This is the backend service for the Cardiovascular Disease Prediction system. It provides RESTful APIs for:
- User authentication (registration and login)
- Tabular data prediction for cardiovascular risk
- ECG signal analysis for arrhythmia detection
- Prediction history management
- ECG visualization retrieval

## Tech Stack
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ML Libraries**: TensorFlow/Keras, Scikit-learn, SHAP
- **Visualization**: Plotly
- **Authentication**: JWT

## Project Structure
```
backend/
├── app/
│   ├── api/              # API routes
│   ├── core/             # Core configuration and security
│   ├── db/               # Database configuration
│   ├── models/           # Database models
│   ├── schemas/          # Pydantic schemas
│   └── services/         # Business logic and ML services
├── models/               # Trained ML models (mounted from host)
├── uploads/              # Uploaded files and generated visualizations
├── main.py               # Application entry point
├── requirements.txt      # Python dependencies
├── setup.sh              # Portable setup script for Unix-like systems
├── setup.bat             # Setup script for Windows
└── Dockerfile            # Docker configuration
```

## Setup Instructions

### Prerequisites
- Docker and Docker Compose (recommended)
- Python 3.9+ (for local development)

### Installation Options

#### 1. Using Docker Compose (Recommended):
```bash
docker-compose up --build
```

#### 2. Local Development with Setup Scripts:

##### For Unix-like systems (Linux/macOS):
```bash
cd backend
./setup.sh
source venv/bin/activate
uvicorn main:app --reload
```

##### For Windows:
```cmd
cd backend
setup.bat
call venv\Scripts\activate
uvicorn main:app --reload
```

#### 3. Manual Installation:
```bash
cd backend
python3 -m venv venv  # On Windows: python -m venv venv
source venv/bin/activate  # On Windows: call venv\Scripts\activate
pip install --upgrade pip
pip install --use-deprecated=legacy-resolver -r requirements.txt
pip install pydantic-settings
pip install pydantic[email]
pip install numpy==1.24.3
pip install scipy==1.10.1
pip install contourpy==1.1.1
cp .env.example .env  # On Windows: copy .env.example .env
```

Update the `.env` file with your configuration, then start the server:
```bash
uvicorn main:app --reload
```

### Environment Variables
Create a `.env` file in the backend directory:
```env
SECRET_KEY=your-secret-key
POSTGRES_SERVER=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=cardio_db
```

## API Documentation
Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Database Initialization
The database is automatically initialized when using Docker Compose. For manual initialization:
```bash
python -m app.db.init_db
```

## Services

### Tabular Prediction Service
Processes patient data (age, gender, blood pressure, etc.) to predict cardiovascular risk using a trained machine learning model.

### ECG Prediction Service
Analyzes ECG signals to detect arrhythmias and other cardiac abnormalities.

### Visualization Service
Generates visual representations of ECG signals with highlighted abnormalities.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License
MIT License
