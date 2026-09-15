from typing import List, Optional, Dict, Any
from pydantic import BaseModel


class MentorResponse(BaseModel):
    id: str
    name: str
    role: Optional[str] = None
    expertise: str
    industries: str
    stageExperience: str
    location: str
    languages: str
    consultationMode: str
    consultationFee: str
    bio: str
    availability: str
    verified: bool
    matchPercentage: Optional[int] = None
    matchReasons: Optional[List[str]] = []
    matchBreakdown: Optional[Any] = None


class MentorMatchRequest(BaseModel):
    mentorId: str
    businessId: Optional[str] = None
    date: Optional[str] = None
    timeSlot: Optional[str] = None
    notes: Optional[str] = None


class MentorBookingResponse(BaseModel):
    success: bool = True
    message: str
    booking: Dict[str, Any]
