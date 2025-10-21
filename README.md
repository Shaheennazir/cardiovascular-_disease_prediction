# Cardiovascular Disease Prediction System

This system predicts cardiovascular disease risk using both tabular patient data and ECG signals.

## System Architecture

The system consists of two main components:
1. **Backend**: FastAPI application with SQLite database
2. **Frontend**: React application with modern UI components

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm 6+

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   ```bash
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file based on `.env.example` and configure your settings:
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file to set your configuration:
   ```
   PROJECT_NAME=Cardiovascular Disease Prediction API
   SECRET_KEY=your-secret-key-here-change-in-production
   ACCESS_TOKEN_EXPIRE_MINUTES=11520
   DATABASE_URL=sqlite:///./cardio_db.sqlite3
   ```

6. Run the backend server:
   ```bash
   python main.py
   ```

   The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Run the frontend development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

## Docker Setup (Alternative)

You can also run the application using Docker Compose:

1. Build and start the services:
   ```bash
   docker-compose up --build
   ```

2. The backend will be available at `http://localhost:8000`
3. The frontend will be available at `http://localhost:3000`

## Usage

1. Start both the backend and frontend servers as described above
2. Open your browser and navigate to `http://localhost:3000`
3. Register a new account or login with existing credentials
4. Use the "Tabular Prediction" or "ECG Analysis" features to make predictions
5. View your prediction history in the "Prediction History" section

## API Documentation

Once the backend is running, you can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Features

### Tabular Data Prediction
- Predicts cardiovascular disease risk based on patient demographics and health metrics
- Provides risk level, probability, and confidence score
- Offers personalized recommendations based on the prediction

### ECG Analysis
- Analyzes ECG signals for arrhythmias and other cardiac abnormalities
- Provides classification results with probabilities for different conditions
- Generates visualization of ECG waveform (when available)

### Prediction History
- Stores all predictions made by the user
- Allows users to review past predictions and track their health over time
- Displays confidence scores and timestamps for each prediction

## Data Models

### Tabular Data Model
The tabular data model accepts the following fields:
- Age (years)
- Gender (1: Male, 2: Female)
- Height (cm)
- Weight (kg)
- Systolic blood pressure (ap_hi)
- Diastolic blood pressure (ap_lo)
- Cholesterol level (1: Normal, 2: Above Normal, 3: Well Above Normal)
- Glucose level (1: Normal, 2: Above Normal, 3: Well Above Normal)
- Smoking status (0: No, 1: Yes)
- Alcohol consumption (0: No, 1: Yes)
- Physical activity level (0: No, 1: Yes)

### ECG Data Model
The ECG data model accepts .dat files from the MIT-BIH Arrhythmia Database.

## Development

### Backend Development
The backend is built with FastAPI and follows a modular structure:
- `app/api/`: API endpoints
- `app/core/`: Core configuration and security
- `app/db/`: Database models and initialization
- `app/models/`: Pydantic models for data validation
- `app/schemas/`: Database schemas
- `app/services/`: Business logic services

### Frontend Development
The frontend is built with React and follows a component-based structure:
- `src/components/`: Reusable UI components
- `src/components/auth/`: Authentication components
- `src/components/dashboard/`: Dashboard components
- `src/components/layout/`: Layout components
- `src/components/predictions/`: Prediction-related components
- `src/components/ui/`: Basic UI components
- `src/api.js`: API service for backend communication

## Testing

Run the integration test to verify the frontend-backend connection:
```bash
node integration_test.js
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.