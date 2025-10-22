from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import Dict, Any
import uuid
import os
from app.db.base import get_db
from app.api.deps import get_current_active_user
from app.models.user import User
from app.models.prediction import Prediction
from app.models.tabular_data import TabularData
from app.models.ecg_data import EcgData
from app.schemas.prediction import TabularDataInput, TabularPredictionResult, EcgPredictionResult
from app.services.tabular_service import tabular_service
from app.services.ecg_service import ecg_service
from app.services.visualization_service import visualization_service
from app.core import get_logger

logger = get_logger(__name__)

router = APIRouter()

@router.post("/tabular", response_model=TabularPredictionResult)
async def predict_tabular(
    input_data: TabularDataInput,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Submit patient data for cardiovascular disease prediction"""
    logger.info("Tabular prediction request received",
                 user_id=current_user.id,
                 input_data=input_data.dict())
    try:
        # Make prediction
        prediction_result = tabular_service.predict(input_data.dict())
        logger.info("Tabular prediction completed",
                     user_id=current_user.id,
                     prediction_result=prediction_result)
        
        # Generate explanation
        explanation = tabular_service.explain_prediction(input_data.dict())
        prediction_result["explanation"] = explanation
        logger.info("Explanation generated for tabular prediction",
                     user_id=current_user.id)
        
        # Save prediction to database
        prediction_id = str(uuid.uuid4())
        db_prediction = Prediction(
            id=prediction_id,
            user_id=current_user.id,
            type="tabular",
            input_data=input_data.dict(),
            result_data=prediction_result,
            confidence_score=prediction_result["confidence"]
        )
        db.add(db_prediction)
        logger.info("Prediction saved to database",
                     user_id=current_user.id,
                     prediction_id=prediction_id)
        
        # Save tabular data to separate table for easier querying
        db_tabular = TabularData(
            prediction_id=prediction_id,
            age=input_data.age,
            gender=input_data.gender,
            height=input_data.height,
            weight=input_data.weight,
            ap_hi=input_data.ap_hi,
            ap_lo=input_data.ap_lo,
            cholesterol=input_data.cholesterol,
            gluc=input_data.gluc,
            smoke=input_data.smoke,
            alco=input_data.alco,
            active=input_data.active
        )
        db.add(db_tabular)
        logger.info("Tabular data saved to database",
                     user_id=current_user.id,
                     prediction_id=prediction_id)
        
        db.commit()
        db.refresh(db_prediction)
        logger.info("Database transaction committed",
                     user_id=current_user.id,
                     prediction_id=prediction_id)
        
        # Add timestamps to response
        prediction_result["prediction_id"] = prediction_id
        prediction_result["created_at"] = db_prediction.created_at
        
        logger.info("Tabular prediction response sent",
                     user_id=current_user.id,
                     prediction_id=prediction_id)
        return prediction_result
        
    except Exception as e:
        logger.error("Error processing tabular prediction",
                      user_id=current_user.id,
                      error=str(e),
                      exc_info=True)
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing prediction: {str(e)}"
        )

@router.post("/ecg", response_model=EcgPredictionResult)
async def predict_ecg(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Upload ECG file for arrhythmia detection"""
    logger.info("ECG prediction request received",
                 user_id=current_user.id,
                 file_name=file.filename,
                 file_size=getattr(file, 'size', None))
    try:
        # Save uploaded file
        upload_dir = os.path.join("uploads", "ecg_files")
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, f"{uuid.uuid4()}_{file.filename}")
        
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        logger.info("ECG file saved",
                     user_id=current_user.id,
                     file_path=file_path,
                     file_size=len(content))
        
        # Make prediction
        try:
            prediction_result = ecg_service.predict(file_path)
            logger.info("ECG prediction completed",
                         user_id=current_user.id,
                         prediction_result=prediction_result)
        except FileNotFoundError as e:
            logger.error("Missing ECG header file", error=str(e))
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )
        
        # Detect abnormalities
        abnormalities = ecg_service.detect_abnormalities(file_path)
        
        # Generate explanation
        explanation = ecg_service.explain_prediction(prediction_result)
        prediction_result["explanation"] = explanation
        logger.info("Explanation generated for ECG prediction",
                     user_id=current_user.id)
        
        # Generate visualization
        try:
            viz_path = visualization_service.generate_visualization(file_path, abnormalities)
            logger.info("Visualization generated",
                         user_id=current_user.id,
                         viz_path=viz_path)
        except FileNotFoundError as e:
            logger.error("Missing ECG header file for visualization", error=str(e))
            # Continue without visualization if header file is missing
            viz_path = None
        visualization_url = f"/api/v1/ecg/{prediction_id}/visualization" if viz_path else None
        
        # Save prediction to database
        prediction_id = str(uuid.uuid4())
        result_data = prediction_result.copy()
        result_data["visualization_url"] = visualization_url
        result_data["abnormalities"] = abnormalities
        
        db_prediction = Prediction(
            id=prediction_id,
            user_id=current_user.id,
            type="ecg",
            input_data={"file_name": file.filename, "file_size": len(content)},
            result_data=result_data,
            confidence_score=prediction_result["confidence"]
        )
        db.add(db_prediction)
        logger.info("ECG prediction saved to database",
                     user_id=current_user.id,
                     prediction_id=prediction_id)
        
        # Save ECG data to separate table
        db_ecg = EcgData(
            prediction_id=prediction_id,
            file_path=file_path,
            file_name=file.filename,
            file_size=len(content),
            processed_signal=None,  # Would be populated in a real implementation
            abnormalities=abnormalities
        )
        db.add(db_ecg)
        logger.info("ECG data saved to database",
                     user_id=current_user.id,
                     prediction_id=prediction_id)
        
        db.commit()
        db.refresh(db_prediction)
        logger.info("Database transaction committed",
                     user_id=current_user.id,
                     prediction_id=prediction_id)
        
        # Prepare response
        response_data = {
            "prediction_id": prediction_id,
            "result": prediction_result["classification"],
            "classification": prediction_result["classification"],
            "probabilities": prediction_result["probabilities"],
            "confidence": prediction_result["confidence"],
            "explanation": explanation,
            "visualization_url": visualization_url,
            "created_at": db_prediction.created_at
        }
        
        return response_data
        
    except Exception as e:
        logger.error("Error processing ECG prediction",
                      user_id=current_user.id,
                      error=str(e),
                      exc_info=True)
        db.rollback()
        # Clean up uploaded file if saving to DB failed
        if 'file_path' in locals() and os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing ECG prediction: {str(e)}"
        )