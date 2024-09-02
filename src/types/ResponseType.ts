import type { PaginatedResponse } from "./RequestType";

export interface TransactionResponse {
    success: boolean;
    message: string;
  }
 
export const blankPaginatedResponse: PaginatedResponse<any> = {
  data: [], 
  totalPages: 0,
  currentPage: 0,
  totalElements: 0,
  pagination: {
    page: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  },
};