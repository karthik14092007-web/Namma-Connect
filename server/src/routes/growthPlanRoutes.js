// server/src/routes/growthPlanRoutes.js
const express = require('express');
const router = express.Router();
const growthPlanController = require('../controllers/growthPlanController');
const { requireAuth, requireOwnership } = require('../middleware/auth');

router.get('/:id', requireAuth, growthPlanController.getGrowthPlan);
router.post('/:id/actions/:actionId/complete', requireAuth, growthPlanController.updateAction);

module.exports = router;
