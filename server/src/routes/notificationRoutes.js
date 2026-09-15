// server/src/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, notificationController.listNotifications);
router.patch('/:id/read', requireAuth, notificationController.markAsRead);
router.post('/mark-all-read', requireAuth, notificationController.markAllRead);

module.exports = router;
