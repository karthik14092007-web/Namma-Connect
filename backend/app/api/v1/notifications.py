from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any

from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user
from backend.app.services import notification_service

router = APIRouter(tags=["Notifications"])


@router.get("")
@router.get("/")
def list_notifications(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):

    result = notification_service.get_user_notifications(db, current_user["id"])
    return {
        "success": True,
        **result
    }


@router.patch("/{id}/read")
def mark_notification_read(id: str, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    notif = notification_service.mark_notification_as_read(db, current_user["id"], id)
    return {
        "success": True,
        "notification": notif
    }


@router.post("/mark-all-read")
def mark_all_read(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    result = notification_service.mark_all_as_read(db, current_user["id"])
    return {
        "success": True,
        **result
    }
