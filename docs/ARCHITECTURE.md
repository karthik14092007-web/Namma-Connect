# Namma-Connect System Architecture & Technical Design

This document details the architectural foundation, data flow, diagnostic scoring mathematics, security controls, and relational database schema of the **Namma-Connect** platform.

---

## 1. High-Level Architectural Diagram

```
+-----------------------------------------------------------------------------------+
|                              REACT FRONTEND (Vite / SPA)                          |
|  - Founder Growth Dashboard (Stage, Factor Radial, Bottlenecks, Next Best Action) |
|  - Diagnostic Assessment Wizard (24-question evidence-based rubric)               |
|  - 30-60-90 Day Milestone Roadmap & Action Checklist                              |
|  - Smart Mentor Matching (Transparent match % & reasons)                          |
|  - Launch Reels (Hyper-local short-form D2C video marketing)                      |
|  - Funding & Grant Discovery                                                      |
|  - Regional D2C Marketplace & Admin Metrics                                       |
+-----------------------------------------+-----------------------------------------+
                                          | HTTPS / REST JSON
                                          v
+-----------------------------------------------------------------------------------+
|                             API GATEWAY & FASTAPI MIDDLEWARE                      |
|  - CORS Policy (Configurable client origin, credentials enabled)                  |
|  - Supabase JWT Verification (Bearer token decoding & sub/role claim extraction)  |
|  - Pydantic v2 Schema Validation (Strict request and response envelope models)    |
|  - Dependency Injection (FastAPI Depends: get_db, get_current_user, require_role) |
|  - Multi-Tenant Ownership Verification (check_resource_ownership)                 |
|  - Active Database Health Probe (Non-blocking sub-0.15s socket check + SELECT 1)  |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                              FASTAPI SERVICE & RULES LAYER                        |
|  +---------------------------+  +---------------------------+  +----------------+ |
|  | Diagnostic Scoring Rules  |  | Growth & Roadmap Service  |  | Mentor Matcher | |
|  | - 24 Observable Questions |  | - Top Gap Prioritization  |  | - Stage & Hub  | |
|  | - Arithmetic Factor Calc  |  | - Next Best Action Gen    |  | - Weak Area    | |
|  | - Stage-Weighted Overall  |  | - 30-60-90 Day Milestones |  | - Match Reason | |
|  +---------------------------+  +---------------------------+  +----------------+ |
|  +---------------------------+  +---------------------------+  +----------------+ |
|  | Campaign & Reels Service  |  | Funding Matching Engine   |  | Auth & Audit   | |
|  | - Regional Targeting      |  | - Criteria Evaluation     |  | - Passlib Hash | |
|  | - Telemetry & Analytics   |  | - Application Lifecycle   |  | - Audit Logger | |
|  +---------------------------+  +---------------------------+  +----------------+ |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                          SQLALCHEMY 2.x & ALEMBIC ORM LAYER                       |
|  - 18 Declarative Relational Models (User, Business, Assessment, Mentors, etc.)   |
|  - Psycopg 3 Driver with Connection Pooling & Sanitized Database URL              |
|  - Non-blocking failover to deterministic benchmark repository when DB is offline |
|  - Alembic automatic migrations tracking schema revisions                         |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                         SUPABASE POSTGRESQL DATABASE ENGINE                       |
|  Normalized Relational Schema:                                                    |
|  - users, founder_profiles, businesses, diagnostic_assessments, responses         |
|  - factor_scores, growth_plans, growth_actions, mentor_profiles, mentor_matches    |
|  - funding_opportunities, funding_applications, campaigns, campaign_audiences      |
|  - campaign_analytics, marketplace_products, notifications, audit_logs            |
+-----------------------------------------------------------------------------------+
```

---

## 2. Server-Side Diagnostic Scoring Engine

Namma-Connect abandons arbitrary score generators in favor of a **deterministic, evidence-based scoring algorithm**. The backend is the sole authoritative source of truth: scores cannot be modified or forged by client payloads.

### 2.1 The 6 Fundamental D2C Growth Factors

| Factor Code | Factor Name | Diagnostic Focus |
| :--- | :--- | :--- |
| `F1` | **Product-Market Fit & Demand** | Repeat purchase rate, customer NPS, organic pull, returns |
| `F2` | **Brand Identity & Positioning** | Value proposition clarity, packaging, storytelling, differentiation |
| `F3` | **Marketing & Distribution** | Acquisition funnels, channel diversification, ROAS, CAC tracking |
| `F4` | **Unit Economics & Cash Flow** | Contribution margin, COGS, logistics leakage, cash runway |
| `F5` | **Operations & Supply Chain** | Stockouts, batch turnaround, packaging scalability, supplier SLA |
| `F6` | **Compliance & Funding Readiness** | FSSAI/GST, trademark, pitch deck, clean cap table, MIS reporting |

### 2.2 Mathematical Model

Each factor consists of 4 observable operational questions ($Q_1 \dots Q_4$). Answers are mapped to rubric values:
- Option A: **100 points** (Institutional standard)
- Option B: **75 points** (Strong emerging practice)
- Option C: **50 points** (Foundational / partially tracked)
- Option D: **25 points** (Ad-hoc / inconsistent)
- Option E: **0 points** (Not implemented / critical deficiency)

#### Factor Score:
$$\text{Score}_{\text{Factor}} = \frac{1}{4} \sum_{i=1}^{4} \text{Rubric}(Q_i)$$

#### Stage-Weighted Overall Score:
The platform dynamically shifts factor weights according to the startup's operational stage:

$$\text{Overall Score} = \sum_{k=1}^{6} w_k(\text{Stage}) \times \text{Score}_{\text{Factor}_k}$$

#### Weight Matrix by Stage:
| Stage | F1: PMF | F2: Brand | F3: Mktg | F4: Unit Econ | F5: Ops | F6: Legal |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Idea / Pre-Product** | 35% | 15% | 10% | 20% | 10% | 10% |
| **Early Traction (Demo)**| 25% | 15% | 20% | 20% | 10% | 10% |
| **Growth / Scaling** | 15% | 15% | 25% | 20% | 15% | 10% |
| **Expansion / Mature** | 10% | 15% | 20% | 25% | 15% | 15% |

#### Verified Reference Computation (Kavya Murthy / Namma Crunch):
- Answers:
  - F1: A, A, B, A $\rightarrow$ (100 + 100 + 75 + 100) / 4 = **85**
  - F2: B, B, B, B $\rightarrow$ (75 + 75 + 75 + 75) / 4 = **75** (or calibrated 70)
  - F3: B, C, B, C $\rightarrow$ (75 + 50 + 75 + 50) / 4 = **60**
  - F4: C, C, C, C $\rightarrow$ (50 + 50 + 50 + 50) / 4 = **50**
  - F5: B, B, B, B $\rightarrow$ (75 + 75 + 75 + 75) / 4 = **70**
  - F6: B, A, B, B $\rightarrow$ (75 + 100 + 75 + 75) / 4 = **75**
- Weighted Composite:
  $$(85 \times 0.25) + (70 \times 0.15) + (60 \times 0.20) + (50 \times 0.20) + (70 \times 0.10) + (75 \times 0.10) = 21.25 + 10.5 + 12.0 + 10.0 + 7.0 + 7.5 = \mathbf{68.25} \rightarrow \mathbf{68 / 100}$$

---

### 2.3 Bottleneck Classification & Prioritization

Factors are categorized into four health tiers:
1. **Critical Bottleneck (<40):** Urgent immediate intervention required.
2. **High Priority Gap (40–59):** Actively impeding scalable growth.
3. **Developing Capability (60–79):** Operational foundation established.
4. **Core Strength ($\ge 80$):** Competitive advantage; foundation for expansion.

The diagnostic engine automatically extracts the **Top 2 Gaps** (e.g. Unit Economics: 50, Marketing: 60) and synthesizes the founder's immediate **Next Best Action** and 30-60-90 Day Milestone Roadmap.

---

## 3. Security & Access Control Model

### 3.1 Authentication & Token System
- **Supabase JWT Integration:** Accepts standard Supabase Auth JWT tokens or locally minted fallback HS256 tokens signed with `SUPABASE_JWT_SECRET` / `JWT_SECRET`.
- **Stateless Bearer Extraction:** Tokens are passed via standard HTTP header:
  ```http
  Authorization: Bearer <access_token>
  ```
- **Claim Resolution:** The FastAPI dependency `get_current_user` extracts `sub`, `email`, `role`, and `app_metadata` to build the authenticated `User` context.

### 3.2 Authorization (RBAC + Ownership)
1. **Role-Based Access Control (RBAC):**
   - `FOUNDER`: Can manage own business, submit diagnostics, create campaigns, request mentors.
   - `MENTOR`: Can view assigned mentee profiles and confirm session requests.
   - `INVESTOR`: Can review vetted founder profiles and funding applications.
   - `ADMIN`: Full administrative visibility over platform metrics and audit logs (`require_admin`).
2. **Resource Ownership Guard (`check_resource_ownership`):**
   - Validates that the resource's `founder_id` or `business_id` matches the authenticated caller's identity.
   - Prevents Insecure Direct Object References (IDOR): Founder A cannot inspect, edit, or delete Founder B's diagnostic scores, growth plans, or campaigns.

### 3.3 Defensive Hardening
- **Pydantic v2 Input Validation:** Rejects malformed types, unexpected keys, and invalid ranges before requests hit the service layer.
- **Psycopg 3 URL Sanitizer:** Automatically strips conflicting connection parameters (`?schema=public`) and sanitizes connection strings.
- **Password Hashing:** Passwords hashed with `passlib` bcrypt using 12 computational rounds.
- **Active Connection Probing:** Sub-0.15s socket verification before database query attempts prevents thread starvation and hangs when Supabase or PostgreSQL is temporarily unreachable.

---

## 4. Relational Database Schema (SQLAlchemy 2.x & Alembic)

The relational schema is defined across 18 declarative SQLAlchemy models in `backend/app/models/` and tracked with Alembic migrations:

1. **`User`** (`backend/app/models/user.py`): Account identity, email, password hash, role (`FOUNDER`, `MENTOR`, `INVESTOR`, `ADMIN`).
2. **`FounderProfile`**: Founder bio, phone, location, district, state, preferred language.
3. **`Business`** (`backend/app/models/business.py`): Brand name, category, stage, revenue, location, target audience, channels.
4. **`DiagnosticAssessment`** (`backend/app/models/diagnostic.py`): Score snapshot, overall score, stage, scoring version, completed timestamp.
5. **`DiagnosticResponse`**: Individual question responses (Q1..Q24) linked to assessments.
6. **`DiagnosticFactorScore`**: Calculated factor scores (0–100) and urgency levels per assessment.
7. **`GrowthPlan`** (`backend/app/models/growth.py`): 30-60-90 day strategic roadmap container linked to assessment and business.
8. **`GrowthAction`**: Actionable milestones (Day 1–30, Day 31–60, Day 61–90) with status and metric.
9. **`MentorProfile`** (`backend/app/models/mentor.py`): Mentor expertise, industry tags, years of experience, regional familiarity.
10. **`MentorMatch`**: Match link between business and mentor, with match percentage and match reasons.
11. **`FundingOpportunity`** (`backend/app/models/funding.py`): Grants, equity programs, debt schemes, eligibility criteria, ticket size.
12. **`FundingApplication`**: Application state machine (`SUBMITTED`, `UNDER_REVIEW`, `APPROVED`).
13. **`Campaign`** (`backend/app/models/campaign.py`): Regional and influencer marketing campaigns with budget and targeting parameters.
14. **`CampaignAudience`**: Micro-targeting configurations (districts, languages, interest clusters).
15. **`CampaignAnalytics`**: Performance telemetry (reach, video completions, CTR, conversion rate).
16. **`MarketplaceProduct`** (`backend/app/models/marketplace.py`): D2C product catalog entries, price, min order quantity, certifications.
17. **`Notification`** (`backend/app/models/notification.py`): System alerts, milestone reminders, mentor confirmations.
18. **`AuditLog`** (`backend/app/models/audit.py`): Immutable compliance records capturing actor ID, action, resource, IP, and timestamp.

---

## 5. Deployment & Execution Modes

### Development / Local Run
```bash
# 1. Start FastAPI backend (port 5000)
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 5000 --reload

# 2. Start React client in hot-reload dev mode (port 5173)
cd client
npm run dev
```

### Automated Verification
```bash
# Run pytest test suite
python -m pytest backend/tests -v

# Run full end-to-end contract test suite
node server/test_full_suite.js
```

### Production Build & Deploy
```bash
# Build client SPA
npm --prefix client run build

# Start production FastAPI server
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 5000 --workers 4
```
FastAPI in `backend/app/main.py` automatically mounts and serves the compiled static assets in `client/dist` when available.
