import { useSearchParams } from "react-router";

import { getPaginationRange, pageButtonClasses } from "../utils/pagination.util";

interface PaginationProps {
  totalPages: number;
  siblingCount?: number;
  boundaryCount?: number;
}

export const Pagination = ({
  totalPages,
  siblingCount = 1,
  boundaryCount = 1,
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get("page") || "1";
  const page = isNaN(Number(queryPage)) ? 1 : Number(queryPage);

  const handlePageChange = (newPage: number): void => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  const paginationItems = getPaginationRange({
    currentPage: page,
    totalPages,
    siblingCount,
    boundaryCount,
  });

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
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
            className={pageButtonClasses(item === page)}
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
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-text-muted transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
      >
        ›
      </button>
    </div>
  );
};
