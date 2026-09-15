from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.core.database import Base
from backend.app.models.base import generate_uuid, TimestampMixin


class DiagnosticAssessment(Base, TimestampMixin):
    __tablename__ = "diagnostic_assessments"

    id = Column(String, primary_key=True, default=generate_uuid)
    business_id = Column(String, ForeignKey("businesses.id", ondelete="CASCADE"), index=True, nullable=False)
    stage = Column(String, nullable=False)
    status = Column(String, default="DRAFT", nullable=False)  # DRAFT, COMPLETED
    overall_score = Column(Integer, default=0, nullable=False)
    confidence = Column(String, default="MEDIUM", nullable=False)  # LOW, MEDIUM, HIGH
    confidence_reason = Column(String, nullable=True)
    scoring_version = Column(String, default="v1", nullable=False)
    completed_at = Column(DateTime(timezone=True), nullable=True)

    business = relationship("Business", back_populates="assessments")
    responses = relationship("DiagnosticResponse", back_populates="assessment", cascade="all, delete-orphan")
    factor_scores = relationship("DiagnosticFactorScore", back_populates="assessment", cascade="all, delete-orphan")


class DiagnosticResponse(Base):
    __tablename__ = "diagnostic_responses"

    id = Column(String, primary_key=True, default=generate_uuid)
    assessment_id = Column(String, ForeignKey("diagnostic_assessments.id", ondelete="CASCADE"), index=True, nullable=False)
    factor = Column(String, nullable=False)  # PRODUCT, SALES, BRANDING, MARKETING, REACH, FUNDING
    question_key = Column(String, nullable=False)
    answer_key = Column(String, nullable=False)
    score = Column(Integer, nullable=False)

    assessment = relationship("DiagnosticAssessment", back_populates="responses")


class DiagnosticFactorScore(Base):
    __tablename__ = "diagnostic_factor_scores"

    id = Column(String, primary_key=True, default=generate_uuid)
    assessment_id = Column(String, ForeignKey("diagnostic_assessments.id", ondelete="CASCADE"), index=True, nullable=False)
    factor = Column(String, nullable=False)  # PRODUCT, SALES, BRANDING, MARKETING, REACH, FUNDING
    score = Column(Integer, nullable=False)
    weight = Column(Float, nullable=False)
    contribution = Column(Float, nullable=False)
    status = Column(String, nullable=False)

    assessment = relationship("DiagnosticAssessment", back_populates="factor_scores")
