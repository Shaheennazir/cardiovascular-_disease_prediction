from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os
from app.db.base import get_db
from app.api.deps import get_current_active_user
from app.models.user import User
from app.models.prediction import Prediction

router = APIRouter()

@router.get("/{prediction_id}/visualization")
async def get_ecg_visualization(
    prediction_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Retrieve ECG signal visualization"""
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
        
        if prediction.type != "ecg":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Visualization only available for ECG predictions"
            )
        
        # In a real implementation, we would retrieve the actual visualization file
        # For now, we'll return a placeholder
        # The actual file path would be stored in the visualizations table
        viz_dir = os.path.join("uploads", "visualizations")
        viz_files = os.listdir(viz_dir) if os.path.exists(viz_dir) else []
        
        if viz_files:
            # Return the first available visualization as a placeholder
            viz_path = os.path.join(viz_dir, viz_files[0])
            if os.path.exists(viz_path):
                return FileResponse(viz_path, media_type='image/png', filename='ecg_visualization.png')
        
        # If no visualization exists, return a placeholder
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visualization not found"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving visualization: {str(e)}"
        )