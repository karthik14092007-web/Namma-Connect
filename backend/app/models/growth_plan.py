from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.core.database import Base
from backend.app.models.base import generate_uuid, TimestampMixin


class GrowthPlan(Base, TimestampMixin):
    __tablename__ = "growth_plans"

    id = Column(String, primary_key=True, default=generate_uuid)
    business_id = Column(String, ForeignKey("businesses.id", ondelete="CASCADE"), index=True, nullable=False)
    assessment_id = Column(String, nullable=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    status = Column(String, default="IN_PROGRESS", nullable=False)  # NOT_STARTED, IN_PROGRESS, COMPLETED

    business = relationship("Business", back_populates="growth_plans")
    actions = relationship("GrowthAction", back_populates="growth_plan", cascade="all, delete-orphan")


class GrowthAction(Base):
    __tablename__ = "growth_actions"

    id = Column(String, primary_key=True, default=generate_uuid)
    growth_plan_id = Column(String, ForeignKey("growth_plans.id", ondelete="CASCADE"), index=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    factor = Column(String, nullable=False)
    priority = Column(String, nullable=False)  # CRITICAL, HIGH, DEVELOPING
    week = Column(Integer, nullable=False)
    status = Column(String, default="NOT_STARTED", nullable=False)  # NOT_STARTED, IN_PROGRESS, COMPLETED
    completed_at = Column(DateTime(timezone=True), nullable=True)

    growth_plan = relationship("GrowthPlan", back_populates="actions")
