import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createReportSchema, updateReportStatusSchema, reportFilterSchema, paginationSchema } from '../utils/validation';

const prisma = new PrismaClient();

// Create report (anonymous or identified)
export const createReport = async (req: any, res: Response) => {
  try {
    const validatedData = createReportSchema.parse(req.body);
    
    const reportData = {
      ...validatedData,
      reporterId: validatedData.isAnonymous ? undefined : req.user?.id
    };

    const report = await prisma.report.create({
      data: reportData,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        reporter: validatedData.isAnonymous ? false : {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Report submitted successfully',
      data: {
        id: report.id,
        title: report.title,
        category: report.category,
        severity: report.severity,
        status: report.status,
        isAnonymous: report.isAnonymous,
        createdAt: report.createdAt
      }
    });
  } catch (error) {
    console.error('Create report error:', error);
    res.status(400).json({
      error: 'Validation error',
      message: error instanceof Error ? error.message : 'Invalid report data'
    });
  }
};

// Get all reports with filters (admin/moderator only)
export const getReports = async (req: Request, res: Response) => {
  try {
    const filters = reportFilterSchema.parse({
      category: req.query.category,
      severity: req.query.severity,
      status: req.query.status,
      companyId: req.query.companyId,
      isAnonymous: req.query.isAnonymous === 'true'
    });
    
    const pagination = paginationSchema.parse({
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20
    });

    const skip = (pagination.page - 1) * pagination.limit;

    // Build where clause
    const where: any = {};
    
    if (filters.category) where.category = filters.category;
    if (filters.severity) where.severity = filters.severity;
    if (filters.status) where.status = filters.status;
    if (filters.companyId) where.companyId = filters.companyId;
    if (filters.isAnonymous !== undefined) where.isAnonymous = filters.isAnonymous;

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
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
          reporter: {
            select: {
              id: true,
              username: true,
              email: true
            }
          }
        },
        orderBy: [
          { severity: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.report.count({ where })
    ]);

    res.json({
      data: reports,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit)
      }
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(400).json({
      error: 'Invalid filter parameters',
      message: error instanceof Error ? error.message : 'Failed to fetch reports'
    });
  }
};

// Get report by ID (admin/moderator only)
export const getReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const report = await prisma.report.findUnique({
      where: { id },
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
        reporter: {
          select: {
            id: true,
            username: true,
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if (!report) {
      return res.status(404).json({
        error: 'Report not found',
        message: 'No report found with the provided ID'
      });
    }

    res.json({
      data: report
    });
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({
      error: 'Database error',
      message: 'Failed to fetch report details'
    });
  }
};

// Update report status (admin/moderator only)
export const updateReportStatus = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateReportStatusSchema.parse({ ...req.body, id });

    const updateData: any = {
      status: validatedData.status
    };

    if (validatedData.status === 'resolved' || validatedData.status === 'closed') {
      updateData.resolvedAt = new Date();
      updateData.resolvedBy = req.user!.id;
      if (validatedData.resolution) {
        updateData.resolution = validatedData.resolution;
      }
    }

    const report = await prisma.report.update({
      where: { id },
      data: updateData,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        reporter: {
          select: {
            id: true,
            username: true,
            email: true
          }
        }
      }
    });

    res.json({
      message: 'Report status updated successfully',
      data: report
    });
  } catch (error) {
    console.error('Update report status error:', error);
    res.status(400).json({
      error: 'Update failed',
      message: error instanceof Error ? error.message : 'Failed to update report status'
    });
  }
};

// Get report statistics (admin only)
export const getReportStats = async (req: Request, res: Response) => {
  try {
    const stats = await Promise.all([
      prisma.report.count(),
      prisma.report.count({ where: { status: 'pending' } }),
      prisma.report.count({ where: { status: 'investigating' } }),
      prisma.report.count({ where: { status: 'resolved' } }),
      prisma.report.count({ where: { isAnonymous: true } }),
      prisma.report.groupBy({
        by: ['category'],
        _count: true,
        orderBy: { _count: { category: 'desc' } }
      }),
      prisma.report.groupBy({
        by: ['severity'],
        _count: true,
        orderBy: { _count: { severity: 'desc' } }
      }),
      prisma.report.groupBy({
        by: ['companyId'],
        _count: true,
        orderBy: { _count: { companyId: 'desc' } },
        take: 10
      })
    ]);

    res.json({
      data: {
        total: stats[0],
        pending: stats[1],
        investigating: stats[2],
        resolved: stats[3],
        anonymous: stats[4],
        byCategory: stats[5],
        bySeverity: stats[6],
        byCompany: stats[7]
      }
    });
  } catch (error) {
    console.error('Get report stats error:', error);
    res.status(500).json({
      error: 'Stats error',
      message: 'Failed to fetch report statistics'
    });
  }
};

// Get user's reports (identified reports only)
export const getUserReports = async (req: any, res: Response) => {
  try {
    const pagination = paginationSchema.parse({
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20
    });

    const skip = (pagination.page - 1) * pagination.limit;

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where: { 
          reporterId: req.user!.id,
          isAnonymous: false
        },
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
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.report.count({ 
        where: { 
          reporterId: req.user!.id,
          isAnonymous: false
        }
      })
    ]);

    res.json({
      data: reports,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit)
      }
    });
  } catch (error) {
    console.error('Get user reports error:', error);
    res.status(500).json({
      error: 'Database error',
      message: 'Failed to fetch user reports'
    });
  }
}; 