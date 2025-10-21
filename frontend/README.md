# Cardiovascular Disease Prediction Frontend

## Overview
This is the frontend application for the Cardiovascular Disease Prediction system. It provides a user interface for:
- User authentication (registration and login)
- Submitting patient data for cardiovascular risk prediction
- Uploading ECG files for arrhythmia detection
- Viewing prediction results with explanations and confidence scores
- Accessing prediction history

## Tech Stack
- **Framework**: React.js
- **Styling**: CSS3
- **API Communication**: Fetch API
- **Visualization**: Integration with backend visualization service

## Project Structure
```
frontend/
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # React components
│   ├── services/         # API service layer
│   ├── App.js            # Main application component
│   ├── App.css           # Application styles
│   └── index.js          # Entry point
├── Dockerfile            # Docker configuration
└── package.json          # Dependencies and scripts
```

## Setup Instructions

### Prerequisites
- Node.js 14+
- Docker and Docker Compose (for containerized deployment)

### Installation

1. **Using Docker Compose (Recommended)**:
   ```bash
   docker-compose up --build
   ```

2. **Local Development**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Environment Variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
```

## Features

### Authentication
- User registration with username, email, and password
- Secure login with JWT token handling
- Persistent sessions using localStorage

### Tabular Data Prediction
- Comprehensive form for patient data input
- Real-time prediction with confidence scores
- Detailed explanations of risk factors
- Personalized recommendations

### ECG Analysis
- File upload for ECG data (.dat files)
- Arrhythmia detection with classification
- Abnormality localization and explanation
- ECG signal visualization (via backend service)

### Responsive Design
- Mobile-friendly interface
- Adaptive grid layouts
- Accessible form controls

## Development

### Component Structure
- `App.js`: Main application with authentication flow
- `TabularModel.js`: Patient data prediction interface
- `EcgModel.js`: ECG file upload and analysis interface
- `api.js`: Service layer for backend communication

### Styling
- CSS modules for component-scoped styling
- Responsive grid layouts
- Consistent color scheme and typography

## Deployment
The application can be deployed using Docker Compose along with the backend services.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License
MIT License
