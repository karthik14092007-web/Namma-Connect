from typing import Optional
from pydantic import BaseModel


class CampaignCreate(BaseModel):
    title: str
    description: Optional[str] = "Targeted D2C Launch Campaign"
    businessId: Optional[str] = None
    mediaUrl: Optional[str] = None
    productId: Optional[str] = None
    campaignType: Optional[str] = "PRODUCT_LAUNCH"
    objective: Optional[str] = "PRODUCT_SALES"
    budget: float = 500.0
    location: Optional[str] = "Tamil Nadu & South India"


class CampaignResponse(BaseModel):
    id: str
    businessId: str
    founderId: str
    title: str
    description: str
    mediaUrl: Optional[str] = None
    campaignType: str
    objective: str
    budget: float
    dailyBudget: float
    durationDays: int
    status: str
    reach: int
    relevantPercent: int
    relevantAudiencePercent: Optional[int] = None
    productViews: int
    clicks: int
    conversions: int


class CampaignAnalyticsResponse(BaseModel):
    campaignId: str
    impressions: int
    views: int
    clicks: int
    engagements: int
    leads: int
    conversions: int
    spend: float
