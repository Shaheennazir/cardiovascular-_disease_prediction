from sqlalchemy import create_engine
from app.db.base import Base
from app.core.config import settings

def init_db():
    """Initialize the database"""
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully!")