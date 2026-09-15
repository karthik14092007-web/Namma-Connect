// server/src/validators/campaignValidator.js
const { z } = require('zod');

const createCampaignSchema = z.object({
  businessId: z.string().optional(),
  title: z.string().trim().min(3, 'Campaign title must be at least 3 characters'),
  description: z.string().optional().default('Targeted D2C Launch Campaign'),
  mediaUrl: z.string().optional(),
  productId: z.string().optional(),
  campaignType: z.enum(['PRODUCT_LAUNCH', 'PRODUCT_DEMO', 'FOUNDER_STORY', 'CUSTOMER_STORY', 'OFFER']).optional().default('PRODUCT_LAUNCH'),
  objective: z.enum(['PRODUCT_SALES', 'AWARENESS', 'LEADS', 'DISCOVERY']).optional().default('PRODUCT_SALES'),
  budget: z.number().min(100, 'Minimum budget is ₹100').optional().default(500),
  targetAudience: z.string().optional(),
  location: z.string().optional()
});

module.exports = {
  createCampaignSchema
};
