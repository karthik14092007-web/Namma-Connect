# Namma-Connect API Reference Manual (v1)

Welcome to the **Namma-Connect** Production REST API powered by **FastAPI** and **Supabase PostgreSQL**. This document details all available endpoints, authentication mechanisms, validation constraints, error codes, and compatibility routes.

### Interactive API Documentation
- **Swagger Interactive UI:** [http://localhost:5000/docs](http://localhost:5000/docs)
- **ReDoc Manual:** [http://localhost:5000/redoc](http://localhost:5000/redoc)
- **OpenAPI 3.1 JSON Specification:** [http://localhost:5000/openapi.json](http://localhost:5000/openapi.json)

---

## 1. Authentication & Security Architecture

### Base URL
- Production: `https://api.nammaconnect.in/api/v1`
- Development: `http://localhost:5000/api/v1`
- Legacy Compat: `http://localhost:5000/api`

### Token System
- **Access Token:** Short-lived Supabase Auth JWT or HS256 Bearer token signed with `SUPABASE_JWT_SECRET` / `JWT_SECRET`. Transmitted in HTTP Header:
  ```http
  Authorization: Bearer <access_token>
  ```
- **RBAC Roles:** `FOUNDER`, `MENTOR`, `INVESTOR`, `ADMIN`.
- **Multi-Tenant Ownership:** Endpoints mutating or reading business-specific resources enforce `check_resource_ownership` guards to block IDOR / cross-tenant data leaks.

### Standard Response Envelope
Successful responses return JSON with status `200` or `201`:
```json
{
  "success": true,
  "data": { ... }
}
```

### Standard Error Envelope
Failed responses return appropriate HTTP status codes with machine-readable error codes:
```json
{
  "error": "Short description",
  "code": "ERROR_CODE",
  "details": [ ... ]
}
```

| HTTP Status | Code | Meaning |
| :--- | :--- | :--- |
| `400` | `VALIDATION_ERROR` | Request body or query parameters failed Pydantic v2 schema checks |
| `401` | `AUTHENTICATION_REQUIRED` | Missing, malformed, or expired access token |
| `403` | `FORBIDDEN` | Insufficient role or attempt to access another tenant's resource |
| `404` | `NOT_FOUND` | Requested entity does not exist |
| `422` | `UNPROCESSABLE_ENTITY` | Unprocessable entity / type validation failure |
| `500` | `INTERNAL_SERVER_ERROR` | Unhandled server exception |

---

## 2. Authentication Endpoints

### 2.1 Register
`POST /api/v1/auth/register`

Register a new user account (Founder, Mentor, or Investor).

**Request Body:**
```json
{
  "name": "Kavya Murthy",
  "email": "kavya@nammacrunch.in",
  "password": "Password123!",
  "role": "FOUNDER",
  "phone": "+91 98765 43210"
}
```
- `password`: Must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.

**Response (201 Created):**
```json
{
  "success": true,
  "user": {
    "id": "usr_991823",
    "name": "Kavya Murthy",
    "email": "kavya@nammacrunch.in",
    "role": "FOUNDER"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
*Sets `refreshToken` HttpOnly cookie.*

---

### 2.2 Login
`POST /api/v1/auth/login`

Authenticate using email and password.

**Request Body:**
```json
{
  "email": "kavya@nammacrunch.in",
  "password": "Password123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "usr_991823",
    "name": "Kavya Murthy",
    "email": "kavya@nammacrunch.in",
    "role": "FOUNDER",
    "businessId": "biz_102834"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2.3 Refresh Access Token
`POST /api/v1/auth/refresh`

Exchanges the valid `refreshToken` HttpOnly cookie for a fresh 15-minute access token. Implements token rotation.

**Response (200 OK):**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2.4 Logout
`POST /api/v1/auth/logout`

Revokes the refresh token in the database and clears the client cookie.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 2.5 Current Profile
`GET /api/v1/auth/me`
*Requires: `Authorization: Bearer <token>`*

Returns current authenticated user details and profile state.

---

## 3. Business Profile Endpoints

### 3.1 Create Business
`POST /api/v1/business`
*Requires: `Authorization: Bearer <token>`, Role: `FOUNDER`*

**Request Body:**
```json
{
  "brandName": "Namma Crunch",
  "category": "Packaged Food",
  "subCategory": "Healthy Millet Snacks",
  "stage": "EARLY_TRACTION",
  "monthlyRevenue": 140000,
  "location": "Tumakuru, Karnataka",
  "pincode": "572101",
  "district": "Tumakuru",
  "state": "Karnataka",
  "targetAudience": "Health-conscious urban snackers & working professionals",
  "channels": ["Direct-to-Consumer (Shopify)", "Local Retail", "WhatsApp Commerce"]
}
```

---

### 3.2 Get Business Details
`GET /api/v1/business/:id`
*Requires: `Authorization: Bearer <token>`, Ownership or `ADMIN`*

Returns full business profile with latest diagnostic scores and growth plans.

---

## 4. Authoritative Diagnostic Engine

### 4.1 Fetch Assessment Questions
`GET /api/v1/diagnostic/questions`

Returns all 24 observable diagnostic questions categorized by factor, rubric scoring scales, and weight tables.

---

### 4.2 Submit Diagnostic Assessment
`POST /api/v1/diagnostic/submit`
*Requires: `Authorization: Bearer <token>`, Role: `FOUNDER`, Business Ownership*

Accepts raw answer choices (A=100, B=75, C=50, D=25, E=0). Calculates factor scores and stage-weighted composite overall score authoritatively on the server.

**Request Body:**
```json
{
  "businessId": "biz_102834",
  "responses": [
    { "questionId": "F1_Q1", "selectedChoice": "A" },
    { "questionId": "F1_Q2", "selectedChoice": "A" },
    { "questionId": "F1_Q3", "selectedChoice": "B" },
    { "questionId": "F1_Q4", "selectedChoice": "A" },
    { "questionId": "F2_Q1", "selectedChoice": "B" },
    { "questionId": "F2_Q2", "selectedChoice": "B" },
    { "questionId": "F2_Q3", "selectedChoice": "B" },
    { "questionId": "F2_Q4", "selectedChoice": "B" },
    { "questionId": "F3_Q1", "selectedChoice": "B" },
    { "questionId": "F3_Q2", "selectedChoice": "C" },
    { "questionId": "F3_Q3", "selectedChoice": "B" },
    { "questionId": "F3_Q4", "selectedChoice": "C" },
    { "questionId": "F4_Q1", "selectedChoice": "C" },
    { "questionId": "F4_Q2", "selectedChoice": "C" },
    { "questionId": "F4_Q3", "selectedChoice": "C" },
    { "questionId": "F4_Q4", "selectedChoice": "C" },
    { "questionId": "F5_Q1", "selectedChoice": "B" },
    { "questionId": "F5_Q2", "selectedChoice": "B" },
    { "questionId": "F5_Q3", "selectedChoice": "B" },
    { "questionId": "F5_Q4", "selectedChoice": "B" },
    { "questionId": "F6_Q1", "selectedChoice": "B" },
    { "questionId": "F6_Q2", "selectedChoice": "A" },
    { "questionId": "F6_Q3", "selectedChoice": "B" },
    { "questionId": "F6_Q4", "selectedChoice": "B" }
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "assessment": {
    "id": "diag_881239",
    "overallScore": 68,
    "stage": "EARLY_TRACTION",
    "scoringVersion": "v1",
    "factorScores": {
      "productMarketFit": 85,
      "brandIdentity": 70,
      "marketingDistribution": 60,
      "unitEconomics": 50,
      "operationsSupplyChain": 70,
      "complianceFundingReadiness": 75
    },
    "prioritizedGaps": [
      {
        "factor": "unitEconomics",
        "factorName": "Unit Economics & Cash Flow",
        "score": 50,
        "urgency": 2,
        "primaryBottleneck": "Margin dilution from unoptimized logistics and lack of CAC/LTV tracking."
      },
      {
        "factor": "marketingDistribution",
        "factorName": "Marketing & Distribution",
        "score": 60,
        "urgency": 2,
        "primaryBottleneck": "Heavy reliance on word-of-mouth with no repeatable paid or inbound acquisition funnels."
      }
    ],
    "nextBestAction": {
      "title": "Audit Contribution Margin & Fix Tier-2 Shipping Leakage",
      "timeframe": "Next 7 Days",
      "expectedImpact": "+14% Net Realization per SKU"
    }
  }
}
```

---

### 4.3 Latest Diagnostic by Business
`GET /api/v1/diagnostic/business/:businessId/latest`
*Requires: `Authorization: Bearer <token>`, Business Ownership*

Returns the most recent diagnostic assessment and factor breakdown.

---

## 5. Growth Plan & Roadmap Endpoints

### 5.1 Get 30-60-90 Day Roadmap
`GET /api/v1/growth-plan/business/:businessId`
*Requires: `Authorization: Bearer <token>`, Business Ownership*

Returns structured phases (Days 1–30 Foundation, Days 31–60 Traction, Days 61–90 Scale) generated from the diagnostic gaps.

---

### 5.2 Update Action Item Status
`PATCH /api/v1/growth-plan/action/:actionId/status`
*Requires: `Authorization: Bearer <token>`, Business Ownership*

**Request Body:**
```json
{
  "status": "COMPLETED"
}
```
*Valid values: `PENDING`, `IN_PROGRESS`, `COMPLETED`.*

---

## 6. Mentor Matching Endpoints

### 6.1 List Matched Mentors
`GET /api/v1/mentors?businessId=biz_102834`
*Requires: `Authorization: Bearer <token>`*

Returns mentors ranked with match score (0–100%) and explicit rule-based match reasons (e.g. category alignment, weak area expertise, tier-2 D2C experience).

---

### 6.2 Request Mentorship Session
`POST /api/v1/mentors/request`
*Requires: `Authorization: Bearer <token>`, Role: `FOUNDER`*

**Request Body:**
```json
{
  "mentorId": "mnt_501",
  "businessId": "biz_102834",
  "topic": "Unit Economics & CAC optimization for D2C food",
  "notes": "Looking to restructure logistics partnerships."
}
```

---

## 7. Funding Readiness & Schemes Endpoints

### 7.1 List Funding & Grants
`GET /api/v1/funding?businessId=biz_102834`
*Requires: `Authorization: Bearer <token>`*

Returns matched grants, state equity schemes, and seed funds with criteria-matching scores.

---

### 7.2 Apply for Grant / Program
`POST /api/v1/funding/apply`
*Requires: `Authorization: Bearer <token>`, Role: `FOUNDER`*

**Request Body:**
```json
{
  "opportunityId": "fnd_301",
  "businessId": "biz_102834"
}
```

---

## 8. Marketing Campaigns & Launch Reels

### 8.1 Create Micro-Influencer / Regional Campaign
`POST /api/v1/campaigns`
*Requires: `Authorization: Bearer <token>`, Role: `FOUNDER`*

**Request Body:**
```json
{
  "businessId": "biz_102834",
  "title": "Karnataka Regional Food Creators Push",
  "budget": 25000,
  "targetAudience": {
    "regions": ["Bengaluru Urban", "Mysuru", "Hubballi"],
    "interests": ["Healthy Snacks", "Millet Recipes", "Organic Food"],
    "ageRange": "22-45"
  }
}
```

---

### 8.2 Get Campaign Analytics
`GET /api/v1/campaigns/:id/analytics`
*Requires: `Authorization: Bearer <token>`*

Returns impressions, video watch-through rates, CTR, and estimated order conversion.

---

## 9. Marketplace Endpoints

### 9.1 Browse Products
`GET /api/v1/marketplace?category=Packaged+Food&district=Tumakuru`

Filterable public marketplace for B2B distributors and consumers.

---

### 9.2 List New Product
`POST /api/v1/marketplace`
*Requires: `Authorization: Bearer <token>`, Role: `FOUNDER`*

---

## 10. Admin & Platform Analytics

### 10.1 Platform Metrics
`GET /api/v1/admin/metrics`
*Requires: `Authorization: Bearer <token>`, Role: `ADMIN`*

Returns total registered founders, average readiness score, active mentorship matches, and total funding unlocked.

---

### 10.2 Audit Logs
`GET /api/v1/admin/audit-logs?page=1&limit=50`
*Requires: `Authorization: Bearer <token>`, Role: `ADMIN`*

Returns immutable security audit entries with IP, user agent, actor ID, and action performed.

---

## 11. Legacy Frontend Compatibility Routes

To guarantee that the existing React UI components work seamlessly without modification, the following legacy aliases are natively mapped in `server/src/app.js`:

- `GET /api/demo/kavya` -> Returns pre-calculated Kavya founder demo state (68/100 score, roadmap, mentors).
- `POST /api/onboard` -> Legacy onboarding handler mapping answers to diagnostic scoring.
- `GET /api/founders/:id` -> Returns founder and business profile.
- `GET /api/roadmap/:id` -> Returns 30-60-90 day milestone roadmap.
- `GET /api/mentors` -> Returns mentor list.
- `GET /api/funding` -> Returns funding opportunities.
- `GET /api/marketplace` -> Returns marketplace products.
- `GET /api/campaigns` -> Returns campaign listings.
- `GET /api/notifications` -> Returns recent alert notifications.
- `GET /api/admin/metrics` -> Returns aggregate platform metrics.
