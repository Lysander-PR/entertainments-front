import { entertainmentApi } from "@/api/entertainment.api";
import type {
  PaginatedResponse,
  PaginationParams,
} from "@/shared/types/interfaces/pagination.interface";

import type { Movie } from "../types/interfaces/movie.interface";

export const getMoviesAction = async ({
  page,
  limit,
}: PaginationParams): Promise<PaginatedResponse<Movie>> => {
  try {
    const { data } = await entertainmentApi.get<PaginatedResponse<Movie>>(
      "movies",
      {
        params: { page, limit },
      },
    );

    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
