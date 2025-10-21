from sqlalchemy import Column, Integer, ForeignKey, String
from app.db.base import Base

class TabularData(Base):
    __tablename__ = "tabular_data"
    
    prediction_id = Column(String, ForeignKey("predictions.id"), primary_key=True)
    age = Column(Integer, nullable=False)
    gender = Column(Integer, nullable=False)
    height = Column(Integer, nullable=False)
    weight = Column(Integer, nullable=False)
    ap_hi = Column(Integer, nullable=False)
    ap_lo = Column(Integer, nullable=False)
    cholesterol = Column(Integer, nullable=False)
    gluc = Column(Integer, nullable=False)
    smoke = Column(Integer, nullable=False)
    alco = Column(Integer, nullable=False)
    active = Column(Integer, nullable=False)