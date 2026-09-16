# Namma-Connect — D2C Growth Operating System

> **"Your product is ready. Is your growth strategy?"**

Namma-Connect is a digital growth operating system built for early-stage D2C founders, especially rural entrepreneurs, small-town startups, and unstructured urban brands across Bharat. It transforms raw business information into an actionable 30-day roadmap and connects founders with vetted mentors, stage-appropriate capital, and targeted customers.

---

## 🌟 Core Product Journey

$$\text{Assess} \longrightarrow \text{Diagnose} \longrightarrow \text{Plan} \longrightarrow \text{Match} \longrightarrow \text{Market} \longrightarrow \text{Grow}$$

Every screen answers one pivotal founder question:
- **Dashboard:** *Where am I?*
- **Growth Score:** *What's wrong?*
- **Growth Plan:** *What should I do?*
- **Mentor Match:** *Who can help?*
- **Funding Match:** *Who can fund me?*
- **Marketing Hub:** *Who should I reach?*
- **Marketplace:** *Where can I sell?*

---

## ⚡ Hackathon Demo Persona: Kavya (Namma Crunch)

For instant evaluator testing, a dedicated **"⚡ Load Demo Persona (Kavya)"** button is accessible in the top navigation bar.

| Parameter | Demo Value |
| :--- | :--- |
| **Founder** | Kavya |
| **Brand** | Namma Crunch |
| **Location** | Madurai, Tamil Nadu |
| **Category** | Healthy snacks (Roasted Millets) |
| **Stage** | Early traction |
| **Monthly Revenue** | ₹1.8L (Inconsistent velocity) |
| **Funding Requirement** | ₹7L (Marketing, Expansion, Packaging) |
| **Brand Growth Score** | **68 / 100** (Growth Potential: High) |
| **Top Growth Gap 01** | **Marketing (44/100)** — Paid acquisition underdeveloped |
| **Top Growth Gap 02** | **Branding (57/100)** — Positioning unclear vs national brands |
| **Top Growth Gap 03** | **Sales Growth (63/100)** — Irregular reorder funnels |
| **Top Mentor Match** | **Priya Sharma (94% Match)** — ₹499 / session |
| **Top Funding Fit** | **Stand-Up India Scheme (88% Fit)** — ₹10L Facility |
| **Target Audience Fit** | **Health-conscious families (91% Fit)** |

---

## 🧠 Explainable Matching Algorithm

Namma-Connect implements a transparent, explainable weighted scoring model rather than an opaque black box:

$$\text{Score} = (\text{Stage} \times 30\%) + (\text{Industry} \times 20\%) + (\text{Growth Need} \times 20\%) + (\text{Funding Fit} \times 15\%) + (\text{Location} \times 10\%) + (\text{Language} \times 5\%)$$

Every match card features a **"Why this match? →"** button that reveals:
- Exact points earned in each category (e.g. `Stage: 29/30`, `Industry: 20/20`, `Growth Need: 19/20`, `Location: 9/10`, `Language: 5/5`)
- Qualitative bullet points explaining why the mentor or funding scheme fits the founder's specific bottlenecks.

---

## 🚀 Key Features

1. **High-Impact Landing Page**: Hero with live dashboard preview, 4 core problem cards, and 4-step horizontal workflow.
2. **4-Step Founder Onboarding**: Business information, growth metrics & revenue, funding requirements, and mentorship preferences.
3. **Founder Dashboard**: Brand Growth Score circular gauge, 6-dimension breakdown (Product, Sales, Branding, Marketing, Reach, Funding), and prioritized top 3 gaps with 1-click fixes.
4. **Personalized 30-Day Growth Plan**: 4-week structured timeline with status toggling, priority badges, estimated effort, and completion tracker.
5. **Smart Mentor Matching**: Vetted D2C mentors, consultation fee transparency (₹499/session), and instant booking modal.
6. **Stage-Fit Funding Engine**: Government schemes (Stand-Up India, Mudra, SISFS), innovation grants, and regional angel syndicates with document eligibility checklists.
7. **Founder Marketing Hub**: Micro-campaign builder (₹500 test budget) and prototype campaign analytics dashboard (Reach: 8,420, Relevant: 72%, Views: 684, Clicks: 143, Conversions: 27).
8. **D2C Marketplace**: Regional product showcase (Millet Crunch, Virgin Sesame Oil, Handcrafted Cookware) with founder stories and 1-click listing.
9. **Founder & Mentor Profiles**: Verified Founder and Proof of Work trust badges.
10. **Founder Notifications**: Real-time alerts on score changes, mentor matches, and roadmap progress.
11. **Admin Analytics**: Ecosystem growth metrics, founder registrations, and category revenue charts.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, Recharts
- **Modern Backend API**: Python 3.11+ / FastAPI, Pydantic v2, SQLAlchemy 2.x, Alembic, Supabase Auth (JWT), Uvicorn
- **Database & Auth**: Supabase PostgreSQL + Supabase JWT Auth (with non-blocking active probe and zero-dependency benchmark failover)
- **API Documentation**: Interactive OpenAPI Swagger UI (`/docs`) & ReDoc (`/redoc`)
- **Compatibility Layer**: Complete 1:1 REST contract parity supporting both `/api/v1/...` and legacy `/api/...` endpoints

---

## 🏃 Running the Application

### 1. Install Dependencies
```bash
# Python Backend Dependencies
pip install -r backend/requirements.txt

# React Frontend Dependencies
npm --prefix client install
```

### 2. Configure Environment Variables
Create or verify `backend/.env`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-supabase-jwt-secret
DATABASE_URL=postgresql://postgres:yourpassword@db.yourproject.supabase.co:5432/postgres
PORT=5000
```

### 3. Start the FastAPI Backend (Port 5000)
```bash
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 5000 --reload
```
- API Health: **http://localhost:5000/api/v1/health**
- Kavya Demo Persona: **http://localhost:5000/api/demo/kavya**
- Interactive Swagger UI: **http://localhost:5000/docs**
- ReDoc API Manual: **http://localhost:5000/redoc**

### 4. Start the Frontend Client (Port 5173)
```bash
npm run client
# Or: cd client && npm run dev
```
Open **http://localhost:5173** in your browser. (The Vite dev server proxies `/api` and `/api/v1` calls to `http://localhost:5000`).

### 5. Seed Benchmark Data (Optional)
```bash
python backend/seed.py
```

### 6. Run Automated Verification Tests
```bash
# Run Python Backend Test Suite (Pytest)
python -m pytest backend/tests -v

# Run End-to-End Contract Verification Suite
node server/test_full_suite.js
```
