// server/src/services/diagnosticService.js
const { db } = require('../lib/prisma');
const { calculateDiagnostic } = require('./diagnostic/scoringEngine');
const { logAudit } = require('./auditService');

async function submitDiagnostic(businessId, { stage, responses = [], brandName }, userId, ipAddress) {
  const business = await db.business.findUnique({ where: { id: businessId } });
  if (!business) {
    const error = new Error('Business not found for diagnostic submission');
    error.statusCode = 404;
    throw error;
  }

  // Authoritative calculation
  const calculated = calculateDiagnostic({
    responses,
    stage: stage || business.stage,
    brandName: brandName || business.name
  });

  // 1. Create Diagnostic Assessment
  const assessment = await db.diagnosticAssessment.create({
    data: {
      businessId,
      stage: calculated.stage,
      status: 'COMPLETED',
      overallScore: calculated.overallScore,
      confidence: calculated.confidence,
      confidenceReason: calculated.confidenceReason,
      scoringVersion: calculated.scoringVersion,
      completedAt: new Date()
    }
  });

  // 2. Persist individual responses
  const responsesToCreate = calculated.processedResponses.map(r => ({
    assessmentId: assessment.id,
    factor: r.factor,
    questionKey: r.questionKey,
    answerKey: r.answerKey,
    score: r.score
  }));
  await db.diagnosticResponse.createMany({ data: responsesToCreate });

  // 3. Persist factor scores
  const factorScoresToCreate = Object.entries(calculated.factorScores).map(([factor, data]) => ({
    assessmentId: assessment.id,
    factor,
    score: data.score,
    weight: data.weight,
    contribution: data.contribution,
    status: data.status
  }));
  await db.diagnosticFactorScore.createMany({ data: factorScoresToCreate });

  // 4. Generate 30-Day Growth Plan from diagnostic bottlenecks
  const existingPlan = await db.growthPlan.findFirst({ where: { businessId } });
  let growthPlan = existingPlan;

  if (!growthPlan) {
    growthPlan = await db.growthPlan.create({
      data: {
        businessId,
        assessmentId: assessment.id,
        title: `30-Day Growth Acceleration Plan for ${business.name}`,
        description: `Action plan derived from Growth Diagnostic (${calculated.overallScore}/100)`,
        status: 'IN_PROGRESS'
      }
    });
  }

  // Populate Growth Actions
  if (calculated.nextBestAction && calculated.nextBestAction.recommendedPlan) {
    const actionsToCreate = calculated.nextBestAction.recommendedPlan.map((step, idx) => ({
      growthPlanId: growthPlan.id,
      title: step.title,
      description: `Targeted milestone addressing ${step.factor} bottleneck.`,
      factor: step.factor,
      priority: step.priority,
      week: step.week,
      status: 'NOT_STARTED'
    }));
    await db.growthAction.createMany({ data: actionsToCreate });
  }

  // 5. Create Notification
  await db.notification.create({
    data: {
      userId,
      title: 'Growth Diagnostic Completed',
      message: `🎯 Diagnostic completed for ${business.name}! Overall score: ${calculated.overallScore}/100 (${calculated.maturityLabel}).`,
      type: 'GROWTH_PLAN',
      read: false,
      link: '/dashboard'
    }
  });

  await logAudit({
    userId,
    action: 'DIAGNOSTIC_COMPLETED',
    entity: 'DiagnosticAssessment',
    entityId: assessment.id,
    metadata: { score: calculated.overallScore, stage: calculated.stage },
    ipAddress
  });

  return {
    assessmentId: assessment.id,
    businessId,
    overallScore: calculated.overallScore,
    maturity: calculated.maturity,
    maturityLabel: calculated.maturityLabel,
    confidence: calculated.confidence,
    confidenceReason: calculated.confidenceReason,
    scoringVersion: calculated.scoringVersion,
    factorScores: calculated.factorScores,
    topGaps: calculated.topGaps,
    bottlenecks: calculated.bottlenecks,
    nextBestAction: calculated.nextBestAction,
    growthPlanId: growthPlan.id
  };
}

async function getLatestDiagnostic(businessId) {
  const assessment = await db.diagnosticAssessment.findFirst({
    where: { businessId, status: 'COMPLETED' },
    orderBy: { createdAt: 'desc' }
  });

  if (!assessment) return null;

  const responses = await db.diagnosticResponse.findMany({ where: { assessmentId: assessment.id } });
  const factorScoresList = await db.diagnosticFactorScore.findMany({ where: { assessmentId: assessment.id } });

  const factorScores = {};
  factorScoresList.forEach(f => {
    factorScores[f.factor] = {
      score: f.score,
      weight: f.weight,
      contribution: f.contribution,
      status: f.status
    };
  });

  return {
    assessmentId: assessment.id,
    businessId,
    stage: assessment.stage,
    overallScore: assessment.overallScore,
    confidence: assessment.confidence,
    confidenceReason: assessment.confidenceReason,
    scoringVersion: assessment.scoringVersion,
    createdAt: assessment.createdAt,
    factorScores,
    responsesCount: responses.length
  };
}

async function getDiagnosticById(id) {
  const assessment = await db.diagnosticAssessment.findUnique({ where: { id } });
  if (!assessment) {
    const error = new Error('Diagnostic assessment not found');
    error.statusCode = 404;
    throw error;
  }

  const responses = await db.diagnosticResponse.findMany({ where: { assessmentId: assessment.id } });
  const factorScoresList = await db.diagnosticFactorScore.findMany({ where: { assessmentId: assessment.id } });

  return {
    assessment,
    factorScores: factorScoresList,
    responses
  };
}

module.exports = {
  submitDiagnostic,
  getLatestDiagnostic,
  getDiagnosticById
};
