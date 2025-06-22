import express from 'express';
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  togglePostLike,
  deletePost
} from '../controllers/postController';
import { authenticate, requirePermission } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:identifier', getPost);

// Protected routes
router.post('/', authenticate, requirePermission('canCreatePosts'), createPost);
router.put('/:id', authenticate, updatePost);
router.post('/:id/like', authenticate, togglePostLike);
router.delete('/:id', authenticate, deletePost);

export default router; 