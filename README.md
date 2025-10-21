# Cardiovascular Disease Prediction System

## Overview
This project is a comprehensive cardiovascular disease prediction system that combines machine learning models with a modern web interface to predict cardiovascular risks and detect arrhythmias from ECG signals.

## Features
- **Tabular Data Prediction**: Analyzes patient data (age, gender, blood pressure, cholesterol, etc.) to predict cardiovascular disease risk
- **ECG Signal Analysis**: Processes ECG files to detect arrhythmias and other cardiac abnormalities
- **Confidence Scoring**: Provides confidence levels for all predictions
- **Detailed Explanations**: Offers feature importance analysis and personalized recommendations
- **ECG Visualization**: Generates visual representations of ECG signals with highlighted abnormalities
- **User Authentication**: Secure user registration and login system
- **Prediction History**: Stores and retrieves previous predictions

## Tech Stack
### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ML Libraries**: TensorFlow/Keras, Scikit-learn, SHAP
- **Visualization**: Plotly
- **Authentication**: JWT

### Frontend
- **Framework**: React.js
- **Styling**: CSS3
- **API Communication**: Fetch API

### Deployment
- **Containerization**: Docker, Docker Compose

## Project Structure
```
.
├── backend/              # Backend service
│   ├── app/              # Application code
│   ├── models/           # ML models (mounted from host)
│   ├── uploads/          # Uploaded files and visualizations
│   ├── main.py           # Application entry point
│   ├── requirements.txt  # Python dependencies
│   └── Dockerfile        # Docker configuration
├── frontend/             # Frontend application
│   ├── public/           # Static assets
│   ├── src/              # Source code
│   ├── Dockerfile        # Docker configuration
│   └── package.json      # Dependencies and scripts
├── datasets/             # Training datasets
├── models/               # Trained ML models
├── docker-compose.yml    # Docker Compose configuration
└── README.md             # This file
```

## Setup Instructions

### Prerequisites
- Docker and Docker Compose
- Git

### Quick Start
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cardiovascular-disease-prediction
   ```

2. Start the application:
   ```bash
   docker-compose up --build
   ```

3. Access the applications:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Development Setup
#### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## API Documentation
When the backend is running, you can access the interactive API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Database
The system uses PostgreSQL for data storage. The database is automatically initialized when using Docker Compose.

## Models
The system includes two pre-trained machine learning models:
- `best_tabular_model.pkl`: For tabular patient data prediction
- `best_ecg_model.h5`: For ECG signal analysis
- `tabular_scaler.pkl`: For scaling tabular input data

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License
MIT License

## Authors
- Kilo Code - Initial work

## Acknowledgments
- PhysioNet for ECG datasets
- Scikit-learn and TensorFlow communities
- FastAPI and React.js teams