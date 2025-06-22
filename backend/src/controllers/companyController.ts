import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createCompanySchema, updateCompanySchema, companyFilterSchema, paginationSchema } from '../utils/validation';

const prisma = new PrismaClient();

// Create company
export const createCompany = async (req: Request, res: Response) => {
  try {
    const validatedData = createCompanySchema.parse(req.body);
    
    // Check if company name or slug already exists
    const existingCompany = await prisma.company.findFirst({
      where: {
        OR: [
          { name: validatedData.name },
          { slug: validatedData.slug }
        ]
      }
    });

    if (existingCompany) {
      return res.status(409).json({
        error: 'Company already exists',
        message: 'A company with this name or slug already exists'
      });
    }

    const company = await prisma.company.create({
      data: validatedData,
      include: {
        industry: true,
        _count: {
          select: {
            users: true,
            forums: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Company created successfully',
      data: company
    });
  } catch (error) {
    console.error('Create company error:', error);
    res.status(400).json({
      error: 'Validation error',
      message: error instanceof Error ? error.message : 'Invalid company data'
    });
  }
};

// Get all companies with filters and pagination
export const getCompanies = async (req: Request, res: Response) => {
  try {
    const filters = companyFilterSchema.parse({
      industryId: req.query.industryId,
      city: req.query.city,
      country: req.query.country,
      isVerified: req.query.isVerified === 'true',
      search: req.query.search
    });
    
    const pagination = paginationSchema.parse({
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20
    });

    const skip = (pagination.page - 1) * pagination.limit;

    // Build where clause
    const where: any = {};
    
    if (filters.industryId) where.industryId = filters.industryId;
    if (filters.city) where.city = { contains: filters.city, mode: 'insensitive' };
    if (filters.country) where.country = { contains: filters.country, mode: 'insensitive' };
    if (filters.isVerified !== undefined) where.isVerified = filters.isVerified;
    
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        skip,
        take: pagination.limit,
        include: {
          industry: true,
          _count: {
            select: {
              users: true,
              forums: true
            }
          }
        },
        orderBy: [
          { isVerified: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.company.count({ where })
    ]);

    res.json({
      data: companies,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit)
      }
    });
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(400).json({
      error: 'Invalid filter parameters',
      message: error instanceof Error ? error.message : 'Failed to fetch companies'
    });
  }
};

// Get company by ID or slug
export const getCompany = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params;
    
    const company = await prisma.company.findFirst({
      where: {
        OR: [
          { id: identifier },
          { slug: identifier }
        ]
      },
      include: {
        industry: true,
        forums: {
          where: { isActive: true },
          include: {
            _count: {
              select: {
                posts: true
              }
            }
          }
        },
        _count: {
          select: {
            users: true,
            forums: true,
            reports: true
          }
        }
      }
    });

    if (!company) {
      return res.status(404).json({
        error: 'Company not found',
        message: 'No company found with the provided identifier'
      });
    }

    res.json({
      data: company
    });
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({
      error: 'Database error',
      message: 'Failed to fetch company details'
    });
  }
};

// Update company
export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateCompanySchema.parse({ ...req.body, id });

    // Check permissions (only company managers or admins)
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { role: true }
    });

    if (!user?.role.canManageCompany && user?.companyId !== id && !user?.role.canAdminSystem) {
      return res.status(403).json({
        error: 'Permission denied',
        message: 'You do not have permission to update this company'
      });
    }

    const company = await prisma.company.update({
      where: { id },
      data: validatedData,
      include: {
        industry: true,
        _count: {
          select: {
            users: true,
            forums: true
          }
        }
      }
    });

    res.json({
      message: 'Company updated successfully',
      data: company
    });
  } catch (error) {
    console.error('Update company error:', error);
    res.status(400).json({
      error: 'Update failed',
      message: error instanceof Error ? error.message : 'Failed to update company'
    });
  }
};

// Verify company (admin only)
export const verifyCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const company = await prisma.company.update({
      where: { id },
      data: {
        isVerified: true,
        verifiedAt: new Date(),
        verifiedBy: req.user!.id
      },
      include: {
        industry: true,
        _count: {
          select: {
            users: true,
            forums: true
          }
        }
      }
    });

    res.json({
      message: 'Company verified successfully',
      data: company
    });
  } catch (error) {
    console.error('Verify company error:', error);
    res.status(400).json({
      error: 'Verification failed',
      message: 'Failed to verify company'
    });
  }
};

// Delete company (admin only)
export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.company.delete({
      where: { id }
    });

    res.json({
      message: 'Company deleted successfully'
    });
  } catch (error) {
    console.error('Delete company error:', error);
    res.status(400).json({
      error: 'Deletion failed',
      message: 'Failed to delete company'
    });
  }
};

// Get company statistics (for admins)
export const getCompanyStats = async (req: Request, res: Response) => {
  try {
    const stats = await Promise.all([
      prisma.company.count(),
      prisma.company.count({ where: { isVerified: true } }),
      prisma.company.groupBy({
        by: ['country'],
        _count: true,
        orderBy: { _count: { country: 'desc' } },
        take: 10
      }),
      prisma.company.groupBy({
        by: ['industryId'],
        _count: true,
        orderBy: { _count: { industryId: 'desc' } },
        take: 10
      })
    ]);

    res.json({
      data: {
        total: stats[0],
        verified: stats[1],
        byCountry: stats[2],
        byIndustry: stats[3]
      }
    });
  } catch (error) {
    console.error('Get company stats error:', error);
    res.status(500).json({
      error: 'Stats error',
      message: 'Failed to fetch company statistics'
    });
  }
}; 