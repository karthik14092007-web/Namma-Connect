// server/data/seedData.js

const demoFounder = {
  id: "founder-kavya-1",
  founderName: "Kavya",
  brandName: "Namma Crunch",
  location: "Madurai, Tamil Nadu",
  industry: "Food & Beverages",
  productCategory: "Healthy snacks",
  websiteUrl: "https://nammacrunch.in",
  instagramHandle: "@nammacrunch",
  businessModel: "D2C + Regional Retail",
  businessStage: "Early traction", // Options: Idea, Pre-revenue, Early traction, Growing, Scaling
  monthlyRevenue: "₹50K–₹2L", // Options: Pre-revenue, ₹0–50K, ₹50K–₹2L, ₹2L–₹5L, ₹5L+
  actualMonthlyRevenue: "₹1.8L",
  salesTrend: "Unpredictable", // Options: Growing, Stable, Declining, Unpredictable
  challenges: ["Marketing", "Sales", "Branding", "Distribution"],
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
  ],
  growthScore: 68,
  scoreStatus: "Growth Potential: High",
  categoryScores: {
    product: 85,
    sales: 70,
    branding: 60,
    marketing: 50,
    customerReach: 70,
    fundingReadiness: 75
  },
  topGaps: [
    {
      id: "gap-1",
      dimension: "Marketing",
      score: 50,
      diagnosis: "Your customer acquisition strategy relies on ad-hoc posts without a measured, repeatable channel.",
      actionText: "Fix this",
      actionUrl: "/marketing"
    },
    {
      id: "gap-2",
      dimension: "Branding",
      score: 60,
      diagnosis: "Brand packaging and digital storytelling do not clearly communicate your health benefits compared with national legacy snack brands.",
      actionText: "Improve branding",
      actionUrl: "/roadmap"
    },
    {
      id: "gap-3",
      dimension: "Sales Growth",
      score: 63,
      diagnosis: "Revenue is ₹1.8L/month but month-on-month velocity is inconsistent without predictable reorder funnels and wholesale subscriptions.",
      actionText: "View strategy",
      actionUrl: "/roadmap"
    }
  ]
};

const seedMentors = [
  {
    id: "mentor-1",
    name: "Priya Sharma",
    title: "D2C Growth & Performance Marketing Mentor",
    experienceYears: 12,
    rating: 4.9,
    reviewsCount: 48,
    startupsSupported: 34,
    location: "Bengaluru / Chennai",
    languages: ["English", "Tamil", "Hindi"],
    consultationFee: "₹499 / session",
    feeAmount: 499,
    availability: "Available this week (Mon, Wed, Sat)",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    specialties: ["Consumer brands", "Performance marketing", "Brand positioning", "D2C Retargeting"],
    industries: ["Food & Beverages", "Beauty & Personal Care", "Consumer FMCG"],
    stageFocus: ["Early traction", "Growing"],
    proofOfWork: "Ex-Growth Lead at Epigamia & Advisor to 5 profitable D2C brands generating ₹10Cr+ ARR.",
    bio: "Passionate about helping tier-2 and tier-3 consumer founders build scalable acquisition engines without wasting ad spend.",
    matchReasons: [
      "Same industry: Food & Beverages consumer brand",
      "Tailored for Early Traction stage",
      "Direct expertise in your #1 growth gap: Performance Marketing",
      "Speaks Tamil & English for seamless communication",
      "Hands-on experience scaling regional snack brands"
    ],
    matchBreakdown: {
      industry: { score: 20, max: 20 },
      stage: { score: 30, max: 30 },
      growthNeed: { score: 19, max: 20 },
      location: { score: 10, max: 10 },
      language: { score: 10, max: 10 },
      experience: { score: 5, max: 5 },
      totalScore: 94
    }
  },
  {
    id: "mentor-2",
    name: "Rajesh Kumar",
    title: "D2C Operations & Supply Chain Strategist",
    experienceYears: 15,
    rating: 4.8,
    reviewsCount: 39,
    startupsSupported: 28,
    location: "Coimbatore, Tamil Nadu",
    languages: ["Tamil", "English"],
    consultationFee: "₹699 / session",
    feeAmount: 699,
    availability: "Available Tue & Thu evenings",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
    specialties: ["Supply chain optimization", "Packaging shelf-life", "Margin expansion", "Regional distribution"],
    industries: ["Food & Beverages", "Agriculture", "FMCG"],
    stageFocus: ["Early traction", "Growing", "Scaling"],
    proofOfWork: "Built supply chain for South India's premier organic foods brand, reduced shipping damage by 42%.",
    bio: "Helps food founders preserve product freshness, streamline procurement from local farmers, and maintain unit economics as order volume scales.",
    matchReasons: [
      "Deep roots in Tamil Nadu regional food ecosystem",
      "Specializes in shelf-life packaging and distribution",
      "Strong support for early-stage food manufacturing",
      "Fluent in Tamil"
    ],
    matchBreakdown: {
      industry: { score: 20, max: 20 },
      stage: { score: 25, max: 30 },
      growthNeed: { score: 15, max: 20 },
      location: { score: 10, max: 10 },
      language: { score: 10, max: 10 },
      experience: { score: 5, max: 5 },
      totalScore: 85
    }
  },
  {
    id: "mentor-3",
    name: "Ananya Iyer",
    title: "Brand Storytelling & Packaging Strategist",
    experienceYears: 9,
    rating: 5.0,
    reviewsCount: 52,
    startupsSupported: 41,
    location: "Chennai / Remote",
    languages: ["English", "Tamil"],
    consultationFee: "₹499 / session",
    feeAmount: 499,
    availability: "Available weekends & weekday slots",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    specialties: ["Visual identity", "Packaging design", "Founder storytelling", "Customer retention"],
    industries: ["Food & Beverages", "Handcrafted", "Beauty", "Lifestyle"],
    stageFocus: ["Idea", "Pre-revenue", "Early traction"],
    proofOfWork: "Award-winning designer behind rebrands for 8 prominent artisanal South Indian consumer exports.",
    bio: "Believes authenticity is the biggest moat for Indian heritage brands. I help you stand out on retail shelves and Instagram feeds.",
    matchReasons: [
      "Directly addresses your #2 gap: Brand Positioning & Packaging",
      "Specializes in heritage Indian food & lifestyle products",
      "Helps craft compelling narrative for urban buyers",
      "High rating across 40+ early founders"
    ],
    matchBreakdown: {
      industry: { score: 20, max: 20 },
      stage: { score: 28, max: 30 },
      growthNeed: { score: 18, max: 20 },
      location: { score: 10, max: 10 },
      language: { score: 9, max: 10 },
      experience: { score: 4, max: 5 },
      totalScore: 89
    }
  },
  {
    id: "mentor-4",
    name: "Vikram Sundaram",
    title: "Early-Stage D2C Angel & Capital Advisor",
    experienceYears: 14,
    rating: 4.9,
    reviewsCount: 31,
    startupsSupported: 22,
    location: "Bengaluru, Karnataka",
    languages: ["English", "Tamil", "Kannada"],
    consultationFee: "₹799 / session",
    feeAmount: 799,
    availability: "Limited slots (Friday)",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    specialties: ["Pitch deck refinement", "Unit economics", "Govt grants", "Angel fundraising"],
    industries: ["Consumer Tech", "Food & Beverages", "D2C"],
    stageFocus: ["Early traction", "Growing"],
    proofOfWork: "Angel investor in 9 consumer startups; former VC partner focused on Tier-2 consumer innovations.",
    bio: "Helps founders bridge the gap from small-town business to venture-backed or grant-funded brand with bulletproof financial discipline.",
    matchReasons: [
      "Directly aligns with your ₹7L funding requirement",
      "Guides on govt grants vs angel equity trade-offs",
      "Strong network across South Indian angel syndicates"
    ],
    matchBreakdown: {
      industry: { score: 18, max: 20 },
      stage: { score: 27, max: 30 },
      growthNeed: { score: 16, max: 20 },
      location: { score: 8, max: 10 },
      language: { score: 8, max: 10 },
      experience: { score: 5, max: 5 },
      totalScore: 82
    }
  }
];

const seedFundingOpportunities = [
  {
    id: "funding-1",
    provider: "Stand-Up India Scheme",
    organization: "Ministry of Finance & SIDBI",
    category: "Government Schemes", // Categories: Angel Investors, Seed Funds, Grants, Government Schemes, Business Loans, Microfinance
    fundingRange: "₹10L – ₹1 Crore",
    type: "Low-interest Composite Loan / Facility",
    eligibleStages: ["Early traction", "Growing"],
    matchPercentage: 88,
    targetFocus: "Women & SC/ST Entrepreneurs in Greenfield Enterprises",
    deadline: "Ongoing rolling applications",
    locationScope: "All India (Special fast-track for Tier 2/3 districts)",
    industryScope: ["Food & Beverages", "Manufacturing", "Handicrafts", "Services"],
    reasons: [
      "Woman-led enterprise priority quota",
      "Matches your food production & packaging facility expansion",
      "Subsidized interest rate with collateral support under CGFSIL",
      "Perfect fit for ₹5L–₹10L+ funding ticket"
    ],
    breakdown: {
      businessStage: 28,
      industryMatch: 20,
      fundingFit: 15,
      eligibility: 15,
      location: 10,
      totalScore: 88
    },
    actionUrl: "https://www.standupmitra.in/"
  },
  {
    id: "funding-2",
    provider: "Startup India Seed Fund Scheme (SISFS)",
    organization: "DPIIT, Govt. of India",
    category: "Grants & Seed Funds",
    fundingRange: "Up to ₹20 Lakhs (Grant) / ₹50 Lakhs (Debt)",
    type: "Non-dilutive Grant / Convertible Debentures",
    eligibleStages: ["Pre-revenue", "Early traction"],
    matchPercentage: 86,
    targetFocus: "Early-stage startups with innovative product/packaging",
    deadline: "Next evaluation batch: in 18 days",
    locationScope: "Pan India (via approved Incubators like IIT Madras, TANUVAS)",
    industryScope: ["Food & Agriculture", "Consumer Goods", "Bio-products"],
    reasons: [
      "Supports market entry, prototype scaling, and commercial trials",
      "No equity dilution for first ₹20L grant",
      "Available through incubators in Tamil Nadu"
    ],
    breakdown: {
      businessStage: 29,
      industryMatch: 19,
      fundingFit: 14,
      eligibility: 14,
      location: 10,
      totalScore: 86
    },
    actionUrl: "https://seedfund.startupindia.gov.in/"
  },
  {
    id: "funding-3",
    provider: "South Bharat Angel Syndicate",
    organization: "Regional D2C Angel Network",
    category: "Angel Investors",
    fundingRange: "₹15L – ₹50L",
    type: "Equity Investment (6% - 12%)",
    eligibleStages: ["Early traction", "Growing"],
    matchPercentage: 81,
    targetFocus: "High-potential regional FMCG & D2C consumer brands",
    deadline: "Quarterly pitch day: next month",
    locationScope: "South India focus (TN, Karnataka, Kerala, AP)",
    industryScope: ["Food & Beverages", "Personal Care", "Apparel"],
    reasons: [
      "Angel investors with active distribution networks in retail",
      "Seeks brands with proven local product-market fit (₹1L+ monthly rev)",
      "Provides hands-on marketing mentorship alongside capital"
    ],
    breakdown: {
      businessStage: 26,
      industryMatch: 18,
      fundingFit: 13,
      eligibility: 15,
      location: 9,
      totalScore: 81
    },
    actionUrl: "#"
  },
  {
    id: "funding-4",
    provider: "Tamil Nadu EDII Micro-Enterprise Voucher",
    organization: "Entrepreneurship Development and Innovation Institute (EDII-TN)",
    category: "Grants",
    fundingRange: "₹2L – ₹5L",
    type: "100% Non-repayable Innovation Grant",
    eligibleStages: ["Idea", "Pre-revenue", "Early traction"],
    matchPercentage: 84,
    targetFocus: "Product testing, nutritional certification, and packaging",
    deadline: "Rolling monthly",
    locationScope: "Tamil Nadu registered entities",
    industryScope: ["Food Processing", "Rural Handicrafts", "Eco-friendly goods"],
    reasons: [
      "Direct grant to finance FSSAI labs, NABL testing, and modern packaging",
      "State-specific encouragement for Madurai & Southern districts",
      "Simple 1-page application process"
    ],
    breakdown: {
      businessStage: 27,
      industryMatch: 20,
      fundingFit: 14,
      eligibility: 13,
      location: 10,
      totalScore: 84
    },
    actionUrl: "https://editn.in/"
  },
  {
    id: "funding-5",
    provider: "Pradhan Mantri Mudra Yojana (Tarun / Kishor)",
    organization: "Public Sector Banks & NBFCs",
    category: "Business Loans",
    fundingRange: "₹50K – ₹10L (Collateral-Free)",
    type: "Working Capital & Machinery Term Loan",
    eligibleStages: ["Early traction", "Growing"],
    matchPercentage: 79,
    targetFocus: "Micro manufacturing and small trading units",
    deadline: "Walk-in / Online through Udyamimitra",
    locationScope: "Pan India",
    industryScope: ["All Small Enterprises"],
    reasons: [
      "No collateral required for up to ₹10 Lakhs",
      "Low interest rate (8.5% - 11.5%)",
      "Immediate working capital for raw millets and packaging material"
    ],
    breakdown: {
      businessStage: 25,
      industryMatch: 16,
      fundingFit: 15,
      eligibility: 14,
      location: 9,
      totalScore: 79
    },
    actionUrl: "https://www.mudra.org.in/"
  }
];

const seedProducts = [
  {
    id: "prod-1",
    name: "Millet Crunch (Spiced Ragi & Foxtail Clusters)",
    brand: "Namma Crunch",
    founderId: "founder-kavya-1",
    founderName: "Kavya",
    category: "Food & Beverages",
    price: 240,
    originalPrice: 280,
    unit: "Pack of 2 (150g each)",
    location: "Madurai, Tamil Nadu",
    rating: 4.9,
    reviewCount: 142,
    badge: "Bestseller",
    isVerified: true,
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80",
    description: "Crunchy, oven-roasted heirloom millet bites seasoned with traditional South Indian curry leaf spices and cold-pressed oil. 0% preservatives, high fiber, gluten-free.",
    story: "Handcrafted in small batches by women artisans in Madurai using organically farmed millets from local smallholders."
  },
  {
    id: "prod-2",
    name: "Wood-Pressed Virgin Sesame Oil",
    brand: "Vaigai Naturals",
    founderId: "founder-2",
    founderName: "Murugan P.",
    category: "Food & Beverages",
    price: 380,
    originalPrice: 420,
    unit: "500ml Glass Bottle",
    location: "Theni, Tamil Nadu",
    rating: 4.8,
    reviewCount: 96,
    badge: "Artisanal",
    isVerified: true,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80",
    description: "Extracted using traditional Vaagai wood pestles at low RPM to retain vital nutrients and rich aroma. Authentic palm jaggery used in pressing.",
    story: "Connecting 40+ traditional dryland sesame farmers in Theni to conscious households."
  },
  {
    id: "prod-3",
    name: "Pure Handloom Organic Cotton Tunic",
    brand: "Chettinad Weaves",
    founderId: "founder-3",
    founderName: "Meenakshi S.",
    category: "Fashion",
    price: 950,
    originalPrice: 1200,
    unit: "1 Piece",
    location: "Karaikudi, Tamil Nadu",
    rating: 4.7,
    reviewCount: 64,
    badge: "Eco-Friendly",
    isVerified: true,
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&auto=format&fit=crop&q=80",
    description: "Breathable natural dyed handspun khadi cotton tunic, stitched by master rural weavers with zero synthetic dyes.",
    story: "Preserving 200-year-old weaving guilds in rural Sivaganga."
  },
  {
    id: "prod-4",
    name: "Wild Moringa & Tulsi Herbal Infusion",
    brand: "GreenRoots Herbal",
    founderId: "founder-4",
    founderName: "Senthil Nathan",
    category: "Food & Beverages",
    price: 220,
    originalPrice: 260,
    unit: "25 Biodegradable Pyramid Bags",
    location: "Dindigul, Tamil Nadu",
    rating: 4.9,
    reviewCount: 118,
    badge: "Immunity Boost",
    isVerified: true,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80",
    description: "Sun-shade dried organic drumstick leaves infused with Krishna tulsi for daily antioxidant wellness and natural energy.",
    story: "Sourced directly from rain-fed small farmer plots around the foothills of Sirumalai."
  },
  {
    id: "prod-5",
    name: "Curated Clay Cooking Pot (Hand-Burnished)",
    brand: "MannVasanai Crafts",
    founderId: "founder-5",
    founderName: "Sundaravel",
    category: "Home & Lifestyle",
    price: 650,
    originalPrice: 750,
    unit: "2 Litre Capacity",
    location: "Tirunelveli, Tamil Nadu",
    rating: 4.9,
    reviewCount: 78,
    badge: "Non-Toxic Living",
    isVerified: true,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&auto=format&fit=crop&q=80",
    description: "Seasoned natural terracotta cookware that neutralizes pH and enriches food with natural trace minerals.",
    story: "Crafted by 4th generation rural potters on the banks of the Thamirabarani river."
  },
  {
    id: "prod-6",
    name: "Pure Forest Wild Honey with Black Pepper",
    brand: "Malai Organics",
    founderId: "founder-6",
    founderName: "Revathi K.",
    category: "Food & Beverages",
    price: 440,
    originalPrice: 499,
    unit: "350g Jar",
    location: "Kodaikanal, Tamil Nadu",
    rating: 4.8,
    reviewCount: 57,
    badge: "Raw & Unprocessed",
    isVerified: true,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80",
    description: "Unheated, unfiltered wild multi-flora honey harvested ethically from Western Ghats cliff hives.",
    story: "Empowering indigenous tribal honey gatherers through fair trade pricing."
  }
];

const seedGrowthPlanTasks = [
  {
    id: "task-w1-1",
    week: 1,
    weekTitle: "Week 1: Fix Brand Positioning",
    title: "Define your Ideal Customer Persona (ICP)",
    description: "Narrow down from 'anyone who snacks' to specific target: e.g., young health-conscious moms and IT professionals seeking clean afternoon snacks.",
    priority: "High",
    estimatedEffort: "2 hours",
    status: "Completed",
    dimension: "Branding",
    actionLabel: "View ICP Template",
    deliverable: "1-page founder document with target pain points, spending triggers, and channel habits."
  },
  {
    id: "task-w1-2",
    week: 1,
    weekTitle: "Week 1: Fix Brand Positioning",
    title: "Rewrite Value Proposition & Tagline",
    description: "Craft a distinct promise for your packaging & website that clearly beats generic store-bought snacks.",
    priority: "High",
    estimatedEffort: "3 hours",
    status: "Completed",
    dimension: "Branding",
    actionLabel: "Refine Copy",
    deliverable: "Before/After headline test: 'The zero-guilt crunch from Madurai millets'."
  },
  {
    id: "task-w1-3",
    week: 1,
    weekTitle: "Week 1: Fix Brand Positioning",
    title: "Audit Packaging & Ingredient Highlights",
    description: "Ensure front-of-pack displays key USPs: 100% Roasted, Zero Palm Oil, No Preservatives in bold legible font.",
    priority: "Medium",
    estimatedEffort: "4 hours",
    status: "In Progress",
    dimension: "Product",
    actionLabel: "Review Checklist",
    deliverable: "Packaging checklist shared with your mentor for feedback."
  },
  {
    id: "task-w2-1",
    week: 2,
    weekTitle: "Week 2: Build Marketing Engine",
    title: "Establish 3 Core Content Pillars",
    description: "Structure social content: 1. Founder Behind-The-Scenes (Madurai kitchen & farmer stories); 2. Health & Millet Benefits; 3. Unboxing & Taste Reactions.",
    priority: "High",
    estimatedEffort: "2.5 hours",
    status: "Pending",
    dimension: "Marketing",
    actionLabel: "Open Content Planner",
    deliverable: "9-post editorial calendar covering 2 weeks."
  },
  {
    id: "task-w2-2",
    week: 2,
    weekTitle: "Week 2: Build Marketing Engine",
    title: "Launch First Targeted Micro-Ad Campaign",
    description: "Run a test ₹500/day Meta & Instagram campaign targeting Tier-2 Tamil Nadu pin codes and health interest clusters.",
    priority: "High",
    estimatedEffort: "3 hours",
    status: "Pending",
    dimension: "Marketing",
    actionLabel: "Go to Marketing Hub",
    deliverable: "Live ad campaign with conversion tracking enabled."
  },
  {
    id: "task-w2-3",
    week: 2,
    weekTitle: "Week 2: Build Marketing Engine",
    title: "Setup WhatsApp Re-order Sequence",
    description: "Integrate a quick 7-day post-delivery automated WhatsApp message offering 10% discount on re-orders.",
    priority: "Medium",
    estimatedEffort: "2 hours",
    status: "Pending",
    dimension: "Sales",
    actionLabel: "Setup Automation",
    deliverable: "Customer re-order workflow ready for repeat purchases."
  },
  {
    id: "task-w3-1",
    week: 3,
    weekTitle: "Week 3: Increase Customer Acquisition",
    title: "Test 2 Distinct Target Audiences",
    description: "Compare CPA between: Group A (Fitness & Gym enthusiasts) vs Group B (Moms seeking school lunchbox snacks).",
    priority: "High",
    estimatedEffort: "4 hours",
    status: "Pending",
    dimension: "Customer Reach",
    actionLabel: "Analyze Audience Test",
    deliverable: "A/B test report identifying your lowest Customer Acquisition Cost (CAC)."
  },
  {
    id: "task-w3-2",
    week: 3,
    weekTitle: "Week 3: Increase Customer Acquisition",
    title: "Launch 'Refer-a-Friend' Snack Box Offer",
    description: "Give existing customers a coupon code to gift a sample mini-pack to friends.",
    priority: "Medium",
    estimatedEffort: "2 hours",
    status: "Pending",
    dimension: "Marketing",
    actionLabel: "Create Referral",
    deliverable: "Referral card insert printed and placed in next 100 dispatch orders."
  },
  {
    id: "task-w3-3",
    week: 3,
    weekTitle: "Week 3: Increase Customer Acquisition",
    title: "Optimize Product Page for Mobile Checkout",
    description: "Improve mobile load time and place 1-click UPI checkout button above the fold.",
    priority: "High",
    estimatedEffort: "3 hours",
    status: "Pending",
    dimension: "Sales",
    actionLabel: "Inspect UX",
    deliverable: "Mobile checkout speed increased by 35%."
  },
  {
    id: "task-w4-1",
    week: 4,
    weekTitle: "Week 4: Prepare for Scale & Funding",
    title: "Track Unit Economics & True CAC",
    description: "Calculate gross margins per pack (selling price ₹240 - cost of goods ₹85 - shipping ₹50 - CAC ₹45 = ₹60 profit).",
    priority: "High",
    estimatedEffort: "3 hours",
    status: "Pending",
    dimension: "Sales",
    actionLabel: "Download Spreadsheet",
    deliverable: "Validated unit economics sheet ready for grant and angel pitches."
  },
  {
    id: "task-w4-2",
    week: 4,
    weekTitle: "Week 4: Prepare for Scale & Funding",
    title: "Assemble Stand-Up India Grant Docket",
    description: "Gather FSSAI license, Udyam registration, last 6 months bank statement, and projected production budget.",
    priority: "High",
    estimatedEffort: "4 hours",
    status: "Pending",
    dimension: "Funding Readiness",
    actionLabel: "View Application Checklist",
    deliverable: "Ready-to-submit eligibility dossier for ₹7L capital."
  },
  {
    id: "task-w4-3",
    week: 4,
    weekTitle: "Week 4: Prepare for Scale & Funding",
    title: "1-on-1 Strategy Review with Mentor Priya",
    description: "Present week 1-3 campaign analytics and finalize wholesale retail expansion roadmap.",
    priority: "Medium",
    estimatedEffort: "1 hour",
    status: "Pending",
    dimension: "Branding",
    actionLabel: "Book 1-on-1 Review",
    deliverable: "Signed mentor validation notes for next quarter's growth milestone."
  }
];

const seedCampaigns = [
  {
    id: "camp-1",
    founderId: "founder-kavya-1",
    productName: "Millet Crunch (Spiced Clusters)",
    productId: "prod-1",
    goal: "Product sales",
    targetAudience: "Health-conscious consumers & Parents",
    location: "Tamil Nadu & South India",
    budget: 500,
    dailyBudget: 250,
    durationDays: 7,
    status: "Active",
    startDate: "2026-09-10",
    reach: 8420,
    relevantAudiencePercent: 72,
    productViews: 684,
    clicks: 143,
    conversions: 27,
    costPerConversion: "₹18.50",
    roas: "3.4x",
    audienceBreakdown: [
      { name: "Health Conscious", percentage: 48 },
      { name: "Young Parents", percentage: 32 },
      { name: "College Students", percentage: 20 }
    ],
    dailyPerformance: [
      { day: "Day 1", reach: 980, clicks: 14, conversions: 2 },
      { day: "Day 2", reach: 1120, clicks: 19, conversions: 3 },
      { day: "Day 3", reach: 1350, clicks: 24, conversions: 5 },
      { day: "Day 4", reach: 1540, clicks: 28, conversions: 6 },
      { day: "Day 5", reach: 1680, clicks: 31, conversions: 6 },
      { day: "Day 6", reach: 1750, clicks: 27, conversions: 5 }
    ]
  }
];

const seedNotifications = [
  {
    id: "notif-1",
    type: "growth_score",
    title: "Growth Score Update",
    message: "🎯 Your Growth Score increased by 8 points (60 → 68) after completing brand positioning steps.",
    timestamp: "2 hours ago",
    read: false,
    icon: "target",
    link: "/dashboard"
  },
  {
    id: "notif-2",
    type: "mentor_match",
    title: "Top Mentor Match Found",
    message: "🤝 You have a new 94% match with Priya Sharma (D2C Performance & Growth Mentor).",
    timestamp: "5 hours ago",
    read: false,
    icon: "handshake",
    link: "/mentors"
  },
  {
    id: "notif-3",
    type: "funding_alert",
    title: "Eligible Funding Opportunity",
    message: "💰 Stand-Up India scheme matches 88% of your ₹7L requirement and stage criteria.",
    timestamp: "1 day ago",
    read: false,
    icon: "coins",
    link: "/funding"
  },
  {
    id: "notif-4",
    type: "campaign_milestone",
    title: "Campaign Reached 8,400+ Users",
    message: "📈 Your 'Millet Crunch' campaign achieved 72% audience relevance and 27 direct purchases.",
    timestamp: "1 day ago",
    read: true,
    icon: "trending-up",
    link: "/marketing"
  },
  {
    id: "notif-5",
    type: "roadmap_progress",
    title: "Week 2 Roadmap Ready",
    message: "🚀 Week 2 of your Growth Plan is unlocked: 'Build Marketing Engine'.",
    timestamp: "2 days ago",
    read: true,
    icon: "rocket",
    link: "/roadmap"
  }
];

module.exports = {
  demoFounder,
  seedMentors,
  seedFundingOpportunities,
  seedProducts,
  seedGrowthPlanTasks,
  seedCampaigns,
  seedNotifications
};
