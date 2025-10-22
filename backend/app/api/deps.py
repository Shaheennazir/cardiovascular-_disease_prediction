from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError
from app.db.base import get_db
from app.models.user import User
from app.core.security import decode_access_token
from app.core import get_logger

logger = get_logger(__name__)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    logger.info("Validating user credentials", token_length=len(token) if token else 0)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_access_token(token)
        if payload is None:
            logger.warning("Invalid token payload")
            raise credentials_exception
        user_id: str = payload.get("sub")
        if user_id is None:
            logger.warning("User ID not found in token payload")
            raise credentials_exception
    except JWTError as e:
        logger.error("JWT decoding error", error=str(e))
        raise credentials_exception
    
    logger.debug("Querying user from database", user_id=user_id)
    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        logger.warning("User not found in database", user_id=user_id)
        raise credentials_exception
    logger.info("User authenticated successfully", user_id=user.id, username=user.username)
    return user

def get_current_active_user(current_user: User = Depends(get_current_user)):
    logger.debug("Checking if user is active", user_id=current_user.id, is_active=current_user.is_active)
    if not current_user.is_active:
        logger.warning("Inactive user attempted to access protected resource", user_id=current_user.id)
        raise HTTPException(status_code=400, detail="Inactive user")
    logger.info("Active user granted access", user_id=current_user.id, username=current_user.username)
    return current_user