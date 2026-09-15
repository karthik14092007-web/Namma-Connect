// prisma/seed.js
// Production database seeder for Namma-Connect
const { db } = require('../server/src/lib/prisma');
const { hashPassword } = require('../server/src/utils/password');
const { calculateDiagnostic } = require('../server/src/services/diagnostic/scoringEngine');

async function seed() {
  console.log('[Seed] Seeding Namma-Connect PostgreSQL database...');

  // 1. Create Demo Founder: Kavya
  const passwordHash = await hashPassword('Password123!');
  const user = await db.user.create({
    data: {
      id: 'usr-kavya-1',
      email: 'kavya@nammacrunch.in',
      passwordHash,
      firstName: 'Kavya',
      lastName: 'Sundaram',
      role: 'FOUNDER',
      isEmailVerified: true,
      isActive: true
    }
  });

  // Create Founder Profile
  await db.founderProfile.create({
    data: {
      id: 'fp-kavya-1',
      userId: user.id,
      phone: '+91 98401 23456',
      location: 'Madurai, Tamil Nadu',
      state: 'Tamil Nadu',
      city: 'Madurai',
      preferredLanguage: 'English, Tamil',
      bio: 'Second-generation millet entrepreneur modernizing traditional South Indian snacking with zero palm oil.'
    }
  });

  // Create Business: Namma Crunch
  const business = await db.business.create({
    data: {
      id: 'biz-namma-crunch-1',
      founderId: user.id,
      name: 'Namma Crunch',
      category: 'Food & Beverages',
      description: 'Millet-based healthy snacks slow-roasted with native South Indian grains and zero palm oil.',
      location: 'Madurai, Tamil Nadu',
      stage: 'EARLY_TRACTION',
      monthlyRevenue: '₹1.8L',
      fundingRequirement: '₹7L',
      website: 'https://nammacrunch.in',
      isActive: true
    }
  });

  // 2. Create Demo Diagnostic Assessment with exact 24 underlying answers
  const demoAnswers = [
    { questionKey: 'product.standardization', score: 80, answerKey: 'opt_80' },
    { questionKey: 'product.purchase_validation', score: 80, answerKey: 'opt_80' },
    { questionKey: 'product.feedback_collection', score: 80, answerKey: 'opt_80' },
    { questionKey: 'product.feedback_iteration', score: 100, answerKey: 'opt_100' },

    { questionKey: 'sales.consistency', score: 60, answerKey: 'opt_60' },
    { questionKey: 'sales.revenue_tracking', score: 80, answerKey: 'opt_80' },
    { questionKey: 'sales.defined_process', score: 80, answerKey: 'opt_80' },
    { questionKey: 'sales.analytics_economics', score: 60, answerKey: 'opt_60' },

    { questionKey: 'branding.positioning_clarity', score: 60, answerKey: 'opt_60' },
    { questionKey: 'branding.differentiation', score: 60, answerKey: 'opt_60' },
    { questionKey: 'branding.visual_identity', score: 60, answerKey: 'opt_60' },
    { questionKey: 'branding.messaging_story', score: 60, answerKey: 'opt_60' },

    { questionKey: 'marketing.target_customer', score: 40, answerKey: 'opt_40' },
    { questionKey: 'marketing.acquisition_channel', score: 60, answerKey: 'opt_60' },
    { questionKey: 'marketing.performance_tracking', score: 40, answerKey: 'opt_40' },
    { questionKey: 'marketing.campaign_execution', score: 60, answerKey: 'opt_60' },

    { questionKey: 'reach.audience_access', score: 60, answerKey: 'opt_60' },
    { questionKey: 'reach.distribution_channels', score: 80, answerKey: 'opt_80' },
    { questionKey: 'reach.organic_discovery', score: 60, answerKey: 'opt_60' },
    { questionKey: 'reach.geographic_expansion', score: 80, answerKey: 'opt_80' },

    { questionKey: 'funding.financial_records', score: 80, answerKey: 'opt_80' },
    { questionKey: 'funding.capital_budgeting', score: 60, answerKey: 'opt_60' },
    { questionKey: 'funding.compliance_readiness', score: 80, answerKey: 'opt_80' },
    { questionKey: 'funding.pitch_materials', score: 80, answerKey: 'opt_80' }
  ];

  const calculated = calculateDiagnostic({
    responses: demoAnswers,
    stage: 'EARLY_TRACTION',
    brandName: 'Namma Crunch'
  });

  const assessment = await db.diagnosticAssessment.create({
    data: {
      id: 'diag-kavya-1',
      businessId: business.id,
      stage: 'EARLY_TRACTION',
      status: 'COMPLETED',
      overallScore: calculated.overallScore, // 68
      confidence: 'MEDIUM',
      confidenceReason: 'Based on founder-provided diagnostic responses across all 24 observable readiness signals.',
      scoringVersion: 'v1',
      completedAt: new Date()
    }
  });

  // Seed responses
  const responsesToCreate = calculated.processedResponses.map(r => ({
    assessmentId: assessment.id,
    factor: r.factor,
    questionKey: r.questionKey,
    answerKey: r.answerKey,
    score: r.score
  }));
  await db.diagnosticResponse.createMany({ data: responsesToCreate });

  // Seed factor scores
  const factorScoresToCreate = Object.entries(calculated.factorScores).map(([factor, data]) => ({
    assessmentId: assessment.id,
    factor,
    score: data.score,
    weight: data.weight,
    contribution: data.contribution,
    status: data.status
  }));
  await db.diagnosticFactorScore.createMany({ data: factorScoresToCreate });

  // 3. Seed Growth Plan
  const growthPlan = await db.growthPlan.create({
    data: {
      id: 'plan-kavya-1',
      businessId: business.id,
      assessmentId: assessment.id,
      title: '30-Day Growth Acceleration Plan for Namma Crunch',
      description: 'Action plan derived from Growth Diagnostic (68/100 • Developing Stage)',
      status: 'IN_PROGRESS'
    }
  });

  const roadmapTasks = [
    { week: 1, factor: 'Marketing', title: 'Customer Persona & Acquisition Audit', priority: 'High', status: 'Completed' },
    { week: 1, factor: 'Branding', title: 'Brand Positioning & Packaging Tagline Review', priority: 'High', status: 'Completed' },
    { week: 1, factor: 'Sales', title: 'Audit Sales Channels & Monthly Revenue Consistency', priority: 'Medium', status: 'Completed' },
    { week: 2, factor: 'Marketing', title: 'Launch Targeted Customer Acquisition Pilot', priority: 'High', status: 'In Progress' },
    { week: 2, factor: 'Reach', title: 'Partner with 3 Regional Artisanal D2C Communities', priority: 'Medium', status: 'In Progress' },
    { week: 2, factor: 'Funding', title: 'Complete Financial Bookkeeping & GST Filing Records', priority: 'Medium', status: 'Pending' },
    { week: 3, factor: 'Branding', title: 'Establish Visual Identity Guidelines Across Touchpoints', priority: 'Medium', status: 'Pending' },
    { week: 3, factor: 'Product', title: 'Standardize Customer Review Collection at Checkout', priority: 'Low', status: 'Pending' },
    { week: 3, factor: 'Marketing', title: 'Set Up Marketing ROI Tracking Dashboard', priority: 'High', status: 'Pending' },
    { week: 4, factor: 'Funding', title: 'Finalize Stand-Up India Grant Pitch Deck', priority: 'High', status: 'Pending' },
    { week: 4, factor: 'Reach', title: 'Explore Multi-City Logistics Expansion to Bengaluru & Chennai', priority: 'Medium', status: 'Pending' },
    { week: 4, factor: 'Sales', title: 'Review 30-Day CAC, Repeat Order Rate & Margin Targets', priority: 'High', status: 'Pending' }
  ];

  await db.growthAction.createMany({
    data: roadmapTasks.map(t => ({
      growthPlanId: growthPlan.id,
      title: t.title,
      description: `Task addressing ${t.factor} gap.`,
      factor: t.factor,
      priority: t.priority,
      week: t.week,
      status: t.status === 'Completed' ? 'COMPLETED' : (t.status === 'In Progress' ? 'IN_PROGRESS' : 'NOT_STARTED'),
      completedAt: t.status === 'Completed' ? new Date() : null
    }))
  });

  // 4. Seed Mentors
  const mentors = [
    {
      name: 'Priya Sharma',
      role: 'Ex-Chief Marketing Officer, Paper Boat',
      expertise: 'Brand Strategy, Packaging, D2C Distribution',
      industries: 'Food & Beverages, Fast Moving Consumer Goods',
      stageExperience: 'Early Traction to Series A ($0 to $5M ARR)',
      location: 'Bengaluru / Chennai, Tamil Nadu',
      languages: 'English, Tamil, Hindi',
      consultationMode: 'Video Consultation & In-person in Chennai',
      consultationFee: 'Free (Sponsored by Tamil Nadu Startup Mission)',
      bio: '14+ years scaling packaged consumer brands from regional kitchen experiments into national supermarket mainstays.',
      availability: 'Next slot: Thursday 4:00 PM',
      verified: true
    },
    {
      name: 'Rajesh Kumar',
      role: 'Founding Partner, Kaveri Venture Fund',
      expertise: 'Working Capital, Unit Economics, Grant Readiness',
      industries: 'Agri-Tech, Food & Beverages, Sustainable Living',
      stageExperience: 'Pre-seed, Seed, Government Grant Schemes',
      location: 'Coimbatore, Tamil Nadu',
      languages: 'English, Tamil',
      consultationMode: 'Online Video Call',
      consultationFee: 'Free / Pro-bono',
      bio: 'Angel investor and ex-banker who has guided 40+ rural and Tier-2 Tamil Nadu entrepreneurs through MSME schemes.',
      availability: 'Next slot: Friday 2:30 PM',
      verified: true
    },
    {
      name: 'Ananya Iyer',
      role: 'VP Performance Growth, Slurrp Farm',
      expertise: 'D2C Customer Acquisition, Launch Reels, Meta Ads',
      industries: 'Healthy Snacks, Organic Foods, Child Nutrition',
      stageExperience: '₹10L to ₹1Cr Annual Run Rate',
      location: 'Chennai, Tamil Nadu',
      languages: 'English, Tamil',
      consultationMode: 'Online 1-on-1 Strategy Sprint',
      consultationFee: 'Free for Namma-Connect Cohort',
      bio: 'Specialist in scaling D2C brands profitably with sub-₹500 CAC and organic video storytelling.',
      availability: 'Next slot: Monday 11:00 AM',
      verified: true
    },
    {
      name: 'Dr. S. Meenakshi',
      role: 'Head of Quality & Sourcing, CFTRI Advisor',
      expertise: 'FSSAI Compliance, Shelf-life Extension, Cold Pressing',
      industries: 'Traditional Grains, Millet Products, Spices',
      stageExperience: 'Standardization to Commercial Scaling',
      location: 'Madurai, Tamil Nadu',
      languages: 'Tamil, English',
      consultationMode: 'In-person / Lab Consultation',
      consultationFee: 'Free Institutional Mentorship',
      bio: 'Food scientist assisting traditional rural producers standardize natural food formulations without artificial preservatives.',
      availability: 'Next slot: Wednesday 3:00 PM',
      verified: true
    }
  ];

  for (const m of mentors) {
    const mUser = await db.user.create({
      data: {
        email: `${m.name.toLowerCase().replace(/[^a-z]/g, '')}@mentor.nammaconnect.in`,
        passwordHash,
        firstName: m.name.split(' ')[0],
        lastName: m.name.split(' ')[1] || 'Advisor',
        role: 'MENTOR',
        isEmailVerified: true,
        isActive: true
      }
    });

    await db.mentorProfile.create({
      data: {
        userId: mUser.id,
        name: m.name,
        role: m.role,
        expertise: m.expertise,
        industries: m.industries,
        stageExperience: m.stageExperience,
        location: m.location,
        languages: m.languages,
        consultationMode: m.consultationMode,
        consultationFee: m.consultationFee,
        bio: m.bio,
        availability: m.availability,
        verified: true
      }
    });
  }

  // 5. Seed Funding Opportunities
  const fundingOpportunities = [
    {
      name: 'Stand-Up India Scheme',
      provider: 'SIDBI & Ministry of Finance, Govt of India',
      type: 'Bank Loan with Collateral-Free Guarantee (CGSSI)',
      amountMin: '₹10,00,000',
      amountMax: '₹1,00,00,000',
      eligibility: 'SC/ST and Women entrepreneurs setting up greenfield / early D2C ventures in manufacturing or trading.',
      industries: 'All D2C Sectors, Agri-Processing, Handicrafts, Textiles',
      stages: 'Pre-revenue, Early Traction, Scaling',
      location: 'Pan-India (Available at all scheduled commercial banks)',
      applicationUrl: 'https://www.standupmitra.in',
      deadline: 'Rolling / Open all year',
      isActive: true
    },
    {
      name: 'Startup India Seed Fund Scheme (SISFS)',
      provider: 'DPIIT, Ministry of Commerce and Industry',
      type: 'Grant up to ₹20L or Convertible Debenture up to ₹50L',
      amountMin: '₹5,00,000',
      amountMax: '₹50,00,000',
      eligibility: 'DPIIT-recognized startups incorporated within last 2 years with a viable commercial prototype.',
      industries: 'Food Processing, Social Impact, Consumer Tech, Agri-Food',
      stages: 'Prototype, Proof of Concept, Early Traction',
      location: 'Pan-India via approved regional incubators (e.g. IIT-M, T-Hub, EDII)',
      applicationUrl: 'https://seedfund.startupindia.gov.in',
      deadline: 'Open / Incubator Cohort Basis',
      isActive: true
    },
    {
      name: 'EDII Tamil Nadu Innovation Voucher Scheme (IVS)',
      provider: 'Entrepreneurship Development and Innovation Institute (Govt of TN)',
      type: 'Non-repayable State Research & Commercialization Grant',
      amountMin: '₹2,00,000',
      amountMax: '₹5,00,000',
      eligibility: 'MSMEs and early startups in Tamil Nadu collaborating with academic/research institutions on product testing.',
      industries: 'Food Technology, Traditional Grains, Green Products',
      stages: 'Product Improvement, Certification, Early Commercialization',
      location: 'Tamil Nadu Only',
      applicationUrl: 'https://editn.in',
      deadline: 'Quarterly Cutoffs (Next: End of Month)',
      isActive: true
    },
    {
      name: 'Pradhan Mantri Mudra Yojana (PMMY) - Kishor',
      provider: 'Micro Units Development & Refinance Agency (MUDRA)',
      type: 'Subsidized Micro-Enterprise Term Loan & Working Capital',
      amountMin: '₹50,000',
      amountMax: '₹5,00,000',
      eligibility: 'Small-scale businesses seeking expansion capital for inventory, equipment, or working capital.',
      industries: 'Food Stalls, Packaged Snacks, Artisanal Crafts, Retailers',
      stages: 'Operating Businesses with 6+ Months Trading',
      location: 'Pan-India',
      applicationUrl: 'https://www.mudra.org.in',
      deadline: 'Rolling admission',
      isActive: true
    },
    {
      name: 'NABARD Rural Innovation Fund',
      provider: 'National Bank for Agriculture and Rural Development',
      type: 'Direct Grant / Soft Loan for Rural Value Addition',
      amountMin: '₹3,00,000',
      amountMax: '₹15,00,000',
      eligibility: 'Enterprises creating direct farm-gate linkages with smallholder farmers in rural/semi-urban areas.',
      industries: 'Millets, Cold Pressed Oils, Herbal Products, Farmer Producer Orgs',
      stages: 'Pilot, Early Stage, Expansion',
      location: 'Rural and Semi-Urban Districts of India',
      applicationUrl: 'https://www.nabard.org',
      deadline: 'Bi-annual Cycle',
      isActive: true
    }
  ];

  for (const opp of fundingOpportunities) {
    await db.fundingOpportunity.create({ data: opp });
  }

  // 6. Seed Marketplace Products
  const products = [
    {
      name: 'Roasted Little Millet (Samai) Crisps',
      description: 'Slow-roasted native Tamil Little Millet seasoned with cold-pressed coconut oil and fresh curry leaves. Zero palm oil.',
      category: 'Food & Beverages',
      price: 249,
      originalPrice: 299,
      unit: 'Pack of 2 (150g each)',
      imageUrl: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80',
      stock: 120,
      isVerified: true,
      isActive: true
    },
    {
      name: 'Foxtail Millet (Thinai) Ribbon Pakoda',
      description: 'Crispy festival favorite reimagined with 100% whole grain Foxtail millet and organic sesame seeds.',
      category: 'Food & Beverages',
      price: 199,
      originalPrice: 249,
      unit: '200g Pouch',
      imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500&auto=format&fit=crop&q=80',
      stock: 85,
      isVerified: true,
      isActive: true
    },
    {
      name: 'Heritage Kambu (Pearl Millet) Bites',
      description: 'Crunchy bite-sized cubes baked with Madurai palm jaggery, roasted groundnuts, and pearl millet flour.',
      category: 'Food & Beverages',
      price: 279,
      originalPrice: 320,
      unit: 'Box of 12 Bites',
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
      stock: 60,
      isVerified: true,
      isActive: true
    },
    {
      name: 'Cold-Pressed Sesame & Millet Crackers',
      description: 'Artisanal crackers made in Chettinad using stone-ground black sesame and barnyard millet.',
      category: 'Food & Beverages',
      price: 349,
      originalPrice: 399,
      unit: 'Pack of 3 (100g each)',
      imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500&auto=format&fit=crop&q=80',
      stock: 45,
      isVerified: true,
      isActive: true
    },
    {
      name: 'Pure Palm Jaggery Millet Murukku',
      description: 'Crunchy golden spirals sweetened mildly with unrefined palm sugar. No refined flour, no trans fats.',
      category: 'Food & Beverages',
      price: 220,
      originalPrice: 260,
      unit: '250g Container',
      imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop&q=80',
      stock: 90,
      isVerified: true,
      isActive: true
    },
    {
      name: 'Namma Crunch Tasting Box (All-in-One)',
      description: 'Complete sampler pack containing mini pouches of our top 4 roasted millet snacks.',
      category: 'Food & Beverages',
      price: 499,
      originalPrice: 599,
      unit: 'Curated Gift Box (4x75g)',
      imageUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=500&auto=format&fit=crop&q=80',
      stock: 150,
      isVerified: true,
      isActive: true
    }
  ];

  for (const p of products) {
    await db.marketplaceProduct.create({
      data: {
        businessId: business.id,
        ...p
      }
    });
  }

  // 7. Seed Demo Campaign & Analytics
  const campaign = await db.campaign.create({
    data: {
      id: 'camp-kavya-1',
      businessId: business.id,
      founderId: user.id,
      title: 'Roasted Samai Crisps - Office Desk Snacking Launch Reel',
      description: 'Targeting young tech and corporate professionals looking for guilt-free 4 PM office snacks.',
      campaignType: 'PRODUCT_LAUNCH',
      objective: 'PRODUCT_SALES',
      budget: 500,
      dailyBudget: 71,
      durationDays: 7,
      status: 'ACTIVE',
      reach: 8420,
      relevantPercent: 72,
      productViews: 684,
      clicks: 143,
      conversions: 27
    }
  });

  await db.campaignAnalytics.create({
    data: {
      campaignId: campaign.id,
      impressions: 8420,
      views: 684,
      clicks: 143,
      engagements: 310,
      leads: 81,
      conversions: 27,
      spend: 500
    }
  });

  // 8. Seed Notifications
  const notifications = [
    {
      userId: user.id,
      title: 'Mentor Match Identified',
      message: '🎯 Priya Sharma (Ex-Paper Boat CMO) has a 94% compatibility match with Namma Crunch!',
      type: 'MENTOR_MATCH',
      read: false,
      link: '/mentors'
    },
    {
      userId: user.id,
      title: 'High-Fit Grant Scheme',
      message: '💰 Stand-Up India Scheme (up to ₹1 Cr loan guarantee) is an 88% stage fit for Namma Crunch.',
      type: 'FUNDING',
      read: false,
      link: '/funding'
    },
    {
      userId: user.id,
      title: 'Campaign Performance Milestone',
      message: '📈 Your Launch Reel reached 8,400+ targeted food lovers with 27 verified conversions!',
      type: 'CAMPAIGN',
      read: false,
      link: '/marketing'
    },
    {
      userId: user.id,
      title: 'Growth Roadmap Updated',
      message: '🗓️ Week 2 milestone "Launch Targeted Customer Acquisition Pilot" is ready for execution.',
      type: 'GROWTH_PLAN',
      read: false,
      link: '/roadmap'
    },
    {
      userId: user.id,
      title: 'Welcome to Namma-Connect',
      message: '🚀 Your Growth Diagnostic score is 68/100 (Developing Stage). We mapped your top 3 bottlenecks.',
      type: 'SYSTEM',
      read: true,
      link: '/dashboard'
    }
  ];

  for (const n of notifications) {
    await db.notification.create({ data: n });
  }

  console.log('[Seed] Database seeded successfully! Demo Founder: Kavya (kavya@nammacrunch.in / Password123!)');
}

if (require.main === module) {
  seed().catch(err => {
    console.error('[Seed Error]:', err);
    process.exit(1);
  });
}

module.exports = { seed };
