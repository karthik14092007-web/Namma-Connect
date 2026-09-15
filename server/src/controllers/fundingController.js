// server/src/controllers/fundingController.js
const fundingService = require('../services/fundingService');
const { success, error } = require('../utils/apiResponse');

async function listOpportunities(req, res) {
  try {
    const { page, limit } = req.query;
    const founderId = req.user?.userId;
    const result = await fundingService.listOpportunities({ founderId, page, limit });
    return success(res, result, 200);
  } catch (err) {
    return error(res, err.message, 'LIST_FUNDING_FAILED', 500);
  }
}

async function getOpportunity(req, res) {
  try {
    const opp = await fundingService.getOpportunityById(req.params.id);
    return success(res, { opportunity: opp }, 200);
  } catch (err) {
    return error(res, err.message, 'GET_FUNDING_FAILED', err.statusCode || 404);
  }
}

async function apply(req, res) {
  try {
    const application = await fundingService.applyForFunding(req.user.userId, req.params.id, req.body, req.ip);
    return success(res, { application, message: 'Funding application submitted successfully' }, 201);
  } catch (err) {
    return error(res, err.message, 'APPLY_FUNDING_FAILED', 400);
  }
}

async function listMyApplications(req, res) {
  try {
    const applications = await fundingService.getFounderApplications(req.user.userId);
    return success(res, { applications }, 200);
  } catch (err) {
    return error(res, err.message, 'LIST_APPLICATIONS_FAILED', 500);
  }
}

module.exports = {
  listOpportunities,
  getOpportunity,
  apply,
  listMyApplications
};
