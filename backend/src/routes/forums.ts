import express from 'express';
import {
  createForum,
  getForums,
  getForum,
  updateForum,
  deleteForum
} from '../controllers/forumController';
import { authenticate, requirePermission } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getForums);
router.get('/:identifier', getForum);

// Protected routes
router.post('/', authenticate, requirePermission('canCreatePosts'), createForum);
router.put('/:id', authenticate, requirePermission('canModeratePosts'), updateForum);
router.delete('/:id', authenticate, requirePermission('canModeratePosts'), deleteForum);

export default router; 