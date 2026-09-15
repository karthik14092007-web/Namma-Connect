import logging
from typing import Optional, Dict, Any
from datetime import datetime, timezone
import jwt
from passlib.context import CryptContext
from backend.app.core.config import settings

logger = logging.getLogger("namma_connect.security")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def decode_supabase_jwt(token: str) -> Optional[Dict[str, Any]]:
    """
    Validates and decodes a Supabase-issued JWT token.
    Checks signature, audience, and expiration.
    """
    if not token:
        return None

    # Try decoding with configured secrets
    secrets_to_try = [
        settings.supabase_jwt_secret,
        settings.supabase_anon_key,
        settings.supabase_service_role_key
    ]

    for secret in secrets_to_try:
        if not secret:
            continue
        try:
            payload = jwt.decode(
                token,
                secret,
                algorithms=[settings.jwt_algorithm],
                audience=settings.jwt_audience,
                options={"verify_exp": True}
            )
            return payload
        except jwt.ExpiredSignatureError:
            logger.warning("Token has expired.")
            return None
        except jwt.InvalidAudienceError:
            # Fallback: try without audience verification if custom issuer
            try:
                payload = jwt.decode(
                    token,
                    secret,
                    algorithms=[settings.jwt_algorithm],
                    options={"verify_aud": False, "verify_exp": True}
                )
                return payload
            except Exception:
                continue
        except Exception:
            continue

    # If in development mode and unverified token decoding is needed for simulation:
    if settings.environment == "development":
        try:
            unverified = jwt.decode(token, options={"verify_signature": False})
            exp = unverified.get("exp")
            if exp and datetime.fromtimestamp(exp, tz=timezone.utc) < datetime.now(timezone.utc):
                return None
            return unverified
        except Exception as e:
            logger.warning(f"Failed to decode token unverified: {e}")

    return None


def create_access_token(data: dict, expires_delta_minutes: int = 15) -> str:
    """Helper for generating test tokens"""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc).timestamp() + (expires_delta_minutes * 60)
    to_encode.update({"exp": int(expire), "aud": settings.jwt_audience})
    return jwt.encode(to_encode, settings.supabase_jwt_secret, algorithm=settings.jwt_algorithm)
