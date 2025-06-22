import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  changePasswordSchema,
  RegisterData,
  LoginData,
  RefreshTokenData,
  ChangePasswordData
} from '../utils/validation';
import {
  generateTokenPair,
  verifyRefreshToken,
  storeRefreshToken,
  validateRefreshToken,
  invalidateRefreshToken,
  invalidateAllUserSessions,
  cleanExpiredSessions
} from '../utils/jwt';

const prisma = new PrismaClient();

/**
 * Register a new user
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input
    const validatedData: RegisterData = registerSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { username: validatedData.username }
        ]
      }
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: existingUser.email === validatedData.email 
          ? 'Email already registered' 
          : 'Username already taken'
      });
      return;
    }

    // Get default user role
    const userRole = await prisma.role.findUnique({
      where: { name: 'user' }
    });

    if (!userRole) {
      res.status(500).json({
        success: false,
        message: 'Default user role not found'
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        username: validatedData.username,
        password: hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        roleId: userRole.id,
        emailVerified: false, // Set to true if you want to skip email verification
        isActive: true
      },
      include: { role: true }
    });

    // Generate token pair
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      roleId: user.roleId
    };

    const tokens = generateTokenPair(tokenPayload);

    // Store refresh token
    await storeRefreshToken(
      tokens.refreshToken,
      user.id,
      req.headers['user-agent'],
      req.ip || req.socket.remoteAddress
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          emailVerified: user.emailVerified,
          role: user.role.name
        },
        tokens
      }
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
      return;
    }

    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Login user
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input
    const validatedData: LoginData = loginSchema.parse(req.body);

    // Find user by email or username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.emailOrUsername },
          { username: validatedData.emailOrUsername }
        ]
      },
      include: { role: true }
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
      return;
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
      return;
    }

    // Generate token pair
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      roleId: user.roleId
    };

    const tokens = generateTokenPair(tokenPayload);

    // Store refresh token
    await storeRefreshToken(
      tokens.refreshToken,
      user.id,
      req.headers['user-agent'],
      req.ip || req.socket.remoteAddress
    );

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          emailVerified: user.emailVerified,
          role: user.role.name
        },
        tokens
      }
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
      return;
    }

    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Refresh access token using refresh token
 */
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate input
    const validatedData: RefreshTokenData = refreshTokenSchema.parse(req.body);

    // Validate refresh token in database
    const isValid = await validateRefreshToken(validatedData.refreshToken);

    if (!isValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
      return;
    }

    // Verify and decode refresh token
    const payload = verifyRefreshToken(validatedData.refreshToken);

    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { role: true }
    });

    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        message: 'User not found or inactive'
      });
      return;
    }

    // Generate new token pair
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      roleId: user.roleId
    };

    const tokens = generateTokenPair(tokenPayload);

    // Invalidate old refresh token
    await invalidateRefreshToken(validatedData.refreshToken);

    // Store new refresh token
    await storeRefreshToken(
      tokens.refreshToken,
      user.id,
      req.headers['user-agent'],
      req.ip || req.socket.remoteAddress
    );

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: { tokens }
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
      return;
    }

    console.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Logout user (invalidate refresh token)
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData: RefreshTokenData = refreshTokenSchema.parse(req.body);

    // Invalidate refresh token
    await invalidateRefreshToken(validatedData.refreshToken);

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
      return;
    }

    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Logout from all devices (invalidate all user sessions)
 */
export const logoutAll = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    // Invalidate all user sessions
    await invalidateAllUserSessions(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Logged out from all devices successfully'
    });
  } catch (error) {
    console.error('Logout all error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Get current user profile
 */
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        bio: true,
        phone: true,
        avatar: true,
        emailVerified: true,
        profilePublic: true,
        emailPublic: true,
        phonePublic: true,
        createdAt: true,
        lastLogin: true,
        role: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Change password
 */
export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    // Validate input
    const validatedData: ChangePasswordData = changePasswordSchema.parse(req.body);

    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      validatedData.currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
      return;
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(validatedData.newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword }
    });

    // Invalidate all sessions to force re-login
    await invalidateAllUserSessions(user.id);

    res.status(200).json({
      success: true,
      message: 'Password changed successfully. Please log in again.'
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
      return;
    }

    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Clean expired sessions (utility endpoint for maintenance)
 */
export const cleanSessions = async (_req: Request, res: Response): Promise<void> => {
  try {
    await cleanExpiredSessions();

    res.status(200).json({
      success: true,
      message: 'Expired sessions cleaned successfully'
    });
  } catch (error) {
    console.error('Clean sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}; 