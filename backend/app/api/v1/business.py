from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List

from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user, check_resource_ownership
from backend.app.schemas.business import BusinessCreate, BusinessUpdate, BusinessResponse
from backend.app.services import business_service

router = APIRouter(tags=["Business"])


@router.get("/")
def list_my_businesses(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    businesses = business_service.get_businesses_for_founder(db, current_user["id"])
    return {
        "success": True,
        "businesses": [
            {
                "id": b.id,
                "founderId": b.founder_id,
                "name": b.name,
                "category": b.category,
                "description": b.description,
                "location": b.location,
                "stage": b.stage,
                "monthlyRevenue": b.monthly_revenue,
                "fundingRequirement": b.funding_requirement,
                "website": b.website,
                "logoUrl": b.logo_url,
                "isActive": b.is_active
            }
            for b in businesses
        ]
    }


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_business(data: BusinessCreate, request: Request, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    client_ip = request.client.host if request.client else None
    biz = business_service.create_business(db, current_user["id"], data.model_dump(), ip_address=client_ip)
    return {
        "success": True,
        "business": {
            "id": biz.id,
            "founderId": biz.founder_id,
            "name": biz.name,
            "category": biz.category,
            "description": biz.description,
            "location": biz.location,
            "stage": biz.stage,
            "monthlyRevenue": biz.monthly_revenue,
            "fundingRequirement": biz.funding_requirement,
            "website": biz.website,
            "logoUrl": biz.logo_url,
            "isActive": biz.is_active
        }
    }


@router.get("/{id}")
def get_business(id: str, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    check_resource_ownership("business", id, current_user, db)
    biz = business_service.get_business_by_id(db, id)
    if not biz:
        raise HTTPException(status_code=404, detail="Business not found")
    return {
        "success": True,
        "business": {
            "id": biz.id,
            "founderId": biz.founder_id,
            "name": biz.name,
            "category": biz.category,
            "description": biz.description,
            "location": biz.location,
            "stage": biz.stage,
            "monthlyRevenue": biz.monthly_revenue,
            "fundingRequirement": biz.funding_requirement,
            "website": biz.website,
            "logoUrl": biz.logo_url,
            "isActive": biz.is_active
        }
    }


@router.patch("/{id}")
def update_business(id: str, data: BusinessUpdate, request: Request, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    check_resource_ownership("business", id, current_user, db)
    client_ip = request.client.host if request.client else None
    updated = business_service.update_business(db, id, data.model_dump(exclude_unset=True), current_user["id"], ip_address=client_ip)
    if not updated:
        raise HTTPException(status_code=404, detail="Business not found")
    return {
        "success": True,
        "business": {
            "id": updated.id,
            "founderId": updated.founder_id,
            "name": updated.name,
            "category": updated.category,
            "description": updated.description,
            "location": updated.location,
            "stage": updated.stage,
            "monthlyRevenue": updated.monthly_revenue,
            "fundingRequirement": updated.funding_requirement,
            "website": updated.website,
            "logoUrl": updated.logo_url,
            "isActive": updated.is_active
        }
    }


@router.delete("/{id}")
def delete_business(id: str, request: Request, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    check_resource_ownership("business", id, current_user, db)
    client_ip = request.client.host if request.client else None
    success = business_service.delete_business(db, id, current_user["id"], ip_address=client_ip)
    return {"success": success, "message": "Business deleted successfully"}
