export type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetPaginationRangeParams {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
  boundaryCount?: number;
}
