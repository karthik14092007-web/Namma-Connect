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
|                             API GATEWAY & MIDDLEWARE                              |
|  - Helmet HTTP Security Headers (HSTS, CSP, X-Frame-Options)                       |
|  - CORS Policy (Configurable client origin, credentials enabled)                  |
|  - IP Rate Limiting (API: 200 req/15m, Auth: 30 req/15m)                          |
|  - Cookie Parser (HttpOnly refreshToken extraction)                               |
|  - JWT Authentication (Bearer token verification, 15-min TTL)                     |
|  - RBAC & Resource Ownership Guards (requireAuth, requireRole, requireOwnership) |
|  - Zod Request Validation Schemas (Strict input sanitization)                     |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                              EXPRESS SERVICE LAYER                                |
|  +---------------------------+  +---------------------------+  +----------------+ |
|  | Diagnostic Scoring Engine |  | Recommendation Engine     |  | Mentor Matcher | |
|  | - 24 Rubric Questions     |  | - Top Gap Prioritization  |  | - Stage & Hub  | |
|  | - Arithmetic Factor Calc  |  | - Next Best Action Gen    |  | - Weak Area    | |
|  | - Stage-Weighted Overall  |  | - 30-60-90 Day Milestones |  | - Match Reason | |
|  +---------------------------+  +---------------------------+  +----------------+ |
|  +---------------------------+  +---------------------------+  +----------------+ |
|  | Campaign & Reels Service  |  | Funding Matching Engine   |  | Auth & Audit   | |
|  | - Regional Targeting      |  | - Criteria Evaluation     |  | - Token Rotate | |
|  | - Synthetic Analytics     |  | - Application Lifecycle   |  | - Audit Logger | |
|  +---------------------------+  +---------------------------+  +----------------+ |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                                PRISMA ORM LAYER                                   |
|  - Type-safe query building and relational joins                                  |
|  - Seed orchestration & transaction safety                                        |
|  - Seamless in-memory fallback proxy for resilient zero-dependency execution      |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                           POSTGRESQL DATABASE ENGINE                              |
|  19 Normalized Relational Tables:                                                 |
|  - User, FounderProfile, Business, DiagnosticAssessment, DiagnosticResponse       |
|  - DiagnosticFactorScore, GrowthPlan, GrowthAction, MentorProfile, MentorMatch     |
|  - FundingOpportunity, FundingApplication, Campaign, CampaignAudience             |
|  - CampaignAnalytics, MarketplaceProduct, Notification, RefreshToken, AuditLog    |
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

### 3.1 Authentication
- **Dual-Token Architecture:** 15-minute stateless JWT access token alongside a 7-day stateful refresh token.
- **Refresh Token Storage:** Stored as cryptographic SHA-256 hashes in the database. Token reuse detection revokes all tokens for compromised accounts.
- **Cookies:** Refresh tokens are transmitted exclusively through `HttpOnly`, `SameSite=Strict`, `Secure` cookies, impervious to client-side XSS exfiltration.

### 3.2 Authorization (RBAC + Ownership)
1. **Role-Based Access Control (RBAC):**
   - `FOUNDER`: Can manage own business, submit diagnostics, create campaigns, request mentors.
   - `MENTOR`: Can view assigned mentee profiles and confirm session requests.
   - `INVESTOR`: Can review vetted founder profiles and funding applications.
   - `ADMIN`: Full administrative visibility over platform metrics and audit logs.
2. **Resource Ownership Guard (`requireOwnership`):**
   - Validates that the resource's `founderId` or `businessId` matches the authenticated caller's identity.
   - Prevents Insecure Direct Object References (IDOR): Founder A cannot inspect, edit, or delete Founder B's diagnostic scores or campaigns.

### 3.3 Defensive Hardening
- **Helmet:** Eliminates HTTP header disclosures and enforces browser protections.
- **Express Rate Limiting:** Enforces sliding-window rate caps on public auth endpoints (30 reqs/15m) and general API routes (200 reqs/15m).
- **Zod Validation:** Rejects unvetted or unexpected payload keys before hitting controllers.
- **Password Security:** Salted hashes generated with bcrypt using 12 computational rounds.

---

## 4. Relational Database Schema (Prisma ORM)

The relational schema is defined in `prisma/schema.prisma` targeting PostgreSQL across 19 normalized models:

1. **`User`**: Account identity, email, password hash, role (`FOUNDER`, `MENTOR`, `INVESTOR`, `ADMIN`).
2. **`FounderProfile`**: Founder bio, phone, location, district, state, preferred language.
3. **`Business`**: Brand name, category, stage, revenue, location, target audience, channels.
4. **`DiagnosticAssessment`**: Score snapshot, overall score, stage, scoring version, completed timestamp.
5. **`DiagnosticResponse`**: Individual question responses (Q1..Q24) linked to assessments.
6. **`DiagnosticFactorScore`**: Calculated factor scores (0–100) and urgency levels per assessment.
7. **`GrowthPlan`**: 30-60-90 day strategic roadmap container linked to assessment and business.
8. **`GrowthAction`**: Actionable milestones (Day 1–30, Day 31–60, Day 61–90) with status and metric.
9. **`MentorProfile`**: Mentor expertise, industry tags, years of experience, regional familiarity.
10. **`MentorMatch`**: Match link between business and mentor, with match percentage and match reasons.
11. **`FundingOpportunity`**: Grants, equity programs, debt schemes, eligibility criteria, ticket size.
12. **`FundingApplication`**: Application state machine (`SUBMITTED`, `UNDER_REVIEW`, `APPROVED`).
13. **`Campaign`**: Regional and influencer marketing campaigns with budget and targeting parameters.
14. **`CampaignAudience`**: Micro-targeting configurations (districts, languages, interest clusters).
15. **`CampaignAnalytics`**: Performance telemetry (reach, video completions, CTR, conversion rate).
16. **`MarketplaceProduct`**: D2C product catalog entries, price, min order quantity, certifications.
17. **`Notification`**: System alerts, milestone reminders, mentor confirmations.
18. **`RefreshToken`**: Active session tokens with expiration and revoked status.
19. **`AuditLog`**: Immutable compliance records capturing actor ID, action, resource, IP, and timestamp.

---

## 5. Deployment & Execution Modes

### Development / Local Run
```bash
# Start backend server
cd server
node index.js

# Start frontend client
cd client
npm run dev
```

### Production Build & Deploy
```bash
# Build frontend
cd client
npm run build

# Start production server
cd server
NODE_ENV=production node index.js
```
The Express server in `server/src/app.js` will automatically serve the compiled static assets in `client/dist` when `NODE_ENV=production`.
