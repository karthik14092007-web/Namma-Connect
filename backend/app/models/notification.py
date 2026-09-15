from sqlalchemy import Column, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.app.core.database import Base
from backend.app.models.base import generate_uuid, TimestampMixin


class Notification(Base, TimestampMixin):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String, default="SYSTEM", nullable=False)  # MENTOR_MATCH, FUNDING, CAMPAIGN, GROWTH_PLAN, SYSTEM
    read = Column(Boolean, default=False, nullable=False)
    link = Column(String, nullable=True)

    user = relationship("User", back_populates="notifications")
