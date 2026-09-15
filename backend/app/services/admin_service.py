from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from backend.app.models.user import User
from backend.app.models.business import Business
from backend.app.models.campaign import Campaign
from backend.app.models.marketplace import MarketplaceProduct
from backend.app.models.mentor import MentorMatch


def get_admin_metrics(db: Optional[Session]) -> Dict[str, Any]:
    users_count = 0
    businesses_count = 0
    campaigns_count = 0
    products_count = 0
    bookings_count = 0

    if db:
        try:
            users_count = db.query(User).count()
            businesses_count = db.query(Business).count()
            campaigns_count = db.query(Campaign).count()
            products_count = db.query(MarketplaceProduct).count()
            bookings_count = db.query(MentorMatch).count()
        except Exception:
            pass

    return {
        "metrics": {
            "totalFounders": 142 + users_count,
            "activeBrands": 118 + businesses_count,
            "mentorConnections": 89 + bookings_count,
            "fundingMatches": 64,
            "productsListed": 47 + products_count,
            "campaignsLaunched": 86 + campaigns_count
        },
        "charts": {
            "founderGrowth": [
                {"month": "Apr", "founders": 24, "brands": 18},
                {"month": "May", "founders": 42, "brands": 35},
                {"month": "Jun", "founders": 68, "brands": 58},
                {"month": "Jul", "founders": 95, "brands": 80},
                {"month": "Aug", "founders": 122, "brands": 104},
                {"month": "Sep", "founders": 148, "brands": 124}
            ],
            "marketplaceActivity": [
                {"category": "Food & Bev", "orders": 420, "revenue": 125000},
                {"category": "Handcrafted", "orders": 210, "revenue": 84000},
                {"category": "Fashion", "orders": 165, "revenue": 98000},
                {"category": "Home & Life", "orders": 130, "revenue": 52000},
                {"category": "Agriculture", "orders": 95, "revenue": 41000}
            ],
            "mentorSpecialties": [
                {"name": "Marketing", "count": 42},
                {"name": "Branding", "count": 35},
                {"name": "Supply Chain", "count": 28},
                {"name": "Funding & Pitch", "count": 22}
            ],
            "fundingApplications": [
                {"scheme": "Stand-Up India", "applicants": 45, "approved": 18},
                {"scheme": "SISFS Grants", "applicants": 38, "approved": 12},
                {"scheme": "EDII TN Vouchers", "applicants": 29, "approved": 21},
                {"scheme": "Mudra Loans", "applicants": 52, "approved": 34}
            ]
        }
    }


def list_users(db: Optional[Session], page: int = 1, limit: int = 20) -> Dict[str, Any]:
    take = min(50, max(1, limit))
    skip = (max(1, page) - 1) * take

    users = []
    if db:
        db_users = db.query(User).all()
        for u in db_users:
            users.append({
                "id": u.id,
                "email": u.email,
                "firstName": u.first_name,
                "lastName": u.last_name,
                "role": u.role,
                "isActive": u.is_active,
                "createdAt": u.created_at.isoformat() if u.created_at else None,
                "lastLoginAt": u.last_login_at.isoformat() if u.last_login_at else None
            })

    if not users:
        users = [
            {
                "id": "usr-kavya-1",
                "email": "kavya@nammacrunch.in",
                "firstName": "Kavya",
                "lastName": "Narayanan",
                "role": "FOUNDER",
                "isActive": True,
                "createdAt": "2026-09-15T10:00:00Z",
                "lastLoginAt": "2026-09-15T11:00:00Z"
            },
            {
                "id": "usr-admin-1",
                "email": "admin@nammaconnect.in",
                "firstName": "Admin",
                "lastName": "NammaConnect",
                "role": "ADMIN",
                "isActive": True,
                "createdAt": "2026-09-15T09:00:00Z",
                "lastLoginAt": "2026-09-15T11:30:00Z"
            }
        ]

    paginated = users[skip : skip + take]
    return {
        "total": len(users),
        "page": page,
        "limit": take,
        "users": paginated
    }
