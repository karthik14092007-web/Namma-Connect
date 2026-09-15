// server/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { connectDB, getStore, resetDemoData } = require("./config/db");
const { computeDiagnosis, generateRoadmapForFounder } = require("./services/diagnosisEngine");
const { matchMentor, matchFundingOpportunity } = require("./services/matchingEngine");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Database connection (gracefully falls back to in-memory store)
connectDB();

// ----------------------------------------------------
// Helper to get active founder (default to Kavya if not found)
// ----------------------------------------------------
function getActiveFounder(founderId) {
  const store = getStore();
  if (founderId) {
    const found = store.founders.find((f) => f.id === founderId);
    if (found) return found;
  }
  return store.founders[0];
}

// ----------------------------------------------------
// Health Check
// ----------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Namma-Connect API",
    version: "1.0.0",
    time: new Date().toISOString()
  });
});

// ----------------------------------------------------
// Demo Persona: Kavya / Namma Crunch
// ----------------------------------------------------
app.get("/api/demo/kavya", (req, res) => {
  const founder = resetDemoData();
  res.json({
    message: "Demo persona (Kavya - Namma Crunch) loaded successfully.",
    founder
  });
});

// ----------------------------------------------------
// Founder Onboarding & Assessment
// ----------------------------------------------------
app.post("/api/onboard", (req, res) => {
  try {
    const data = req.body;
    const diagnosis = computeDiagnosis(data);
    const store = getStore();

    const founderId = "founder-" + Date.now();
    const newFounder = {
      id: founderId,
      founderName: data.founderName || "Founder",
      brandName: data.brandName || "My D2C Brand",
      location: data.location || "Tamil Nadu",
      industry: data.industry || "Food & Beverages",
      productCategory: data.productCategory || "Artisanal Goods",
      websiteUrl: data.websiteUrl || "",
      instagramHandle: data.instagramHandle || "",
      businessModel: data.businessModel || "D2C Online",
      businessStage: data.businessStage || "Early traction",
      monthlyRevenue: data.monthlyRevenue || "₹50K–₹2L",
      actualMonthlyRevenue: data.monthlyRevenue,
      salesTrend: data.salesTrend || "Growing",
      challenges: data.challenges || ["Marketing", "Sales"],
      isSeekingFunding: data.isSeekingFunding !== false,
      fundingRequirement: data.fundingRequirement || "₹5L–₹10L",
      actualFundingRequirement: data.fundingRequirement || "₹5L",
      fundingPurpose: data.fundingPurpose || ["Marketing", "Expansion"],
      preferredLanguage: data.preferredLanguage || "English",
      preferredMentorExpertise: data.preferredMentorExpertise || "Growth & Marketing",
      mentorshipMode: data.mentorshipMode || "Online",
      targetCustomer: data.targetCustomer || "Conscious Consumers",
      primaryMarket: data.primaryMarket || "Regional",
      brandStory: data.brandStory || `${data.brandName} is an emerging D2C brand from ${data.location}.`,
      verified: true,
      proofOfWork: true,
      certifications: ["FSSAI Verified / Udyam Registered"],
      achievements: ["First 500 happy customers", "Local retail presence"],
      growthScore: diagnosis.growthScore,
      scoreStatus: diagnosis.scoreStatus,
      categoryScores: diagnosis.categoryScores,
      topGaps: diagnosis.topGaps,
      createdAt: new Date().toISOString()
    };

    store.founders.unshift(newFounder);

    // Generate personalized 30-day roadmap
    const roadmapTasks = generateRoadmapForFounder(newFounder);
    store.growthPlanTasks = roadmapTasks;

    // Add notification
    store.notifications.unshift({
      id: "notif-" + Date.now(),
      type: "assessment_complete",
      title: "Growth Diagnosis Complete",
      message: `🎯 Welcome ${newFounder.founderName}! Your Brand Growth Score is ${newFounder.growthScore}/100. We identified 3 key growth gaps.`,
      timestamp: "Just now",
      read: false,
      icon: "target",
      link: "/dashboard"
    });

    res.status(201).json({
      success: true,
      founder: newFounder,
      diagnosis,
      roadmap: roadmapTasks
    });
  } catch (err) {
    console.error("Onboard error:", err);
    res.status(500).json({ error: "Failed to process onboarding" });
  }
});

// ----------------------------------------------------
// Founder Profile & Score
// ----------------------------------------------------
app.get("/api/founders/:id", (req, res) => {
  const founder = getActiveFounder(req.params.id);
  if (!founder) {
    return res.status(404).json({ error: "Founder not found" });
  }
  res.json(founder);
});

app.patch("/api/founders/:id", (req, res) => {
  const founder = getActiveFounder(req.params.id);
  if (!founder) {
    return res.status(404).json({ error: "Founder not found" });
  }
  Object.assign(founder, req.body);
  res.json(founder);
});

// ----------------------------------------------------
// 30-Day Growth Roadmap
// ----------------------------------------------------
app.get("/api/roadmap/:founderId", (req, res) => {
  const store = getStore();
  res.json({
    founderId: req.params.founderId,
    tasks: store.growthPlanTasks
  });
});

app.patch("/api/roadmap/:founderId/tasks/:taskId", (req, res) => {
  const store = getStore();
  const { taskId } = req.params;
  const { status } = req.body;

  const task = store.growthPlanTasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.status = status || (task.status === "Completed" ? "Pending" : "Completed");

  // Calculate overall completed tasks percentage
  const total = store.growthPlanTasks.length;
  const completed = store.growthPlanTasks.filter((t) => t.status === "Completed").length;
  const percent = Math.round((completed / total) * 100);

  // If milestone reached, add notification
  if (percent === 100) {
    store.notifications.unshift({
      id: "notif-" + Date.now(),
      type: "roadmap_milestone",
      title: "Growth Plan Completed!",
      message: "🎉 Congratulations! You have completed all tasks in your 30-Day Growth Plan!",
      timestamp: "Just now",
      read: false,
      icon: "award",
      link: "/roadmap"
    });
  }

  res.json({
    task,
    progress: { total, completed, percent }
  });
});

// ----------------------------------------------------
// Mentors & Explainable Matching
// ----------------------------------------------------
app.get("/api/mentors", (req, res) => {
  const store = getStore();
  const founder = getActiveFounder(req.query.founderId);

  // Compute explainable match score for each mentor
  const mentorsWithMatches = store.mentors.map((mentor) => {
    const matchData = matchMentor(founder, mentor);
    return {
      ...mentor,
      matchPercentage: matchData.matchPercentage,
      matchBreakdown: matchData.breakdown,
      matchReasons: matchData.reasons
    };
  });

  // Sort descending by match percentage
  mentorsWithMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);

  res.json({
    founderName: founder.founderName,
    brandName: founder.brandName,
    mentors: mentorsWithMatches
  });
});

// Book Consultation
app.post("/api/mentors/:id/book", (req, res) => {
  const store = getStore();
  const { id } = req.params;
  const { founderId, date, timeSlot, notes } = req.body;
  const mentor = store.mentors.find((m) => m.id === id);

  if (!mentor) {
    return res.status(404).json({ error: "Mentor not found" });
  }

  const booking = {
    id: "booking-" + Date.now(),
    mentorId: mentor.id,
    mentorName: mentor.name,
    founderId: founderId || "founder-kavya-1",
    date: date || "Next Monday",
    timeSlot: timeSlot || "4:00 PM - 4:45 PM",
    fee: mentor.consultationFee,
    notes: notes || "Growth roadmap review & marketing audit",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  store.consultationBookings.push(booking);

  // Add notification
  store.notifications.unshift({
    id: "notif-" + Date.now(),
    type: "booking_confirmed",
    title: `Consultation Booked with ${mentor.name}`,
    message: `🤝 Session confirmed for ${booking.date} at ${booking.timeSlot}. A calendar invite has been sent.`,
    timestamp: "Just now",
    read: false,
    icon: "calendar",
    link: "/mentors"
  });

  res.status(201).json({
    success: true,
    message: "Consultation booked successfully",
    booking
  });
});

// ----------------------------------------------------
// Funding & Explainable Stage Fit
// ----------------------------------------------------
app.get("/api/funding", (req, res) => {
  const store = getStore();
  const founder = getActiveFounder(req.query.founderId);

  const fundingWithMatches = store.fundingOpportunities.map((opp) => {
    const matchData = matchFundingOpportunity(founder, opp);
    return {
      ...opp,
      matchPercentage: matchData.matchPercentage,
      breakdown: matchData.breakdown,
      reasons: matchData.reasons
    };
  });

  // Sort descending by match %
  fundingWithMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);

  res.json({
    founderName: founder.founderName,
    fundingRequirement: founder.actualFundingRequirement || founder.fundingRequirement,
    opportunities: fundingWithMatches
  });
});

// ----------------------------------------------------
// Marketplace
// ----------------------------------------------------
app.get("/api/marketplace", (req, res) => {
  const store = getStore();
  const { category, search } = req.query;

  let products = store.products;

  if (category && category !== "All") {
    products = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }

  res.json({
    total: products.length,
    products
  });
});

app.post("/api/marketplace", (req, res) => {
  const store = getStore();
  const data = req.body;
  const newProduct = {
    id: "prod-" + Date.now(),
    name: data.name || "Artisanal Product",
    brand: data.brand || "Local D2C Brand",
    founderId: data.founderId || "founder-kavya-1",
    founderName: data.founderName || "Kavya",
    category: data.category || "Food & Beverages",
    price: Number(data.price) || 299,
    originalPrice: Number(data.originalPrice) || Number(data.price) + 50,
    unit: data.unit || "Pack of 1",
    location: data.location || "Tamil Nadu",
    rating: 5.0,
    reviewCount: 1,
    badge: "New Release",
    isVerified: true,
    image:
      data.image ||
      "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80",
    description: data.description || "Handcrafted by an ambitious early-stage founder.",
    story: data.story || "Directly supporting regional artisans and farmers."
  };

  store.products.unshift(newProduct);

  store.notifications.unshift({
    id: "notif-" + Date.now(),
    type: "product_listed",
    title: "Product Listed in Marketplace",
    message: `🛍️ '${newProduct.name}' is now live on the Namma-Connect Marketplace!`,
    timestamp: "Just now",
    read: false,
    icon: "shopping-bag",
    link: "/marketplace"
  });

  res.status(201).json({
    success: true,
    product: newProduct
  });
});

// ----------------------------------------------------
// Marketing Hub & Campaign Analytics
// ----------------------------------------------------
app.get("/api/campaigns", (req, res) => {
  const store = getStore();
  res.json({
    campaigns: store.campaigns
  });
});

app.post("/api/campaigns", (req, res) => {
  const store = getStore();
  const data = req.body;
  const budget = Number(data.budget) || 500;

  // Realistic prototype performance simulation based on budget
  const estimatedReach = Math.round(budget * 16.8);
  const estimatedClicks = Math.round(estimatedReach * 0.017);
  const estimatedViews = Math.round(estimatedClicks * 4.8);
  const estimatedConversions = Math.max(1, Math.round(estimatedClicks * 0.19));

  const newCampaign = {
    id: "camp-" + Date.now(),
    founderId: data.founderId || "founder-kavya-1",
    productName: data.productName || "Millet Crunch",
    productId: data.productId || "prod-1",
    goal: data.goal || "Product sales",
    targetAudience: data.targetAudience || "Health-conscious consumers & Parents",
    location: data.location || "Tamil Nadu & South India",
    budget: budget,
    dailyBudget: Math.round(budget / 7),
    durationDays: 7,
    status: "Active",
    startDate: new Date().toISOString().split("T")[0],
    reach: estimatedReach,
    relevantAudiencePercent: 74,
    productViews: estimatedViews,
    clicks: estimatedClicks,
    conversions: estimatedConversions,
    costPerConversion: `₹${(budget / estimatedConversions).toFixed(2)}`,
    roas: "3.5x",
    audienceBreakdown: [
      { name: "Health Conscious", percentage: 52 },
      { name: "Young Parents", percentage: 31 },
      { name: "Fitness Enthusiasts", percentage: 17 }
    ],
    dailyPerformance: [
      { day: "Day 1", reach: Math.round(estimatedReach * 0.12), clicks: Math.round(estimatedClicks * 0.11), conversions: 1 },
      { day: "Day 2", reach: Math.round(estimatedReach * 0.16), clicks: Math.round(estimatedClicks * 0.15), conversions: 2 },
      { day: "Day 3", reach: Math.round(estimatedReach * 0.22), clicks: Math.round(estimatedClicks * 0.21), conversions: 4 },
      { day: "Day 4", reach: Math.round(estimatedReach * 0.25), clicks: Math.round(estimatedClicks * 0.26), conversions: 5 }
    ]
  };

  store.campaigns.unshift(newCampaign);

  store.notifications.unshift({
    id: "notif-" + Date.now(),
    type: "campaign_launched",
    title: "Campaign Launched Successfully",
    message: `🚀 Your targeted campaign for '${newCampaign.productName}' is now live (Budget: ₹${budget}).`,
    timestamp: "Just now",
    read: false,
    icon: "trending-up",
    link: "/marketing"
  });

  res.status(201).json({
    success: true,
    campaign: newCampaign
  });
});

// ----------------------------------------------------
// Notifications Center
// ----------------------------------------------------
app.get("/api/notifications", (req, res) => {
  const store = getStore();
  const unreadCount = store.notifications.filter((n) => !n.read).length;
  res.json({
    unreadCount,
    notifications: store.notifications
  });
});

app.patch("/api/notifications/:id/read", (req, res) => {
  const store = getStore();
  const notif = store.notifications.find((n) => n.id === req.params.id);
  if (notif) {
    notif.read = true;
  }
  res.json({ success: true, notification: notif });
});

app.post("/api/notifications/mark-all-read", (req, res) => {
  const store = getStore();
  store.notifications.forEach((n) => (n.read = true));
  res.json({ success: true });
});

// ----------------------------------------------------
// Admin Metrics & Platform Dashboard
// ----------------------------------------------------
app.get("/api/admin/metrics", (req, res) => {
  const store = getStore();
  res.json({
    metrics: {
      totalFounders: 142 + store.founders.length,
      activeBrands: 118 + store.founders.length,
      mentorConnections: 89 + store.consultationBookings.length,
      fundingMatches: 64,
      productsListed: 47 + store.products.length,
      campaignsLaunched: 86 + store.campaigns.length
    },
    charts: {
      founderGrowth: [
        { month: "Apr", founders: 24, brands: 18 },
        { month: "May", founders: 42, brands: 35 },
        { month: "Jun", founders: 68, brands: 58 },
        { month: "Jul", founders: 95, brands: 80 },
        { month: "Aug", founders: 122, brands: 104 },
        { month: "Sep", founders: 148, brands: 124 }
      ],
      marketplaceActivity: [
        { category: "Food & Bev", orders: 420, revenue: 125000 },
        { category: "Handcrafted", orders: 210, revenue: 84000 },
        { category: "Fashion", orders: 165, revenue: 98000 },
        { category: "Home & Life", orders: 130, revenue: 52000 },
        { category: "Agriculture", orders: 95, revenue: 41000 }
      ],
      mentorSpecialties: [
        { name: "Marketing", count: 42 },
        { name: "Branding", count: 35 },
        { name: "Supply Chain", count: 28 },
        { name: "Funding & Pitch", count: 22 }
      ],
      fundingApplications: [
        { scheme: "Stand-Up India", applicants: 45, approved: 18 },
        { scheme: "SISFS Grants", applicants: 38, approved: 12 },
        { scheme: "EDII TN Vouchers", applicants: 29, approved: 21 },
        { scheme: "Mudra Loans", applicants: 52, approved: 34 }
      ]
    }
  });
});

app.listen(PORT, () => {
  console.log(`[Namma-Connect] Server listening on http://localhost:${PORT}`);
});
