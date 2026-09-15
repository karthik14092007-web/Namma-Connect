from typing import List, Optional
from pydantic import BaseModel


class GrowthActionResponse(BaseModel):
    id: str
    title: str
    description: str
    factor: str
    priority: str
    week: int
    status: str
    completedAt: Optional[str] = None


class GrowthPlanResponse(BaseModel):
    id: str
    businessId: str
    title: str
    description: str
    status: str
    tasks: List[GrowthActionResponse] = []
    progress: Optional[dict] = None


class ActionStatusUpdate(BaseModel):
    status: str  # Completed, In Progress, Pending
