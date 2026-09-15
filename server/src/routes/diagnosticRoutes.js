// server/src/routes/diagnosticRoutes.js
const express = require('express');
const router = express.Router();
const diagnosticController = require('../controllers/diagnosticController');
const { requireAuth, requireOwnership } = require('../middleware/auth');
const { validateBody } = require('../middleware/validate');
const { submitAssessmentSchema } = require('../validators/diagnosticValidator');

router.post('/', requireAuth, validateBody(submitAssessmentSchema), diagnosticController.submitDiagnostic);
router.get('/:id', requireAuth, requireOwnership('diagnostic'), diagnosticController.getDiagnostic);

module.exports = router;
