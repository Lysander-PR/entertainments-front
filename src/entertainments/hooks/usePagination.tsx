import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type {
  PaginatedResponse,
  PaginationParams,
} from "@/shared/types/interfaces/pagination.interface";

import type {
  EntertainmentCardItem,
  EntertainmentCategory,
} from "../types/interfaces/entertainment-card-item.interface";
import { getBooksAction } from "../books/actions/get-books.action";
import { bookToCardItem } from "../books/mappers/book-to-card-item.mapper";
import { getMoviesAction } from "../movies/actions/get-movies.action";
import { movieToCardItem } from "../movies/mappers/movie-to-card-item.mapper";
import { getAlbumsAction } from "../music/actions/get-albums.action";
import { albumToCardItem } from "../music/mappers/album-to-card-item.mapper";
import { toCardItemsPage } from "../mappers/to-card-items-page.mapper";

interface PaginationProps {
  page: number;
  limit: number;
  category: EntertainmentCategory;
}

const CATEGORY_QUERIES: Record<
  EntertainmentCategory,
  (
    params: PaginationParams,
  ) => Promise<PaginatedResponse<EntertainmentCardItem>>
> = {
  book: async (params) =>
    toCardItemsPage(await getBooksAction(params), bookToCardItem),
  movie: async (params) =>
    toCardItemsPage(await getMoviesAction(params), movieToCardItem),
  album: async (params) =>
    toCardItemsPage(await getAlbumsAction(params), albumToCardItem),
};

export const usePagination = ({ page, limit, category }: PaginationProps) => {
  const queryFn = CATEGORY_QUERIES[category];

  const query = useQuery({
    queryKey: ["entertainments", { page, limit, category }],
    queryFn: () => queryFn({ page, limit }),
    placeholderData: keepPreviousData,
  });

  const items = query.data?.data ?? [];
  const rangeStart = items.length === 0 ? 0 : (page - 1) * limit + 1;

  return {
    query,
    items,
    total: query.data?.total ?? 0,
    currentPage: query.data?.currentPage ?? page,
    totalPages: query.data?.totalPages ?? 0,
    hasNextPage: query.data?.hasNextPage ?? false,
    hasPreviousPage: query.data?.hasPreviousPage ?? false,
    rangeStart,
    rangeEnd: rangeStart === 0 ? 0 : rangeStart + items.length - 1,
  };
};
