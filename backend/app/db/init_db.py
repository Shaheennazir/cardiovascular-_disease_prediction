from sqlalchemy import create_engine, inspect, text
from app.db.base import Base
from app.core.config import settings
from app.core import get_logger
from app.models.user import User

logger = get_logger(__name__)

def init_db():
    """Initialize the database"""
    logger.info("Initializing database", database_uri=settings.SQLALCHEMY_DATABASE_URI)
    try:
        engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
        
        # Create all tables
        Base.metadata.create_all(bind=engine)
        
        # Specifically handle User table updates
        inspector = inspect(engine)
        existing_columns = [col['name'] for col in inspector.get_columns('users')]
        
        if 'is_active' not in existing_columns:
            # Add the is_active column to existing users table
            with engine.connect() as conn:
                # For SQLite, we need to add the column directly
                conn.execute(text("ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT 1"))
                conn.commit()
            logger.info("Added is_active column to users table")
        
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error("Error initializing database", error=str(e), exc_info=True)
        raise

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully!")