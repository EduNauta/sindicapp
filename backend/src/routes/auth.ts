import { Router } from 'express';
import {
  register,
  login,
  logout,
  logoutAll,
  refreshToken,
  getProfile,
  changePassword,
  cleanSessions
} from '../controllers/authController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

// Protected routes (require authentication)
router.get('/profile', authenticate, getProfile);
router.post('/logout-all', authenticate, logoutAll);
router.post('/change-password', authenticate, changePassword);

// Admin routes
router.post('/clean-sessions', authenticate, requireAdmin, cleanSessions);

export default router; 