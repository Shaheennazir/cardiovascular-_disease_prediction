from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.api.v1 import api_router
from app.core.config import settings
from app.db.init_db import init_db
from app.db.base import engine, Base
from app.core import get_logger

# Initialize logger
logger = get_logger(__name__)

try:
    # Initialize database
    Base.metadata.create_all(bind=engine)
    logger.info("Database initialized successfully")
except Exception as e:
    logger.error("Failed to initialize database", error=str(e))
    raise

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    logger.info("Root endpoint accessed")
    return {"message": "Cardiovascular Disease Prediction API"}

@app.get("/health")
async def health_check():
    logger.info("Health check endpoint accessed")
    return {"status": "healthy"}

@app.on_event("startup")
async def startup_event():
    logger.info("Application startup",
              app_name=settings.PROJECT_NAME,
              api_version=settings.API_V1_STR)

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Application shutdown")

if __name__ == "__main__":
    logger.info("Starting application server")
    uvicorn.run(app, host="0.0.0.0", port=8000)