import re
import socket
import time
import logging
from urllib.parse import urlparse
from typing import Generator, Optional
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
        url = url.replace("postgres://", "postgresql+psycopg://", 1)
    elif url.startswith("postgresql://") and "+psycopg" not in url and "+asyncpg" not in url:
        url = url.replace("postgresql://", "postgresql+psycopg://", 1)

    # Strip schema parameter for psycopg 3 compatibility
    url = re.sub(r'[?&]schema=[^&]+', '', url)
    if '?' in url and url.endswith('?'):
        url = url[:-1]
    return url


engine = None
SessionLocal = None
_db_connected_cache: Optional[bool] = None
_last_probe_time: float = 0.0


def is_socket_open(host: str, port: int, timeout: float = 0.15) -> bool:
    try:
        with socket.create_connection((host, port), timeout=timeout):
            return True
    except Exception:
        return False


if settings.is_database_configured:
    try:
        resolved_url = get_engine_url(settings.database_url)
        engine = create_engine(
            resolved_url,
            pool_size=10,
            max_overflow=20,
            pool_pre_ping=True,
            connect_args={"connect_timeout": 2}
        )
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    except Exception as e:
        logger.error(f"Failed to initialize SQLAlchemy engine: {e}")


def check_database_connection(force: bool = False) -> bool:
    global _db_connected_cache, _last_probe_time
    now = time.time()
    if not force and _db_connected_cache is not None and (now - _last_probe_time) < 10.0:
        return _db_connected_cache

    _last_probe_time = now
    if not engine or not settings.is_database_configured:
        _db_connected_cache = False
        return False

    try:
        parsed = urlparse(settings.database_url)
        host = parsed.hostname or "localhost"
        port = parsed.port or 5432
        if not is_socket_open(host, port, timeout=0.15):
            _db_connected_cache = False
            return False

        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        _db_connected_cache = True
        return True
    except Exception as e:
        _db_connected_cache = False
        logger.warning(f"Database probe failed: {e}")
        return False


def get_db() -> Generator[Optional[Session], None, None]:
    if not SessionLocal:
        yield None
        return

    if not check_database_connection():
        yield None
        return

    try:
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()
    except Exception as e:
        logger.warning(f"Failed to open database session: {e}")
        yield None
