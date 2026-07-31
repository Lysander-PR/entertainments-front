import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { PaginationParams } from "@/shared/types/interfaces/pagination.interface";

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

interface PaginationProps {
  page: number;
  limit: number;
  category: EntertainmentCategory;
}

const CATEGORY_QUERIES: Record<
  EntertainmentCategory,
  (params: PaginationParams) => Promise<EntertainmentCardItem[]>
> = {
  book: async (params) => (await getBooksAction(params)).map(bookToCardItem),
  movie: async (params) => (await getMoviesAction(params)).map(movieToCardItem),
  album: async (params) => (await getAlbumsAction(params)).map(albumToCardItem),
};

export const usePagination = ({ page, limit, category }: PaginationProps) => {
  const pageSize = limit > 0 ? limit : 1;
  const currentPage = page > 0 ? page : 1;
  const queryFn = CATEGORY_QUERIES[category];

  const query = useQuery({
    queryKey: ["entertainments", { page, limit, category }],
    queryFn: () => queryFn({ page, limit }),
    placeholderData: keepPreviousData,
  });

  const items = query.data ?? [];
  const startIndex = (currentPage - 1) * pageSize;
  const hasNextPage = items.length === pageSize;

  return {
    query,
    items,
    currentPage,
    hasNextPage,
    totalPages: hasNextPage ? currentPage + 1 : currentPage,
    rangeStart: items.length === 0 ? 0 : startIndex + 1,
    rangeEnd: startIndex + items.length,
  };
};
