from fastapi import APIRouter

from app.api.v1.endpoints import auth, prediction, visualization, history

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(prediction.router, prefix="/predict", tags=["prediction"])
api_router.include_router(visualization.router, prefix="/ecg", tags=["visualization"])
api_router.include_router(history.router, prefix="/history", tags=["history"])