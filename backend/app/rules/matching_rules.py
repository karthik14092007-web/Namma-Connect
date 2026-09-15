"""
Explainable Mentor, Funding & Campaign Matching Rules
Transparent Heuristic Matchers (Zero Fake ML / Zero Arbitrary Random Numbers)
"""

from typing import Dict, List, Any


def calculate_mentor_match(founder: Dict[str, Any], mentor: Dict[str, Any]) -> Dict[str, Any]:
    score = 0
    reasons = []
    breakdown = {}

    founder_ind = (founder.get("industry") or founder.get("category") or "Food & Beverages").lower()
    mentor_ind = (mentor.get("industries") or "").lower()
    if "food" in mentor_ind or founder_ind in mentor_ind or "food" in founder_ind:
        score += 30
        reasons.append("Direct experience in D2C Healthy Food & Consumer Goods")
        breakdown["sector"] = "Food & Beverage (+30)"
    else:
        score += 15
        reasons.append("Broad D2C retail product experience")
        breakdown["sector"] = "Retail Product (+15)"

    founder_stage = (founder.get("stage") or founder.get("businessStage") or "Early traction").lower()
    mentor_stage = (mentor.get("stageExperience") or mentor.get("stage_experience") or "").lower()
    if "early" in mentor_stage or "traction" in mentor_stage or "early" in founder_stage:
        score += 25
        reasons.append("Proven track record scaling brands through Early Traction")
        breakdown["stage"] = "Early Traction (+25)"
    else:
        score += 15
        breakdown["stage"] = "Growth (+15)"

    mentor_exp = (mentor.get("expertise") or "").lower()
    if any(k in mentor_exp for k in ["marketing", "brand", "growth", "performance"]):
        score += 20
        reasons.append("Specialized expertise in Brand Positioning & D2C Marketing")
        breakdown["functional"] = "Brand & Marketing (+20)"
    else:
        score += 12
        breakdown["functional"] = "Operations (+12)"

    founder_loc = (founder.get("location") or "Tamil Nadu").lower()
    mentor_loc = (mentor.get("location") or "").lower()
    if "tamil" in mentor_loc or "chennai" in mentor_loc or "madurai" in mentor_loc or "tamil" in founder_loc:
        score += 15
        reasons.append("Deep familiarity with Tamil Nadu & South Indian consumer markets")
        breakdown["regional"] = "South India (+15)"
    else:
        score += 8
        breakdown["regional"] = "National (+8)"

    founder_lang = (founder.get("preferredLanguage") or founder.get("preferred_language") or "English").lower()
    mentor_lang = (mentor.get("languages") or "").lower()
    if "tamil" in mentor_lang or founder_lang in mentor_lang:
        score += 10
        reasons.append("Fluent in preferred languages (English, Tamil)")
        breakdown["language"] = "Tamil & English (+10)"
    else:
        score += 5
        breakdown["language"] = "English (+5)"

    final_score = min(100, max(0, score))
    return {
        "matchPercentage": final_score,
        "matchReasons": reasons,
        "matchBreakdown": breakdown
    }


def calculate_funding_match(founder: Dict[str, Any], opportunity: Dict[str, Any]) -> Dict[str, Any]:
    score = 0
    reasons = []

    opp_stages = (opportunity.get("stages") or "").lower()
    founder_stage = (founder.get("stage") or founder.get("businessStage") or "early traction").lower()
    if "early" in opp_stages or "traction" in opp_stages or "all" in opp_stages:
        score += 35
        reasons.append("Eligible for Early Traction stage businesses")
    else:
        score += 20

    opp_loc = (opportunity.get("location") or "").lower()
    founder_loc = (founder.get("location") or "tamil nadu").lower()
    if "tamil nadu" in opp_loc or "pan-india" in opp_loc or "india" in opp_loc:
        score += 35
        reasons.append("Available for enterprises operating in Tamil Nadu")
    else:
        score += 15

    opp_ind = (opportunity.get("industries") or "").lower()
    founder_ind = (founder.get("industry") or founder.get("category") or "food").lower()
    if "food" in opp_ind or "agri" in opp_ind or "all" in opp_ind:
        score += 30
        reasons.append("Directly supports Agri-food and D2C consumer brands")
    else:
        score += 15

    return {
        "matchPercentage": min(100, max(0, score)),
        "reasons": reasons
    }


def calculate_campaign_audience_fit(target_audience: Dict[str, Any], business: Dict[str, Any]) -> int:
    score = 70
    loc = (target_audience.get("locations") or target_audience.get("location") or "").lower()
    biz_loc = (business.get("location") or "").lower()
    if "tamil" in loc or "south" in loc or "tamil" in biz_loc:
        score += 12

    cat = (target_audience.get("category") or target_audience.get("interests") or "").lower()
    biz_cat = (business.get("category") or "").lower()
    if "food" in cat or "snack" in cat or "health" in cat or "food" in biz_cat:
        score += 12

    return min(98, max(50, score))
