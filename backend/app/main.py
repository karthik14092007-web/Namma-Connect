import os
import logging
from contextlib import asynccontextmanager
from typing import Optional, Dict, Any, List
from fastapi import FastAPI, Request, Response, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from backend.app.core.config import settings
from backend.app.core.database import get_db, check_database_connection
from backend.app.api.v1 import (
    health_router,
    auth_router,
    business_router,
    diagnostic_router,
    growth_router,
    mentors_router,
    funding_router,
    campaigns_router,
    marketplace_router,
    notifications_router,
    admin_router
)
from backend.app.services import (
    mentor_service,
    funding_service,
    campaign_service,
    marketplace_service,
    notification_service,
    growth_service,
    admin_service,
    diagnostic_service
)
from backend.app.models.user import User, FounderProfile
from backend.app.models.business import Business
from backend.app.models.diagnostic import DiagnosticAssessment
from backend.app.models.growth_plan import GrowthPlan, GrowthAction
from backend.app.rules.diagnostic_rules import calculate_diagnostic_score

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("namma_connect.app")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup probe
    db_connected = check_database_connection()
    status_str = "connected" if db_connected else "disconnected (failover to in-memory benchmark / retry mode)"
    logger.info(f"Namma-Connect FastAPI starting up. Supabase PostgreSQL: {status_str}")
    yield
    logger.info("Namma-Connect FastAPI shutting down.")


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="Founder Growth Operating System API for early-stage D2C brands",
    lifespan=lifespan
)

# CORS Middleware
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5000",
    "http://127.0.0.1:5000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------------------------------------------
# Global Exception Handler
# ----------------------------------------------------
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "message": exc.detail,
            "statusCode": exc.status_code
        }
    )


# ----------------------------------------------------
# Modern REST API (v1)
# ----------------------------------------------------
app.include_router(health_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1/auth")
app.include_router(business_router, prefix="/api/v1/business")
app.include_router(diagnostic_router, prefix="/api/v1/diagnostics")
app.include_router(growth_router, prefix="/api/v1/growth-plan")
app.include_router(mentors_router, prefix="/api/v1/mentors")
app.include_router(funding_router, prefix="/api/v1/funding")
app.include_router(campaigns_router, prefix="/api/v1/campaigns")
app.include_router(marketplace_router, prefix="/api/v1/marketplace")
app.include_router(notifications_router, prefix="/api/v1/notifications")
app.include_router(admin_router, prefix="/api/v1/admin")


# ----------------------------------------------------
# Compatibility Endpoints for Existing Frontend (Zero Breakage)
# ----------------------------------------------------

@app.get("/api/health")
def api_legacy_health():
    is_db_connected = check_database_connection()
    return {
        "status": "ok",
        "app": "Namma-Connect API (FastAPI + Supabase PostgreSQL OS)",
        "service": "namma-connect-api",
        "database": "connected" if is_db_connected else "disconnected"
    }


def _get_kavya_demo_data(db: Optional[Session] = None) -> Dict[str, Any]:
    founder_payload = {
        "id": "usr-kavya-1",
        "founderName": "Kavya Narayanan",
        "brandName": "Namma Crunch",
        "location": "Madurai, Tamil Nadu",
        "industry": "Food & Beverages",
        "productCategory": "Artisanal Healthy Snacks",
        "businessStage": "Early traction",
        "monthlyRevenue": "₹1.8L",
        "actualMonthlyRevenue": "₹1.8L",
        "fundingRequirement": "₹7L",
        "growthScore": 68,
        "scoreStatus": "Ready for Focused Growth",
        "categoryScores": {
            "Product": 85,
            "Sales": 70,
            "Branding": 60,
            "Marketing": 50,
            "Reach": 70,
            "Funding": 75
        },
        "topGaps": [
            {
                "dimension": "Marketing",
                "category": "Marketing",
                "score": 50,
                "priority": "Critical Gap",
                "recommendation": "Define Target Customer & Sharpen Positioning"
            },
            {
                "dimension": "Branding",
                "category": "Branding",
                "score": 60,
                "priority": "High Priority",
                "recommendation": "Establish Consistent Visual Identity"
            },
            {
                "dimension": "Sales",
                "category": "Sales",
                "score": 70,
                "priority": "Developing",
                "recommendation": "Optimize Repeat Purchases & Margins"
            }
        ],
        "verified": True,
        "proofOfWork": True,
        "certifications": ["FSSAI Verified / Udyam Registered"],
        "achievements": ["First 500 happy customers", "Local retail presence"]
    }

    business_payload = {
        "id": "biz-kavya-1",
        "name": "Namma Crunch",
        "category": "Food & Beverages",
        "stage": "Early traction",
        "monthlyRevenue": "₹1.8L",
        "location": "Madurai, Tamil Nadu"
    }

    diagnostic_payload = {
        "overallScore": 68,
        "stage": "Early traction",
        "categoryScores": founder_payload["categoryScores"],
        "topGaps": founder_payload["topGaps"]
    }

    growth_plan_payload = {
        "milestones": 12,
        "duration": "90 Days",
        "status": "Active"
    }

    mentors = mentor_service.list_mentors(db, "usr-kavya-1")
    funding_res = funding_service.list_opportunities(db, "usr-kavya-1")
    campaigns = campaign_service.list_campaigns(db, "usr-kavya-1")

    return {
        "success": True,
        "message": "Demo persona (Kavya - Namma Crunch) loaded successfully.",
        "founder": founder_payload,
        "data": {
            "founder": founder_payload,
            "business": business_payload,
            "diagnostic": diagnostic_payload,
            "growthPlan": growth_plan_payload,
            "mentorMatches": mentors,
            "fundingMatches": funding_res.get("opportunities", []),
            "campaigns": campaigns
        }
    }


@app.get("/api/demo/kavya")
@app.get("/api/v1/demo/kavya")
def get_kavya_demo(db: Session = Depends(get_db)):
    return _get_kavya_demo_data(db)


@app.post("/api/onboard", status_code=status.HTTP_201_CREATED)
def legacy_onboard(data: Dict[str, Any]):
    responses = data.get("diagnosticAnswers") or [
        {"questionKey": "mkt_1", "score": 40},
        {"questionKey": "mkt_2", "score": 60},
        {"questionKey": "mkt_3", "score": 40},
        {"questionKey": "mkt_4", "score": 60}
    ]

    calculated = calculate_diagnostic_score(
        responses=responses,
        stage=data.get("businessStage") or "EARLY_TRACTION",
        brand_name=data.get("brandName") or "My D2C Brand"
    )

    factor_scores = calculated.get("factorScores", {})
    category_scores = {
        "Product": factor_scores.get("PRODUCT", {}).get("score", 85),
        "Sales": factor_scores.get("SALES", {}).get("score", 70),
        "Branding": factor_scores.get("BRANDING", {}).get("score", 60),
        "Marketing": factor_scores.get("MARKETING", {}).get("score", 50),
        "Reach": factor_scores.get("REACH", {}).get("score", 70),
        "Funding": factor_scores.get("FUNDING", {}).get("score", 75)
    }

    new_founder = {
        "id": f"founder-{int(os.times().elapsed * 1000)}",
        "founderName": data.get("founderName") or "Founder",
        "brandName": data.get("brandName") or "My D2C Brand",
        "location": data.get("location") or "Tamil Nadu",
        "industry": data.get("industry") or "Food & Beverages",
        "businessStage": data.get("businessStage") or "Early traction",
        "monthlyRevenue": data.get("monthlyRevenue") or "₹50K–₹2L",
        "fundingRequirement": data.get("fundingRequirement") or "₹5L",
        "growthScore": calculated.get("overallScore", 68),
        "scoreStatus": calculated.get("status", "Ready for Focused Growth"),
        "categoryScores": category_scores,
        "topGaps": [
            {
                "category": g.get("factor", "Marketing").capitalize(),
                "score": g.get("score", 50),
                "priority": g.get("label", "Critical Gap"),
                "recommendation": calculated.get("nextBestAction", {}).get("action", "Focus on core growth drivers")
            }
            for g in calculated.get("topGaps", [])
        ]
    }

    return {
        "success": True,
        "founder": new_founder,
        "diagnosis": calculated
    }


@app.get("/api/founders/{id}")
def legacy_get_founder(id: str):
    return {
        "id": id,
        "founderName": "Kavya Narayanan",
        "brandName": "Namma Crunch",
        "location": "Madurai, Tamil Nadu",
        "growthScore": 68
    }


@app.get("/api/roadmap/{founder_id}")
def legacy_get_roadmap(founder_id: str, db: Session = Depends(get_db)):
    plan = growth_service.get_or_create_growth_plan(db, "biz-kavya-1", "Namma Crunch")
    return {
        "founderId": founder_id,
        "tasks": plan.get("tasks", [])
    }


@app.patch("/api/roadmap/{founder_id}/tasks/{task_id}")
def legacy_update_task(founder_id: str, task_id: str, data: Dict[str, Any], db: Session = Depends(get_db)):
    status_str = "COMPLETED" if data.get("status") == "Completed" else "NOT_STARTED"
    res = growth_service.update_action_status(db, task_id, status_str)
    return res


@app.get("/api/mentors")
def legacy_get_mentors(db: Session = Depends(get_db)):
    mentors = mentor_service.list_mentors(db, "usr-kavya-1")
    return {
        "founderName": "Kavya",
        "brandName": "Namma Crunch",
        "mentors": mentors
    }


@app.post("/api/mentors/{id}/book", status_code=status.HTTP_201_CREATED)
def legacy_book_mentor(id: str, data: Dict[str, Any], db: Session = Depends(get_db)):
    booking = mentor_service.book_mentor_session(db, "usr-kavya-1", id, data)
    return {
        "success": True,
        "message": "Consultation booked successfully",
        "booking": booking
    }


@app.get("/api/funding")
def legacy_get_funding(db: Session = Depends(get_db)):
    res = funding_service.list_opportunities(db, "usr-kavya-1")
    return {
        "founderName": "Kavya",
        "fundingRequirement": "₹7L",
        "opportunities": res.get("opportunities", [])
    }


@app.get("/api/marketplace")
def legacy_get_marketplace(category: Optional[str] = None, search: Optional[str] = None, db: Session = Depends(get_db)):
    res = marketplace_service.list_products(db, category=category, search=search)
    return {
        "total": res.get("total", 0),
        "products": res.get("products", [])
    }


@app.post("/api/marketplace", status_code=status.HTTP_201_CREATED)
def legacy_create_product(data: Dict[str, Any], request: Request, db: Session = Depends(get_db)):
    client_ip = request.client.host if request.client else None
    prod = marketplace_service.create_product(db, "usr-kavya-1", data, ip_address=client_ip)
    return {"success": True, "product": prod}


@app.get("/api/campaigns")
def legacy_get_campaigns(db: Session = Depends(get_db)):
    camps = campaign_service.list_campaigns(db, "usr-kavya-1")
    return {"campaigns": camps}


@app.post("/api/campaigns", status_code=status.HTTP_201_CREATED)
def legacy_create_campaign(data: Dict[str, Any], request: Request, db: Session = Depends(get_db)):
    client_ip = request.client.host if request.client else None
    camp = campaign_service.create_campaign(db, "usr-kavya-1", data, ip_address=client_ip)
    return {"success": True, "campaign": camp}


@app.get("/api/notifications")
def legacy_get_notifications(db: Session = Depends(get_db)):
    return notification_service.get_user_notifications(db, "usr-kavya-1")


@app.patch("/api/notifications/{id}/read")
def legacy_mark_notification_read(id: str, db: Session = Depends(get_db)):
    notif = notification_service.mark_notification_as_read(db, "usr-kavya-1", id)
    return {"success": True, "notification": notif}


@app.post("/api/notifications/mark-all-read")
def legacy_mark_all_notifications_read(db: Session = Depends(get_db)):
    res = notification_service.mark_all_as_read(db, "usr-kavya-1")
    return {"success": True, **res}


@app.get("/api/admin/metrics")
def legacy_get_admin_metrics(db: Session = Depends(get_db)):
    return admin_service.get_admin_metrics(db)


# ----------------------------------------------------
# Production SPA Static Files (Fallback)
# ----------------------------------------------------
client_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../client/dist"))
if os.path.exists(client_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(client_dist, "assets")), name="static")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API route not found")
        file_path = os.path.join(client_dist, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(client_dist, "index.html"))
