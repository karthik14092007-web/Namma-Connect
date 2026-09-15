import os
import sys
import logging
from datetime import datetime, timezone

from backend.app.core.database import engine, SessionLocal, Base, check_database_connection
from backend.app.core.security import hash_password
from backend.app.models import (
    User,
    FounderProfile,
    Business,
    DiagnosticAssessment,
    DiagnosticResponse,
    DiagnosticFactorScore,
    GrowthPlan,
    GrowthAction,
    MentorProfile,
    MentorMatch,
    FundingOpportunity,
    FundingApplication,
    Campaign,
    CampaignAudience,
    CampaignAnalytics,
    MarketplaceProduct,
    Notification,
    AuditLog
)
from backend.app.rules.diagnostic_rules import calculate_diagnostic_score

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("namma_connect.seed")


def seed_database():
    logger.info("Checking Supabase PostgreSQL connection...")
    if not check_database_connection():
        logger.warning("Database connection is not active or unreachable. Cannot run database seeder.")
        return False

    logger.info("Creating database tables if not present...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Check if already seeded
        existing_kavya = db.query(User).filter(User.email == "kavya@nammacrunch.in").first()
        if existing_kavya:
            logger.info("Database already seeded with demo persona Kavya.")
            return True

        logger.info("Seeding demo founder: Kavya Narayanan...")
        kavya = User(
            id="usr-kavya-1",
            email="kavya@nammacrunch.in",
            password_hash=hash_password("Password123!"),
            first_name="Kavya",
            last_name="Sundaram",
            role="FOUNDER",
            is_email_verified=True,
            is_active=True
        )
        db.add(kavya)
        db.flush()

        # Admin user
        admin = User(
            id="usr-admin-1",
            email="admin@nammaconnect.in",
            password_hash=hash_password("Admin@123"),
            first_name="Admin",
            last_name="NammaConnect",
            role="ADMIN",
            is_email_verified=True,
            is_active=True
        )
        db.add(admin)

        # Founder profile
        profile = FounderProfile(
            id="fp-kavya-1",
            user_id=kavya.id,
            phone="+91 98401 23456",
            location="Madurai, Tamil Nadu",
            state="Tamil Nadu",
            city="Madurai",
            preferred_language="English, Tamil",
            bio="Second-generation millet entrepreneur modernizing traditional South Indian snacking with zero palm oil."
        )
        db.add(profile)

        # Business
        business = Business(
            id="biz-namma-crunch-1",
            founder_id=kavya.id,
            name="Namma Crunch",
            category="Food & Beverages",
            description="Millet-based healthy snacks slow-roasted with native South Indian grains and zero palm oil.",
            location="Madurai, Tamil Nadu",
            stage="EARLY_TRACTION",
            monthly_revenue="₹1.8L",
            funding_requirement="₹7L",
            website="https://nammacrunch.in",
            is_active=True
        )
        db.add(business)
        db.flush()

        # Diagnostic Assessment (exact 24 responses yielding 68/100)
        demo_answers = [
            {"questionKey": "product.standardization", "score": 80, "answerKey": "opt_80", "factor": "PRODUCT"},
            {"questionKey": "product.purchase_validation", "score": 80, "answerKey": "opt_80", "factor": "PRODUCT"},
            {"questionKey": "product.feedback_collection", "score": 80, "answerKey": "opt_80", "factor": "PRODUCT"},
            {"questionKey": "product.feedback_iteration", "score": 100, "answerKey": "opt_100", "factor": "PRODUCT"},
            {"questionKey": "sales.consistency", "score": 60, "answerKey": "opt_60", "factor": "SALES"},
            {"questionKey": "sales.revenue_tracking", "score": 80, "answerKey": "opt_80", "factor": "SALES"},
            {"questionKey": "sales.defined_process", "score": 80, "answerKey": "opt_80", "factor": "SALES"},
            {"questionKey": "sales.analytics_economics", "score": 60, "answerKey": "opt_60", "factor": "SALES"},
            {"questionKey": "branding.positioning_clarity", "score": 60, "answerKey": "opt_60", "factor": "BRANDING"},
            {"questionKey": "branding.differentiation", "score": 60, "answerKey": "opt_60", "factor": "BRANDING"},
            {"questionKey": "branding.visual_identity", "score": 60, "answerKey": "opt_60", "factor": "BRANDING"},
            {"questionKey": "branding.messaging_story", "score": 60, "answerKey": "opt_60", "factor": "BRANDING"},
            {"questionKey": "marketing.target_customer", "score": 40, "answerKey": "opt_40", "factor": "MARKETING"},
            {"questionKey": "marketing.acquisition_channel", "score": 60, "answerKey": "opt_60", "factor": "MARKETING"},
            {"questionKey": "marketing.performance_tracking", "score": 40, "answerKey": "opt_40", "factor": "MARKETING"},
            {"questionKey": "marketing.campaign_execution", "score": 60, "answerKey": "opt_60", "factor": "MARKETING"},
            {"questionKey": "reach.audience_access", "score": 60, "answerKey": "opt_60", "factor": "REACH"},
            {"questionKey": "reach.distribution_channels", "score": 80, "answerKey": "opt_80", "factor": "REACH"},
            {"questionKey": "reach.organic_discovery", "score": 60, "answerKey": "opt_60", "factor": "REACH"},
            {"questionKey": "reach.geographic_expansion", "score": 80, "answerKey": "opt_80", "factor": "REACH"},
            {"questionKey": "funding.financial_records", "score": 80, "answerKey": "opt_80", "factor": "FUNDING"},
            {"questionKey": "funding.capital_budgeting", "score": 60, "answerKey": "opt_60", "factor": "FUNDING"},
            {"questionKey": "funding.compliance_readiness", "score": 80, "answerKey": "opt_80", "factor": "FUNDING"},
            {"questionKey": "funding.pitch_materials", "score": 80, "answerKey": "opt_80", "factor": "FUNDING"}
        ]

        calculated = calculate_diagnostic_score(demo_answers, "EARLY_TRACTION", "Namma Crunch")
        assessment = DiagnosticAssessment(
            id="diag-kavya-1",
            business_id=business.id,
            stage="EARLY_TRACTION",
            status="COMPLETED",
            overall_score=calculated["overallScore"],
            confidence="MEDIUM",
            confidence_reason=calculated["confidenceReason"],
            scoring_version="v1",
            completed_at=datetime.now(timezone.utc)
        )
        db.add(assessment)
        db.flush()

        for a in demo_answers:
            resp = DiagnosticResponse(
                assessment_id=assessment.id,
                factor=a["factor"],
                question_key=a["questionKey"],
                answer_key=a["answerKey"],
                score=a["score"]
            )
            db.add(resp)

        for factor, details in calculated["factorScores"].items():
            fs = DiagnosticFactorScore(
                assessment_id=assessment.id,
                factor=factor,
                score=details["score"],
                weight=details["weight"],
                contribution=details["contribution"],
                status=details["status"]
            )
            db.add(fs)

        # Growth Plan
        growth_plan = GrowthPlan(
            id="plan-kavya-1",
            business_id=business.id,
            assessment_id=assessment.id,
            title="30-Day Growth Acceleration Plan for Namma Crunch",
            description="Action plan derived from Growth Diagnostic (68/100 • Developing Stage)",
            status="IN_PROGRESS"
        )
        db.add(growth_plan)
        db.flush()

        roadmap_tasks = [
            (1, "MARKETING", "Customer Persona & Acquisition Audit", "Define primary buyer segments and channel unit economics.", "HIGH", "COMPLETED"),
            (1, "BRANDING", "Brand Positioning & Packaging Tagline Review", "Audit consumer perception and sharpen core differentiator.", "HIGH", "COMPLETED"),
            (1, "SALES", "Audit Sales Channels & Monthly Revenue Consistency", "Review B2C vs regional retail distributor volume.", "MEDIUM", "COMPLETED"),
            (2, "MARKETING", "Launch Targeted Customer Acquisition Pilot", "Deploy first video Launch Reel focused on native ingredients.", "HIGH", "IN_PROGRESS"),
            (2, "REACH", "Partner with 3 Regional Artisanal D2C Communities", "Leverage South India conscious consumer networks.", "MEDIUM", "IN_PROGRESS"),
            (2, "FUNDING", "Complete Financial Bookkeeping & GST Filing Records", "Organize audited P&L statement for grant qualification.", "MEDIUM", "NOT_STARTED"),
            (3, "BRANDING", "Establish Visual Identity Guidelines Across Touchpoints", "Standardize typography, brand color codes and labels.", "MEDIUM", "NOT_STARTED"),
            (3, "PRODUCT", "Standardize Customer Review Collection at Checkout", "Automate post-delivery feedback loop on WhatsApp.", "LOW", "NOT_STARTED"),
            (3, "MARKETING", "Set Up Marketing ROI Tracking Dashboard", "Track blend of organic vs paid customer acquisition cost.", "HIGH", "NOT_STARTED"),
            (4, "FUNDING", "Finalize Stand-Up India Grant Pitch Deck", "Prepare collateral-free loan & subsidy submission package.", "HIGH", "NOT_STARTED"),
            (4, "REACH", "Explore Multi-City Logistics Expansion to Bengaluru", "Establish courier agreements for 48-hour delivery.", "MEDIUM", "NOT_STARTED"),
            (4, "SALES", "Review 30-Day CAC, Repeat Order Rate & Margin Targets", "Analyze retention cohort performance and target next milestone.", "HIGH", "NOT_STARTED")
        ]

        for week, factor, title, desc, priority, task_status in roadmap_tasks:
            action = GrowthAction(
                growth_plan_id=growth_plan.id,
                title=title,
                description=desc,
                factor=factor,
                priority=priority,
                week=week,
                status=task_status
            )
            db.add(action)

        # Mentors
        mentors_data = [
            ("mnt-1", "Priya Sharma", "D2C Scaling Mentor, ex-Paper Boat", "Brand Positioning, Retail Packaging, FMCG Distribution", "Packaged Food, Beverages, Consumer Goods", "Early Traction to ₹10Cr ARR", "Bengaluru, Karnataka", "English, Tamil, Hindi", "Online & Hybrid", "Free / Pro-bono", "12+ years scaling regional FMCG brands into national supermarket shelves.", "Available Tuesday & Thursday evenings"),
            ("mnt-2", "Ananya Iyer", "VP Performance Growth, Slurrp Farm", "D2C Customer Acquisition, Launch Reels, Meta Ads", "Healthy Snacks, Organic Foods, Child Nutrition", "₹10L to ₹1Cr Annual Run Rate", "Chennai, Tamil Nadu", "English, Tamil", "Online 1-on-1 Strategy Sprint", "Free for Namma-Connect Cohort", "Specialist in scaling D2C brands profitably with sub-₹500 CAC.", "Next slot: Monday 11:00 AM"),
            ("mnt-3", "Dr. S. Meenakshi", "Head of Quality & Sourcing, CFTRI Advisor", "FSSAI Compliance, Shelf-life Extension, Cold Pressing", "Traditional Grains, Millet Products, Spices", "Standardization to Commercial Scaling", "Madurai, Tamil Nadu", "Tamil, English", "In-person / Lab Consultation", "Free Institutional Mentorship", "Food scientist assisting traditional rural producers standardize natural food formulations.", "Next slot: Wednesday 3:00 PM"),
            ("mnt-4", "Rajesh Kannan", "Founder, Uzhavan Agri-D2C", "Farm-Gate Supply Chain, Tier-2 Logistics, Margin Optimization", "Direct-from-Farm, Value Added Agri-Products", "Bootstrapped to ₹4Cr ARR", "Coimbatore, Tamil Nadu", "Tamil, English", "Online Consultation", "Free / Pro-bono", "Built a direct distribution network across 14 Tamil Nadu towns.", "Next slot: Friday 4:00 PM")
        ]
        for m_id, name, role, exp, ind, stg, loc, lang, mode, fee, bio, avail in mentors_data:
            m = MentorProfile(
                id=m_id,
                name=name,
                role=role,
                expertise=exp,
                industries=ind,
                stage_experience=stg,
                location=loc,
                languages=lang,
                consultation_mode=mode,
                consultation_fee=fee,
                bio=bio,
                availability=avail,
                verified=True
            )
            db.add(m)

        # Funding Opportunities
        funding_data = [
            ("fund-1", "Stand-Up India Scheme", "Ministry of Finance & SIDBI", "Low-interest Composite Loan / Facility", "₹10L", "₹1 Crore", "Women & SC/ST Entrepreneurs in Greenfield Enterprises", "Food & Beverages, Manufacturing, Handicrafts", "Early traction, Growing", "All India (Special fast-track for Tier 2/3 districts)", "https://www.standupmitra.in/", "Ongoing rolling applications"),
            ("fund-2", "Startup India Seed Fund Scheme (SISFS)", "DPIIT, Govt. of India", "Non-dilutive Grant / Convertible Debentures", "₹20L", "₹50L", "Early-stage startups with innovative product/packaging", "Food & Agriculture, Consumer Goods, Bio-products", "Pre-revenue, Early traction", "Pan India (via approved Incubators)", "https://seedfund.startupindia.gov.in/", "Next evaluation batch: in 18 days"),
            ("fund-3", "South Bharat Angel Syndicate", "Regional D2C Angel Network", "Equity Investment (6% - 12%)", "₹15L", "₹50L", "High-potential regional FMCG & D2C consumer brands", "Food & Beverages, Personal Care, Apparel", "Early traction, Growing", "South India focus (TN, Karnataka, Kerala, AP)", "https://nammaconnect.in", "Quarterly pitch day: next month"),
            ("fund-4", "Tamil Nadu EDII Micro-Enterprise Voucher", "Entrepreneurship Development and Innovation Institute (EDII-TN)", "100% Non-repayable Innovation Grant", "₹2L", "₹5L", "Product testing, nutritional certification, and packaging", "Food Processing, Rural Handicrafts, Eco-friendly goods", "Idea, Pre-revenue, Early traction", "Tamil Nadu registered entities", "https://editn.in/", "Rolling monthly"),
            ("fund-5", "Pradhan Mantri Mudra Yojana (Tarun / Kishor)", "Public Sector Banks & NBFCs", "Working Capital & Machinery Term Loan", "₹50K", "₹10L", "Micro manufacturing and small trading units", "All Small Enterprises", "Early traction, Growing", "Pan India", "https://www.mudra.org.in/", "Walk-in / Online through Udyamimitra")
        ]
        for f_id, name, prov, ftype, amin, amax, elig, ind, stg, loc, url, dl in funding_data:
            f = FundingOpportunity(
                id=f_id,
                name=name,
                provider=prov,
                type=ftype,
                amount_min=amin,
                amount_max=amax,
                eligibility=elig,
                industries=ind,
                stages=stg,
                location=loc,
                application_url=url,
                deadline=dl,
                is_active=True
            )
            db.add(f)

        # Products
        prod = MarketplaceProduct(
            id="prod-1",
            business_id=business.id,
            name="Millet Crunch (Spiced Ragi & Foxtail Clusters)",
            description="Crunchy, oven-roasted heirloom millet bites seasoned with traditional South Indian curry leaf spices and cold-pressed oil. 0% preservatives, high fiber, gluten-free.",
            category="Food & Beverages",
            price=240.0,
            original_price=280.0,
            unit="Pack of 2 (150g each)",
            image_url="https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80",
            stock=150,
            is_verified=True,
            is_active=True
        )
        db.add(prod)

        # Campaign
        camp = Campaign(
            id="camp-1",
            business_id=business.id,
            founder_id=kavya.id,
            title="Namma Crunch Launch Sprint",
            description="Targeted D2C Launch Campaign for Artisanal Roasted Millet Mixture in Tamil Nadu & Bengaluru.",
            media_url="https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-bowl-of-healthy-cereals-41680-large.mp4",
            product_id=prod.id,
            campaign_type="PRODUCT_LAUNCH",
            objective="PRODUCT_SALES",
            budget=500.0,
            daily_budget=71.0,
            duration_days=7,
            status="ACTIVE",
            reach=8400,
            relevant_percent=72,
            product_views=680,
            clicks=142,
            conversions=27
        )
        db.add(camp)

        # Notifications
        notif = Notification(
            id="notif-1",
            user_id=kavya.id,
            title="Welcome to Namma-Connect",
            message="Welcome Kavya! Your growth diagnostic and baseline plan have been prepared for Namma Crunch.",
            type="SYSTEM",
            read=False,
            link="/dashboard"
        )
        db.add(notif)

        db.commit()
        logger.info("Successfully seeded Namma-Connect PostgreSQL database!")
        return True
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        db.rollback()
        return False
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
