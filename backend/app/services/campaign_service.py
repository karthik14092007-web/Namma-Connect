import math
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from backend.app.models.campaign import Campaign, CampaignAudience, CampaignAnalytics
from backend.app.models.business import Business
from backend.app.models.notification import Notification
from backend.app.services.audit_service import log_audit

DEFAULT_CAMPAIGNS = [
    {
        "id": "camp-1",
        "businessId": "biz-kavya-1",
        "founderId": "usr-kavya-1",
        "title": "Namma Crunch Launch Sprint",
        "description": "Targeted D2C Launch Campaign for Artisanal Roasted Millet Mixture in Tamil Nadu & Bengaluru.",
        "mediaUrl": "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-bowl-of-healthy-cereals-41680-large.mp4",
        "campaignType": "PRODUCT_LAUNCH",
        "objective": "PRODUCT_SALES",
        "budget": 500.0,
        "dailyBudget": 71.0,
        "durationDays": 7,
        "status": "ACTIVE",
        "reach": 8400,
        "relevantPercent": 72,
        "relevantAudiencePercent": 72,
        "productViews": 680,
        "clicks": 142,
        "conversions": 27
    }
]


def list_campaigns(db: Optional[Session], founder_id: Optional[str] = None) -> List[Dict[str, Any]]:
    campaigns = []
    if db:
        query = db.query(Campaign)
        if founder_id:
            query = query.filter(Campaign.founder_id == founder_id)
        db_camps = query.all()
        for c in db_camps:
            campaigns.append({
                "id": c.id,
                "businessId": c.business_id,
                "founderId": c.founder_id,
                "title": c.title,
                "description": c.description,
                "mediaUrl": c.media_url,
                "campaignType": c.campaign_type,
                "objective": c.objective,
                "budget": c.budget,
                "dailyBudget": c.daily_budget,
                "durationDays": c.duration_days,
                "status": c.status,
                "reach": c.reach,
                "relevantPercent": c.relevant_percent or 72,
                "relevantAudiencePercent": c.relevant_percent or 72,
                "productViews": c.product_views,
                "clicks": c.clicks,
                "conversions": c.conversions
            })

    if not campaigns:
        campaigns = DEFAULT_CAMPAIGNS

    return campaigns


def get_campaign_by_id(db: Optional[Session], campaign_id: str) -> Optional[Dict[str, Any]]:
    if db:
        c = db.query(Campaign).filter(Campaign.id == campaign_id).first()
        if c:
            return {
                "id": c.id,
                "businessId": c.business_id,
                "founderId": c.founder_id,
                "title": c.title,
                "description": c.description,
                "mediaUrl": c.media_url,
                "campaignType": c.campaign_type,
                "objective": c.objective,
                "budget": c.budget,
                "dailyBudget": c.daily_budget,
                "durationDays": c.duration_days,
                "status": c.status,
                "reach": c.reach,
                "relevantPercent": c.relevant_percent or 72,
                "relevantAudiencePercent": c.relevant_percent or 72,
                "productViews": c.product_views,
                "clicks": c.clicks,
                "conversions": c.conversions
            }

    for default_c in DEFAULT_CAMPAIGNS:
        if default_c["id"] == campaign_id:
            return default_c

    return None


def create_campaign(
    db: Session,
    founder_id: str,
    data: Dict[str, Any],
    ip_address: Optional[str] = None
) -> Dict[str, Any]:
    budget = float(data.get("budget", 500.0) or 500.0)
    estimated_reach = round(budget * 16.8)
    estimated_clicks = round(estimated_reach * 0.017)
    estimated_views = round(estimated_clicks * 4.8)
    estimated_conversions = max(1, round(estimated_clicks * 0.19))

    business_id = data.get("businessId")
    if not business_id and db:
        biz = db.query(Business).filter(Business.founder_id == founder_id).first()
        business_id = biz.id if biz else "biz-default"

    camp = Campaign(
        business_id=business_id or "biz-default",
        founder_id=founder_id,
        title=data.get("title", "Targeted Campaign"),
        description=data.get("description", "Targeted D2C Launch Campaign"),
        media_url=data.get("mediaUrl") or data.get("media_url"),
        product_id=data.get("productId") or data.get("product_id"),
        campaign_type=data.get("campaignType", "PRODUCT_LAUNCH"),
        objective=data.get("objective", "PRODUCT_SALES"),
        budget=budget,
        daily_budget=round(budget / 7.0, 1),
        duration_days=7,
        status="ACTIVE",
        reach=estimated_reach,
        relevant_percent=72,
        product_views=estimated_views,
        clicks=estimated_clicks,
        conversions=estimated_conversions
    )

    if db:
        db.add(camp)
        # Create Audience
        aud = CampaignAudience(
            campaign_id=camp.id,
            age_range="20-36",
            locations=data.get("location", "Tamil Nadu & South India"),
            interests=data.get("targetAudience", "Healthy Eating, Desk Snacking"),
            customer_type="Conscious Consumers",
            purchase_intent="High",
            category="Food & Beverage"
        )
        db.add(aud)

        # Create Analytics
        ana = CampaignAnalytics(
            campaign_id=camp.id,
            impressions=estimated_reach,
            views=estimated_views,
            clicks=estimated_clicks,
            engagements=round(estimated_views * 0.4),
            leads=estimated_conversions * 3,
            conversions=estimated_conversions,
            spend=budget
        )
        db.add(ana)

        # Notification
        notif = Notification(
            user_id=founder_id,
            title="Targeted Campaign Live",
            message=f"Your video campaign '{camp.title}' is active (Budget: ₹{budget:.0f}, Est. Reach: {estimated_reach}).",
            type="CAMPAIGN",
            read=False,
            link="/marketing"
        )
        db.add(notif)
        db.commit()
        db.refresh(camp)
        log_audit(db, founder_id, "CAMPAIGN_CREATED", "Campaign", camp.id, ip_address=ip_address)

    return {
        "id": camp.id,
        "businessId": camp.business_id,
        "founderId": camp.founder_id,
        "title": camp.title,
        "description": camp.description,
        "mediaUrl": camp.media_url,
        "campaignType": camp.campaign_type,
        "objective": camp.objective,
        "budget": camp.budget,
        "dailyBudget": camp.daily_budget,
        "durationDays": camp.duration_days,
        "status": camp.status,
        "reach": camp.reach,
        "relevantPercent": 72,
        "relevantAudiencePercent": 72,
        "productViews": camp.product_views,
        "clicks": camp.clicks,
        "conversions": camp.conversions
    }


def get_campaign_analytics(db: Optional[Session], campaign_id: str) -> Optional[Dict[str, Any]]:
    camp = get_campaign_by_id(db, campaign_id)
    if not camp:
        return None

    analytics = None
    if db:
        ana = db.query(CampaignAnalytics).filter(CampaignAnalytics.campaign_id == campaign_id).first()
        if ana:
            analytics = {
                "impressions": ana.impressions,
                "views": ana.views,
                "clicks": ana.clicks,
                "engagements": ana.engagements,
                "leads": ana.leads,
                "conversions": ana.conversions,
                "spend": ana.spend
            }

    if not analytics:
        analytics = {
            "impressions": camp["reach"],
            "views": camp["productViews"],
            "clicks": camp["clicks"],
            "engagements": round(camp["productViews"] * 0.4),
            "leads": camp["conversions"] * 3,
            "conversions": camp["conversions"],
            "spend": camp["budget"]
        }

    return {
        "campaign": camp,
        "analytics": analytics
    }
