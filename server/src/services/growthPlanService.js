// server/src/services/growthPlanService.js
const { db } = require('../lib/prisma');
const { logAudit } = require('./auditService');

async function getGrowthPlanForBusiness(businessId) {
  const plan = await db.growthPlan.findFirst({
    where: { businessId },
    include: { actions: true }
  });

  if (!plan) return null;

  const actions = await db.growthAction.findMany({
    where: { growthPlanId: plan.id }
  });

  const total = actions.length;
  const completed = actions.filter(a => a.status === 'COMPLETED').length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    id: plan.id,
    businessId: plan.businessId,
    title: plan.title,
    description: plan.description,
    status: plan.status,
    progress: { total, completed, percent },
    tasks: actions
  };
}

async function updateActionStatus(growthPlanId, actionId, status, userId, ipAddress) {
  const action = await db.growthAction.findUnique({ where: { id: actionId } });
  if (!action) {
    const error = new Error('Growth action milestone not found');
    error.statusCode = 404;
    throw error;
  }

  const newStatus = status || (action.status === 'COMPLETED' ? 'NOT_STARTED' : 'COMPLETED');
  const updatedAction = await db.growthAction.update({
    where: { id: actionId },
    data: {
      status: newStatus,
      completedAt: newStatus === 'COMPLETED' ? new Date() : null
    }
  });

  // Calculate new progress
  const allActions = await db.growthAction.findMany({ where: { growthPlanId } });
  const total = allActions.length;
  const completed = allActions.filter(a => a.status === 'COMPLETED').length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (percent === 100) {
    await db.notification.create({
      data: {
        userId,
        title: 'Growth Plan Completed!',
        message: '🎉 Congratulations! You have completed all milestones in your 30-Day Growth Plan.',
        type: 'GROWTH_PLAN',
        read: false,
        link: '/roadmap'
      }
    });
  }

  await logAudit({
    userId,
    action: 'GROWTH_ACTION_UPDATED',
    entity: 'GrowthAction',
    entityId: actionId,
    metadata: { status: newStatus, percent },
    ipAddress
  });

  return {
    action: updatedAction,
    progress: { total, completed, percent }
  };
}

module.exports = {
  getGrowthPlanForBusiness,
  updateActionStatus
};
