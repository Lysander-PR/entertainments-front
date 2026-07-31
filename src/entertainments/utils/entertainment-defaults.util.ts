import type { EntertainmentCategory } from "../types/interfaces/entertainment-card-item.interface";

export const PAGE_SIZE_OPTIONS = [1, 2, 5];
export const DEFAULT_PAGE_SIZE = PAGE_SIZE_OPTIONS[0];
export const DEFAULT_CATEGORY: EntertainmentCategory = "book";
export const DEFAULT_PAGE = 1;

export const getPageFromParams = (searchParams: URLSearchParams): number => {
  const pageParam = searchParams.get("page");

  return pageParam === null ? DEFAULT_PAGE : Number(pageParam);
};

export const getCategoryFromParams = (
  searchParams: URLSearchParams,
  key: string,
): EntertainmentCategory => {
  return (
    (searchParams.get(key) as EntertainmentCategory | null) ?? DEFAULT_CATEGORY
  );
};

export const getPageSizeFromParams = (
  searchParams: URLSearchParams,
): number => {
  const pageSizeParam = Number(searchParams.get("pageSize"));

  return PAGE_SIZE_OPTIONS.includes(pageSizeParam)
    ? pageSizeParam
    : DEFAULT_PAGE_SIZE;
};
