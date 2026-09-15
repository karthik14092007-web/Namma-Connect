"""
Authoritative Deterministic Diagnostic Rules Engine - v1
Explainable Rule-Based Prototype (NOT a speculative ML model)
"""

from typing import Dict, List, Any, Tuple

SCORING_VERSION = "v1"

DIAGNOSTIC_FACTORS = [
    {"id": "PRODUCT", "key": "product", "label": "Product", "description": "Product readiness, standardization & iteration speed"},
    {"id": "SALES", "key": "sales", "label": "Sales", "description": "Revenue predictability, sales process & customer economics"},
    {"id": "BRANDING", "key": "branding", "label": "Branding", "description": "Positioning clarity, differentiation & visual identity"},
    {"id": "MARKETING", "key": "marketing", "label": "Marketing", "description": "Customer acquisition, campaign execution & performance tracking"},
    {"id": "REACH", "key": "reach", "label": "Reach", "description": "Audience access, distribution channels & organic discovery"},
    {"id": "FUNDING", "key": "funding", "label": "Funding", "description": "Financial documentation, capital budgeting & investment readiness"}
]

STAGE_WEIGHTS = {
    "IDEA": {
        "PRODUCT": 0.35, "SALES": 0.10, "BRANDING": 0.15, "MARKETING": 0.15, "REACH": 0.15, "FUNDING": 0.10
    },
    "PRE_REVENUE": {
        "PRODUCT": 0.30, "SALES": 0.15, "BRANDING": 0.15, "MARKETING": 0.20, "REACH": 0.10, "FUNDING": 0.10
    },
    "EARLY_TRACTION": {
        "PRODUCT": 0.20, "SALES": 0.20, "BRANDING": 0.15, "MARKETING": 0.20, "REACH": 0.15, "FUNDING": 0.10
    },
    "GROWING": {
        "PRODUCT": 0.15, "SALES": 0.25, "BRANDING": 0.15, "MARKETING": 0.20, "REACH": 0.15, "FUNDING": 0.10
    },
    "ESTABLISHED": {
        "PRODUCT": 0.15, "SALES": 0.25, "BRANDING": 0.15, "MARKETING": 0.20, "REACH": 0.15, "FUNDING": 0.10
    }
}

DIAGNOSTIC_QUESTIONS = {
    "marketing": [
        {
            "id": "mkt_q1", "factor": "MARKETING", "key": "marketing.target_customer",
            "title": "Target Customer Definition", "prompt": "Do you have a clearly defined target customer profile?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_50": 50, "opt_60": 60, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "mkt_q2", "factor": "MARKETING", "key": "marketing.acquisition_channel",
            "title": "Customer Acquisition Channel", "prompt": "Do you have a repeatable customer acquisition channel?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_50": 50, "opt_60": 60, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "mkt_q3", "factor": "MARKETING", "key": "marketing.performance_tracking",
            "title": "Marketing Performance Tracking", "prompt": "Do you track marketing performance and conversion metrics?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_50": 50, "opt_60": 60, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "mkt_q4", "factor": "MARKETING", "key": "marketing.campaign_execution",
            "title": "Campaign Execution", "prompt": "Do you run structured promotional campaigns regularly?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_50": 50, "opt_60": 60, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        }
    ],
    "branding": [
        {
            "id": "brd_q1", "factor": "BRANDING", "key": "branding.positioning_clarity",
            "title": "Brand Positioning", "prompt": "Is your brand positioning clearly defined for your target customer?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_50": 50, "opt_60": 60, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "brd_q2", "factor": "BRANDING", "key": "branding.differentiation",
            "title": "Customer Perception of Difference", "prompt": "Do customers clearly understand why your brand is different from alternatives?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_50": 50, "opt_60": 60, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "brd_q3", "factor": "BRANDING", "key": "branding.visual_identity",
            "title": "Visual Identity Consistency", "prompt": "Is your visual identity consistent across all customer touchpoints?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_50": 50, "opt_60": 60, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "brd_q4", "factor": "BRANDING", "key": "branding.packaging_experience",
            "title": "Packaging & Unboxing Experience", "prompt": "Does your packaging communicate premium quality and brand story?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_50": 50, "opt_60": 60, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        }
    ],
    "sales": [
        {
            "id": "sal_q1", "factor": "SALES", "key": "sales.repeat_rate",
            "title": "Customer Repeat Purchase Rate", "prompt": "What percentage of your sales come from repeat customers?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_50": 50, "opt_60": 60, "opt_70": 70, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "sal_q2", "factor": "SALES", "key": "sales.revenue_predictability",
            "title": "Revenue Predictability", "prompt": "Can you reliably forecast your monthly sales volume?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_50": 50, "opt_60": 60, "opt_70": 70, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "sal_q3", "factor": "SALES", "key": "sales.sales_channel",
            "title": "Sales Channel Diversification", "prompt": "Are you generating revenue from multiple distinct channels?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_50": 50, "opt_60": 60, "opt_70": 70, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "sal_q4", "factor": "SALES", "key": "sales.unit_margins",
            "title": "Gross Contribution Margin", "prompt": "Do you maintain a healthy gross margin after packaging, shipping and discounts?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_50": 50, "opt_60": 60, "opt_70": 70, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        }
    ],
    "product": [
        {
            "id": "prd_q1", "factor": "PRODUCT", "key": "product.market_readiness",
            "title": "Product Quality & Consistency", "prompt": "Is your product batch quality standardized and commercially tested?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_60": 60, "opt_80": 80, "opt_85": 85, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "prd_q2", "factor": "PRODUCT", "key": "product.shelf_life",
            "title": "Shelf-Life & Stability", "prompt": "Has your product undergone shelf-life, packaging, and stability testing?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_60": 60, "opt_80": 80, "opt_85": 85, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "prd_q3", "factor": "PRODUCT", "key": "product.customer_feedback",
            "title": "Customer Feedback Integration", "prompt": "Do you systematically collect customer feedback and iterate on recipes/formulations?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_60": 60, "opt_80": 80, "opt_85": 85, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "prd_q4", "factor": "PRODUCT", "key": "product.certifications",
            "title": "Regulatory & Quality Certifications", "prompt": "Do you hold mandatory licenses (e.g. FSSAI, Udyam, Organic)?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_60": 60, "opt_80": 80, "opt_85": 85, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        }
    ],
    "reach": [
        {
            "id": "rch_q1", "factor": "REACH", "key": "reach.local_density",
            "title": "Local Regional Market Penetration", "prompt": "How strong is your presence in your home district / region?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_60": 60, "opt_70": 70, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "rch_q2", "factor": "REACH", "key": "reach.digital_footprint",
            "title": "Digital & Video Content Footprint", "prompt": "Do you maintain active digital channels showcasing founder & product stories?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_60": 60, "opt_70": 70, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "rch_q3", "factor": "REACH", "key": "reach.retail_partners",
            "title": "Physical Retail / Partner Outlets", "prompt": "Do you have partnerships with local stores, cafes, or retail distributors?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_60": 60, "opt_70": 70, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "rch_q4", "factor": "REACH", "key": "reach.organic_advocacy",
            "title": "Organic Customer Advocacy", "prompt": "Do customers organically share, tag, or recommend your brand without paid incentives?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_60": 60, "opt_70": 70, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        }
    ],
    "funding": [
        {
            "id": "fnd_q1", "factor": "FUNDING", "key": "funding.accounting_books",
            "title": "Financial Record-Keeping & MIS", "prompt": "Do you maintain clean, up-to-date financial records and GST filings?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_60": 60, "opt_75": 75, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "fnd_q2", "factor": "FUNDING", "key": "funding.business_plan",
            "title": "Capital Utilization & Business Plan", "prompt": "Do you have a clear plan detailing how capital will unlock revenue growth?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_60": 60, "opt_75": 75, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "fnd_q3", "factor": "FUNDING", "key": "funding.scheme_awareness",
            "title": "Govt Scheme & Grant Readiness", "prompt": "Have you explored applicable state or central grant/loan schemes?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_60": 60, "opt_75": 75, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        },
        {
            "id": "fnd_q4", "factor": "FUNDING", "key": "funding.pitch_narrative",
            "title": "Founder Pitch & Narrative Clarity", "prompt": "Can you articulate your unit economics and growth trajectory in under 3 minutes?",
            "rubric": {"opt_0": 0, "opt_20": 20, "opt_40": 40, "opt_60": 60, "opt_75": 75, "opt_80": 80, "opt_100": 100, "A": 100, "B": 75, "C": 50, "D": 25, "E": 0}
        }
    ]
}


def get_maturity_level(score: int) -> Dict[str, str]:
    if score >= 95:
        return {"tier": "STRONG", "label": "Strong & Optimized", "color": "emerald"}
    if score >= 80:
        return {"tier": "ESTABLISHED", "label": "Established & Predictable", "color": "emerald"}
    if score >= 60:
        return {"tier": "DEVELOPING", "label": "Developing Stage", "color": "brand"}
    if score >= 40:
        return {"tier": "EARLY_STAGE", "label": "Early Stage", "color": "amber"}
    if score >= 20:
        return {"tier": "AWARENESS", "label": "Awareness Stage", "color": "amber"}
    return {"tier": "NOT_STARTED", "label": "Not Started", "color": "rose"}


def resolve_score_from_answer(question: Dict[str, Any], answer: Any) -> int:
    if answer is None:
        return 0
    if isinstance(answer, (int, float)):
        return max(0, min(100, int(answer)))

    str_ans = str(answer).strip()
    rubric = question.get("rubric", {})
    if str_ans in rubric:
        return rubric[str_ans]

    # Check opt_N format
    if str_ans.startswith("opt_"):
        try:
            return int(str_ans.split("_")[1])
        except (IndexError, ValueError):
            pass

    # Direct numeric string
    try:
        val = int(str_ans)
        return max(0, min(100, val))
    except ValueError:
        pass

    return 0


def calculate_diagnostic_score(
    responses: List[Dict[str, Any]],
    stage: str = "EARLY_TRACTION",
    brand_name: str = "My D2C Brand"
) -> Dict[str, Any]:
    """
    Authoritative calculation engine.
    Completely deterministic - zero randomness, zero fake ML.
    """
    normalized_stage = stage.upper() if stage else "EARLY_TRACTION"
    if normalized_stage not in STAGE_WEIGHTS:
        normalized_stage = "EARLY_TRACTION"

    weights = STAGE_WEIGHTS[normalized_stage]

    # Map responses by key or question id
    response_map = {}
    for r in responses:
        k = r.get("questionKey") or r.get("id") or r.get("question_key")
        if k:
            response_map[k] = r

    factor_results = {}
    category_scores = {}
    factor_evidences = {}
    total_answered_count = 0
    factors = ["PRODUCT", "SALES", "BRANDING", "MARKETING", "REACH", "FUNDING"]

    for factor in factors:
        factor_lower = factor.lower()
        questions = DIAGNOSTIC_QUESTIONS.get(factor_lower, [])
        sum_score = 0
        factor_answered = 0
        evidences = []

        for q in questions:
            user_resp = response_map.get(q["key"]) or response_map.get(q["id"])
            score_val = 0

            if user_resp:
                factor_answered += 1
                total_answered_count += 1
                raw_ans = user_resp.get("answerKey") if user_resp.get("answerKey") is not None else user_resp.get("score")
                score_val = resolve_score_from_answer(q, raw_ans)
            else:
                score_val = 0

            sum_score += score_val
            evidences.append({
                "question": q["title"],
                "key": q["key"],
                "score": score_val,
                "maxScore": 100
            })

        factor_score = round(sum_score / len(questions)) if questions else 0
        factor_weight = weights.get(factor, 0.0)
        contribution = round(factor_score * factor_weight, 2)

        factor_results[factor] = {
            "score": factor_score,
            "weight": factor_weight,
            "contribution": contribution,
            "status": get_maturity_level(factor_score)["label"],
            "confidence": "MEDIUM"
        }
        # Category key with title case for frontend charts: Product, Sales, Branding, Marketing, Reach, Funding
        category_name = factor.capitalize()
        category_scores[category_name] = factor_score
        factor_evidences[factor] = evidences

    # Overall score = sum(contributions)
    overall_score = round(sum(f["contribution"] for f in factor_results.values()))
    overall_score = max(0, min(100, overall_score))

    is_fully_answered = total_answered_count >= 24
    confidence = "MEDIUM" if is_fully_answered else ("MEDIUM" if total_answered_count >= 12 else "LOW")
    confidence_reason = (
        "Based on founder-provided diagnostic responses across all 24 observable readiness signals."
        if is_fully_answered else
        "Based on partial diagnostic responses. Complete all questions for enhanced confidence."
    )

    # Bottleneck detection
    ranked_factors = sorted(factors, key=lambda f: factor_results[f]["score"])
    top_gaps = []

    for f in ranked_factors[:3]:
        score = factor_results[f]["score"]
        if score < 60:
            priority = "Critical Gap"
        elif score < 75:
            priority = "High Priority"
        else:
            priority = "Developing"

        rec = (
            "Define Target Customer & Sharpen Positioning" if f == "MARKETING" else
            ("Establish Consistent Visual Identity" if f == "BRANDING" else
             ("Optimize Repeat Purchases & Margins" if f == "SALES" else
              ("Standardize Batch Turnaround & Shelf Life" if f == "PRODUCT" else
               ("Expand Regional Distribution & Launch Reels" if f == "REACH" else
                "Prepare Working Capital MIS & Scheme Dossier"))))
        )
        top_gaps.append({
            "factor": f,
            "category": f.capitalize(),
            "dimension": f.capitalize(),
            "score": score,
            "priority": priority,
            "recommendation": rec
        })

    # Next best action
    primary_gap = top_gaps[0] if top_gaps else None
    if primary_gap and primary_gap["factor"] == "MARKETING":
        next_best_action = {
            "title": f"Sharpen {brand_name}'s Ideal Customer Profile",
            "priority": "HIGH",
            "reason": "Marketing readiness is limited by lack of repeatable customer acquisition channels.",
            "effort": "LOW",
            "action": "Define Target Customer & Sharpen Positioning"
        }
    elif primary_gap and primary_gap["factor"] == "BRANDING":
        next_best_action = {
            "title": f"Clarify {brand_name}'s D2C Value Proposition",
            "priority": "HIGH",
            "reason": "Brand messaging lacks clear differentiation against established competitors.",
            "effort": "MEDIUM",
            "action": "Establish Consistent Visual Identity"
        }
    else:
        next_best_action = {
            "title": f"Audit {brand_name}'s Unit Economics",
            "priority": "HIGH",
            "reason": "Repeat customer rate and contribution margin require optimization before scale.",
            "effort": "MEDIUM",
            "action": "Optimize Repeat Purchases & Margins"
        }

    return {
        "scoringVersion": SCORING_VERSION,
        "stage": normalized_stage,
        "overallScore": overall_score,
        "confidence": confidence,
        "confidenceReason": confidence_reason,
        "factorScores": factor_results,
        "categoryScores": category_scores,
        "topGaps": top_gaps,
        "nextBestAction": next_best_action,
        "evidences": factor_evidences
    }
