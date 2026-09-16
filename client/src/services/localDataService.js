// client/src/services/localDataService.js
// Centralized, pure local deterministic service layer for Namma-Connect
// Zero network requests, 100% reproducible business logic, localStorage persistence

import { KAVYA_DEMO_ANSWERS } from '../scoring/demoAnswers';
import { calculateGrowthDiagnostic } from '../scoring/scoringEngine';
import { detectBottlenecksAndActions } from '../scoring/recommendationEngine';
import { DIAGNOSTIC_QUESTIONS, DIAGNOSTIC_FACTORS } from '../scoring/diagnosticQuestions';

const STORAGE_KEYS = {
  FOUNDER: 'namma_active_founder',
  ANSWERS: 'namma_diagnostic_answers',
  ROADMAP: 'namma_roadmap_tasks',
  NOTIFICATIONS: 'namma_notifications',
  PRODUCTS: 'namma_marketplace_products',
  CAMPAIGNS: 'namma_campaigns',
  MENTOR_BOOKINGS: 'namma_mentor_bookings',
  FUNDING_APPS: 'namma_funding_applications'
};

// -------------------------------------------------------------
// 1. BENCHMARK DEMO PERSONA: KAVYA (NAMMA CRUNCH)
// -------------------------------------------------------------
export const BENCHMARK_KAVYA = {
  id: "founder-kavya-1",
  founderName: "Kavya",
  brandName: "Namma Crunch",
  location: "Madurai, Tamil Nadu",
  industry: "Food & Beverages",
  productCategory: "Healthy snacks (Roasted Millets)",
  websiteUrl: "https://nammacrunch.in",
  instagramHandle: "@nammacrunch",
  businessModel: "D2C Online + Regional Retail",
  businessStage: "Early traction",
  monthlyRevenue: "₹50K–₹2L",
  actualMonthlyRevenue: "₹1.8L",
  salesTrend: "Unpredictable",
  challenges: ["Marketing", "Branding", "Sales", "Distribution"],
  isSeekingFunding: true,
  fundingRequirement: "₹5L–₹10L",
  actualFundingRequirement: "₹7L",
  fundingPurpose: ["Marketing", "Expansion", "Inventory"],
  preferredLanguage: "Tamil / English",
  preferredMentorExpertise: "Performance Marketing & Brand Positioning",
  mentorshipMode: "Online",
  targetCustomer: "Health-conscious families, urban professionals, college students",
  primaryMarket: "Tamil Nadu & Tier 2/3 South India",
  brandStory: "Namma Crunch started in a home kitchen in Madurai, reviving heirloom millet recipes into crispy, wholesome baked snacks with zero palm oil or preservatives.",
  verified: true,
  proofOfWork: true,
  certifications: ["FSSAI Certified", "100% Roasted Not Fried", "Locally Sourced Millets"],
  achievements: [
    "Over 12,000 packs sold across South India",
    "Selected for Madurai Agri-Tech Showcase 2025",
    "4.9/5 customer satisfaction rating across 450+ reviews"
  ]
};

// -------------------------------------------------------------
// 2. DEFAULT ROADMAP MILESTONES (4-Week Growth Sprint)
// -------------------------------------------------------------
export const DEFAULT_ROADMAP_TASKS = [
  // Week 1: Fix Brand Positioning & Primary Bottleneck (Marketing)
  {
    id: "task-1",
    week: 1,
    title: "Define Target Customer Persona & Core Value Proposition",
    description: "Document exact customer pain points (afternoon office snacking) and write 3 tested positioning statements.",
    dimension: "Marketing",
    priority: "High",
    status: "Completed",
    estimatedHours: "4 hrs",
    actionLabel: "Fix Positioning",
    actionUrl: "brand-ai"
  },
  {
    id: "task-2",
    week: 1,
    title: "Audit Packaging & Nutrition Labeling for FSSAI",
    description: "Verify ingredient listing, nutritional information, shelf-life certification, and batch coding.",
    dimension: "Branding",
    priority: "High",
    status: "Completed",
    estimatedHours: "3 hrs",
    actionLabel: "View Compliance",
    actionUrl: "roadmap"
  },
  {
    id: "task-3",
    week: 1,
    title: "Calculate Gross Margin & Packaging Cost per SKU",
    description: "Ensure each roasted millet pouch yields at least 48% contribution margin after packaging and shipping.",
    dimension: "Sales",
    priority: "Medium",
    status: "Pending",
    estimatedHours: "2 hrs",
    actionLabel: "Calculate Margin",
    actionUrl: "roadmap"
  },

  // Week 2: Build Marketing Engine & Launch Reels
  {
    id: "task-4",
    week: 2,
    title: "Publish First Launch Reel with Hyper-Local Targeting",
    description: "Produce a 30-second founder story video highlighting native Tamil Nadu millets with a ₹500 test budget.",
    dimension: "Marketing",
    priority: "High",
    status: "Pending",
    estimatedHours: "5 hrs",
    actionLabel: "Create Reel",
    actionUrl: "launch-reels"
  },
  {
    id: "task-5",
    week: 2,
    title: "Setup WhatsApp Repeat Reorder Flow",
    description: "Send automated delivery check-ins on Day 7 offering a 10% reorder incentive on roasted millet 3-packs.",
    dimension: "Sales",
    priority: "Medium",
    status: "Pending",
    estimatedHours: "3 hrs",
    actionLabel: "Setup Automation",
    actionUrl: "roadmap"
  },
  {
    id: "task-6",
    week: 2,
    title: "Place Consignment Trial in 3 Local Madurai Retailers",
    description: "Introduce counter display racks in health food stores and organic supermarkets in Madurai.",
    dimension: "Reach",
    priority: "Medium",
    status: "Pending",
    estimatedHours: "6 hrs",
    actionLabel: "Manage Retail",
    actionUrl: "marketplace"
  },

  // Week 3: Mentor Review & Conversion Optimization
  {
    id: "task-7",
    week: 3,
    title: "Book 1-on-1 Consultation with D2C Category Mentor",
    description: "Review customer acquisition cost, retention funnels, and retail expansion strategy with Priya Sharma.",
    dimension: "Marketing",
    priority: "High",
    status: "Pending",
    estimatedHours: "1 hr",
    actionLabel: "Book Mentor",
    actionUrl: "mentors"
  },
  {
    id: "task-8",
    week: 3,
    title: "A/B Test 3-Pack Variety Bundle Pricing",
    description: "Test ₹240 individual SKU vs ₹649 3-flavor assortment box to increase Average Order Value (AOV).",
    dimension: "Branding",
    priority: "Medium",
    status: "Pending",
    estimatedHours: "3 hrs",
    actionLabel: "Test Pricing",
    actionUrl: "marketplace"
  },
  {
    id: "task-9",
    week: 3,
    title: "Standardize Batch Turnaround & Supplier SLAs",
    description: "Lock raw millet sourcing contracts with farmer producer organizations (FPOs) to prevent stockouts.",
    dimension: "Product",
    priority: "Low",
    status: "Pending",
    estimatedHours: "4 hrs",
    actionLabel: "Supply Chain",
    actionUrl: "roadmap"
  },

  // Week 4: Funding Readiness & Working Capital
  {
    id: "task-10",
    week: 4,
    title: "Prepare Stand-Up India Scheme Application Dossier",
    description: "Organize Udyam registration, 6-month bank statements, and project machinery expansion report.",
    dimension: "Funding",
    priority: "High",
    status: "Pending",
    estimatedHours: "5 hrs",
    actionLabel: "Apply Scheme",
    actionUrl: "funding"
  },
  {
    id: "task-11",
    week: 4,
    title: "Implement Weekly MIS Cash Flow Tracking Sheet",
    description: "Monitor rolling 30-day cash receipts against raw material inventory payables and roasting machine EMIs.",
    dimension: "Sales",
    priority: "Medium",
    status: "Pending",
    estimatedHours: "2 hrs",
    actionLabel: "Open Tracker",
    actionUrl: "roadmap"
  },
  {
    id: "task-12",
    week: 4,
    title: "Analyze 30-Day Cohort Retention & Regional Traction",
    description: "Calculate 30-day customer reorder rate and identify top-performing postal codes across South India.",
    dimension: "Marketing",
    priority: "Medium",
    status: "Pending",
    estimatedHours: "3 hrs",
    actionLabel: "View Analytics",
    actionUrl: "dashboard"
  }
];

// -------------------------------------------------------------
// 3. DETERMINISTIC MENTOR DATA & MATCHING ENGINE
// -------------------------------------------------------------
export const DEFAULT_MENTORS = [
  {
    id: "mentor-1",
    name: "Priya Sharma",
    title: "Ex-Brand Lead, Epigamia • D2C Growth Advisor",
    bio: "Helped scale 4 food brands from ₹10L to ₹1Cr monthly recurring revenue. Specialist in performance marketing and retail branding.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    location: "Bengaluru (Frequent visits to TN)",
    languages: ["English", "Tamil", "Hindi"],
    specialties: ["Brand positioning", "Performance marketing", "Food & Beverages"],
    yearsOfExperience: 12,
    hourlyRate: 499,
    rating: 4.9,
    reviewsCount: 38,
    matchScore: 94,
    matchReasons: [
      { category: "Stage Match", points: "29/30", description: "Specializes in early traction D2C brands navigating the ₹1L–₹10L/mo revenue transition." },
      { category: "Industry Alignment", points: "20/20", description: "Extensive background in artisanal Food & Beverage packaging, shelf-life, and FSSAI." },
      { category: "Primary Bottleneck Fit", points: "19/20", description: "Matches Kavya's #1 growth gap: Customer Acquisition & Performance Marketing (52/100)." },
      { category: "Regional / Language Fit", points: "15/15", description: "Fluent in Tamil & English; understands South India retail distributor dynamics." },
      { category: "Founder Affordability", points: "11/15", description: "Subsidized startup rate of ₹499/session fits Kavya's budget." }
    ],
    availableSlots: ["Tomorrow at 4:00 PM", "Thursday at 11:00 AM", "Saturday at 5:30 PM"]
  },
  {
    id: "mentor-2",
    name: "Karthik Venkat",
    title: "Founder, GrainStory • D2C FMCG Veteran",
    bio: "Built a millet snack brand with ₹4Cr annual turnover. Expert in regional retail distribution networks and supermarket placement.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    location: "Chennai, Tamil Nadu",
    languages: ["Tamil", "English"],
    specialties: ["Supply chain", "Retail distribution", "Food & Beverages"],
    yearsOfExperience: 15,
    hourlyRate: 799,
    rating: 4.8,
    reviewsCount: 29,
    matchScore: 88,
    matchReasons: [
      { category: "Industry Alignment", points: "20/20", description: "Hands-on experience in millet snack manufacturing, roasting, and dry distribution." },
      { category: "Regional Fit", points: "15/15", description: "Based in Tamil Nadu with active relationships across 80+ regional distributor networks." },
      { category: "Stage Match", points: "27/30", description: "Strong track record guiding early brands to scalable batch production." },
      { category: "Challenge Fit", points: "15/20", description: "Assists with retail channel expansion and distributor margin calculations." },
      { category: "Language Fit", points: "11/15", description: "Tamil native speaker, comfortable mentoring Tier 2/3 founders." }
    ],
    availableSlots: ["Friday at 3:00 PM", "Saturday at 10:00 AM"]
  },
  {
    id: "mentor-3",
    name: "Ananya Roy",
    title: "D2C Creative Director & Packaging Strategist",
    bio: "Designed award-winning sustainable packaging for over 30 D2C brands. Passionate about authentic regional founder storytelling.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    location: "Bengaluru, Karnataka",
    languages: ["English", "Hindi"],
    specialties: ["Brand positioning", "Packaging", "Storytelling"],
    yearsOfExperience: 9,
    hourlyRate: 649,
    rating: 4.9,
    reviewsCount: 24,
    matchScore: 81,
    matchReasons: [
      { category: "Branding Gap Fit", points: "19/20", description: "Directly solves Kavya's #2 bottleneck: Brand Identity & Differentiation (60/100)." },
      { category: "Stage Match", points: "25/30", description: "Assists founders who have product validation but need premium shelf presence." },
      { category: "Industry Alignment", points: "16/20", description: "Proven packaging designs for healthy snacks, granolas, and traditional crisps." },
      { category: "Affordability", points: "12/15", description: "Startup consultation package with actionable 5-point design audit." },
      { category: "Language Fit", points: "9/15", description: "Mentorship conducted in English." }
    ],
    availableSlots: ["Tomorrow at 6:00 PM", "Monday at 2:00 PM"]
  },
  {
    id: "mentor-4",
    name: "Rajesh Kumar",
    title: "Ex-CFO, WayCool • Financial & Grant Advisor",
    bio: "Chartered Accountant specializing in government subsidies, Stand-Up India debt applications, and working capital modeling for agri-food.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    location: "Coimbatore, Tamil Nadu",
    languages: ["Tamil", "English"],
    specialties: ["Unit economics", "Funding readiness", "Agri-Tech"],
    yearsOfExperience: 18,
    hourlyRate: 999,
    rating: 4.7,
    reviewsCount: 42,
    matchScore: 75,
    matchReasons: [
      { category: "Funding Fit", points: "19/20", description: "Expert in Stand-Up India and MUDRA bank paperwork for Kavya's ₹7L capital need." },
      { category: "Regional Fit", points: "15/15", description: "Tamil Nadu native familiar with local state bank credit managers." },
      { category: "Stage Match", points: "22/30", description: "Prepares growing businesses for institutional credit and debt service ratios." },
      { category: "Language Fit", points: "11/15", description: "Bilingual in Tamil and English." },
      { category: "Fee Structure", points: "8/20", description: "Slightly higher rate tailored for advanced financial structuring." }
    ],
    availableSlots: ["Wednesday at 5:00 PM", "Saturday at 11:30 AM"]
  }
];

// -------------------------------------------------------------
// 4. DETERMINISTIC FUNDING DATA & ELIGIBILITY ENGINE
// -------------------------------------------------------------
export const DEFAULT_FUNDING_OPPORTUNITIES = [
  {
    id: "fund-1",
    name: "Stand-Up India Scheme (Greenfield Facility)",
    category: "Government Schemes",
    provider: "Government of India / SIDBI",
    amount: "₹10L – ₹1Cr (Target: ₹10L)",
    type: "Bank Loan / Low Interest",
    equity: "0% (Non-dilutive)",
    description: "Facilitates bank loans between ₹10 lakh and ₹1 crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise in manufacturing or trading.",
    matchScore: 88,
    eligibilityReasons: [
      { criterion: "Woman Entrepreneur", status: "Pass", detail: "Kavya is the primary female founder and majority shareholder." },
      { criterion: "Stage Fit", status: "Pass", detail: "Early traction enterprise with proven product and operational manufacturing." },
      { criterion: "Funding Ticket Fit", status: "Pass", detail: "Kavya's requirement of ₹7L fits neatly within the ₹10L minimum threshold facility." },
      { criterion: "Sector Alignment", status: "Pass", detail: "Food processing and value-added agricultural millet snacks are designated priority sectors." },
      { criterion: "Compliance Status", status: "Pass", detail: "Udyam registered enterprise with active GST and FSSAI certification." }
    ],
    deadline: "Open rolling applications (via scheduled commercial banks)",
    tags: ["Women Entrepreneur", "Food Processing", "Subsidized Interest", "Low Collateral"],
    link: "https://www.standupmitra.in/"
  },
  {
    id: "fund-2",
    name: "Startup India Seed Fund Scheme (SISFS)",
    category: "Grants",
    provider: "DPIIT, Ministry of Commerce & Industry",
    amount: "Up to ₹20 Lakhs",
    type: "Grant / Convertible Debenture",
    equity: "0% for Grant component",
    description: "Financial assistance to early-stage startups for proof of concept, prototype development, product trials, market entry, and commercialization through verified incubators.",
    matchScore: 82,
    eligibilityReasons: [
      { criterion: "DPIIT Recognition", status: "Pass", detail: "Recognized as a registered D2C startup incorporated under 2 years." },
      { criterion: "Traction Evidence", status: "Pass", detail: "Over ₹1.8L monthly revenue with 12,000+ units sold across South India." },
      { criterion: "Innovation / Value Add", status: "Pass", detail: "Reviving native climate-resilient millets into roasted health snacks with zero palm oil." },
      { criterion: "Use of Funds", status: "Pass", detail: "Budget directly allocated to market entry, packaging, and commercialization." }
    ],
    deadline: "Quarterly review cycles",
    tags: ["Seed Grant", "Non-Dilutive", "Incubator Backed", "Market Entry"],
    link: "https://seedfund.startupindia.gov.in/"
  },
  {
    id: "fund-3",
    name: "Tamil Nadu EDII Innovation Voucher Programme (Voucher A)",
    category: "Grants",
    provider: "Entrepreneurship Development and Innovation Institute (EDII-TN)",
    amount: "₹2 Lakhs (Voucher A) / ₹5 Lakhs (Voucher B)",
    type: "State Innovation Grant",
    equity: "0% (Non-dilutive)",
    description: "Financial assistance to MSMEs and startups in Tamil Nadu to support product innovation, testing, and technology validation with academic research institutions.",
    matchScore: 76,
    eligibilityReasons: [
      { criterion: "State Domicile", status: "Pass", detail: "Operating and registered in Madurai, Tamil Nadu." },
      { criterion: "Product Testing", status: "Pass", detail: "Applicable for food lab nutritional testing and extended shelf-life validation." },
      { criterion: "MSME Registration", status: "Pass", detail: "Udyam registration in good standing with state industries center." }
    ],
    deadline: "Monthly batch evaluations",
    tags: ["Tamil Nadu", "State Grant", "Product Innovation", "Lab Testing"],
    link: "https://editn.in/"
  },
  {
    id: "fund-4",
    name: "Pradhan Mantri MUDRA Yojana (Tarun Scheme)",
    category: "Business Loans",
    provider: "MUDRA / Public Sector Banks",
    amount: "₹5 Lakhs – ₹10 Lakhs",
    type: "Working Capital & Term Loan",
    equity: "0% (Non-dilutive)",
    description: "Institutional credit for micro and small enterprises to acquire machinery and expand working capital with collateral-free credit guarantee.",
    matchScore: 70,
    eligibilityReasons: [
      { criterion: "Capital Requirement", status: "Pass", detail: "Matches Kavya's ₹7L machinery and marketing working capital need." },
      { criterion: "Traction & Bank Account", status: "Pass", detail: "Clean bank account track record with verifiable monthly customer receipts." }
    ],
    deadline: "Available on-demand at local bank branches",
    tags: ["Collateral-Free", "Working Capital", "Machinery Expansion"],
    link: "https://www.mudra.org.in/"
  }
];

// -------------------------------------------------------------
// 5. DEFAULT MARKETPLACE PRODUCTS
// -------------------------------------------------------------
export const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    name: "Namma Crunch Roasted Millet Crisps (Assorted 3-Pack)",
    brand: "Namma Crunch",
    founderName: "Kavya",
    category: "Food & Beverages",
    location: "Madurai, Tamil Nadu",
    price: 240,
    unit: "Pack of 3 (150g each)",
    rating: 4.9,
    reviewCount: 450,
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80",
    description: "Crunchy, oven-roasted traditional foxtail and finger millet crisps seasoned with curry leaf and rock salt. 100% roasted, zero palm oil.",
    story: "Reviving native heritage grains from dryland farmers in Southern Tamil Nadu.",
    certifications: ["FSSAI Certified", "100% Roasted", "Zero Preservatives"]
  },
  {
    id: "prod-2",
    name: "Chettinad Cold-Pressed Virgin Sesame Oil",
    brand: "Chettinad Heritage Naturals",
    founderName: "Murugesan P.",
    category: "Food & Beverages",
    location: "Karaikudi, Tamil Nadu",
    price: 380,
    unit: "Bottle of 1 Litre",
    rating: 4.8,
    reviewCount: 180,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80",
    description: "Wood cold-pressed sesame oil extracted using heirloom black sesame seeds with natural palm jaggery.",
    story: "Pressed on traditional wooden vāgai chekku machines without heat or chemical refining.",
    certifications: ["FSSAI Certified", "Wood Cold-Pressed"]
  },
  {
    id: "prod-3",
    name: "Handcrafted Madurai Soapstone Cookware (Kalchatti)",
    brand: "Aalayam Crafts",
    founderName: "Selvaraj M.",
    category: "Handcrafted",
    location: "Madurai, Tamil Nadu",
    price: 850,
    unit: "Medium (2 Litre)",
    rating: 4.9,
    reviewCount: 92,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&auto=format&fit=crop&q=80",
    description: "Pre-seasoned natural soapstone pot that retains heat for hours and enhances traditional South Indian sambar and rasam.",
    story: "Hand-carved by 4th generation stone artisans preserving ancient culinary vessels.",
    certifications: ["Artisan Guild Certified", "100% Natural Stone"]
  },
  {
    id: "prod-4",
    name: "Nilgiris Herb-Infused Gir Cow A2 Desi Ghee",
    brand: "Malai Organics",
    founderName: "Gayathri R.",
    category: "Food & Beverages",
    location: "Coimbatore, Tamil Nadu",
    price: 650,
    unit: "Jar of 500ml",
    rating: 4.7,
    reviewCount: 64,
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=500&auto=format&fit=crop&q=80",
    description: "Traditional bilona churned A2 cultured ghee infused with wild turmeric and moringa blossoms.",
    story: "Sourced from free-grazing indigenous cows in the foothills of the Western Ghats.",
    certifications: ["FSSAI Certified", "A2 Certified"]
  }
];

// -------------------------------------------------------------
// 6. DEFAULT NOTIFICATIONS
// -------------------------------------------------------------
export const DEFAULT_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "⚡ Growth Score Recalculated: 65/100",
    description: "Derived from 24 observable signals. Marketing (52/100) identified as your primary constraint.",
    timestamp: "10 mins ago",
    read: false,
    type: "diagnostic",
    link: "/dashboard",
    icon: "target"
  },
  {
    id: "notif-2",
    title: "🎯 94% Mentor Compatibility Found",
    description: "Priya Sharma (Ex-Brand Lead, Epigamia) matches your Marketing & Brand Positioning growth gap.",
    timestamp: "2 hours ago",
    read: false,
    type: "mentor",
    link: "/mentors",
    icon: "handshake"
  },
  {
    id: "notif-3",
    title: "🏛️ Stand-Up India Scheme Pre-Qualified (88% Fit)",
    description: "Your business meets all criteria for the ₹10L greenfield loan facility with subsidized interest.",
    timestamp: "1 day ago",
    read: false,
    type: "funding",
    link: "/funding",
    icon: "coins"
  }
];

// -------------------------------------------------------------
// 7. DEFAULT CAMPAIGNS (Marketing Hub / Launch Reels)
// -------------------------------------------------------------
export const DEFAULT_CAMPAIGNS = [
  {
    id: "camp-1",
    title: "Madurai Millet Crunch Launch Reel",
    objective: "Direct Orders",
    targetAudience: "Health-conscious families & office workers in Madurai & Southern TN",
    budget: 500,
    status: "Active",
    reach: 8420,
    relevantAudiencePct: 72,
    views: 684,
    clicks: 143,
    conversions: 27,
    roas: "4.2x",
    ctr: "20.9%"
  }
];

// -------------------------------------------------------------
// 8. ADMIN DASHBOARD METRICS
// -------------------------------------------------------------
export const DEFAULT_ADMIN_METRICS = {
  metrics: {
    totalFounders: 143,
    activeBrands: 119,
    mentorConnections: 90,
    fundingMatches: 64,
    productsListed: 48,
    campaignsLaunched: 87
  },
  charts: {
    founderGrowth: [
      { month: 'Apr', founders: 24, brands: 18 },
      { month: 'May', founders: 42, brands: 35 },
      { month: 'Jun', founders: 68, brands: 58 },
      { month: 'Jul', founders: 95, brands: 80 },
      { month: 'Aug', founders: 122, brands: 104 },
      { month: 'Sep', founders: 148, brands: 124 }
    ],
    marketplaceActivity: [
      { category: 'Food & Bev', orders: 420, revenue: 125000 },
      { category: 'Handcrafted', orders: 210, revenue: 84000 },
      { category: 'Fashion', orders: 165, revenue: 98000 },
      { category: 'Home & Life', orders: 130, revenue: 52000 },
      { category: 'Agriculture', orders: 95, revenue: 41000 }
    ],
    fundingApplications: [
      { scheme: 'Stand-Up India', applicants: 45, approved: 18 },
      { scheme: 'SISFS Grants', applicants: 38, approved: 12 },
      { scheme: 'EDII TN Vouchers', applicants: 29, approved: 21 },
      { scheme: 'Mudra Loans', applicants: 52, approved: 34 }
    ]
  }
};

// -------------------------------------------------------------
// HELPER: LOCAL STORAGE READ / WRITE
// -------------------------------------------------------------
function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn(`[localDataService] Failed to read ${key} from localStorage:`, e);
  }
  return fallback;
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[localDataService] Failed to write ${key} to localStorage:`, e);
  }
}

// -------------------------------------------------------------
// LOCAL DATA SERVICE IMPLEMENTATION
// -------------------------------------------------------------
export const localDataService = {
  // Founder Persona & Initial State
  getFounder: () => {
    const saved = readStorage(STORAGE_KEYS.FOUNDER, null);
    if (saved) return saved;

    // Build initial Kavya persona with live deterministic scores
    const answers = readStorage(STORAGE_KEYS.ANSWERS, KAVYA_DEMO_ANSWERS);
    const diag = calculateGrowthDiagnostic(answers, BENCHMARK_KAVYA.businessStage);
    const bottlenecks = detectBottlenecksAndActions(diag.factors);

    const initial = {
      ...BENCHMARK_KAVYA,
      growthScore: diag.overallScore, // 65
      scoreStatus: diag.maturity,
      diagnosticAnswers: answers,
      categoryScores: {
        product: diag.factors.product?.score || 80,
        sales: diag.factors.sales?.score || 70,
        branding: diag.factors.branding?.score || 60,
        marketing: diag.factors.marketing?.score || 52,
        customerReach: diag.factors.reach?.score || 64,
        fundingReadiness: diag.factors.funding?.score || 60
      },
      topGaps: bottlenecks.topGaps
    };

    writeStorage(STORAGE_KEYS.FOUNDER, initial);
    return initial;
  },

  // Save updated founder profile
  saveFounder: (founderData) => {
    writeStorage(STORAGE_KEYS.FOUNDER, founderData);
    return founderData;
  },

  // Reset demo to pure Kavya benchmark
  resetDemo: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.FOUNDER);
      localStorage.removeItem(STORAGE_KEYS.ANSWERS);
      localStorage.removeItem(STORAGE_KEYS.ROADMAP);
      localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.removeItem(STORAGE_KEYS.CAMPAIGNS);
      localStorage.removeItem(STORAGE_KEYS.MENTOR_BOOKINGS);
      localStorage.removeItem(STORAGE_KEYS.FUNDING_APPS);
    } catch (e) {
      console.warn("Reset storage error:", e);
    }
    return localDataService.getFounder();
  },

  // Diagnostic Calculation & Updates
  getDiagnostic: (answersMap, stage = 'Early traction') => {
    const answers = answersMap || readStorage(STORAGE_KEYS.ANSWERS, KAVYA_DEMO_ANSWERS);
    return calculateGrowthDiagnostic(answers, stage);
  },

  // Update a single question answer and recalculate everything
  updateDiagnosticAnswer: (questionId, score, currentFounder) => {
    const existingAnswers = readStorage(STORAGE_KEYS.ANSWERS, { ...KAVYA_DEMO_ANSWERS });
    const updatedAnswers = {
      ...existingAnswers,
      [questionId]: Number(score)
    };
    writeStorage(STORAGE_KEYS.ANSWERS, updatedAnswers);

    const stage = currentFounder?.businessStage || 'Early traction';
    const diag = calculateGrowthDiagnostic(updatedAnswers, stage);
    const bottlenecks = detectBottlenecksAndActions(diag.factors);

    const updatedFounder = {
      ...(currentFounder || BENCHMARK_KAVYA),
      growthScore: diag.overallScore,
      scoreStatus: diag.maturity,
      diagnosticAnswers: updatedAnswers,
      categoryScores: {
        product: diag.factors.product?.score || 80,
        sales: diag.factors.sales?.score || 70,
        branding: diag.factors.branding?.score || 60,
        marketing: diag.factors.marketing?.score || 52,
        customerReach: diag.factors.reach?.score || 64,
        fundingReadiness: diag.factors.funding?.score || 60
      },
      topGaps: bottlenecks.topGaps
    };

    writeStorage(STORAGE_KEYS.FOUNDER, updatedFounder);

    // Also update notification
    localDataService.addNotification({
      title: `⚡ Score Updated: ${diag.overallScore}/100`,
      description: `Signal answer updated. Marketing: ${diag.factors.marketing?.score}/100, Bottleneck: ${bottlenecks.primaryBottleneck?.label}.`,
      type: "diagnostic",
      link: "/dashboard",
      icon: "target"
    });

    return {
      founder: updatedFounder,
      diagnostic: diag,
      bottlenecks: bottlenecks
    };
  },

  // Roadmap Tasks
  getRoadmapTasks: () => {
    return readStorage(STORAGE_KEYS.ROADMAP, DEFAULT_ROADMAP_TASKS);
  },

  toggleRoadmapTask: (taskId) => {
    const currentTasks = localDataService.getRoadmapTasks();
    const updated = currentTasks.map(t =>
      t.id === taskId
        ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" }
        : t
    );
    writeStorage(STORAGE_KEYS.ROADMAP, updated);
    return updated;
  },

  // Mentors
  getMentors: () => {
    return DEFAULT_MENTORS;
  },

  bookMentor: (mentorId, bookingData) => {
    const existing = readStorage(STORAGE_KEYS.MENTOR_BOOKINGS, []);
    const mentor = DEFAULT_MENTORS.find(m => m.id === mentorId) || DEFAULT_MENTORS[0];
    const newBooking = {
      id: `booking-${Date.now()}`,
      mentorId,
      mentorName: mentor.name,
      slot: bookingData.slot || "Upcoming Scheduled Session",
      notes: bookingData.notes || "",
      bookedAt: new Date().toISOString()
    };
    const updated = [newBooking, ...existing];
    writeStorage(STORAGE_KEYS.MENTOR_BOOKINGS, updated);

    // Add notification
    localDataService.addNotification({
      title: `🗓️ Consultation Confirmed with ${mentor.name}`,
      description: `Session scheduled for ${bookingData.slot || 'selected slot'}. Meeting link sent to email.`,
      type: "mentor",
      link: "/mentors",
      icon: "handshake"
    });

    return newBooking;
  },

  // Funding Opportunities
  getFundingOpportunities: () => {
    return DEFAULT_FUNDING_OPPORTUNITIES;
  },

  applyFunding: (opportunityId, applicationData) => {
    const existing = readStorage(STORAGE_KEYS.FUNDING_APPS, []);
    const scheme = DEFAULT_FUNDING_OPPORTUNITIES.find(o => o.id === opportunityId) || DEFAULT_FUNDING_OPPORTUNITIES[0];
    const newApp = {
      id: `app-${Date.now()}`,
      opportunityId,
      schemeName: scheme.name,
      amountRequested: applicationData.amount || scheme.amount,
      status: "Submitted (Under Initial Review)",
      appliedAt: new Date().toISOString()
    };
    writeStorage(STORAGE_KEYS.FUNDING_APPS, [newApp, ...existing]);

    localDataService.addNotification({
      title: `🏛️ Application Submitted: ${scheme.name}`,
      description: `Your stage-fit dossier has been forwarded for document verification.`,
      type: "funding",
      link: "/funding",
      icon: "coins"
    });

    return newApp;
  },

  // Marketplace Products
  getProducts: () => {
    return readStorage(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
  },

  listProduct: (newProduct) => {
    const current = localDataService.getProducts();
    const product = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      brand: newProduct.brand || "Namma Crunch",
      founderName: newProduct.founderName || "Kavya",
      location: newProduct.location || "Madurai, Tamil Nadu"
    };
    const updated = [product, ...current];
    writeStorage(STORAGE_KEYS.PRODUCTS, updated);

    localDataService.addNotification({
      title: `🛍️ New Product Listed: ${product.name}`,
      description: `Listed in Namma-Connect regional D2C Marketplace.`,
      type: "marketplace",
      link: "/marketplace",
      icon: "shopping-bag"
    });

    return updated;
  },

  // Campaigns
  getCampaigns: () => {
    return readStorage(STORAGE_KEYS.CAMPAIGNS, DEFAULT_CAMPAIGNS);
  },

  createCampaign: (campaignData) => {
    const current = localDataService.getCampaigns();
    const newCamp = {
      ...campaignData,
      id: `camp-${Date.now()}`,
      status: "Active",
      reach: 1200,
      relevantAudiencePct: 82,
      views: 94,
      clicks: 18,
      conversions: 3,
      roas: "3.8x",
      ctr: "19.1%"
    };
    const updated = [newCamp, ...current];
    writeStorage(STORAGE_KEYS.CAMPAIGNS, updated);

    localDataService.addNotification({
      title: `🚀 Campaign Launched: ${newCamp.title}`,
      description: `Targeting active audience with budget ₹${newCamp.budget || 500}.`,
      type: "campaign",
      link: "/marketing",
      icon: "rocket"
    });

    return updated;
  },

  // Notifications
  getNotifications: () => {
    return readStorage(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS);
  },

  addNotification: (notif) => {
    const current = localDataService.getNotifications();
    const newNotif = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: "Just now",
      read: false
    };
    const updated = [newNotif, ...current];
    writeStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
    return updated;
  },

  markNotificationRead: (notifId) => {
    const current = localDataService.getNotifications();
    const updated = current.map(n => n.id === notifId ? { ...n, read: true } : n);
    writeStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
    return updated;
  },

  markAllNotificationsRead: () => {
    const current = localDataService.getNotifications();
    const updated = current.map(n => ({ ...n, read: true }));
    writeStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
    return updated;
  },

  // Admin Dashboard Metrics
  getAdminMetrics: () => {
    return DEFAULT_ADMIN_METRICS;
  }
};
