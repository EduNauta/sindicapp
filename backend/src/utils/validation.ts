import { z } from 'zod';

// User registration validation schema
export const registerSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Email is required')
    .max(255, 'Email is too long'),
  
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),
  
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long')
    .optional(),
  
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long')
    .optional(),
  
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional()
});

// User login validation schema
export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, 'Email or username is required')
    .max(255, 'Input is too long'),
  
  password: z
    .string()
    .min(1, 'Password is required')
    .max(128, 'Password is too long'),
  
  rememberMe: z
    .boolean()
    .optional()
    .default(false)
});

// Refresh token validation schema
export const refreshTokenSchema = z.object({
  refreshToken: z
    .string()
    .min(1, 'Refresh token is required')
});

// Password reset request schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Email is required')
});

// Password reset schema
export const resetPasswordSchema = z.object({
  token: z
    .string()
    .min(1, 'Reset token is required'),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    )
});

// Change password schema
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Current password is required'),
  
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters')
    .max(128, 'New password is too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'New password must contain at least one lowercase letter, one uppercase letter, and one number'
    )
});

// Update profile schema
export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .max(50, 'First name is too long')
    .optional(),
  
  lastName: z
    .string()
    .max(50, 'Last name is too long')
    .optional(),
  
  bio: z
    .string()
    .max(500, 'Bio is too long')
    .optional(),
  
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional(),
  
  profilePublic: z
    .boolean()
    .optional(),
  
  emailPublic: z
    .boolean()
    .optional(),
  
  phonePublic: z
    .boolean()
    .optional()
});

// Type exports for use in controllers
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type RefreshTokenData = z.infer<typeof refreshTokenSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
export type UpdateProfileData = z.infer<typeof updateProfileSchema>;

// Company validation schemas
export const createCompanySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters').max(100),
  slug: z.string().min(2, 'Company slug must be at least 2 characters').max(100),
  description: z.string().max(500).optional(),
  website: z.string().url('Invalid website URL').optional(),
  logo: z.string().url('Invalid logo URL').optional(),
  industryId: z.string().optional(),
  employeeCount: z.enum(['1-10', '11-50', '51-200', '201-500', '500+']).optional(),
  foundedYear: z.number().min(1800).max(new Date().getFullYear()).optional(),
  isPublic: z.boolean().default(false),
  address: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  postalCode: z.string().max(20).optional(),
});

export const updateCompanySchema = createCompanySchema.partial().extend({
  id: z.string().cuid()
});

// Industry validation schemas
export const createIndustrySchema = z.object({
  name: z.string().min(2, 'Industry name must be at least 2 characters').max(100),
  slug: z.string().min(2, 'Industry slug must be at least 2 characters').max(100),
  description: z.string().max(500).optional(),
  parentId: z.string().cuid().optional(),
});

// Forum validation schemas
export const createForumSchema = z.object({
  title: z.string().min(3, 'Forum title must be at least 3 characters').max(200),
  slug: z.string().min(3, 'Forum slug must be at least 3 characters').max(200),
  description: z.string().max(1000).optional(),
  isPublic: z.boolean().default(true),
  requiresApproval: z.boolean().default(false),
  companyId: z.string().cuid().optional(),
});

export const updateForumSchema = createForumSchema.partial().extend({
  id: z.string().cuid()
});

// Post validation schemas
export const createPostSchema = z.object({
  title: z.string().min(5, 'Post title must be at least 5 characters').max(300),
  content: z.string().min(10, 'Post content must be at least 10 characters').max(10000),
  forumId: z.string().cuid('Invalid forum ID'),
  isPinned: z.boolean().default(false),
});

export const updatePostSchema = createPostSchema.partial().extend({
  id: z.string().cuid()
});

// Comment validation schemas
export const createCommentSchema = z.object({
  content: z.string().min(1, 'Comment content is required').max(5000),
  postId: z.string().cuid('Invalid post ID'),
  parentId: z.string().cuid().optional(),
});

export const updateCommentSchema = createCommentSchema.partial().extend({
  id: z.string().cuid()
});

// Report validation schemas
export const createReportSchema = z.object({
  title: z.string().min(5, 'Report title must be at least 5 characters').max(200),
  description: z.string().min(10, 'Report description must be at least 10 characters').max(2000),
  category: z.enum([
    'harassment',
    'discrimination',
    'safety',
    'wage_theft',
    'workplace_conditions',
    'benefits',
    'scheduling',
    'other'
  ]),
  severity: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  isAnonymous: z.boolean().default(true),
  companyId: z.string().cuid().optional(),
  location: z.string().max(200).optional(),
  department: z.string().max(100).optional(),
});

export const updateReportStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(['pending', 'investigating', 'resolved', 'closed']),
  resolution: z.string().max(1000).optional(),
});

// Pagination and filter schemas
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

export const companyFilterSchema = z.object({
  industryId: z.string().cuid().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  isVerified: z.boolean().optional(),
  search: z.string().max(100).optional(),
});

export const forumFilterSchema = z.object({
  companyId: z.string().cuid().optional(),
  isPublic: z.boolean().optional(),
  search: z.string().max(100).optional(),
});

export const postFilterSchema = z.object({
  forumId: z.string().cuid().optional(),
  authorId: z.string().cuid().optional(),
  isPinned: z.boolean().optional(),
  search: z.string().max(100).optional(),
});

export const reportFilterSchema = z.object({
  category: z.string().optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  status: z.enum(['pending', 'investigating', 'resolved', 'closed']).optional(),
  companyId: z.string().cuid().optional(),
  isAnonymous: z.boolean().optional(),
}); 