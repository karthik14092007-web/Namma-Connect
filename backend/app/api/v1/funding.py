from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any

from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user, get_optional_current_user
from backend.app.services import funding_service
from backend.app.schemas.funding import FundingApplicationCreate

router = APIRouter(tags=["Funding"])


@router.get("/")
def list_opportunities(
    page: int = 1,
    limit: int = 20,
    current_user: Optional[dict] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    founder_id = current_user.get("id") if current_user else None
    result = funding_service.list_opportunities(db, founder_id, page=page, limit=limit)
    return {
        "success": True,
        "founderName": current_user.get("firstName", "Kavya") if current_user else "Kavya",
        "fundingRequirement": "₹7L",
        **result
    }


@router.get("/applications")
def list_my_applications(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    apps = funding_service.get_founder_applications(db, current_user["id"])
    return {
        "success": True,
        "applications": [
            {
                "id": a.id,
                "businessId": a.business_id,
                "founderId": a.founder_id,
                "fundingOpportunityId": a.funding_opportunity_id,
                "status": a.status,
                "notes": a.notes,
                "createdAt": a.created_at.isoformat() if a.created_at else None
            }
            for a in apps
        ]
    }


@router.get("/{id}")
def get_opportunity(id: str, db: Session = Depends(get_db)):
    opp = funding_service.get_opportunity_by_id(db, id)
    if not opp:
        raise HTTPException(status_code=404, detail="Funding opportunity not found")
    return {
        "success": True,
        "opportunity": opp
    }


@router.post("/{id}/apply", status_code=status.HTTP_201_CREATED)
def apply_for_opportunity(
    id: str,
    data: Dict[str, Any],
    request: Request,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    client_ip = request.client.host if request.client else None
    app = funding_service.apply_for_funding(
        db=db,
        founder_id=current_user["id"],
        opportunity_id=id,
        business_id=data.get("businessId"),
        notes=data.get("notes"),
        ip_address=client_ip
    )
    return {
        "success": True,
        "message": "Application registered successfully",
        "application": {
            "id": app.id,
            "businessId": app.business_id,
            "founderId": app.founder_id,
            "fundingOpportunityId": app.funding_opportunity_id,
            "status": app.status,
            "notes": app.notes
        }
    }
