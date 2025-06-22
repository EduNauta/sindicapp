export interface Company {
  id: string;
  name: string;
  slug: string;
  description?: string;
  website?: string;
  logo?: string;
  
  // Business information
  industryId?: string;
  employeeCount?: string;
  foundedYear?: number;
  isPublic: boolean;
  
  // Location
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  
  // Verification
  isVerified: boolean;
  verifiedAt?: Date;
  verifiedBy?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  industry?: Industry;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  parent?: Industry;
  children?: Industry[];
}

export interface Forum {
  id: string;
  title: string;
  slug: string;
  description?: string;
  
  // Settings
  isPublic: boolean;
  isActive: boolean;
  requiresApproval: boolean;
  
  // Company association
  companyId?: string;
  
  // Metadata
  postCount: number;
  memberCount: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  company?: Company;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  
  // Settings
  isPublished: boolean;
  isPinned: boolean;
  isLocked: boolean;
  
  // Moderation
  isHidden: boolean;
  hideReason?: string;
  hiddenAt?: Date;
  hiddenBy?: string;
  
  // Metadata
  viewCount: number;
  commentCount: number;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  authorId: string;
  forumId: string;
}

export interface Comment {
  id: string;
  content: string;
  
  // Hierarchy
  parentId?: string;
  depth: number;
  path?: string;
  
  // Moderation
  isHidden: boolean;
  hideReason?: string;
  hiddenAt?: Date;
  hiddenBy?: string;
  
  // Metadata
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  authorId: string;
  postId: string;
}

export interface Like {
  id: string;
  postId?: string;
  commentId?: string;
  userId: string;
  createdAt: Date;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  
  // Anonymous or identified
  isAnonymous: boolean;
  reporterId?: string;
  
  // Location/company info
  companyId?: string;
  location?: string;
  department?: string;
  
  // Status
  status: 'pending' | 'investigating' | 'resolved' | 'closed';
  resolution?: string;
  resolvedAt?: Date;
  resolvedBy?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// DTOs for API requests
export interface CreateCompanyDTO {
  name: string;
  slug: string;
  description?: string;
  website?: string;
  logo?: string;
  industryId?: string;
  employeeCount?: string;
  foundedYear?: number;
  isPublic?: boolean;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface UpdateCompanyDTO extends Partial<CreateCompanyDTO> {
  id: string;
}

export interface CreateForumDTO {
  title: string;
  slug: string;
  description?: string;
  isPublic?: boolean;
  requiresApproval?: boolean;
  companyId?: string;
}

export interface CreatePostDTO {
  title: string;
  content: string;
  forumId: string;
  isPinned?: boolean;
}

export interface CreateCommentDTO {
  content: string;
  postId: string;
  parentId?: string;
}

export interface CreateReportDTO {
  title: string;
  description: string;
  category: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  isAnonymous?: boolean;
  companyId?: string;
  location?: string;
  department?: string;
}

export interface CompanyLocation {
  id: string;
  companyId: string;
  name: string;
  address: Address;
  isHeadquarters: boolean;
  employeeCount?: number;
  coordinates?: Coordinates;
}

export interface Address {
  street?: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export enum CompanySize {
  STARTUP = '1-10',
  SMALL = '11-50',
  MEDIUM = '51-200',
  LARGE = '201-1000',
  ENTERPRISE = '1000+'
}

export interface CompanyStats {
  employeeCount: number;
  forumThreads: number;
  reports: number;
  averageRating: number;
} 