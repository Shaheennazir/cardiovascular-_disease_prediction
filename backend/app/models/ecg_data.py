from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.dialects.postgresql import JSON
from app.db.base import Base

class EcgData(Base):
    __tablename__ = "ecg_data"
    
    prediction_id = Column(String, ForeignKey("predictions.id"), primary_key=True)
    file_path = Column(Text, nullable=False)
    file_name = Column(String(100), nullable=False)
    file_size = Column(Integer, nullable=False)
    processed_signal = Column(JSON)
    abnormalities = Column(JSON)