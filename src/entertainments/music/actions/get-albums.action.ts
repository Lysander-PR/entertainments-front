import { entertainmentApi } from "@/api/entertainment.api";

import type { Album } from "../types/interfaces/album.interface";

export const getAlbumsAction = async (): Promise<Album[]> => {
  try {
    const { data } = await entertainmentApi.get<Album[]>("albums");

    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
