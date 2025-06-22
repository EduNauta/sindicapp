import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createPostSchema, updatePostSchema, postFilterSchema, paginationSchema } from '../utils/validation';

const prisma = new PrismaClient();

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Create post
export const createPost = async (req: any, res: Response) => {
  try {
    const validatedData = createPostSchema.parse(req.body);
    
    // Generate unique slug
    const baseSlug = generateSlug(validatedData.title);
    let slug = baseSlug;
    let counter = 1;
    
    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const post = await prisma.post.create({
      data: {
        ...validatedData,
        slug,
        authorId: req.user!.id
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        forum: {
          select: {
            id: true,
            title: true,
            slug: true,
            company: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      }
    });

    // Update forum post count
    await prisma.forum.update({
      where: { id: validatedData.forumId },
      data: { postCount: { increment: 1 } }
    });

    res.status(201).json({
      message: 'Post created successfully',
      data: post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(400).json({
      error: 'Validation error',
      message: error instanceof Error ? error.message : 'Invalid post data'
    });
  }
};

// Get all posts with filters
export const getPosts = async (req: Request, res: Response) => {
  try {
    const filters = postFilterSchema.parse({
      forumId: req.query.forumId,
      authorId: req.query.authorId,
      isPinned: req.query.isPinned === 'true',
      search: req.query.search
    });
    
    const pagination = paginationSchema.parse({
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20
    });

    const skip = (pagination.page - 1) * pagination.limit;

    // Build where clause
    const where: any = { 
      isPublished: true,
      isHidden: false
    };
    
    if (filters.forumId) where.forumId = filters.forumId;
    if (filters.authorId) where.authorId = filters.authorId;
    if (filters.isPinned !== undefined) where.isPinned = filters.isPinned;
    
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { content: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: pagination.limit,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              avatar: true
            }
          },
          forum: {
            select: {
              id: true,
              title: true,
              slug: true,
              company: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  logo: true
                }
              }
            }
          },
          _count: {
            select: {
              comments: true,
              likes: true
            }
          }
        },
        orderBy: [
          { isPinned: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.post.count({ where })
    ]);

    res.json({
      data: posts,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit)
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(400).json({
      error: 'Invalid filter parameters',
      message: error instanceof Error ? error.message : 'Failed to fetch posts'
    });
  }
};

// Get post by ID or slug
export const getPost = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params;
    
    const post = await prisma.post.findFirst({
      where: {
        OR: [
          { id: identifier },
          { slug: identifier }
        ],
        isPublished: true,
        isHidden: false
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
            firstName: true,
            lastName: true
          }
        },
        forum: {
          select: {
            id: true,
            title: true,
            slug: true,
            company: {
              select: {
                id: true,
                name: true,
                slug: true,
                logo: true,
                isVerified: true
              }
            }
          }
        },
        comments: {
          where: { isHidden: false },
          include: {
            author: {
              select: {
                id: true,
                username: true,
                avatar: true
              }
            },
            _count: {
              select: {
                likes: true
              }
            }
          },
          orderBy: { createdAt: 'asc' },
          take: 50
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      }
    });

    if (!post) {
      return res.status(404).json({
        error: 'Post not found',
        message: 'No post found with the provided identifier'
      });
    }

    // Increment view count
    await prisma.post.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } }
    });

    res.json({
      data: post
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      error: 'Database error',
      message: 'Failed to fetch post details'
    });
  }
};

// Update post
export const updatePost = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updatePostSchema.parse({ ...req.body, id });

    // Check ownership or permissions
    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: { author: true }
    });

    if (!existingPost) {
      return res.status(404).json({
        error: 'Post not found',
        message: 'No post found with the provided ID'
      });
    }

    // Only author or moderators can update
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { role: true }
    });

    if (existingPost.authorId !== req.user!.id && !user?.role.canModeratePosts) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'You can only update your own posts'
      });
    }

    const post = await prisma.post.update({
      where: { id },
      data: validatedData,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        forum: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      }
    });

    res.json({
      message: 'Post updated successfully',
      data: post
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(400).json({
      error: 'Update failed',
      message: error instanceof Error ? error.message : 'Failed to update post'
    });
  }
};

// Like/unlike post
export const togglePostLike = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    // Check if like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: id
        }
      }
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      
      await prisma.post.update({
        where: { id },
        data: { likeCount: { decrement: 1 } }
      });

      res.json({
        message: 'Post unliked successfully',
        liked: false
      });
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId,
          postId: id
        }
      });
      
      await prisma.post.update({
        where: { id },
        data: { likeCount: { increment: 1 } }
      });

      res.json({
        message: 'Post liked successfully',
        liked: true
      });
    }
  } catch (error) {
    console.error('Toggle post like error:', error);
    res.status(400).json({
      error: 'Like action failed',
      message: 'Failed to toggle post like'
    });
  }
};

// Delete post (soft delete)
export const deletePost = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    // Check ownership or permissions
    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: { author: true }
    });

    if (!existingPost) {
      return res.status(404).json({
        error: 'Post not found',
        message: 'No post found with the provided ID'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { role: true }
    });

    if (existingPost.authorId !== req.user!.id && !user?.role.canModeratePosts) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'You can only delete your own posts'
      });
    }

    await prisma.post.update({
      where: { id },
      data: { 
        isHidden: true,
        hideReason: 'Deleted by user',
        hiddenAt: new Date(),
        hiddenBy: req.user!.id
      }
    });

    // Update forum post count
    await prisma.forum.update({
      where: { id: existingPost.forumId },
      data: { postCount: { decrement: 1 } }
    });

    res.json({
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(400).json({
      error: 'Deletion failed',
      message: 'Failed to delete post'
    });
  }
}; 