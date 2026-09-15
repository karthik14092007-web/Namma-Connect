// server/src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const config = require('./config');
const { apiLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const { db } = require('./lib/prisma');
const { seed } = require('../../prisma/seed');

// Modern v1 Routes
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const businessRoutes = require('./routes/businessRoutes');
const diagnosticRoutes = require('./routes/diagnosticRoutes');
const growthPlanRoutes = require('./routes/growthPlanRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const fundingRoutes = require('./routes/fundingRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const marketplaceRoutes = require('./routes/marketplaceRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Diagnostic scoring engine for compatibility endpoints
const { calculateDiagnostic } = require('./services/diagnostic/scoringEngine');
const mentorService = require('./services/mentorService');
const fundingService = require('./services/fundingService');
const campaignService = require('./services/campaignService');
const marketplaceService = require('./services/marketplaceService');
const notificationService = require('./services/notificationService');
const growthPlanService = require('./services/growthPlanService');
const adminService = require('./services/adminService');

const app = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  crossOriginOpenerPolicy: false
}));
app.use(cors(config.cors));
app.use(cookieParser());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use('/api', apiLimiter);

// ----------------------------------------------------
// Health Check Handlers (v1 & legacy)
// ----------------------------------------------------
const handleHealth = (req, res) => {
  if (db.isConnected) {
    return res.status(200).json({
      success: true,
      status: 'healthy',
      service: 'namma-connect-api',
      database: 'connected'
    });
  } else {
    return res.status(200).json({
      success: false,
      status: 'degraded',
      service: 'namma-connect-api',
      database: 'disconnected'
    });
  }
};

app.get('/api/v1/health', handleHealth);
app.get('/api/health', handleHealth);

// ----------------------------------------------------
// Modern REST API (v1)
// ----------------------------------------------------
app.use('/api/v1', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/business', businessRoutes);
app.use('/api/v1/diagnostics', diagnosticRoutes);
app.use('/api/v1/growth-plan', growthPlanRoutes);
app.use('/api/v1/mentors', mentorRoutes);
app.use('/api/v1/funding', fundingRoutes);
app.use('/api/v1/campaigns', campaignRoutes);
app.use('/api/v1/marketplace', marketplaceRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/admin', adminRoutes);

// ----------------------------------------------------
// Compatibility Aliases for Existing Frontend (Zero Breakage)
// ----------------------------------------------------
const handleKavyaDemo = async (req, res) => {
  try {
    let user = await db.user.findFirst({ where: { email: 'kavya@nammacrunch.in' } });
    if (!user) {
      await seed();
      user = await db.user.findFirst({ where: { email: 'kavya@nammacrunch.in' } });
    }

    const profile = await db.founderProfile.findFirst({ where: { userId: user.id } });
    const business = await db.business.findFirst({ where: { founderId: user.id } });
    const diag = await db.diagnosticAssessment.findFirst({ where: { businessId: business?.id } });
    const growthPlan = business ? await db.growthPlan.findFirst({ where: { businessId: business.id } }) : null;
    const mentorMatches = business ? await mentorService.getMatchesForBusiness(business.id) : [];
    const fundingMatches = business ? await fundingService.getOpportunitiesForBusiness(business.id) : [];
    const campaigns = business ? await campaignService.getCampaignsByBusiness(business.id) : [];

    const founderPayload = {
      id: user.id,
      founderName: `${user.firstName} ${user.lastName}`,
      brandName: business ? business.name : 'Namma Crunch',
      location: business ? business.location : 'Madurai, Tamil Nadu',
      industry: business ? business.category : 'Food & Beverages',
      productCategory: 'Artisanal Healthy Snacks',
      businessStage: 'Early traction',
      monthlyRevenue: business ? business.monthlyRevenue : '₹1.8L',
      actualMonthlyRevenue: business ? business.monthlyRevenue : '₹1.8L',
      fundingRequirement: business ? business.fundingRequirement : '₹7L',
      growthScore: diag ? diag.overallScore : 68,
      scoreStatus: diag && diag.overallScore >= 60 ? 'Ready for Focused Growth' : 'Developing',
      categoryScores: {
        Product: 85,
        Sales: 70,
        Branding: 60,
        Marketing: 50,
        Reach: 70,
        Funding: 75
      },
      topGaps: [
        { category: 'Marketing', score: 50, priority: 'Critical Gap', recommendation: 'Define Target Customer & Sharpen Positioning' },
        { category: 'Branding', score: 60, priority: 'High Priority', recommendation: 'Establish Consistent Visual Identity' },
        { category: 'Sales', score: 70, priority: 'Developing', recommendation: 'Optimize Repeat Purchases & Margins' }
      ],
      verified: true,
      proofOfWork: true,
      certifications: ['FSSAI Verified / Udyam Registered'],
      achievements: ['First 500 happy customers', 'Local retail presence']
    };

    const businessPayload = business || {
      id: 'biz-kavya-1',
      name: 'Namma Crunch',
      category: 'Food & Beverages',
      stage: 'Early traction',
      monthlyRevenue: '₹1.8L',
      location: 'Madurai, Tamil Nadu'
    };

    const diagnosticPayload = diag || {
      overallScore: 68,
      stage: 'Early traction',
      categoryScores: founderPayload.categoryScores,
      topGaps: founderPayload.topGaps
    };

    const growthPlanPayload = growthPlan || {
      milestones: 12,
      duration: '90 Days',
      status: 'Active'
    };

    return res.status(200).json({
      success: true,
      message: 'Demo persona (Kavya - Namma Crunch) loaded successfully.',
      founder: founderPayload,
      data: {
        founder: founderPayload,
        business: businessPayload,
        diagnostic: diagnosticPayload,
        growthPlan: growthPlanPayload,
        mentorMatches: mentorMatches || [],
        fundingMatches: fundingMatches || [],
        campaigns: campaigns || []
      }
    });
  } catch (err) {
    console.error('[Kavya Demo Route Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to load demo persona',
      code: 'DEMO_ERROR'
    });
  }
};

app.get('/api/demo/kavya', handleKavyaDemo);
app.get('/api/v1/demo/kavya', handleKavyaDemo);


app.post('/api/onboard', async (req, res) => {
  try {
    const data = req.body;
    let responses = [];
    if (data.diagnosticAnswers && Array.isArray(data.diagnosticAnswers)) {
      responses = data.diagnosticAnswers;
    } else {
      responses = [
        { questionKey: 'marketing.target_customer', score: 40 },
        { questionKey: 'marketing.acquisition_channel', score: 60 },
        { questionKey: 'marketing.performance_tracking', score: 40 },
        { questionKey: 'marketing.campaign_execution', score: 60 }
      ];
    }

    const calculated = calculateDiagnostic({
      responses,
      stage: data.businessStage || 'EARLY_TRACTION',
      brandName: data.brandName || 'My D2C Brand'
    });

    const categoryScores = {
      Product: calculated.factorScores.PRODUCT?.score || 85,
      Sales: calculated.factorScores.SALES?.score || 70,
      Branding: calculated.factorScores.BRANDING?.score || 60,
      Marketing: calculated.factorScores.MARKETING?.score || 50,
      Reach: calculated.factorScores.REACH?.score || 70,
      Funding: calculated.factorScores.FUNDING?.score || 75
    };

    const newFounder = {
      id: `founder-${Date.now()}`,
      founderName: data.founderName || 'Founder',
      brandName: data.brandName || 'My D2C Brand',
      location: data.location || 'Tamil Nadu',
      industry: data.industry || 'Food & Beverages',
      businessStage: data.businessStage || 'Early traction',
      monthlyRevenue: data.monthlyRevenue || '₹50K–₹2L',
      fundingRequirement: data.fundingRequirement || '₹5L',
      growthScore: calculated.overallScore,
      scoreStatus: calculated.status,
      categoryScores,
      topGaps: calculated.topGaps.map(g => ({
        category: g.factor.charAt(0) + g.factor.slice(1).toLowerCase(),
        score: g.score,
        priority: g.label,
        recommendation: calculated.nextBestAction.action
      }))
    };

    res.status(201).json({
      success: true,
      founder: newFounder,
      diagnosis: calculated
    });
  } catch (err) {
    console.error('Onboard error:', err);
    res.status(500).json({ error: 'Failed to process onboarding' });
  }
});

app.get('/api/founders/:id', async (req, res) => {
  const user = await db.user.findFirst();
  const business = await db.business.findFirst();
  res.json({
    id: req.params.id,
    founderName: user ? `${user.firstName} ${user.lastName}` : 'Kavya',
    brandName: business ? business.name : 'Namma Crunch',
    location: business ? business.location : 'Madurai, Tamil Nadu',
    growthScore: 68
  });
});

app.get('/api/roadmap/:founderId', async (req, res) => {
  const plan = await db.growthPlan.findFirst();
  const actions = await db.growthAction.findMany({ where: { growthPlanId: plan?.id } });
  res.json({
    founderId: req.params.founderId,
    tasks: actions.map(a => ({
      id: a.id,
      title: a.title,
      factor: a.factor,
      priority: a.priority,
      week: a.week,
      status: a.status === 'COMPLETED' ? 'Completed' : (a.status === 'IN_PROGRESS' ? 'In Progress' : 'Pending')
    }))
  });
});

app.patch('/api/roadmap/:founderId/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  const action = await db.growthAction.update({
    where: { id: taskId },
    data: { status: status === 'Completed' ? 'COMPLETED' : 'NOT_STARTED' }
  });
  const all = await db.growthAction.findMany();
  const completed = all.filter(a => a.status === 'COMPLETED').length;
  res.json({
    task: action,
    progress: { total: all.length, completed, percent: Math.round((completed / all.length) * 100) }
  });
});

app.get('/api/mentors', async (req, res) => {
  const result = await mentorService.listMentors({ page: 1, limit: 20 });
  res.json({
    founderName: 'Kavya',
    brandName: 'Namma Crunch',
    mentors: result.mentors
  });
});

app.post('/api/mentors/:id/book', async (req, res) => {
  const { id } = req.params;
  const match = await mentorService.requestMentorMatch('usr-kavya-1', { mentorId: id, ...req.body }, req.ip);
  res.status(201).json({
    success: true,
    message: 'Consultation booked successfully',
    booking: match
  });
});

app.get('/api/funding', async (req, res) => {
  const result = await fundingService.listOpportunities({ page: 1, limit: 20 });
  res.json({
    founderName: 'Kavya',
    fundingRequirement: '₹7L',
    opportunities: result.opportunities
  });
});

app.get('/api/marketplace', async (req, res) => {
  const result = await marketplaceService.listProducts(req.query);
  res.json({
    total: result.total,
    products: result.products
  });
});

app.post('/api/marketplace', async (req, res) => {
  const product = await marketplaceService.createProduct('usr-kavya-1', req.body, req.ip);
  res.status(201).json({ success: true, product });
});

app.get('/api/campaigns', async (req, res) => {
  const campaigns = await campaignService.listCampaigns();
  res.json({ campaigns });
});

app.post('/api/campaigns', async (req, res) => {
  const campaign = await campaignService.createCampaign('usr-kavya-1', req.body, req.ip);
  res.status(201).json({ success: true, campaign });
});

app.get('/api/notifications', async (req, res) => {
  const result = await notificationService.getUserNotifications('usr-kavya-1');
  res.json(result);
});

app.patch('/api/notifications/:id/read', async (req, res) => {
  const notif = await notificationService.markNotificationAsRead('usr-kavya-1', req.params.id);
  res.json({ success: true, notification: notif });
});

app.post('/api/notifications/mark-all-read', async (req, res) => {
  await notificationService.markAllAsRead('usr-kavya-1');
  res.json({ success: true });
});

app.get('/api/admin/metrics', async (req, res) => {
  const metrics = await adminService.getAdminMetrics();
  res.json(metrics);
});

// ----------------------------------------------------
// Static Client Serving (Production SPA fallback)
// ----------------------------------------------------
const clientDistPath = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    }
  });
}

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
