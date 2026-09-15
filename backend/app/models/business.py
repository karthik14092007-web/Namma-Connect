from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.core.database import Base
from backend.app.models.base import generate_uuid, TimestampMixin


class Business(Base, TimestampMixin):
    __tablename__ = "businesses"

    id = Column(String, primary_key=True, default=generate_uuid)
    founder_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=False)
    location = Column(String, nullable=False)
    stage = Column(String, default="EARLY_TRACTION", index=True, nullable=False)
    monthly_revenue = Column(String, nullable=True)
    funding_requirement = Column(String, nullable=True)
    website = Column(String, nullable=True)
    logo_url = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)

    founder = relationship("User", back_populates="businesses")
    assessments = relationship("DiagnosticAssessment", back_populates="business", cascade="all, delete-orphan")
    growth_plans = relationship("GrowthPlan", back_populates="business", cascade="all, delete-orphan")
    campaigns = relationship("Campaign", back_populates="business", cascade="all, delete-orphan")
    products = relationship("MarketplaceProduct", back_populates="business", cascade="all, delete-orphan")
    funding_applications = relationship("FundingApplication", back_populates="business", cascade="all, delete-orphan")
