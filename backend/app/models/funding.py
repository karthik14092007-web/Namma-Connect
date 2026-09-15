from sqlalchemy import Column, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.app.core.database import Base
from backend.app.models.base import generate_uuid, TimestampMixin


class FundingOpportunity(Base, TimestampMixin):
    __tablename__ = "funding_opportunities"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    provider = Column(String, nullable=False)
    type = Column(String, nullable=False)
    amount_min = Column(String, nullable=False)
    amount_max = Column(String, nullable=False)
    eligibility = Column(Text, nullable=False)
    industries = Column(String, nullable=False)
    stages = Column(String, nullable=False)
    location = Column(String, nullable=False)
    application_url = Column(String, nullable=True)
    deadline = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)

    applications = relationship("FundingApplication", back_populates="opportunity", cascade="all, delete-orphan")


class FundingApplication(Base, TimestampMixin):
    __tablename__ = "funding_applications"

    id = Column(String, primary_key=True, default=generate_uuid)
    business_id = Column(String, ForeignKey("businesses.id", ondelete="CASCADE"), index=True, nullable=False)
    founder_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    funding_opportunity_id = Column(String, ForeignKey("funding_opportunities.id", ondelete="CASCADE"), index=True, nullable=False)
    status = Column(String, default="APPLIED", nullable=False)  # SAVED, APPLIED, UNDER_REVIEW, APPROVED
    notes = Column(Text, nullable=True)

    business = relationship("Business", back_populates="funding_applications")
    founder = relationship("User", back_populates="funding_applications")
    opportunity = relationship("FundingOpportunity", back_populates="applications")
