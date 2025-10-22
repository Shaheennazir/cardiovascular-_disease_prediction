from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.base import Base

class Visualization(Base):
    __tablename__ = "visualizations"
    
    id = Column(Integer, primary_key=True, index=True)
    prediction_id = Column(String, ForeignKey("predictions.id"))
    file_path = Column(String, nullable=False)
    file_type = Column(String(20), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())