from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.app.core.database import Base
from backend.app.models.base import generate_uuid, TimestampMixin


class AuditLog(Base, TimestampMixin):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="SET NULL"), index=True, nullable=True)
    action = Column(String, index=True, nullable=False)
    entity = Column(String, nullable=False)
    entity_id = Column(String, nullable=True)
    metadata_json = Column(Text, nullable=True)
    ip_address = Column(String, nullable=True)

    user = relationship("User", back_populates="audit_logs")
