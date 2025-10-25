// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Common Query Params
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export type QueryParams = PaginationParams & SortParams & FilterParams;

// Dashboard Stats
export interface DashboardStats {
  totalLeads: number;
  convertedLeads: number;
  totalSales: number;
  revenue: number;
  activeStudents: number;
  activeCourses: number;
}

// Module Access
export type ModuleType = 'CRM' | 'ERP' | 'ADMIN' | 'CONFIG';

export interface ModuleAccess {
  module: ModuleType;
  hasAccess: boolean;
  permissions: string[];
}
