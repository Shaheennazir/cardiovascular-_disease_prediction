from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List
from app.db.base import get_db
from app.api.deps import get_current_active_user
from app.models.user import User
from app.models.prediction import Prediction
from app.schemas.prediction import PredictionHistoryItem, PredictionHistoryResponse

router = APIRouter()

@router.get("/", response_model=PredictionHistoryResponse)
async def get_prediction_history(
    limit: int = Query(10, le=100),
    offset: int = Query(0),
    type: str = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Retrieve user's prediction history"""
    try:
        # Build query
        query = db.query(Prediction).filter(Prediction.user_id == current_user.id)
        
        # Filter by type if specified
        if type:
            query = query.filter(Prediction.type == type)
        
        # Get total count
        total = query.count()
        
        # Apply pagination and ordering
        predictions = query.order_by(desc(Prediction.created_at)).offset(offset).limit(limit).all()
        
        # Convert to response format
        history_items = []
        for pred in predictions:
            # Extract result summary from result_data
            result_summary = "Prediction result"
            if isinstance(pred.result_data, dict):
                if "risk_level" in pred.result_data:
                    result_summary = pred.result_data["risk_level"]
                elif "classification" in pred.result_data:
                    result_summary = pred.result_data["classification"]
                elif "result" in pred.result_data:
                    result_summary = pred.result_data["result"]
            
            history_item = PredictionHistoryItem(
                id=str(pred.id),
                type=pred.type,
                result=result_summary,
                confidence=pred.confidence_score,
                created_at=pred.created_at
            )
            history_items.append(history_item)
        
        return PredictionHistoryResponse(
            predictions=history_items,
            total=total
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving prediction history: {str(e)}"
        )

@router.get("/{prediction_id}")
async def get_prediction_detail(
    prediction_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Retrieve specific prediction details"""
    try:
        # Check if prediction exists and belongs to user
        prediction = db.query(Prediction).filter(
            Prediction.id == prediction_id,
            Prediction.user_id == current_user.id
        ).first()
        
        if not prediction:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Prediction not found"
            )
        
        return prediction
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving prediction details: {str(e)}"
        )