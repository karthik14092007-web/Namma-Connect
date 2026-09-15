// server/src/services/fundingService.js
const { db } = require('../lib/prisma');
const { logAudit } = require('./auditService');

/**
 * Calculates rule-based stage fit for funding schemes
 */
function calculateFundingFit(founder, opportunity) {
  let score = 50;
  const reasons = [];
  const breakdown = [];

  const stage = (founder?.stage || founder?.businessStage || 'Early traction').toLowerCase();
  const oppStages = (opportunity.stages || '').toLowerCase();
  if (oppStages.includes('early') || oppStages.includes('traction') || oppStages.includes('all')) {
    score += 20;
    reasons.push('Eligible for Early Traction stage businesses');
    breakdown.push({ criteria: 'Stage Eligibility', points: 20, max: 20 });
  } else {
    breakdown.push({ criteria: 'Stage Eligibility', points: 10, max: 20 });
  }

  const founderLoc = (founder?.location || 'Tamil Nadu').toLowerCase();
  const oppLoc = (opportunity.location || '').toLowerCase();
  if (oppLoc.includes('tamil') || oppLoc.includes('pan-india') || oppLoc.includes('all')) {
    score += 15;
    reasons.push('Available for enterprises operating in Tamil Nadu');
    breakdown.push({ criteria: 'Geographic Eligibility', points: 15, max: 15 });
  } else {
    breakdown.push({ criteria: 'Geographic Eligibility', points: 5, max: 15 });
  }

  const founderInd = (founder?.category || founder?.industry || 'Food & Beverages').toLowerCase();
  const oppInd = (opportunity.industries || '').toLowerCase();
  if (oppInd.includes('food') || oppInd.includes('manufacturing') || oppInd.includes('all')) {
    score += 15;
    reasons.push('Directly supports Agri-food and D2C consumer brands');
    breakdown.push({ criteria: 'Sector Priority', points: 15, max: 15 });
  } else {
    breakdown.push({ criteria: 'Sector Priority', points: 10, max: 15 });
  }

  const finalScore = Math.min(98, Math.max(40, score));

  return {
    matchPercentage: finalScore,
    reasons,
    breakdown
  };
}

async function listOpportunities({ founderId, page = 1, limit = 20 }) {
  const take = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
  const skip = (Math.max(1, parseInt(page, 10) || 1) - 1) * take;

  const allOpps = await db.fundingOpportunity.findMany({ where: { isActive: true } });
  let founder = null;

  if (founderId) {
    founder = await db.user.findUnique({ where: { id: founderId } });
    if (founder) {
      founder.business = await db.business.findFirst({ where: { founderId: founder.id } });
    }
  }

  const scoredOpps = allOpps.map(opp => {
    const match = calculateFundingFit(founder || { location: 'Tamil Nadu', stage: 'Early traction' }, opp);
    return {
      ...opp,
      matchPercentage: match.matchPercentage,
      reasons: match.reasons,
      breakdown: match.breakdown
    };
  });

  scoredOpps.sort((a, b) => b.matchPercentage - a.matchPercentage);
  const paginated = scoredOpps.slice(skip, skip + take);

  return {
    total: allOpps.length,
    page: parseInt(page, 10) || 1,
    limit: take,
    opportunities: paginated
  };
}

async function getOpportunityById(id, founder) {
  const opp = await db.fundingOpportunity.findUnique({ where: { id } });
  if (!opp) {
    const error = new Error('Funding opportunity not found');
    error.statusCode = 404;
    throw error;
  }
  const match = calculateFundingFit(founder || { location: 'Tamil Nadu' }, opp);
  return {
    ...opp,
    matchPercentage: match.matchPercentage,
    reasons: match.reasons,
    breakdown: match.breakdown
  };
}

async function applyForFunding(founderId, opportunityId, { businessId, notes }, ipAddress) {
  const opp = await db.fundingOpportunity.findUnique({ where: { id: opportunityId } });
  if (!opp) {
    const error = new Error('Funding opportunity not found');
    error.statusCode = 404;
    throw error;
  }

  const app = await db.fundingApplication.create({
    data: {
      founderId,
      businessId: businessId || 'biz-default',
      fundingOpportunityId: opportunityId,
      status: 'APPLIED',
      notes: notes || 'Submitted application via Namma-Connect Growth OS.'
    }
  });

  await db.notification.create({
    data: {
      userId: founderId,
      title: `Funding Application Submitted: ${opp.name}`,
      message: `📑 Your application for ${opp.name} (${opp.amountMax}) has been registered and is under preliminary review.`,
      type: 'FUNDING',
      read: false,
      link: '/funding'
    }
  });

  await logAudit({
    userId: founderId,
    action: 'FUNDING_APPLIED',
    entity: 'FundingApplication',
    entityId: app.id,
    ipAddress
  });

  return app;
}

async function getFounderApplications(founderId) {
  return db.fundingApplication.findMany({
    where: { founderId }
  });
}

module.exports = {
  calculateFundingFit,
  listOpportunities,
  getOpportunityById,
  applyForFunding,
  getFounderApplications
};
