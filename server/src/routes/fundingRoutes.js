// server/src/routes/fundingRoutes.js
const express = require('express');
const router = express.Router();
const fundingController = require('../controllers/fundingController');
const { requireAuth } = require('../middleware/auth');

router.get('/', fundingController.listOpportunities);
router.get('/applications', requireAuth, fundingController.listMyApplications);
router.get('/:id', fundingController.getOpportunity);
router.post('/:id/apply', requireAuth, fundingController.apply);

module.exports = router;
