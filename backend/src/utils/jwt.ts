import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface JWTPayload {
  userId: string;
  email: string;
  username: string;
  roleId: string;
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Generate access token (short-lived)
 */
export const generateAccessToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '15m';
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  return jwt.sign(payload as any, secret, { expiresIn } as any);
};

/**
 * Generate refresh token (long-lived)
 */
export const generateRefreshToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  const secret = process.env.JWT_REFRESH_SECRET;
  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
  
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
  }
  
  return jwt.sign(payload as any, secret, { expiresIn } as any);
};

/**
 * Generate both access and refresh tokens
 */
export const generateTokenPair = (payload: Omit<JWTPayload, 'iat' | 'exp'>): TokenPair => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload)
  };
};

/**
 * Verify access token
 */
export const verifyAccessToken = (token: string): JWTPayload => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  try {
    return jwt.verify(token, secret) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token: string): JWTPayload => {
  const secret = process.env.JWT_REFRESH_SECRET;
  
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
  }
  
  try {
    return jwt.verify(token, secret) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

/**
 * Store refresh token in database
 */
export const storeRefreshToken = async (
  refreshToken: string,
  userId: string,
  userAgent?: string,
  ipAddress?: string
): Promise<void> => {
  // Calculate expiry date (7 days from now by default)
  const expiryDays = parseInt(process.env.JWT_REFRESH_EXPIRES_IN?.replace('d', '') || '7');
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiryDays);
  
  await prisma.session.create({
    data: {
      refreshToken,
      userId,
      userAgent,
      ipAddress,
      expiresAt,
      isValid: true
    }
  });
};

/**
 * Validate refresh token in database
 */
export const validateRefreshToken = async (refreshToken: string): Promise<boolean> => {
  const session = await prisma.session.findUnique({
    where: { refreshToken },
    include: { user: true }
  });
  
  if (!session || !session.isValid || session.expiresAt < new Date()) {
    return false;
  }
  
  return session.user.isActive;
};

/**
 * Invalidate refresh token
 */
export const invalidateRefreshToken = async (refreshToken: string): Promise<void> => {
  await prisma.session.updateMany({
    where: { refreshToken },
    data: { isValid: false }
  });
};

/**
 * Invalidate all user sessions
 */
export const invalidateAllUserSessions = async (userId: string): Promise<void> => {
  await prisma.session.updateMany({
    where: { userId },
    data: { isValid: false }
  });
};

/**
 * Clean expired sessions
 */
export const cleanExpiredSessions = async (): Promise<void> => {
  await prisma.session.deleteMany({
    where: {
      OR: [
        { expiresAt: { lt: new Date() } },
        { isValid: false }
      ]
    }
  });
}; 