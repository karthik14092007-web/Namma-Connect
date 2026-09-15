from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from backend.app.models.notification import Notification

DEFAULT_NOTIFICATIONS = [
    {
        "id": "notif-1",
        "userId": "usr-kavya-1",
        "title": "Welcome to Namma-Connect",
        "message": "Welcome Kavya! Your growth diagnostic and baseline plan have been prepared for Namma Crunch.",
        "type": "SYSTEM",
        "read": False,
        "link": "/dashboard",
        "createdAt": "2026-09-15T12:00:00Z"
    },
    {
        "id": "notif-2",
        "userId": "usr-kavya-1",
        "title": "Mentor Match Recommendation",
        "message": "Priya Sharma (94% Match) is available for D2C scaling & brand positioning guidance.",
        "type": "MENTOR_MATCH",
        "read": False,
        "link": "/mentors",
        "createdAt": "2026-09-15T13:00:00Z"
    },
    {
        "id": "notif-3",
        "userId": "usr-kavya-1",
        "title": "Eligible Funding Opportunity",
        "message": "Stand-Up India Scheme (up to ₹1 Crore) matches your manufacturing expansion plans.",
        "type": "FUNDING",
        "read": True,
        "link": "/funding",
        "createdAt": "2026-09-15T14:00:00Z"
    }
]


def get_user_notifications(db: Optional[Session], user_id: str) -> Dict[str, Any]:
    notifications = []
    if db:
        db_notifs = (
            db.query(Notification)
            .filter(Notification.user_id == user_id)
            .order_by(Notification.created_at.desc())
            .all()
        )
        for n in db_notifs:
            notifications.append({
                "id": n.id,
                "userId": n.user_id,
                "title": n.title,
                "message": n.message,
                "type": n.type,
                "read": n.read,
                "link": n.link,
                "createdAt": n.created_at.isoformat() if n.created_at else None
            })

    if not notifications:
        notifications = list(DEFAULT_NOTIFICATIONS)

    unread_count = len([n for n in notifications if not n["read"]])
    return {
        "unreadCount": unread_count,
        "notifications": notifications
    }


def mark_notification_as_read(db: Optional[Session], user_id: str, notif_id: str) -> Optional[Dict[str, Any]]:
    if db:
        notif = db.query(Notification).filter(Notification.id == notif_id, Notification.user_id == user_id).first()
        if notif:
            notif.read = True
            db.commit()
            db.refresh(notif)
            return {
                "id": notif.id,
                "userId": notif.user_id,
                "title": notif.title,
                "message": notif.message,
                "type": notif.type,
                "read": notif.read,
                "link": notif.link,
                "createdAt": notif.created_at.isoformat() if notif.created_at else None
            }

    for n in DEFAULT_NOTIFICATIONS:
        if n["id"] == notif_id:
            n["read"] = True
            return n

    return None


def mark_all_as_read(db: Optional[Session], user_id: str) -> Dict[str, Any]:
    if db:
        db.query(Notification).filter(Notification.user_id == user_id).update({"read": True})
        db.commit()

    for n in DEFAULT_NOTIFICATIONS:
        n["read"] = True

    return {"success": True}
