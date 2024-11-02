import type { Permission, Role } from "./AuthTypes";

export type RequestOptions = {
  method: string
  headers?: HeadersInit
  body?: string
  skipToken?: boolean
};

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalPages: number;
  currentPage: number;
  totalElements: number;
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export type QueryParams = Record<string, string>;

export interface PermissionRoles extends Permission { 
  roles: Role[] 
}