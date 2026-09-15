// server/src/validators/authValidator.js
const { z } = require('zod');

const registerSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  role: z.enum(['FOUNDER', 'MENTOR', 'INVESTOR', 'ADMIN']).optional().default('FOUNDER')
});

const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

const updateProfileSchema = z.object({
  phone: z.string().optional(),
  location: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  preferredLanguage: z.string().optional(),
  bio: z.string().optional(),
  profileImage: z.string().optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema
};
