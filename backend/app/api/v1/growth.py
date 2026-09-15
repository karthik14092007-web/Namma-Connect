from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user, check_resource_ownership
from backend.app.services import growth_service
from backend.app.models.business import Business

router = APIRouter(tags=["Growth Plan"])


@router.get("/{id}")
def get_growth_plan(id: str, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    # Verify business ownership or return user's growth plan
    biz = db.query(Business).filter(Business.founder_id == current_user["id"]).first() if db else None
    biz_id = biz.id if biz else "biz-kavya-1"
    brand_name = biz.name if biz else "Namma Crunch"

    plan = growth_service.get_or_create_growth_plan(db, biz_id, brand_name)
    return {
        "success": True,
        "growthPlan": plan
    }


@router.post("/{id}/actions/{action_id}/complete")
def update_action(id: str, action_id: str, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    result = growth_service.update_action_status(db, action_id, "COMPLETED")
    return {
        "success": True,
        **result
    }
