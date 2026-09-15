from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.app.core.database import Base
from backend.app.models.base import generate_uuid, TimestampMixin


class MentorProfile(Base, TimestampMixin):
    __tablename__ = "mentor_profiles"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    name = Column(String, nullable=True)
    role = Column(String, nullable=True)
    expertise = Column(String, nullable=False)
    industries = Column(String, nullable=False)
    stage_experience = Column(String, nullable=False)
    location = Column(String, nullable=False)
    languages = Column(String, nullable=False)
    consultation_mode = Column(String, default="Online", nullable=False)
    consultation_fee = Column(String, default="Free / Pro-bono", nullable=False)
    bio = Column(Text, nullable=False)
    availability = Column(String, nullable=False)
    verified = Column(Boolean, default=True)

    user = relationship("User", back_populates="mentor_profile")
    matches = relationship("MentorMatch", back_populates="mentor", cascade="all, delete-orphan")


class MentorMatch(Base):
    __tablename__ = "mentor_matches"

    id = Column(String, primary_key=True, default=generate_uuid)
    founder_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    mentor_id = Column(String, ForeignKey("mentor_profiles.id", ondelete="CASCADE"), index=True, nullable=False)
    business_id = Column(String, nullable=True)
    match_score = Column(Integer, nullable=False)
    match_reasons = Column(Text, nullable=False)  # JSON string
    status = Column(String, default="PENDING", nullable=False)  # PENDING, ACCEPTED, DECLINED, COMPLETED
    date = Column(String, nullable=True)
    time_slot = Column(String, nullable=True)
    notes = Column(Text, nullable=True)

    mentor = relationship("MentorProfile", back_populates="matches")
