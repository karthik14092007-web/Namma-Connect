from backend.app.api.v1.health import router as health_router
from backend.app.api.v1.auth import router as auth_router
from backend.app.api.v1.business import router as business_router
from backend.app.api.v1.diagnostic import router as diagnostic_router
from backend.app.api.v1.growth import router as growth_router
from backend.app.api.v1.mentors import router as mentors_router
from backend.app.api.v1.funding import router as funding_router
from backend.app.api.v1.campaigns import router as campaigns_router
from backend.app.api.v1.marketplace import router as marketplace_router
from backend.app.api.v1.notifications import router as notifications_router
from backend.app.api.v1.admin import router as admin_router

__all__ = [
    "health_router",
    "auth_router",
    "business_router",
    "diagnostic_router",
    "growth_router",
    "mentors_router",
    "funding_router",
    "campaigns_router",
    "marketplace_router",
    "notifications_router",
    "admin_router"
]
