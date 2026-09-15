from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any

from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user, get_optional_current_user, check_resource_ownership
from backend.app.services import campaign_service
from backend.app.schemas.campaign import CampaignCreate

router = APIRouter(tags=["Campaigns"])


@router.get("/")
def list_campaigns(current_user: Optional[dict] = Depends(get_optional_current_user), db: Session = Depends(get_db)):
    founder_id = current_user.get("id") if current_user else None
    campaigns = campaign_service.list_campaigns(db, founder_id)
    return {
        "success": True,
        "campaigns": campaigns
    }


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_campaign(
    data: CampaignCreate,
    request: Request,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    client_ip = request.client.host if request.client else None
    camp = campaign_service.create_campaign(
        db=db,
        founder_id=current_user["id"],
        data=data.model_dump(),
        ip_address=client_ip
    )
    return {
        "success": True,
        "campaign": camp
    }


@router.get("/{id}")
def get_campaign(id: str, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    check_resource_ownership("campaign", id, current_user, db)
    camp = campaign_service.get_campaign_by_id(db, id)
    if not camp:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return {
        "success": True,
        "campaign": camp
    }


@router.get("/{id}/analytics")
def get_analytics(id: str, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    check_resource_ownership("campaign", id, current_user, db)
    analytics = campaign_service.get_campaign_analytics(db, id)
    if not analytics:
        raise HTTPException(status_code=404, detail="Campaign analytics not found")
    return {
        "success": True,
        **analytics
    }
