// server/src/validators/businessValidator.js
const { z } = require('zod');

const createBusinessSchema = z.object({
  name: z.string().trim().min(2, 'Business name must be at least 2 characters'),
  category: z.string().trim().min(2, 'Category is required'),
  description: z.string().trim().min(5, 'Description must be at least 5 characters'),
  location: z.string().trim().min(2, 'Location is required'),
  stage: z.enum(['IDEA', 'PRE_REVENUE', 'EARLY_TRACTION', 'GROWING', 'ESTABLISHED']).optional().default('EARLY_TRACTION'),
  monthlyRevenue: z.string().optional(),
  fundingRequirement: z.string().optional(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  logoUrl: z.string().optional()
});

const updateBusinessSchema = createBusinessSchema.partial();

module.exports = {
  createBusinessSchema,
  updateBusinessSchema
};
