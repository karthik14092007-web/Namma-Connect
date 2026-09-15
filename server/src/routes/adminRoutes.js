// server/src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth, requireRole } = require('../middleware/auth');

router.get('/analytics', adminController.getAnalytics);
router.get('/metrics', adminController.getAnalytics); // Alias for compatibility
router.get('/users', requireAuth, requireRole('ADMIN'), adminController.listUsers);

module.exports = router;
