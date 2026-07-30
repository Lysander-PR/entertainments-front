import { entertainmentApi } from "@/api/entertainment.api";

import type { Movie } from "../types/interfaces/movie.interface";

export const getMovieAction = async (id: string): Promise<Movie> => {
  try {
    const { data } = await entertainmentApi.get<Movie>(`movies/${id}`);

    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
