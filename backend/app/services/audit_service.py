import logging
from typing import Optional, Dict, Any
import json
from sqlalchemy.orm import Session
from backend.app.models.audit_log import AuditLog

logger = logging.getLogger(__name__)


def log_audit(
    db: Optional[Session],
    user_id: Optional[str],
    action: str,
    entity: str,
    entity_id: Optional[str] = None,
    metadata: Optional[Dict[str, Any]] = None,
    ip_address: Optional[str] = None
) -> Optional[AuditLog]:
    if not db:
        logger.info(f"[AUDIT] {action} on {entity}:{entity_id} by user:{user_id}")
        return None
    try:
        log_entry = AuditLog(
            user_id=user_id,
            action=action,
            entity=entity,
            entity_id=entity_id,
            metadata_json=json.dumps(metadata) if metadata else None,
            ip_address=ip_address
        )
        db.add(log_entry)
        db.commit()
        db.refresh(log_entry)
        return log_entry
    except Exception as e:
        logger.warning(f"Failed to record audit log: {e}")
        try:
            db.rollback()
        except Exception:
            pass
        return None
