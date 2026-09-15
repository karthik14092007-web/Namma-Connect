import logging
from typing import Generator
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from backend.app.core.config import settings

logger = logging.getLogger("namma_connect.database")

Base = declarative_base()

def get_engine_url(url: str) -> str:
    if not url:
        return ""
    # Ensure psycopg driver is specified if raw postgresql:// is provided
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql+psycopg://", 1)
    if url.startswith("postgresql://") and "+psycopg" not in url and "+asyncpg" not in url:
        return url.replace("postgresql://", "postgresql+psycopg://", 1)
    return url

engine = None
SessionLocal = None

if settings.is_database_configured:
    try:
        resolved_url = get_engine_url(settings.database_url)
        engine = create_engine(
            resolved_url,
            pool_size=10,
            max_overflow=20,
            pool_pre_ping=True,
            connect_args={"connect_timeout": 5}
        )
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    except Exception as e:
        logger.error(f"Failed to initialize SQLAlchemy engine: {e}")

def get_db() -> Generator[Session, None, None]:
    if not SessionLocal:
        raise RuntimeError("Database is not configured or unavailable.")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def check_database_connection() -> bool:
    if not engine:
        return False
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return True
    except Exception as e:
        logger.warning(f"Database probe failed: {e}")
        return False
