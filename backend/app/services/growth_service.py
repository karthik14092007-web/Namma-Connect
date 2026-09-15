from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from backend.app.models.growth_plan import GrowthPlan, GrowthAction


def generate_default_milestones(growth_plan_id: str) -> List[GrowthAction]:
    milestones = [
        # Week 1: Foundation & Bottlenecks
        ("Define Target Customer & Sharpen Brand Messaging", "Create structured customer persona and value proposition statement.", "MARKETING", "CRITICAL", 1, "COMPLETED"),
        ("Audit Packaging & Labeling Compliance", "Review ingredient listings, nutritional panel, and batch codes for FSSAI alignment.", "BRANDING", "HIGH", 1, "IN_PROGRESS"),
        ("Calculate Contribution Margin per SKU", "Document direct ingredient cost, primary packaging, shipping, and payment gateway fees.", "SALES", "HIGH", 1, "NOT_STARTED"),

        # Week 2: Distribution & Marketing Launch
        ("Launch First Hyper-Local Video Campaign (Launch Reels)", "Produce a 30-second founder story highlighting authentic native ingredients.", "REACH", "HIGH", 2, "NOT_STARTED"),
        ("Setup Repeat Purchase Flow on WhatsApp", "Automate post-delivery check-in and re-order discount codes.", "MARKETING", "HIGH", 2, "NOT_STARTED"),
        ("Establish 3 Local Retail Distribution Partnerships", "Place trial consignment snack displays in local health food stores.", "SALES", "DEVELOPING", 2, "NOT_STARTED"),

        # Week 3: Scaling & Optimization
        ("Book Mentorship Session with Category Expert", "Review CAC, organic retention levers, and distribution strategy.", "MENTOR_MATCH", "HIGH", 3, "NOT_STARTED"),
        ("A/B Test Product Imagery & Bundle Offers", "Test 3-pack assortment vs individual SKUs to increase Average Order Value.", "BRANDING", "DEVELOPING", 3, "NOT_STARTED"),
        ("Standardize Batch Turnaround & Shelf Life Testing", "Establish standardized batch manufacturing sheets to reduce turnaround time.", "PRODUCT", "DEVELOPING", 3, "NOT_STARTED"),

        # Week 4: Funding & Working Capital
        ("Submit Application for Eligible State Grant Scheme", "Finalize project report and apply for Innovation Voucher / Mudra support.", "FUNDING", "HIGH", 4, "NOT_STARTED"),
        ("Implement Weekly MIS Cash Flow Tracking", "Track rolling 4-week cash collections against raw material inventory orders.", "SALES", "HIGH", 4, "NOT_STARTED"),
        ("Review Cohort Retention & Month-1 Growth Velocity", "Evaluate 30-day performance and plan next 60-day regional expansion.", "MARKETING", "DEVELOPING", 4, "NOT_STARTED")
    ]

    actions = []
    for title, desc, factor, priority, week, status in milestones:
        actions.append(GrowthAction(
            growth_plan_id=growth_plan_id,
            title=title,
            description=desc,
            factor=factor,
            priority=priority,
            week=week,
            status=status
        ))
    return actions


def get_or_create_growth_plan(db: Session, business_id: str, brand_name: str = "Namma Crunch") -> Dict[str, Any]:
    plan = db.query(GrowthPlan).filter(GrowthPlan.business_id == business_id).first() if db else None

    if not plan and db:
        plan = GrowthPlan(
            business_id=business_id,
            title=f"30-Day Growth Sprint for {brand_name}",
            description="Milestone-driven operational roadmap targeting marketing, unit economics and regional distribution.",
            status="IN_PROGRESS"
        )
        db.add(plan)
        db.flush()

        actions = generate_default_milestones(plan.id)
        for a in actions:
            db.add(a)
        db.commit()

    if db and plan:
        actions = db.query(GrowthAction).filter(GrowthAction.growth_plan_id == plan.id).order_by(GrowthAction.week, GrowthAction.id).all()
        tasks = [
            {
                "id": a.id,
                "title": a.title,
                "description": a.description,
                "factor": a.factor,
                "priority": a.priority,
                "week": a.week,
                "status": "Completed" if a.status == "COMPLETED" else ("In Progress" if a.status == "IN_PROGRESS" else "Pending")
            }
            for a in actions
        ]
        completed = sum(1 for t in tasks if t["status"] == "Completed")
        return {
            "id": plan.id,
            "businessId": plan.business_id,
            "title": plan.title,
            "description": plan.description,
            "status": plan.status,
            "tasks": tasks,
            "progress": {
                "total": len(tasks),
                "completed": completed,
                "percent": round((completed / len(tasks)) * 100) if tasks else 0
            }
        }

    # Fallback simulated plan if db is not connected
    mock_actions = generate_default_milestones("plan-kavya-1")
    tasks = [
        {
            "id": f"task-{i+1}",
            "title": a.title,
            "description": a.description,
            "factor": a.factor,
            "priority": a.priority,
            "week": a.week,
            "status": "Completed" if a.status == "COMPLETED" else ("In Progress" if a.status == "IN_PROGRESS" else "Pending")
        }
        for i, a in enumerate(mock_actions)
    ]
    completed = sum(1 for t in tasks if t["status"] == "Completed")
    return {
        "id": "plan-kavya-1",
        "businessId": business_id,
        "title": f"30-Day Growth Sprint for {brand_name}",
        "description": "Milestone-driven operational roadmap targeting marketing, unit economics and regional distribution.",
        "status": "IN_PROGRESS",
        "tasks": tasks,
        "progress": {
            "total": len(tasks),
            "completed": completed,
            "percent": round((completed / len(tasks)) * 100)
        }
    }


def update_action_status(db: Session, action_id: str, new_status: str) -> Optional[Dict[str, Any]]:
    if not db:
        return {"id": action_id, "status": new_status}

    action = db.query(GrowthAction).filter(GrowthAction.id == action_id).first()
    if not action:
        return None

    mapped_status = "COMPLETED" if new_status.lower() in ["completed", "complete"] else ("IN_PROGRESS" if new_status.lower() in ["in progress", "in_progress"] else "NOT_STARTED")
    action.status = mapped_status
    if mapped_status == "COMPLETED":
        action.completed_at = datetime.now(timezone.utc)
    db.commit()

    all_actions = db.query(GrowthAction).filter(GrowthAction.growth_plan_id == action.growth_plan_id).all()
    completed = sum(1 for a in all_actions if a.status == "COMPLETED")
    return {
        "task": {
            "id": action.id,
            "title": action.title,
            "status": "Completed" if action.status == "COMPLETED" else "Pending"
        },
        "progress": {
            "total": len(all_actions),
            "completed": completed,
            "percent": round((completed / len(all_actions)) * 100) if all_actions else 0
        }
    }
