# API Specification for Cardiovascular Disease Prediction

## Overview
This document defines the RESTful API endpoints for the cardiovascular disease prediction system, covering authentication, tabular data prediction, ECG signal analysis, visualization, and history management.

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication Endpoints

### POST /auth/register
Register a new user account

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "created_at": "datetime"
}
```

### POST /auth/login
Authenticate user and return access token

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "access_token": "string",
  "token_type": "string",
  "user_id": "integer"
}
```

## Tabular Prediction Endpoints

### POST /predict/tabular
Submit patient data for cardiovascular disease prediction

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "age": "integer",
  "gender": "integer", // 1: Male, 2: Female
  "height": "integer",
  "weight": "integer",
  "ap_hi": "integer",
  "ap_lo": "integer",
  "cholesterol": "integer", // 1: Normal, 2: Above Normal, 3: Well Above Normal
  "gluc": "integer", // 1: Normal, 2: Above Normal, 3: Well Above Normal
  "smoke": "integer", // 0: No, 1: Yes
  "alco": "integer", // 0: No, 1: Yes
  "active": "integer" // 0: No, 1: Yes
}
```

**Response:**
```json
{
  "prediction_id": "string",
  "risk_level": "string", // "Low Risk" or "High Risk"
  "probability": "number", // 0.0 - 1.0
  "confidence": "number", // 0.0 - 1.0
  "explanation": {
    "summary": "string",
    "feature_importance": [
      {
        "feature": "string",
        "importance": "number"
      }
    ],
    "recommendations": ["string"]
  },
  "created_at": "datetime"
}
```

## ECG Prediction Endpoints

### POST /predict/ecg
Upload ECG file for arrhythmia detection

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
file: ECG data file (.dat)
```

**Response:**
```json
{
  "prediction_id": "string",
  "result": "string", // e.g., "Arrhythmia Detected"
  "classification": "string", // Specific arrhythmia type
  "probabilities": {
    "normal": "number",
    "afib": "number",
    "pvc": "number",
    "other": "number"
  },
  "confidence": "number", // 0.0 - 1.0
  "explanation": {
    "summary": "string",
    "abnormal_segments": [
      {
        "start_time": "number",
        "end_time": "number",
        "description": "string"
      }
    ],
    "recommendations": ["string"]
  },
  "visualization_url": "string", // URL to access ECG visualization
  "created_at": "datetime"
}
```

### GET /ecg/{prediction_id}/visualization
Retrieve ECG signal visualization

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```
Returns PNG image of ECG signal with highlighted abnormalities
```

## History Endpoints

### GET /history
Retrieve user's prediction history

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
limit: integer (default: 10)
offset: integer (default: 0)
type: string (optional: "tabular" or "ecg")
```

**Response:**
```json
{
  "predictions": [
    {
      "id": "string",
      "type": "string", // "tabular" or "ecg"
      "result": "string",
      "confidence": "number",
      "created_at": "datetime"
    }
  ],
  "total": "integer"
}
```

### GET /history/{prediction_id}
Retrieve specific prediction details

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "string",
  "type": "string", // "tabular" or "ecg"
  "input_data": "object", // Original input data
  "result": "object", // Full prediction result
  "created_at": "datetime"
}
```

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request**
```json
{
  "error": "string",
  "details": "string"
}
```

**401 Unauthorized**
```json
{
  "error": "Unauthorized",
  "message": "string"
}
```

**404 Not Found**
```json
{
  "error": "Not Found",
  "message": "string"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal Server Error",
  "message": "string"
}