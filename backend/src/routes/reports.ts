import express from 'express';
import {
  createReport,
  getReports,
  getReport,
  updateReportStatus,
  getReportStats,
  getUserReports
} from '../controllers/reportController';
import { authenticate, requirePermission } from '../middleware/auth';

const router = express.Router();

// Public routes (anonymous reporting)
router.post('/', createReport);

// Protected routes
router.get('/my', authenticate, getUserReports);

// Admin/Moderator only routes
router.get('/', authenticate, requirePermission('canViewReports'), getReports);
router.get('/stats', authenticate, requirePermission('canViewReports'), getReportStats);
router.get('/:id', authenticate, requirePermission('canViewReports'), getReport);
router.put('/:id/status', authenticate, requirePermission('canViewReports'), updateReportStatus);

export default router; 