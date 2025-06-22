import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createForumSchema, updateForumSchema, forumFilterSchema, paginationSchema } from '../utils/validation';

const prisma = new PrismaClient();

// Create forum
export const createForum = async (req: any, res: Response) => {
  try {
    const validatedData = createForumSchema.parse(req.body);
    
    // Check if forum slug already exists
    const existingForum = await prisma.forum.findUnique({
      where: { slug: validatedData.slug }
    });

    if (existingForum) {
      return res.status(409).json({
        error: 'Forum already exists',
        message: 'A forum with this slug already exists'
      });
    }

    const forum = await prisma.forum.create({
      data: validatedData,
      include: {
        company: true,
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Forum created successfully',
      data: forum
    });
  } catch (error) {
    console.error('Create forum error:', error);
    res.status(400).json({
      error: 'Validation error',
      message: error instanceof Error ? error.message : 'Invalid forum data'
    });
  }
};

// Get all forums with filters
export const getForums = async (req: Request, res: Response) => {
  try {
    const filters = forumFilterSchema.parse({
      companyId: req.query.companyId,
      isPublic: req.query.isPublic === 'true',
      search: req.query.search
    });
    
    const pagination = paginationSchema.parse({
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20
    });

    const skip = (pagination.page - 1) * pagination.limit;

    // Build where clause
    const where: any = { isActive: true };
    
    if (filters.companyId) where.companyId = filters.companyId;
    if (filters.isPublic !== undefined) where.isPublic = filters.isPublic;
    
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    const [forums, total] = await Promise.all([
      prisma.forum.findMany({
        where,
        skip,
        take: pagination.limit,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              slug: true,
              logo: true
            }
          },
          _count: {
            select: {
              posts: true
            }
          }
        },
        orderBy: [
          { postCount: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.forum.count({ where })
    ]);

    res.json({
      data: forums,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit)
      }
    });
  } catch (error) {
    console.error('Get forums error:', error);
    res.status(400).json({
      error: 'Invalid filter parameters',
      message: error instanceof Error ? error.message : 'Failed to fetch forums'
    });
  }
};

// Get forum by ID or slug
export const getForum = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params;
    
    const forum = await prisma.forum.findFirst({
      where: {
        OR: [
          { id: identifier },
          { slug: identifier }
        ],
        isActive: true
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
            isVerified: true
          }
        },
        posts: {
          take: 10,
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
                comments: true,
                likes: true
              }
            }
          },
          orderBy: [
            { isPinned: 'desc' },
            { createdAt: 'desc' }
          ]
        },
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    if (!forum) {
      return res.status(404).json({
        error: 'Forum not found',
        message: 'No active forum found with the provided identifier'
      });
    }

    res.json({
      data: forum
    });
  } catch (error) {
    console.error('Get forum error:', error);
    res.status(500).json({
      error: 'Database error',
      message: 'Failed to fetch forum details'
    });
  }
};

// Update forum
export const updateForum = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateForumSchema.parse({ ...req.body, id });

    const forum = await prisma.forum.update({
      where: { id },
      data: validatedData,
      include: {
        company: true,
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    res.json({
      message: 'Forum updated successfully',
      data: forum
    });
  } catch (error) {
    console.error('Update forum error:', error);
    res.status(400).json({
      error: 'Update failed',
      message: error instanceof Error ? error.message : 'Failed to update forum'
    });
  }
};

// Delete forum (soft delete)
export const deleteForum = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.forum.update({
      where: { id },
      data: { isActive: false }
    });

    res.json({
      message: 'Forum deleted successfully'
    });
  } catch (error) {
    console.error('Delete forum error:', error);
    res.status(400).json({
      error: 'Deletion failed',
      message: 'Failed to delete forum'
    });
  }
}; 