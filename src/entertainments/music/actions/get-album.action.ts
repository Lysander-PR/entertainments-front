import { entertainmentApi } from "@/api/entertainment.api";

import type { Album } from "../types/interfaces/album.interface";

export const getAlbumAction = async (id: string): Promise<Album> => {
  try {
    const { data } = await entertainmentApi.get<Album>(`albums/${id}`);

    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
