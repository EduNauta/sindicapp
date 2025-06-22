import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyAccessToken, JWTPayload } from '../utils/jwt';

const prisma = new PrismaClient();

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        roleId: string;
        role: {
          id: string;
          name: string;
          canCreatePosts: boolean;
          canModeratePosts: boolean;
          canManageUsers: boolean;
          canViewReports: boolean;
          canManageCompany: boolean;
          canAdminSystem: boolean;
        };
      };
    }
  }
}

/**
 * Middleware to authenticate user using JWT access token
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
      return;
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Invalid token format'
      });
      return;
    }

    // Verify the token
    const payload: JWTPayload = verifyAccessToken(token);

    // Get user from database with role information
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

    // Add user to request object
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      roleId: user.roleId,
      role: user.role
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

/**
 * Middleware to require specific permission
 */
export const requirePermission = (permission: keyof NonNullable<Express.Request['user']>['role']) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (!req.user.role[permission]) {
      res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
      return;
    }

    next();
  };
};

/**
 * Middleware to require specific role
 */
export const requireRole = (roleName: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (req.user.role.name !== roleName) {
      res.status(403).json({
        success: false,
        message: `${roleName} role required`
      });
      return;
    }

    next();
  };
};

/**
 * Middleware to require admin role
 */
export const requireAdmin = requireRole('admin');

/**
 * Middleware to require moderator or higher
 */
export const requireModerator = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
    return;
  }

  const allowedRoles = ['admin', 'moderator'];
  if (!allowedRoles.includes(req.user.role.name)) {
    res.status(403).json({
      success: false,
      message: 'Moderator or admin role required'
    });
    return;
  }

  next();
};

/**
 * Optional authentication - adds user to request if token is valid, but doesn't require it
 */
export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      next();
      return;
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    if (!token) {
      next();
      return;
    }

    // Verify the token
    const payload: JWTPayload = verifyAccessToken(token);

    // Get user from database with role information
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { role: true }
    });

    if (user && user.isActive) {
      // Add user to request object
      req.user = {
        id: user.id,
        email: user.email,
        username: user.username,
        roleId: user.roleId,
        role: user.role
      };
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without user
    next();
  }
}; 