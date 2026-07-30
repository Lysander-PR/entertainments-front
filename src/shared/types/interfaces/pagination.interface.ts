export type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

export interface GetPaginationRangeParams {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
  boundaryCount?: number;
}
