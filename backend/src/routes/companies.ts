import express from 'express';
import {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  verifyCompany,
  deleteCompany,
  getCompanyStats
} from '../controllers/companyController';
import { authenticate, requirePermission } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getCompanies);
router.get('/stats', getCompanyStats);
router.get('/:identifier', getCompany);

// Protected routes
router.post('/', authenticate, createCompany);
router.put('/:id', authenticate, updateCompany);

// Admin only routes
router.post('/:id/verify', authenticate, requirePermission('canAdminSystem'), verifyCompany);
router.delete('/:id', authenticate, requirePermission('canAdminSystem'), deleteCompany);

export default router; 