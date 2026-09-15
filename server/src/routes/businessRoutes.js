// server/src/routes/businessRoutes.js
const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const { requireAuth, requireOwnership } = require('../middleware/auth');
const { validateBody } = require('../middleware/validate');
const { createBusinessSchema, updateBusinessSchema } = require('../validators/businessValidator');

router.get('/', requireAuth, businessController.listMyBusinesses);
router.post('/', requireAuth, validateBody(createBusinessSchema), businessController.createBusiness);
router.get('/:id', requireAuth, requireOwnership('business'), businessController.getBusiness);
router.patch('/:id', requireAuth, requireOwnership('business'), validateBody(updateBusinessSchema), businessController.updateBusiness);
router.delete('/:id', requireAuth, requireOwnership('business'), businessController.deleteBusiness);

module.exports = router;
