// server/src/validators/diagnosticValidator.js
const { z } = require('zod');

const singleResponseSchema = z.object({
  factor: z.string().optional(),
  questionKey: z.string().optional(),
  id: z.string().optional(),
  answerKey: z.union([z.string(), z.number()]).optional(),
  score: z.number().optional()
});

const submitAssessmentSchema = z.object({
  businessId: z.string().optional(),
  stage: z.string().optional().default('EARLY_TRACTION'),
  brandName: z.string().optional(),
  responses: z.array(singleResponseSchema).min(1, 'At least one response is required')
});

module.exports = {
  submitAssessmentSchema
};
