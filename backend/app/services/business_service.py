from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from backend.app.models.business import Business
from backend.app.services.audit_service import log_audit


def get_businesses_for_founder(db: Session, founder_id: str) -> List[Business]:
    if not db:
        return []
    return db.query(Business).filter(Business.founder_id == founder_id, Business.is_active == True).all()


def get_business_by_id(db: Session, business_id: str) -> Optional[Business]:
    if not db:
        return None
    return db.query(Business).filter(Business.id == business_id).first()


def create_business(db: Session, founder_id: str, data: Dict[str, Any], ip_address: Optional[str] = None) -> Business:
    business = Business(
        founder_id=founder_id,
        name=data.get("name", "New Business"),
        category=data.get("category", "General"),
        description=data.get("description", ""),
        location=data.get("location", "Tamil Nadu"),
        stage=data.get("stage", "EARLY_TRACTION"),
        monthly_revenue=data.get("monthlyRevenue") or data.get("monthly_revenue"),
        funding_requirement=data.get("fundingRequirement") or data.get("funding_requirement"),
        website=data.get("website"),
        logo_url=data.get("logoUrl") or data.get("logo_url"),
        is_active=True
    )
    if db:
        db.add(business)
        db.commit()
        db.refresh(business)
        log_audit(db, founder_id, "BUSINESS_CREATED", "Business", business.id, ip_address=ip_address)
    return business


def update_business(db: Session, business_id: str, data: Dict[str, Any], user_id: str, ip_address: Optional[str] = None) -> Optional[Business]:
    if not db:
        return None
    biz = db.query(Business).filter(Business.id == business_id).first()
    if not biz:
        return None

    field_map = {
        "name": "name",
        "category": "category",
        "description": "description",
        "location": "location",
        "stage": "stage",
        "monthlyRevenue": "monthly_revenue",
        "monthly_revenue": "monthly_revenue",
        "fundingRequirement": "funding_requirement",
        "funding_requirement": "funding_requirement",
        "website": "website",
        "logoUrl": "logo_url",
        "logo_url": "logo_url",
        "isActive": "is_active",
        "is_active": "is_active"
    }

    for key, value in data.items():
        if key in field_map and value is not None:
            setattr(biz, field_map[key], value)

    db.commit()
    db.refresh(biz)
    log_audit(db, user_id, "BUSINESS_UPDATED", "Business", biz.id, ip_address=ip_address)
    return biz


def delete_business(db: Session, business_id: str, user_id: str, ip_address: Optional[str] = None) -> bool:
    if not db:
        return False
    biz = db.query(Business).filter(Business.id == business_id).first()
    if not biz:
        return False
    biz.is_active = False
    db.commit()
    log_audit(db, user_id, "BUSINESS_DELETED", "Business", biz.id, ip_address=ip_address)
    return True
