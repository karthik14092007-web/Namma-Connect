// server/src/services/campaignService.js
const { db } = require('../lib/prisma');
const { logAudit } = require('./auditService');

async function listCampaigns(founderId) {
  const where = founderId ? { founderId } : {};
  return db.campaign.findMany({ where });
}

async function getCampaignById(id) {
  const campaign = await db.campaign.findUnique({ where: { id } });
  if (!campaign) {
    const error = new Error('Campaign not found');
    error.statusCode = 404;
    throw error;
  }
  return campaign;
}

async function createCampaign(founderId, data, ipAddress) {
  const budget = Number(data.budget) || 500;
  const estimatedReach = Math.round(budget * 16.8);
  const estimatedClicks = Math.round(estimatedReach * 0.017);
  const estimatedViews = Math.round(estimatedClicks * 4.8);
  const estimatedConversions = Math.max(1, Math.round(estimatedClicks * 0.19));

  let businessId = data.businessId;
  if (!businessId) {
    const biz = await db.business.findFirst({ where: { founderId } });
    businessId = biz ? biz.id : 'biz-default';
  }

  const campaign = await db.campaign.create({
    data: {
      businessId,
      founderId,
      title: data.title,
      description: data.description || 'Targeted D2C Launch Campaign',
      mediaUrl: data.mediaUrl || null,
      productId: data.productId || null,
      campaignType: data.campaignType || 'PRODUCT_LAUNCH',
      objective: data.objective || 'PRODUCT_SALES',
      budget,
      dailyBudget: Math.round(budget / 7),
      durationDays: 7,
      status: 'ACTIVE',
      reach: estimatedReach,
      relevantPercent: 74,
      productViews: estimatedViews,
      clicks: estimatedClicks,
      conversions: estimatedConversions
    }
  });

  // Audience record
  await db.campaignAudience.create({
    data: {
      campaignId: campaign.id,
      ageRange: '20-36',
      locations: data.location || 'Tamil Nadu & South India',
      interests: data.targetAudience || 'Healthy Eating, Desk Snacking',
      customerType: 'Conscious Consumers',
      purchaseIntent: 'High',
      category: 'Food & Beverage'
    }
  });

  // Initial Analytics record
  await db.campaignAnalytics.create({
    data: {
      campaignId: campaign.id,
      impressions: estimatedReach,
      views: estimatedViews,
      clicks: estimatedClicks,
      engagements: Math.round(estimatedViews * 0.4),
      leads: estimatedConversions * 3,
      conversions: estimatedConversions,
      spend: budget
    }
  });

  await db.notification.create({
    data: {
      userId: founderId,
      title: 'Targeted Campaign Live',
      message: `🚀 Your video campaign '${campaign.title}' is active (Budget: ₹${budget}, Est. Reach: ${estimatedReach}).`,
      type: 'CAMPAIGN',
      read: false,
      link: '/marketing'
    }
  });

  await logAudit({
    userId: founderId,
    action: 'CAMPAIGN_CREATED',
    entity: 'Campaign',
    entityId: campaign.id,
    ipAddress
  });

  return campaign;
}

async function getCampaignAnalytics(campaignId) {
  const campaign = await getCampaignById(campaignId);
  const audience = await db.campaignAudience.findFirst({ where: { campaignId } });
  const analytics = await db.campaignAnalytics.findFirst({ where: { campaignId } });

  return {
    campaign,
    audience,
    analytics: analytics || {
      impressions: campaign.reach,
      views: campaign.productViews,
      clicks: campaign.clicks,
      conversions: campaign.conversions,
      spend: campaign.budget
    }
  };
}

module.exports = {
  listCampaigns,
  getCampaignById,
  createCampaign,
  getCampaignAnalytics
};
