from typing import Optional
from pydantic import BaseModel


class BusinessCreate(BaseModel):
    name: str
    category: str
    description: str
    location: str
    stage: str = "EARLY_TRACTION"
    monthlyRevenue: Optional[str] = None
    fundingRequirement: Optional[str] = None
    website: Optional[str] = None
    logoUrl: Optional[str] = None


class BusinessUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    stage: Optional[str] = None
    monthlyRevenue: Optional[str] = None
    fundingRequirement: Optional[str] = None
    website: Optional[str] = None
    logoUrl: Optional[str] = None


class BusinessResponse(BaseModel):
    id: str
    founderId: str
    name: str
    category: str
    description: str
    location: str
    stage: str
    monthlyRevenue: Optional[str] = None
    fundingRequirement: Optional[str] = None
    website: Optional[str] = None
    logoUrl: Optional[str] = None
    isActive: bool = True
