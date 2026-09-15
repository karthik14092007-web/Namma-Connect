from sqlalchemy import Column, String, Integer, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.app.core.database import Base
from backend.app.models.base import generate_uuid, TimestampMixin


class Campaign(Base, TimestampMixin):
    __tablename__ = "campaigns"

    id = Column(String, primary_key=True, default=generate_uuid)
    business_id = Column(String, ForeignKey("businesses.id", ondelete="CASCADE"), index=True, nullable=False)
    founder_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    media_url = Column(String, nullable=True)
    product_id = Column(String, nullable=True)
    campaign_type = Column(String, default="PRODUCT_LAUNCH", nullable=False)
    objective = Column(String, default="PRODUCT_SALES", nullable=False)
    budget = Column(Float, default=500.0, nullable=False)
    daily_budget = Column(Float, default=71.0, nullable=False)
    duration_days = Column(Integer, default=7, nullable=False)
    status = Column(String, default="ACTIVE", nullable=False)
    reach = Column(Integer, default=0, nullable=False)
    relevant_percent = Column(Integer, default=70, nullable=False)
    product_views = Column(Integer, default=0, nullable=False)
    clicks = Column(Integer, default=0, nullable=False)
    conversions = Column(Integer, default=0, nullable=False)

    business = relationship("Business", back_populates="campaigns")
    founder = relationship("User", back_populates="campaigns")
    audiences = relationship("CampaignAudience", back_populates="campaign", cascade="all, delete-orphan")
    analytics = relationship("CampaignAnalytics", back_populates="campaign", cascade="all, delete-orphan")


class CampaignAudience(Base):
    __tablename__ = "campaign_audiences"

    id = Column(String, primary_key=True, default=generate_uuid)
    campaign_id = Column(String, ForeignKey("campaigns.id", ondelete="CASCADE"), index=True, nullable=False)
    age_range = Column(String, nullable=False)
    locations = Column(String, nullable=False)
    interests = Column(String, nullable=False)
    customer_type = Column(String, nullable=False)
    purchase_intent = Column(String, nullable=False)
    category = Column(String, nullable=False)

    campaign = relationship("Campaign", back_populates="audiences")


class CampaignAnalytics(Base):
    __tablename__ = "campaign_analytics"

    id = Column(String, primary_key=True, default=generate_uuid)
    campaign_id = Column(String, ForeignKey("campaigns.id", ondelete="CASCADE"), index=True, nullable=False)
    impressions = Column(Integer, default=0, nullable=False)
    views = Column(Integer, default=0, nullable=False)
    clicks = Column(Integer, default=0, nullable=False)
    engagements = Column(Integer, default=0, nullable=False)
    leads = Column(Integer, default=0, nullable=False)
    conversions = Column(Integer, default=0, nullable=False)
    spend = Column(Float, default=0.0, nullable=False)

    campaign = relationship("Campaign", back_populates="analytics")
