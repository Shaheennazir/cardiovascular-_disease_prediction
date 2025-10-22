from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
import jwt
from jwt.exceptions import InvalidTokenError
from app.core.config import settings
from app.core import get_logger

logger = get_logger(__name__)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    logger.debug("Hashing password", password_length=len(password))
    # Truncate password to 72 bytes to avoid bcrypt limitation
    # Using encode/decode to handle multi-byte characters properly
    if len(password.encode('utf-8')) > 72:
        # Truncate at character boundary to avoid cutting multi-byte characters
        truncated = password.encode('utf-8')[:72].decode('utf-8', errors='ignore')
        logger.debug("Password truncated due to bcrypt limitation", original_length=len(password), truncated_length=len(truncated))
        hashed = pwd_context.hash(truncated)
    else:
        hashed = pwd_context.hash(password)
    logger.debug("Password hashed successfully")
    return hashed

def verify_password(plain_password: str, hashed_password: str) -> bool:
    logger.debug("Verifying password", plain_password_length=len(plain_password))
    result = pwd_context.verify(plain_password, hashed_password)
    logger.debug("Password verification completed", result=result)
    return result

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    logger.debug("Creating access token", data_keys=list(data.keys()))
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    logger.debug("Token expiration set", expire=str(expire))
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
    logger.debug("Access token created successfully")
    return encoded_jwt

def decode_access_token(token: str):
    logger.debug("Decoding access token", token_length=len(token))
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        logger.debug("Token decoded successfully", payload_keys=list(payload.keys()) if payload else [])
        return payload
    except InvalidTokenError as e:
        logger.warning("Invalid token error", error=str(e))
        return None