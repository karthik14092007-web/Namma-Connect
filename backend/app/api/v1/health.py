from fastapi import APIRouter
from backend.app.core.database import check_database_connection

router = APIRouter(tags=["Health"])


@router.get("/health")
def get_health():
    is_db_connected = check_database_connection()
    if is_db_connected:
        return {
            "success": True,
            "status": "healthy",
            "service": "namma-connect-api",
            "database": "connected"
        }
    else:
        return {
            "success": False,
            "status": "degraded",
            "service": "namma-connect-api",
            "database": "disconnected"
        }
