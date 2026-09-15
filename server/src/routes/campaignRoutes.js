// server/src/routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const { requireAuth, requireOwnership } = require('../middleware/auth');
const { validateBody } = require('../middleware/validate');
const { createCampaignSchema } = require('../validators/campaignValidator');

router.get('/', requireAuth, campaignController.listCampaigns);
router.post('/', requireAuth, validateBody(createCampaignSchema), campaignController.createCampaign);
router.get('/:id', requireAuth, requireOwnership('campaign'), campaignController.getCampaign);
router.get('/:id/analytics', requireAuth, requireOwnership('campaign'), campaignController.getAnalytics);

module.exports = router;
