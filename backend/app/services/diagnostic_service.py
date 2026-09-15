import json
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from backend.app.models.business import Business
from backend.app.models.diagnostic import DiagnosticAssessment, DiagnosticResponse, DiagnosticFactorScore
from backend.app.rules.diagnostic_rules import calculate_diagnostic_score, DIAGNOSTIC_QUESTIONS


def submit_diagnostic(
    db: Session,
    user_id: str,
    business_id: str,
    responses: List[Dict[str, Any]],
    stage: str = "EARLY_TRACTION",
    brand_name: str = "My D2C Brand"
) -> Dict[str, Any]:
    calculated = calculate_diagnostic_score(responses, stage, brand_name)

    # Save to database if db is available
    if db:
        assessment = DiagnosticAssessment(
            business_id=business_id,
            stage=calculated["stage"],
            status="COMPLETED",
            overall_score=calculated["overallScore"],
            confidence=calculated["confidence"],
            confidence_reason=calculated["confidenceReason"],
            scoring_version=calculated["scoringVersion"],
            completed_at=datetime.now(timezone.utc)
        )
        db.add(assessment)
        db.flush()

        for resp in responses:
            k = resp.get("questionKey") or resp.get("id") or resp.get("question_key")
            factor = resp.get("factor") or "MARKETING"
            score_val = resp.get("score") or 0
            ans_val = str(resp.get("answerKey") or f"opt_{score_val}")
            db_resp = DiagnosticResponse(
                assessment_id=assessment.id,
                factor=factor,
                question_key=str(k),
                answer_key=ans_val,
                score=int(score_val)
            )
            db.add(db_resp)

        for factor, details in calculated["factorScores"].items():
            factor_score = DiagnosticFactorScore(
                assessment_id=assessment.id,
                factor=factor,
                score=details["score"],
                weight=details["weight"],
                contribution=details["contribution"],
                status=details["status"]
            )
            db.add(factor_score)

        db.commit()
        calculated["id"] = assessment.id

    return calculated


def get_latest_diagnostic(db: Session, business_id: str) -> Optional[Dict[str, Any]]:
    if not db:
        return None

    assessment = (
        db.query(DiagnosticAssessment)
        .filter(DiagnosticAssessment.business_id == business_id)
        .order_by(DiagnosticAssessment.created_at.desc())
        .first()
    )

    if not assessment:
        return None

    factor_scores = db.query(DiagnosticFactorScore).filter(DiagnosticFactorScore.assessment_id == assessment.id).all()
    responses = db.query(DiagnosticResponse).filter(DiagnosticResponse.assessment_id == assessment.id).all()

    factor_dict = {}
    category_dict = {}
    for fs in factor_scores:
        factor_dict[fs.factor] = {
            "score": fs.score,
            "weight": fs.weight,
            "contribution": fs.contribution,
            "status": fs.status,
            "confidence": assessment.confidence
        }
        category_dict[fs.factor.capitalize()] = fs.score

    # Construct response format
    responses_list = [
        {"questionKey": r.question_key, "answerKey": r.answer_key, "score": r.score, "factor": r.factor}
        for r in responses
    ]

    calculated = calculate_diagnostic_score(responses_list, assessment.stage)
    calculated["id"] = assessment.id
    calculated["overallScore"] = assessment.overall_score
    calculated["confidence"] = assessment.confidence
    calculated["confidenceReason"] = assessment.confidence_reason
    calculated["completedAt"] = assessment.completed_at.isoformat() if assessment.completed_at else None

    return calculated


def get_factor_explanation(db: Session, assessment_id: str, factor_name: str) -> Dict[str, Any]:
    factor_upper = factor_name.upper()
    factor_lower = factor_name.lower()
    questions = DIAGNOSTIC_QUESTIONS.get(factor_lower, [])

    evidences = []
    score = 50
    if db:
        responses = (
            db.query(DiagnosticResponse)
            .filter(DiagnosticResponse.assessment_id == assessment_id, DiagnosticResponse.factor == factor_upper)
            .all()
        )
        resp_map = {r.question_key: r.score for r in responses}
        for q in questions:
            s = resp_map.get(q["key"], 50)
            evidences.append({
                "question": q["title"],
                "key": q["key"],
                "score": s,
                "maxScore": 100
            })
        if responses:
            score = round(sum(r.score for r in responses) / len(responses))
    else:
        for q in questions:
            evidences.append({
                "question": q["title"],
                "key": q["key"],
                "score": 50,
                "maxScore": 100
            })

    return {
        "factor": factor_upper.capitalize(),
        "score": score,
        "status": "High Priority Gap" if score < 60 else "Developing",
        "confidence": "MEDIUM",
        "evidence": evidences
    }
