// server/src/controllers/notificationController.js
const notificationService = require('../services/notificationService');
const { success, error } = require('../utils/apiResponse');

async function listNotifications(req, res) {
  try {
    const userId = req.user?.userId;
    const result = await notificationService.getUserNotifications(userId);
    return success(res, result, 200);
  } catch (err) {
    return error(res, err.message, 'LIST_NOTIFICATIONS_FAILED', 500);
  }
}

async function markAsRead(req, res) {
  try {
    const userId = req.user?.userId;
    const notification = await notificationService.markNotificationAsRead(userId, req.params.id);
    return success(res, { notification }, 200);
  } catch (err) {
    return error(res, err.message, 'MARK_READ_FAILED', 400);
  }
}

async function markAllRead(req, res) {
  try {
    const userId = req.user?.userId;
    const result = await notificationService.markAllAsRead(userId);
    return success(res, result, 200);
  } catch (err) {
    return error(res, err.message, 'MARK_ALL_READ_FAILED', 500);
  }
}

module.exports = {
  listNotifications,
  markAsRead,
  markAllRead
};
