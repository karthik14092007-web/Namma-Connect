// server/src/controllers/diagnosticController.js
const diagnosticService = require('../services/diagnosticService');
const { success, error } = require('../utils/apiResponse');
const { db } = require('../lib/prisma');

async function submitDiagnostic(req, res) {
  try {
    let businessId = req.body.businessId;
    if (!businessId) {
      // Find default active business for user
      const biz = await db.business.findFirst({ where: { founderId: req.user.userId } });
      if (!biz) {
        // Auto-create default business for onboarding
        const newBiz = await db.business.create({
          data: {
            founderId: req.user.userId,
            name: req.body.brandName || 'My D2C Brand',
            category: 'Food & Beverage',
            description: 'Early-stage D2C venture',
            location: 'Tamil Nadu',
            stage: req.body.stage || 'EARLY_TRACTION'
          }
        });
        businessId = newBiz.id;
      } else {
        businessId = biz.id;
      }
    }

    const result = await diagnosticService.submitDiagnostic(businessId, req.body, req.user.userId, req.ip);
    return success(res, result, 201);
  } catch (err) {
    console.error('Submit diagnostic error:', err);
    return error(res, err.message, 'DIAGNOSTIC_SUBMISSION_FAILED', 400);
  }
}

async function getLatestDiagnostic(req, res) {
  try {
    const businessId = req.params.id;
    const diagnostic = await diagnosticService.getLatestDiagnostic(businessId);
    return success(res, { diagnostic }, 200);
  } catch (err) {
    return error(res, err.message, 'FETCH_DIAGNOSTIC_FAILED', 500);
  }
}

async function getDiagnostic(req, res) {
  try {
    const diagnostic = await diagnosticService.getDiagnosticById(req.params.id);
    return success(res, { diagnostic }, 200);
  } catch (err) {
    return error(res, err.message, 'FETCH_DIAGNOSTIC_FAILED', err.statusCode || 404);
  }
}

module.exports = {
  submitDiagnostic,
  getLatestDiagnostic,
  getDiagnostic
};
