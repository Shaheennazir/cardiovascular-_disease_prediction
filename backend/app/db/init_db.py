from sqlalchemy import create_engine
from app.db.base import Base
from app.core.config import settings
from app.core import get_logger

logger = get_logger(__name__)

def init_db():
    """Initialize the database"""
    logger.info("Initializing database", database_uri=settings.SQLALCHEMY_DATABASE_URI)
    try:
        engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
        Base.metadata.create_all(bind=engine)
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error("Error initializing database", error=str(e), exc_info=True)
        raise

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully!")