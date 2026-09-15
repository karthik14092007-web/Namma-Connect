// server/src/validators/marketplaceValidator.js
const { z } = require('zod');

const createProductSchema = z.object({
  businessId: z.string().optional(),
  name: z.string().trim().min(2, 'Product name is required'),
  description: z.string().trim().min(5, 'Product description is required'),
  category: z.string().trim().min(2, 'Category is required'),
  price: z.number().positive('Price must be greater than 0'),
  originalPrice: z.number().positive().optional(),
  unit: z.string().optional().default('Pack of 1'),
  imageUrl: z.string().optional(),
  stock: z.number().int().nonnegative().optional().default(100)
});

const updateProductSchema = createProductSchema.partial();

module.exports = {
  createProductSchema,
  updateProductSchema
};
