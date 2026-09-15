// server/src/controllers/adminController.js
const adminService = require('../services/adminService');
const { success, error } = require('../utils/apiResponse');

async function getAnalytics(req, res) {
  try {
    const data = await adminService.getAdminMetrics();
    return success(res, data, 200);
  } catch (err) {
    return error(res, err.message, 'FETCH_ADMIN_METRICS_FAILED', 500);
  }
}

async function listUsers(req, res) {
  try {
    const { page, limit } = req.query;
    const result = await adminService.listUsers(page, limit);
    return success(res, result, 200);
  } catch (err) {
    return error(res, err.message, 'LIST_USERS_FAILED', 500);
  }
}

module.exports = {
  getAnalytics,
  listUsers
};
