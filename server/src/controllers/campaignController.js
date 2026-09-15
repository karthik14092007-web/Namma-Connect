// server/src/controllers/campaignController.js
const campaignService = require('../services/campaignService');
const { success, error } = require('../utils/apiResponse');

async function listCampaigns(req, res) {
  try {
    const founderId = req.user?.userId;
    const campaigns = await campaignService.listCampaigns(founderId);
    return success(res, { campaigns }, 200);
  } catch (err) {
    return error(res, err.message, 'LIST_CAMPAIGNS_FAILED', 500);
  }
}

async function getCampaign(req, res) {
  try {
    const campaign = await campaignService.getCampaignById(req.params.id);
    return success(res, { campaign }, 200);
  } catch (err) {
    return error(res, err.message, 'GET_CAMPAIGN_FAILED', err.statusCode || 404);
  }
}

async function createCampaign(req, res) {
  try {
    const campaign = await campaignService.createCampaign(req.user.userId, req.body, req.ip);
    return success(res, { campaign }, 201);
  } catch (err) {
    return error(res, err.message, 'CREATE_CAMPAIGN_FAILED', 400);
  }
}

async function getAnalytics(req, res) {
  try {
    const result = await campaignService.getCampaignAnalytics(req.params.id);
    return success(res, result, 200);
  } catch (err) {
    return error(res, err.message, 'GET_ANALYTICS_FAILED', err.statusCode || 404);
  }
}

module.exports = {
  listCampaigns,
  getCampaign,
  createCampaign,
  getAnalytics
};
