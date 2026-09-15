from sqlalchemy import Column, String, Float, Integer, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.app.core.database import Base
from backend.app.models.base import generate_uuid, TimestampMixin


class MarketplaceProduct(Base, TimestampMixin):
    __tablename__ = "marketplace_products"

    id = Column(String, primary_key=True, default=generate_uuid)
    business_id = Column(String, ForeignKey("businesses.id", ondelete="CASCADE"), index=True, nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    original_price = Column(Float, nullable=True)
    unit = Column(String, default="Pack of 1", nullable=False)
    image_url = Column(String, nullable=True)
    stock = Column(Integer, default=100, nullable=False)
    is_verified = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)

    business = relationship("Business", back_populates="products")
