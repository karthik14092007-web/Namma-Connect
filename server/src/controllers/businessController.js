// server/src/controllers/businessController.js
const businessService = require('../services/businessService');
const { success, error } = require('../utils/apiResponse');

async function listMyBusinesses(req, res) {
  try {
    const businesses = await businessService.getBusinessesForFounder(req.user.userId);
    return success(res, { businesses }, 200);
  } catch (err) {
    return error(res, err.message, 'FETCH_BUSINESSES_FAILED', 500);
  }
}

async function getBusiness(req, res) {
  try {
    const business = await businessService.getBusinessById(req.params.id);
    return success(res, { business }, 200);
  } catch (err) {
    return error(res, err.message, 'FETCH_BUSINESS_FAILED', err.statusCode || 404);
  }
}

async function createBusiness(req, res) {
  try {
    const business = await businessService.createBusiness(req.user.userId, req.body, req.ip);
    return success(res, { business }, 201);
  } catch (err) {
    return error(res, err.message, 'CREATE_BUSINESS_FAILED', 400);
  }
}

async function updateBusiness(req, res) {
  try {
    const updated = await businessService.updateBusiness(req.params.id, req.body, req.user.userId, req.ip);
    return success(res, { business: updated }, 200);
  } catch (err) {
    return error(res, err.message, 'UPDATE_BUSINESS_FAILED', 400);
  }
}

async function deleteBusiness(req, res) {
  try {
    await businessService.deleteBusiness(req.params.id, req.user.userId, req.ip);
    return success(res, { message: 'Business archived successfully' }, 200);
  } catch (err) {
    return error(res, err.message, 'DELETE_BUSINESS_FAILED', 400);
  }
}

module.exports = {
  listMyBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness
};
