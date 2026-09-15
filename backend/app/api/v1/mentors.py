from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional, Dict, Any

from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user, get_optional_current_user
from backend.app.services import mentor_service
from backend.app.schemas.mentor import MentorMatchRequest

router = APIRouter(tags=["Mentors"])


@router.get("")
@router.get("/")
def list_mentors(current_user: Optional[dict] = Depends(get_optional_current_user), db: Session = Depends(get_db)):

    founder_id = current_user.get("id") if current_user else None
    mentors = mentor_service.list_mentors(db, founder_id)
    return {
        "success": True,
        "founderName": current_user.get("firstName", "Kavya") if current_user else "Kavya",
        "brandName": "Namma Crunch",
        "mentors": mentors
    }


@router.get("/{id}")
def get_mentor(id: str, db: Session = Depends(get_db)):
    mentors = mentor_service.list_mentors(db)
    for m in mentors:
        if m["id"] == id:
            return {"success": True, "mentor": m}
    raise HTTPException(status_code=404, detail="Mentor not found")


@router.post("/matches", status_code=status.HTTP_201_CREATED)
def request_match(data: Dict[str, Any], current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    mentor_id = data.get("mentorId") or data.get("mentor_id") or "mnt-1"
    booking = mentor_service.book_mentor_session(db, current_user["id"], mentor_id, data)
    return {
        "success": True,
        "message": "Consultation booked successfully",
        "booking": booking
    }
