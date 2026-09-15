from typing import List, Optional, Any
from pydantic import BaseModel


class FundingResponse(BaseModel):
    id: str
    name: str
    provider: str
    type: str
    amountMin: str
    amountMax: str
    eligibility: str
    industries: str
    stages: str
    location: str
    applicationUrl: Optional[str] = None
    deadline: Optional[str] = None
    matchPercentage: Optional[int] = None
    reasons: Optional[List[str]] = []
    breakdown: Optional[Any] = None


class FundingApplicationRequest(BaseModel):
    businessId: Optional[str] = None
    notes: Optional[str] = None
