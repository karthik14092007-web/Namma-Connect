from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any

from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user, require_admin
from backend.app.services import admin_service

router = APIRouter(tags=["Admin"])


@router.get("/analytics")
@router.get("/metrics")
def get_analytics(
    current_user: dict = Depends(require_admin),
    db: Session = Depends(get_db)
):
    metrics = admin_service.get_admin_metrics(db)
    return {
        "success": True,
        **metrics
    }


@router.get("/users")
def list_users(
    page: int = 1,
    limit: int = 20,
    current_user: dict = Depends(require_admin),
    db: Session = Depends(get_db)
):
    users_data = admin_service.list_users(db, page=page, limit=limit)
    return {
        "success": True,
        **users_data
    }
