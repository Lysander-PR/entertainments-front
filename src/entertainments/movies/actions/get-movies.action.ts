import { entertainmentApi } from "@/api/entertainment.api";
import type { PaginationParams } from "@/shared/types/interfaces/pagination.interface";

import type { Movie } from "../types/interfaces/movie.interface";

export const getMoviesAction = async ({
  page,
  limit,
}: PaginationParams): Promise<Movie[]> => {
  try {
    const { data } = await entertainmentApi.get<Movie[]>("movies", {
      params: { page, limit },
    });

    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
