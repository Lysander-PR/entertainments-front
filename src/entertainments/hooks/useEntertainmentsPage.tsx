import { useEffect } from "react";
import { useSearchParams } from "react-router";

import {
  DEFAULT_CATEGORY,
  getCategoryFromParams,
  getPageFromParams,
  getPageSizeFromParams,
} from "../utils/entertainment-defaults.util";
import { usePagination } from "./usePagination";

export const useEntertainmentsPage = (categoryKey: string) => {
  const [searchParams, setSearchParams] = useSearchParams({
    category: DEFAULT_CATEGORY,
  });

  const page = getPageFromParams(searchParams);
  const pageSize = getPageSizeFromParams(searchParams);
  const category = getCategoryFromParams(searchParams, categoryKey);

  const pagination = usePagination({ page, limit: pageSize, category });
  const { totalPages } = pagination;
  const { isFetching } = pagination.query;

  // Deleting the last record of a page can leave the requested page out of
  // range: snap back to the last page the backend reports.
  useEffect(() => {
    if (isFetching || totalPages < 1 || page <= totalPages) return;

    setSearchParams(
      (prev) => {
        const nextParams = new URLSearchParams(prev);
        nextParams.set("page", totalPages.toString());

        return nextParams;
      },
      { replace: true },
    );
  }, [isFetching, totalPages, page, setSearchParams]);

  return { ...pagination, pageSize };
};
