from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.core.database import get_db
from backend.app.core.dependencies import get_current_user, check_resource_ownership
from backend.app.schemas.diagnostic import AssessmentSubmitRequest, AssessmentResponse
from backend.app.services import diagnostic_service
from backend.app.models.business import Business
from backend.app.rules.diagnostic_rules import DIAGNOSTIC_QUESTIONS

router = APIRouter(tags=["Diagnostics"])


@router.post("/", status_code=status.HTTP_201_CREATED)
def submit_diagnostic(data: AssessmentSubmitRequest, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    business_id = data.businessId
    if not business_id and db:
        biz = db.query(Business).filter(Business.founder_id == current_user["id"]).first()
        business_id = biz.id if biz else "biz-default"

    raw_responses = [r.model_dump() for r in data.responses]
    result = diagnostic_service.submit_diagnostic(
        db=db,
        user_id=current_user["id"],
        business_id=business_id or "biz-default",
        responses=raw_responses,
        stage=data.stage,
        brand_name="My D2C Brand"
    )

    return {
        "success": True,
        "diagnostic": result
    }


@router.get("/questions")
def get_diagnostic_questions():
    return {
        "success": True,
        "questions": DIAGNOSTIC_QUESTIONS
    }


@router.get("/factors/{factor_key}")
def get_factor_explanation(factor_key: str):
    explanation = diagnostic_service.get_factor_explanation(factor_key.upper())
    return {
        "success": True,
        "factor": factor_key.upper(),
        "explanation": explanation
    }


@router.get("/{id}")
def get_diagnostic(id: str, current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    check_resource_ownership("diagnostic", id, current_user, db)
    # Return latest diagnostic for user's business
    biz = db.query(Business).filter(Business.founder_id == current_user["id"]).first() if db else None
    biz_id = biz.id if biz else "biz-kavya-1"
    result = diagnostic_service.get_latest_diagnostic(db, biz_id)
    if not result:
        # Fallback default benchmark diagnostic
        result = diagnostic_service.submit_diagnostic(
            db=None,
            user_id=current_user["id"],
            business_id=biz_id,
            responses=[{"questionKey": "mkt_1", "score": 50}],
            stage="EARLY_TRACTION"
        )

    return {
        "success": True,
        "diagnostic": result
    }
