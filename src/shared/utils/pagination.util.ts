import type {
  GetPaginationRangeParams,
  PaginationItem,
} from "../types/interfaces/pagination.interface";

export const pageButtonClasses = (isActive: boolean) =>
  `flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
    isActive
      ? "gradient-accent text-white"
      : "text-text-muted hover:bg-white/10 hover:text-white"
  }`;

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

export const getPaginationRange = ({
  currentPage,
  totalPages,
  siblingCount = 1,
  boundaryCount = 1,
}: GetPaginationRangeParams): PaginationItem[] => {
  if (totalPages <= 0) {
    return [];
  }

  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(
    Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
    totalPages,
  );

  const siblingsStart = Math.max(
    Math.min(
      currentPage - siblingCount,
      totalPages - boundaryCount - siblingCount * 2 - 1,
    ),
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1,
  );

  const leftGap: PaginationItem[] = [];
  if (siblingsStart > boundaryCount + 2) {
    leftGap.push("ellipsis-start");
  } else if (boundaryCount + 1 < totalPages - boundaryCount) {
    leftGap.push(boundaryCount + 1);
  }

  const rightGap: PaginationItem[] = [];
  if (siblingsEnd < totalPages - boundaryCount - 1) {
    rightGap.push("ellipsis-end");
  } else if (totalPages - boundaryCount > boundaryCount) {
    rightGap.push(totalPages - boundaryCount);
  }

  return [
    ...startPages,
    ...leftGap,
    ...range(siblingsStart, siblingsEnd),
    ...rightGap,
    ...endPages,
  ];
};
