export type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface GetPaginationRangeParams {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
  boundaryCount?: number;
}
