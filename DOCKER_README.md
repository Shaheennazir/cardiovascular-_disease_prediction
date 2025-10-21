# Docker Setup Guide

This guide explains how to set up and run the Cardiovascular Disease Prediction application using Docker.

## Prerequisites

- Docker Engine 20.10+ installed
- Docker Compose 1.29+ installed

## Project Structure

```
cardiovascular-disease-prediction/
├── backend/
│   ├── Dockerfile
│   └── ...
├── frontend/
│   ├── Dockerfile
│   └── ...
├── models/
├── datasets/
└── docker-compose.yml
```

## Services Overview

The application consists of three main services:

1. **Backend Service**: Python/FastAPI application serving the API
2. **Frontend Service**: React application providing the user interface
3. **Database**: SQLite database for storing user data and predictions

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cardiovascular-disease-prediction
   ```

2. Build and start all services:
   ```bash
   docker-compose up --build
   ```

3. Access the applications:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Backend API Docs: http://localhost:8000/docs

4. To stop the services:
   ```bash
   docker-compose down
   ```

## Docker Compose Configuration

The `docker-compose.yml` file defines three services:

### Backend Service
- Built from `backend/Dockerfile`
- Runs on port 8000
- Uses SQLite database stored in a Docker volume
- Mounts `models/` and `datasets/` directories as volumes
- Sets CORS to allow requests from the frontend

### Frontend Service
- Built from `frontend/Dockerfile`
- Runs on port 3000
- Connects to backend at `http://backend:8000`
- Mounts the frontend directory for development

### Volumes
- `backend_uploads`: Stores uploaded ECG files
- `backend_db`: Stores the SQLite database file

## Development Workflow

### Running in Development Mode

To run the services in development mode with live reloading:

```bash
docker-compose up --build
```

Changes to the source code will be reflected in the running containers.

### Running Specific Services

To run only the backend service:
```bash
docker-compose up --build backend
```

To run only the frontend service:
```bash
docker-compose up --build frontend
```

### Accessing Containers

To access the backend container shell:
```bash
docker-compose exec backend sh
```

To access the frontend container shell:
```bash
docker-compose exec frontend sh
```

## Environment Variables

### Backend
The backend service uses the following environment variables (configured in `docker-compose.yml`):
- `DATABASE_URL`: Database connection string
- `BACKEND_CORS_ORIGINS`: Allowed CORS origins

### Frontend
The frontend service uses the following environment variable:
- `REACT_APP_API_BASE_URL`: Backend API URL

## Data Persistence

Data is persisted through Docker volumes:
- User uploads are stored in the `backend_uploads` volume
- Database files are stored in the `backend_db` volume

To view volumes:
```bash
docker volume ls
```

To remove volumes (warning: this will delete all data):
```bash
docker-compose down -v
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Make sure ports 3000 and 8000 are not being used by other applications.

2. **Permission denied errors**: Ensure Docker has the necessary permissions to access the project directories.

3. **Connection refused errors**: Check that all services are running:
   ```bash
   docker-compose ps
   ```

### Viewing Logs

To view logs for all services:
```bash
docker-compose logs
```

To view logs for a specific service:
```bash
docker-compose logs backend
```

### Rebuilding Images

To rebuild all images:
```bash
docker-compose build --no-cache
```

To rebuild a specific service:
```bash
docker-compose build backend
```

## Production Considerations

For production deployment, consider the following:

1. Use a production-grade database (PostgreSQL, MySQL) instead of SQLite
2. Configure proper SSL certificates
3. Set strong secret keys for JWT tokens
4. Use environment-specific configuration files
5. Implement proper backup strategies for volumes
6. Use resource limits for containers
7. Set up monitoring and alerting

## Useful Docker Commands

- List running containers: `docker ps`
- Stop all containers: `docker stop $(docker ps -aq)`
- Remove all containers: `docker rm $(docker ps -aq)`
- Remove all images: `docker rmi $(docker images -q)`
- Clean up unused resources: `docker system prune -a`