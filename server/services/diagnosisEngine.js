// server/services/diagnosisEngine.js

function computeDiagnosis(onboardingData) {
  const {
    founderName = "Founder",
    brandName = "D2C Brand",
    location = "Tamil Nadu",
    industry = "Food & Beverages",
    businessStage = "Early traction",
    monthlyRevenue = "₹50K–₹2L",
    salesTrend = "Unpredictable",
    challenges = [],
    isSeekingFunding = true,
    fundingRequirement = "₹5L–₹10L"
  } = onboardingData;

  // Check if this matches the demo persona Kavya
  const isKavyaDemo =
    (brandName && brandName.toLowerCase().includes("namma crunch")) ||
    (founderName && founderName.toLowerCase().includes("kavya"));

  if (isKavyaDemo) {
    return {
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
          diagnosis: "Your product has traction, but your customer acquisition strategy is underdeveloped and relies on erratic organic posts.",
          actionText: "Fix this",
          actionUrl: "/marketing"
        },
        {
          id: "gap-2",
          dimension: "Branding",
          score: 60,
          diagnosis: "Your brand positioning is unclear compared with competing national D2C healthy snack brands.",
          actionText: "Improve branding",
          actionUrl: "/roadmap"
        },
        {
          id: "gap-3",
          dimension: "Sales Growth",
          score: 70,
          diagnosis: "Revenue exists (₹1.8L), but growth has been inconsistent month-on-month without recurring retention funnels.",
          actionText: "View strategy",
          actionUrl: "/roadmap"
        }
      ]
    };
  }

  // Dynamic calculation for any custom founder
  let productScore = 75;
  if (businessStage === "Idea") productScore = 50;
  else if (businessStage === "Pre-revenue") productScore = 65;
  else if (businessStage === "Early traction") productScore = 80;
  else if (businessStage === "Growing") productScore = 86;
  else if (businessStage === "Scaling") productScore = 92;

  let salesScore = 60;
  if (monthlyRevenue === "Pre-revenue") salesScore = 32;
  else if (monthlyRevenue === "₹0–50K") salesScore = 48;
  else if (monthlyRevenue === "₹50K–₹2L") salesScore = 64;
  else if (monthlyRevenue === "₹2L–₹5L") salesScore = 78;
  else if (monthlyRevenue === "₹5L+") salesScore = 89;

  if (salesTrend === "Growing") salesScore += 6;
  else if (salesTrend === "Stable") salesScore += 0;
  else if (salesTrend === "Unpredictable") salesScore -= 7;
  else if (salesTrend === "Declining") salesScore -= 14;

  let brandingScore = 72;
  if (challenges.includes("Branding")) brandingScore -= 16;
  if (challenges.includes("Product positioning")) brandingScore -= 10;

  let marketingScore = 70;
  if (challenges.includes("Marketing")) marketingScore -= 18;
  if (challenges.includes("Customer acquisition")) marketingScore -= 12;

  let customerReachScore = 74;
  if (challenges.includes("Distribution")) customerReachScore -= 14;
  if (challenges.includes("Customer acquisition")) customerReachScore -= 8;

  let fundingReadinessScore = isSeekingFunding ? 68 : 75;
  if (isSeekingFunding) {
    if (businessStage === "Pre-revenue") fundingReadinessScore = 50;
    else if (businessStage === "Early traction") fundingReadinessScore = 72;
    else if (businessStage === "Growing") fundingReadinessScore = 84;
  }

  // Clamp 0 - 100
  const clamp = (val) => Math.min(98, Math.max(25, Math.round(val)));
  const categoryScores = {
    product: clamp(productScore),
    sales: clamp(salesScore),
    branding: clamp(brandingScore),
    marketing: clamp(marketingScore),
    customerReach: clamp(customerReachScore),
    fundingReadiness: clamp(fundingReadinessScore)
  };

  // Weighted overall score
  const overallScore = clamp(
    categoryScores.product * 0.2 +
      categoryScores.sales * 0.2 +
      categoryScores.branding * 0.15 +
      categoryScores.marketing * 0.2 +
      categoryScores.customerReach * 0.15 +
      categoryScores.fundingReadiness * 0.1
  );

  // Derive Top 3 gaps
  const dimensionMetadata = {
    marketing: {
      label: "Marketing",
      diagnosis: "Your product has traction, but your customer acquisition strategy is underdeveloped and lacks scalable paid or viral loops.",
      actionText: "Fix this",
      actionUrl: "/marketing"
    },
    branding: {
      label: "Branding",
      diagnosis: "Your brand positioning is unclear compared with competing D2C brands in your category.",
      actionText: "Improve branding",
      actionUrl: "/roadmap"
    },
    sales: {
      label: "Sales Growth",
      diagnosis: "Revenue exists, but month-on-month growth has been erratic without predictable customer retention channels.",
      actionText: "View strategy",
      actionUrl: "/roadmap"
    },
    customerReach: {
      label: "Customer Reach",
      diagnosis: "Your brand awareness is localized; you need structured digital channels to penetrate regional and national tiers.",
      actionText: "Expand reach",
      actionUrl: "/marketing"
    },
    fundingReadiness: {
      label: "Funding Readiness",
      diagnosis: "Your financial unit metrics and grant dossiers need structuring before presenting to angel syndicates or government schemes.",
      actionText: "Prepare metrics",
      actionUrl: "/funding"
    },
    product: {
      label: "Product & Packaging",
      diagnosis: "Packaging shelf-life and unboxing presentation require refinement to drive word-of-mouth repeat orders.",
      actionText: "Refine product",
      actionUrl: "/roadmap"
    }
  };

  const sortedDimensions = Object.entries(categoryScores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3);

  const topGaps = sortedDimensions.map(([key, score], idx) => ({
    id: `gap-${idx + 1}`,
    dimension: dimensionMetadata[key].label,
    score,
    diagnosis: dimensionMetadata[key].diagnosis,
    actionText: dimensionMetadata[key].actionText,
    actionUrl: dimensionMetadata[key].actionUrl
  }));

  const scoreStatus =
    overallScore >= 70
      ? "Growth Potential: High"
      : overallScore >= 55
      ? "Growth Potential: High"
      : "Growth Potential: Moderate";

  return {
    growthScore: overallScore,
    scoreStatus,
    categoryScores,
    topGaps
  };
}

function generateRoadmapForFounder(founder) {
  const brandName = founder.brandName || "your brand";
  const category = founder.productCategory || founder.industry || "D2C products";

  return [
    {
      id: "task-w1-1",
      week: 1,
      weekTitle: "Week 1: Fix Brand Positioning",
      title: "Define Ideal Customer Profile (ICP)",
      description: `Narrow your audience from broad shoppers to high-intent buyers for ${brandName} in ${category}.`,
      priority: "High",
      estimatedEffort: "2 hours",
      status: "Completed",
      dimension: "Branding",
      actionLabel: "View ICP Guide"
    },
    {
      id: "task-w1-2",
      week: 1,
      weekTitle: "Week 1: Fix Brand Positioning",
      title: "Rewrite Brand Positioning & Tagline",
      description: "Craft a distinct 1-sentence value proposition that sets you apart from legacy mass-market brands.",
      priority: "High",
      estimatedEffort: "3 hours",
      status: "Completed",
      dimension: "Branding",
      actionLabel: "Refine Positioning"
    },
    {
      id: "task-w1-3",
      week: 1,
      weekTitle: "Week 1: Fix Brand Positioning",
      title: "Audit Front-of-Pack Messaging",
      description: "Ensure top 3 consumer trust triggers are clearly visible within 3 seconds of viewing.",
      priority: "Medium",
      estimatedEffort: "2 hours",
      status: "In Progress",
      dimension: "Product",
      actionLabel: "Open Checklist"
    },
    {
      id: "task-w2-1",
      week: 2,
      weekTitle: "Week 2: Build Marketing Engine",
      title: "Create 3 Content Pillars",
      description: "Map out weekly content buckets: 1. Founder heritage story; 2. Product benefits; 3. Unboxing & reviews.",
      priority: "High",
      estimatedEffort: "2.5 hours",
      status: "Pending",
      dimension: "Marketing",
      actionLabel: "Content Planner"
    },
    {
      id: "task-w2-2",
      week: 2,
      weekTitle: "Week 2: Build Marketing Engine",
      title: "Launch Targeted Micro-Ad Campaign",
      description: "Run a focused ₹500 test ad campaign in the Marketing Hub to reach hyper-relevant local consumers.",
      priority: "High",
      estimatedEffort: "3 hours",
      status: "Pending",
      dimension: "Marketing",
      actionLabel: "Launch Ad"
    },
    {
      id: "task-w2-3",
      week: 2,
      weekTitle: "Week 2: Build Marketing Engine",
      title: "Setup Post-Delivery Reorder Sequence",
      description: "Automate a friendly 7-day follow-up message with a quick 10% loyalty incentive.",
      priority: "Medium",
      estimatedEffort: "1.5 hours",
      status: "Pending",
      dimension: "Sales",
      actionLabel: "Setup Automation"
    },
    {
      id: "task-w3-1",
      week: 3,
      weekTitle: "Week 3: Increase Customer Acquisition",
      title: "Test 2 Distinct Target Audiences",
      description: "Run split tests between regional suburban families vs young working professionals.",
      priority: "High",
      estimatedEffort: "4 hours",
      status: "Pending",
      dimension: "Customer Reach",
      actionLabel: "View Analytics"
    },
    {
      id: "task-w3-2",
      week: 3,
      weekTitle: "Week 3: Increase Customer Acquisition",
      title: "Launch Referral Incentive",
      description: "Enable your happiest 50 customers to refer friends with an unboxing sample pack perk.",
      priority: "Medium",
      estimatedEffort: "2 hours",
      status: "Pending",
      dimension: "Marketing",
      actionLabel: "Create Referral"
    },
    {
      id: "task-w3-3",
      week: 3,
      weekTitle: "Week 3: Increase Customer Acquisition",
      title: "Optimize Mobile Checkout Speed",
      description: "Streamline the payment flow to ensure 1-click UPI checkout completes in under 30 seconds.",
      priority: "High",
      estimatedEffort: "3 hours",
      status: "Pending",
      dimension: "Sales",
      actionLabel: "Test Checkout"
    },
    {
      id: "task-w4-1",
      week: 4,
      weekTitle: "Week 4: Prepare for Scale",
      title: "Calculate Unit Economics & CAC",
      description: "Audit raw material, packaging, logistics, and acquisition cost to lock in healthy margins.",
      priority: "High",
      estimatedEffort: "3 hours",
      status: "Pending",
      dimension: "Sales",
      actionLabel: "Download Sheet"
    },
    {
      id: "task-w4-2",
      week: 4,
      weekTitle: "Week 4: Prepare for Scale",
      title: "Compile Stage Funding Application",
      description: "Prepare required documents (Udyam, FSSAI/GST, 6-month bank statement) for eligible schemes.",
      priority: "High",
      estimatedEffort: "4 hours",
      status: "Pending",
      dimension: "Funding Readiness",
      actionLabel: "View Scheme Fit"
    },
    {
      id: "task-w4-3",
      week: 4,
      weekTitle: "Week 4: Prepare for Scale",
      title: "Consultation Review with Matched Mentor",
      description: "Schedule a 45-minute 1-on-1 strategy session to review week 1–3 findings and plan quarter 2.",
      priority: "Medium",
      estimatedEffort: "1 hour",
      status: "Pending",
      dimension: "Branding",
      actionLabel: "Book Mentor"
    }
  ];
}

module.exports = {
  computeDiagnosis,
  generateRoadmapForFounder
};
