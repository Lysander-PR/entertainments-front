import { useSearchParams } from "react-router";

import {
  getPaginationRange,
  pageButtonClasses,
} from "../utils/pagination.util";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  siblingCount?: number;
  boundaryCount?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  siblingCount = 1,
  boundaryCount = 1,
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage: number): void => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  const paginationItems = getPaginationRange({
    currentPage,
    totalPages,
    siblingCount,
    boundaryCount,
  });

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-text-muted transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
      >
        ‹
      </button>

      {paginationItems.map((item) =>
        typeof item === "number" ? (
          <button
            key={item}
            type="button"
            onClick={() => handlePageChange(item)}
            className={pageButtonClasses(item === currentPage)}
          >
            {item}
          </button>
        ) : (
          <span
            key={item}
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center text-sm font-semibold text-text-muted"
          >
            …
          </span>
        ),
      )}

      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-text-muted transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
      >
        ›
      </button>
    </div>
  );
};
