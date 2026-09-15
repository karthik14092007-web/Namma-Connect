from typing import Optional
from pydantic import BaseModel


class NotificationResponse(BaseModel):
    id: str
    userId: str
    title: str
    message: str
    type: str
    read: bool
    link: Optional[str] = None
    createdAt: Optional[str] = None
