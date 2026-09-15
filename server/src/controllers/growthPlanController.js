// server/src/controllers/growthPlanController.js
const growthPlanService = require('../services/growthPlanService');
const { success, error } = require('../utils/apiResponse');

async function getGrowthPlan(req, res) {
  try {
    const businessId = req.params.id;
    const plan = await growthPlanService.getGrowthPlanForBusiness(businessId);
    return success(res, { growthPlan: plan }, 200);
  } catch (err) {
    return error(res, err.message, 'FETCH_GROWTH_PLAN_FAILED', 500);
  }
}

async function updateAction(req, res) {
  try {
    const { id: growthPlanId, actionId } = req.params;
    const { status } = req.body;
    const result = await growthPlanService.updateActionStatus(growthPlanId, actionId, status, req.user.userId, req.ip);
    return success(res, result, 200);
  } catch (err) {
    return error(res, err.message, 'UPDATE_ACTION_FAILED', 400);
  }
}

module.exports = {
  getGrowthPlan,
  updateAction
};
