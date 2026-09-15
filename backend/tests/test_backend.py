import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.core.security import create_access_token
from backend.app.rules.diagnostic_rules import calculate_diagnostic_score

client = TestClient(app)


def test_health_endpoints():
    """Verify v1 and legacy health endpoints return valid JSON and probe status"""
    res_v1 = client.get("/api/v1/health")
    assert res_v1.status_code == 200
    data_v1 = res_v1.json()
    assert "service" in data_v1
    assert data_v1["service"] == "namma-connect-api"
    assert "database" in data_v1
    assert data_v1["database"] in ["connected", "disconnected"]

    res_legacy = client.get("/api/health")
    assert res_legacy.status_code == 200
    data_legacy = res_legacy.json()
    assert data_legacy["status"] == "ok"
    assert data_legacy["service"] == "namma-connect-api"
    assert "database" in data_legacy


def test_kavya_demo_endpoint():
    """Verify Kavya demo persona returns authoritative 68/100 benchmark and gap structure"""
    response = client.get("/api/demo/kavya")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True

    founder = data["founder"]
    assert founder["growthScore"] == 68
    assert founder["brandName"] == "Namma Crunch"
    assert founder["location"] == "Madurai, Tamil Nadu"
    assert founder["industry"] == "Food & Beverages"

    # Category scores
    cat_scores = founder["categoryScores"]
    assert cat_scores["Product"] == 85
    assert cat_scores["Sales"] == 70
    assert cat_scores["Branding"] == 60
    assert cat_scores["Marketing"] == 50
    assert cat_scores["Reach"] == 70
    assert cat_scores["Funding"] == 75

    # Top gaps
    top_gaps = founder["topGaps"]
    assert len(top_gaps) >= 1
    assert top_gaps[0]["dimension"] == "Marketing"
    assert top_gaps[0]["score"] == 50
    assert "Critical" in top_gaps[0]["priority"]

    # Nested data bundle
    assert "business" in data["data"]
    assert "diagnostic" in data["data"]
    assert "mentorMatches" in data["data"]
    assert "fundingMatches" in data["data"]
    assert "campaigns" in data["data"]

    # Verify top mentor match is Priya Sharma (94%)
    mentors = data["data"]["mentorMatches"]
    assert len(mentors) > 0
    top_mentor = mentors[0]
    assert top_mentor["name"] == "Priya Sharma"
    assert top_mentor["matchPercentage"] == 94
    assert "Early Traction" in str(top_mentor["matchBreakdown"]["stage"])

    # Verify funding match
    funding = data["data"]["fundingMatches"]
    assert len(funding) > 0
    assert any("Stand-Up India" in f["name"] and f["matchPercentage"] == 88 for f in funding)

    # Verify campaign audience percent
    campaigns = data["data"]["campaigns"]
    assert len(campaigns) > 0
    assert campaigns[0]["relevantAudiencePercent"] == 72


def test_auth_and_jwt_validation():
    """Verify JWT access token issuance and validation on /api/v1/auth/me"""
    # 1. Accessing /api/v1/auth/me without token -> 401
    unauth = client.get("/api/v1/auth/me")
    assert unauth.status_code == 401

    # 2. Valid Founder Token
    founder_token = create_access_token({
        "sub": "usr-kavya-1",
        "userId": "usr-kavya-1",
        "email": "kavya@nammacrunch.in",
        "role": "FOUNDER"
    })
    headers = {"Authorization": f"Bearer {founder_token}"}
    me_res = client.get("/api/v1/auth/me", headers=headers)
    assert me_res.status_code == 200
    me_data = me_res.json()
    assert me_data["success"] is True
    assert me_data["user"]["email"] == "kavya@nammacrunch.in"
    assert me_data["user"]["role"] == "FOUNDER"


def test_rbac_admin_guard():
    """Verify that only users with ADMIN role can access /api/v1/admin/users"""
    # 1. Founder token should receive 403 Forbidden
    founder_token = create_access_token({
        "sub": "usr-kavya-1",
        "email": "kavya@nammacrunch.in",
        "role": "FOUNDER"
    })
    founder_headers = {"Authorization": f"Bearer {founder_token}"}
    forbidden_res = client.get("/api/v1/admin/users", headers=founder_headers)
    assert forbidden_res.status_code == 403
    assert "Admin" in forbidden_res.json()["error"]

    # 2. Admin token should receive 200 OK
    admin_token = create_access_token({
        "sub": "usr-admin-1",
        "email": "admin@nammaconnect.in",
        "role": "ADMIN"
    })
    admin_headers = {"Authorization": f"Bearer {admin_token}"}
    admin_res = client.get("/api/v1/admin/users", headers=admin_headers)
    assert admin_res.status_code == 200
    assert admin_res.json()["success"] is True
    assert "users" in admin_res.json()


def test_diagnostic_rule_scoring_mathematics():
    """Verify deterministic mathematical calculation without fake ML"""
    demo_answers = [
        {"questionKey": "product.standardization", "score": 80, "factor": "PRODUCT"},
        {"questionKey": "product.purchase_validation", "score": 80, "factor": "PRODUCT"},
        {"questionKey": "product.feedback_collection", "score": 80, "factor": "PRODUCT"},
        {"questionKey": "product.feedback_iteration", "score": 100, "factor": "PRODUCT"},

        {"questionKey": "sales.consistency", "score": 60, "factor": "SALES"},
        {"questionKey": "sales.revenue_tracking", "score": 80, "factor": "SALES"},
        {"questionKey": "sales.defined_process", "score": 80, "factor": "SALES"},
        {"questionKey": "sales.analytics_economics", "score": 60, "factor": "SALES"},

        {"questionKey": "branding.positioning_clarity", "score": 60, "factor": "BRANDING"},
        {"questionKey": "branding.differentiation", "score": 60, "factor": "BRANDING"},
        {"questionKey": "branding.visual_identity", "score": 60, "factor": "BRANDING"},
        {"questionKey": "branding.messaging_story", "score": 60, "factor": "BRANDING"},

        {"questionKey": "marketing.target_customer", "score": 40, "factor": "MARKETING"},
        {"questionKey": "marketing.acquisition_channel", "score": 60, "factor": "MARKETING"},
        {"questionKey": "marketing.performance_tracking", "score": 40, "factor": "MARKETING"},
        {"questionKey": "marketing.campaign_execution", "score": 60, "factor": "MARKETING"},

        {"questionKey": "reach.audience_access", "score": 60, "factor": "REACH"},
        {"questionKey": "reach.distribution_channels", "score": 80, "factor": "REACH"},
        {"questionKey": "reach.organic_discovery", "score": 60, "factor": "REACH"},
        {"questionKey": "reach.geographic_expansion", "score": 80, "factor": "REACH"},

        {"questionKey": "funding.financial_records", "score": 80, "factor": "FUNDING"},
        {"questionKey": "funding.capital_budgeting", "score": 60, "factor": "FUNDING"},
        {"questionKey": "funding.compliance_readiness", "score": 80, "factor": "FUNDING"},
        {"questionKey": "funding.pitch_materials", "score": 80, "factor": "FUNDING"}
    ]

    result = calculate_diagnostic_score(demo_answers, stage="EARLY_TRACTION", brand_name="Namma Crunch")

    assert result["overallScore"] == 68
    assert result["status"] == "Ready for Focused Growth"
    assert result["factorScores"]["PRODUCT"]["score"] == 85
    assert result["factorScores"]["SALES"]["score"] == 70
    assert result["factorScores"]["BRANDING"]["score"] == 60
    assert result["factorScores"]["MARKETING"]["score"] == 50
    assert result["factorScores"]["REACH"]["score"] == 70
    assert result["factorScores"]["FUNDING"]["score"] == 75

    # Top bottleneck must be MARKETING
    assert result["topGaps"][0]["factor"] == "MARKETING"
    assert result["topGaps"][0]["score"] == 50
    assert result["nextBestAction"]["priority"] == "CRITICAL"


def test_compatibility_routes():
    """Verify legacy frontend route compatibility"""
    # /api/mentors
    m_res = client.get("/api/mentors")
    assert m_res.status_code == 200
    assert len(m_res.json()["mentors"]) > 0

    # /api/funding
    f_res = client.get("/api/funding")
    assert f_res.status_code == 200
    assert len(f_res.json()["opportunities"]) > 0

    # /api/marketplace
    mp_res = client.get("/api/marketplace")
    assert mp_res.status_code == 200
    assert len(mp_res.json()["products"]) > 0

    # /api/campaigns
    c_res = client.get("/api/campaigns")
    assert c_res.status_code == 200
    assert len(c_res.json()["campaigns"]) > 0

    # /api/roadmap/usr-kavya-1
    r_res = client.get("/api/roadmap/usr-kavya-1")
    assert r_res.status_code == 200
    assert len(r_res.json()["tasks"]) >= 10

    # /api/notifications
    n_res = client.get("/api/notifications")
    assert n_res.status_code == 200
    assert "unreadCount" in n_res.json()

    # /api/admin/metrics
    a_res = client.get("/api/admin/metrics")
    assert a_res.status_code == 200
    assert a_res.json()["metrics"]["totalFounders"] >= 142
