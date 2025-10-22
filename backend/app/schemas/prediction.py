from pydantic import BaseModel
from typing import Dict, List, Optional, Union
from datetime import datetime
import uuid

class TabularDataInput(BaseModel):
    age: int
    gender: int  # 1: Male, 2: Female
    height: int
    weight: int
    ap_hi: int
    ap_lo: int
    cholesterol: int  # 1: Normal, 2: Above Normal, 3: Well Above Normal
    gluc: int  # 1: Normal, 2: Above Normal, 3: Well Above Normal
    smoke: int  # 0: No, 1: Yes
    alco: int  # 0: No, 1: Yes
    active: int  # 0: No, 1: Yes

class TabularPredictionResult(BaseModel):
    prediction_id: str
    risk_level: str
    probability: float
    confidence: float
    explanation: Dict
    created_at: datetime

class EcgPredictionResult(BaseModel):
    prediction_id: str
    result: str
    classification: str
    probabilities: Dict[str, float]
    confidence: float
    explanation: Dict
    visualization_url: str = ""
    created_at: datetime

class PredictionHistoryItem(BaseModel):
    id: str
    type: str
    result: str
    confidence: float
    created_at: datetime

class PredictionHistoryResponse(BaseModel):
    predictions: List[PredictionHistoryItem]
    total: int