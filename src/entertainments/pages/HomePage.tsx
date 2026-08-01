import { useSearchParams } from "react-router";

import { PageSizeSelect } from "@/shared/components/PageSizeSelect";
import { Pagination } from "@/shared/components/Pagination";
import { FullScreenLoading } from "@/shared/components/FullScreenLoading";
import { Tabs } from "@/shared/components/Tabs";

import { Card } from "../components/Card";
import { usePagination } from "../hooks/usePagination";
import { CATEGORIES_TABS } from "../types/consts/categories-tabs.const";
import {
  DEFAULT_CATEGORY,
  getCategoryFromParams,
  getPageFromParams,
  getPageSizeFromParams,
  PAGE_SIZE_OPTIONS,
} from "../utils/entertainment-defaults.util";

export const HomePage = () => {
  const [searchParams] = useSearchParams({ category: DEFAULT_CATEGORY });
  const categoryKey = "category";

  const pageParam = getPageFromParams(searchParams);
  const category = getCategoryFromParams(searchParams, categoryKey);
  const pageSize = getPageSizeFromParams(searchParams);

  const { query, items, totalPages, rangeStart, rangeEnd } = usePagination({
    page: pageParam,
    limit: pageSize,
    category,
  });

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        {query.isLoading && <FullScreenLoading />}

        {query.isError && (
          <p className="text-center text-sm text-red-400">
            An error occurred while loading the content.
          </p>
        )}

        <Tabs tabs={CATEGORIES_TABS} paramKey={categoryKey} />

        {!query.isLoading && !query.isError && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-muted">
                Showing{" "}
                <span className="font-semibold text-white">
                  {rangeStart}-{rangeEnd}
                </span>
              </p>

              <div className="flex items-center gap-3">
                <span className="text-sm text-text-muted">Per page</span>
                <PageSizeSelect value={pageSize} options={PAGE_SIZE_OPTIONS} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>

            <Pagination totalPages={totalPages} />
          </>
        )}
      </div>
    </div>
  );
};
