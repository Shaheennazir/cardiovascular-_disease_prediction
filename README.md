# Cardiovascular Disease Prediction System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.9%2B-blue)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)

## Overview

This project is a comprehensive cardiovascular disease prediction system that combines machine learning models with a modern web interface to predict cardiovascular risks and detect arrhythmias from ECG signals. The system provides accurate predictions with confidence scoring and detailed explanations to help medical professionals make informed decisions.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Machine Learning Models](#machine-learning-models)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## Features

### Tabular Data Prediction
Analyzes patient data (age, gender, blood pressure, cholesterol, etc.) to predict cardiovascular disease risk with:
- Confidence scoring for predictions
- Feature importance analysis using SHAP
- Personalized health recommendations
- Risk factor explanations

### ECG Signal Analysis
Processes ECG files to detect arrhythmias and other cardiac abnormalities:
- Multi-class arrhythmia classification
- Abnormality localization
- Confidence scoring for each detection
- Detailed abnormality explanations

### Visualization
Generates visual representations of ECG signals with highlighted abnormalities:
- Interactive ECG waveform plots
- Abnormality markers and annotations
- Comparison views for historical data

### User Management
Secure user registration and login system with:
- JWT-based authentication
- Password encryption
- Session management
- User profile management

### Prediction History
Stores and retrieves previous predictions:
- Complete prediction history
- Trend analysis over time
- Exportable reports
- Comparison tools

## Architecture

The system follows a microservices architecture with separate frontend and backend services:

```
┌─────────────────┐    HTTP/REST API    ┌──────────────────┐
│   Frontend      │◄────────────────────►│   Backend        │
│   (React.js)    │                     │   (FastAPI)      │
└─────────────────┘                     └─────────┬────────┘
                                                  │
                                                  ▼
                                          ┌──────────────────┐
                                          │   PostgreSQL     │
                                          │   Database       │
                                          └──────────────────┘
```

### Backend Components
- **API Layer**: FastAPI-based RESTful API with automatic documentation
- **Business Logic**: Services for prediction, visualization, and data processing
- **Data Access**: SQLAlchemy ORM for database interactions
- **ML Services**: Integration with TensorFlow/Keras and Scikit-learn models
- **Security**: JWT authentication and password hashing

### Frontend Components
- **UI Framework**: React.js with functional components and hooks
- **State Management**: Built-in React state management
- **API Client**: Custom service layer for backend communication
- **Visualization**: Integration with backend visualization services

## Tech Stack

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **ML Libraries**: [TensorFlow/Keras](https://www.tensorflow.org/), [Scikit-learn](https://scikit-learn.org/), [SHAP](https://shap.readthedocs.io/)
- **Visualization**: [Plotly](https://plotly.com/python/)
- **Authentication**: [JWT](https://jwt.io/), [PassLib](https://passlib.readthedocs.io/)
- **Data Processing**: [NumPy](https://numpy.org/), [Pandas](https://pandas.pydata.org/), [WFDB](https://github.com/MIT-LCP/wfdb-python)

### Frontend
- **Framework**: [React.js](https://reactjs.org/)
- **Styling**: CSS3 with modular approach
- **API Communication**: Fetch API
- **Build Tool**: Webpack via Create React App

### Infrastructure
- **Containerization**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
- **Deployment**: Platform agnostic (can be deployed on cloud or on-premise)

## Project Structure

```
.
├── backend/                    # Backend service
│   ├── app/                   # Application code
│   │   ├── api/               # API routes and endpoints
│   │   ├── core/              # Core configuration and security
│   │   ├── db/                # Database configuration and initialization
│   │   ├── models/            # Database models
│   │   ├── schemas/           # Pydantic schemas for validation
│   │   └── services/          # Business logic and ML services
│   ├── models/                # ML models (mounted from host)
│   ├── uploads/               # Uploaded files and generated visualizations
│   ├── main.py                # Application entry point
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile             # Docker configuration
├── frontend/                  # Frontend application
│   ├── public/                # Static assets
│   ├── src/                   # Source code
│   │   ├── components/        # React components
│   │   ├── services/          # API service layer
│   │   ├── App.js             # Main application component
│   │   ├── App.css            # Application styles
│   │   └── index.js           # Entry point
│   ├── Dockerfile             # Docker configuration
│   └── package.json           # Dependencies and scripts
├── datasets/                  # Training datasets
├── models/                    # Trained ML models
├── docker-compose.yml         # Docker Compose configuration
├── .gitignore                 # Git ignore rules
└── README.md                  # This file

Environment example files:
├── backend/.env.example       # Backend environment variables example
└── frontend/.env.example      # Frontend environment variables example
```

## Data Flow

1. **User Authentication**
   - User registers/logs in through frontend
   - Frontend sends credentials to backend `/auth` endpoint
   - Backend validates credentials and returns JWT token
   - Frontend stores token for subsequent requests

2. **Tabular Data Prediction**
   - User fills patient data form in frontend
   - Frontend sends data to backend `/prediction/tabular` endpoint
   - Backend validates and preprocesses data
   - ML model generates prediction with confidence score
   - SHAP explains feature importance
   - Results returned to frontend for display

3. **ECG Analysis**
   - User uploads ECG file through frontend
   - Frontend sends file to backend `/prediction/ecg` endpoint
   - Backend processes ECG signal using WFDB library
   - ML model analyzes signal for arrhythmias
   - Visualization service generates ECG plot
   - Results with visualization returned to frontend

4. **History Management**
   - Predictions automatically saved to database
   - User can retrieve history through `/history` endpoint
   - Backend queries database and formats results
   - Frontend displays prediction timeline

## Setup Instructions

### Prerequisites
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)
- At least 8GB RAM (for ML model loading)

### Environment Files

Copy the example environment files and customize them for your setup:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Edit these files with your specific configuration values.

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

#### Backend Development
```bash
cd backend
# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
# Run development server
uvicorn main:app --reload
```

Environment variables for backend development (see [backend/.env.example](backend/.env.example)):
```env
SECRET_KEY=your-secret-key-here
POSTGRES_SERVER=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=cardio_db
```

#### Frontend Development
```bash
cd frontend
# Install dependencies
npm install
# Run development server
npm start
```

Environment variables for frontend development (see [frontend/.env.example](frontend/.env.example)):
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
```

### Database Initialization

When using Docker Compose, the database is automatically initialized. For manual initialization:
```bash
cd backend
python -m app.db.init_db
```

## API Documentation

When the backend is running, you can access the interactive API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

Key API endpoints:
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/prediction/tabular` - Tabular data prediction
- `POST /api/v1/prediction/ecg` - ECG analysis
- `GET /api/v1/history/` - Prediction history
- `GET /api/v1/visualization/{prediction_id}` - ECG visualization

## Database Schema

The system uses PostgreSQL with the following main tables:

- **users**: User account information
- **predictions**: Prediction results and metadata
- **tabular_data**: Patient data for tabular predictions
- **ecg_data**: ECG file metadata and processing info
- **visualizations**: Generated visualization metadata

For detailed schema information, see [database_schema.md](database_schema.md).

## Machine Learning Models

The system includes pre-trained machine learning models:

### Tabular Prediction Model
- **File**: `best_tabular_model.pkl`
- **Type**: Gradient Boosting Classifier
- **Features**: Age, gender, height, weight, blood pressure, cholesterol, glucose levels, smoking status
- **Performance**: ~85% accuracy on test set

### ECG Analysis Model
- **File**: `best_ecg_model.h5`
- **Type**: Convolutional Neural Network
- **Input**: Processed ECG segments
- **Classes**: Normal, PVC, APC, VEB, VFB, RBBB, LBBB
- **Performance**: ~92% accuracy on test set

### Preprocessing Objects
- **File**: `tabular_scaler.pkl` - Standard scaler for tabular data normalization

Models are stored in the `models/` directory and mounted to the backend container.

## Development

### Backend Development Guidelines

1. **Code Structure**: Follow the existing module structure in `backend/app/`
2. **API Endpoints**: Add new endpoints in `backend/app/api/v1/endpoints/`
3. **Database Models**: Define new models in `backend/app/models/`
4. **Services**: Implement business logic in `backend/app/services/`
5. **Validation**: Use Pydantic schemas in `backend/app/schemas/`

### Frontend Development Guidelines

1. **Component Structure**: Create reusable components in `frontend/src/components/`
2. **Service Layer**: Add API calls in `frontend/src/services/`
3. **State Management**: Use React hooks for component state
4. **Styling**: Use CSS modules for component-specific styles

### Testing

Backend tests are located in `backend/tests/` (if they exist):
```bash
cd backend
pytest
```

Frontend tests are located in `frontend/src/` with `.test.js` extensions:
```bash
cd frontend
npm test
```

### Code Quality

- **Backend**: Follow PEP 8 style guide
- **Frontend**: Follow Airbnb JavaScript style guide
- **Documentation**: Keep docstrings and comments up to date

## Deployment

### Docker Compose Deployment

The recommended deployment method is using Docker Compose:

```bash
# Production build
docker-compose up --build -d
```

### Environment Configuration

For production deployment, update the environment variables in `docker-compose.yml`:
- Change default passwords
- Set strong SECRET_KEY
- Configure appropriate resource limits

### Scaling Considerations

- **Database**: Can be scaled independently
- **Backend**: Multiple instances behind load balancer
- **Frontend**: Static files can be served by CDN
- **ML Models**: Consider GPU acceleration for heavy workloads

## Contributing

We welcome contributions to improve the Cardiovascular Disease Prediction System!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

Please ensure your code follows the existing style and includes appropriate tests.

### Development Roadmap

See [technical_specification.md](technical_specification.md) for planned features and improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- **Kilo Code** - Initial work

See also the list of [contributors](https://github.com/your-repo/contributors) who participated in this project.

## Acknowledgments

- [PhysioNet](https://physionet.org/) for ECG datasets
- [Scikit-learn](https://scikit-learn.org/) and [TensorFlow](https://www.tensorflow.org/) communities
- [FastAPI](https://fastapi.tiangolo.com/) and [React.js](https://reactjs.org/) teams
- Medical professionals who provided domain expertise