import { entertainmentApi } from "@/api/entertainment.api";

import type { Movie } from "../types/interfaces/movie.interface";

export const getMoviesAction = async (): Promise<Movie[]> => {
  try {
    const { data } = await entertainmentApi.get<Movie[]>("movies");

    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
