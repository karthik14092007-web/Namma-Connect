from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.core.database import Base
from backend.app.models.base import generate_uuid, TimestampMixin


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    role = Column(String, default="FOUNDER", nullable=False)  # FOUNDER, MENTOR, INVESTOR, ADMIN
    is_email_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    last_login_at = Column(DateTime(timezone=True), nullable=True)

    founder_profile = relationship("FounderProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    mentor_profile = relationship("MentorProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    businesses = relationship("Business", back_populates="founder", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user")
    campaigns = relationship("Campaign", back_populates="founder")
    funding_applications = relationship("FundingApplication", back_populates="founder")


class FounderProfile(Base, TimestampMixin):
    __tablename__ = "founder_profiles"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=False)
    state = Column(String, nullable=True)
    city = Column(String, nullable=True)
    preferred_language = Column(String, default="English", nullable=False)
    bio = Column(String, nullable=True)
    profile_image = Column(String, nullable=True)

    user = relationship("User", back_populates="founder_profile")
