import { entertainmentApi } from "@/api/entertainment.api";
import type {
  PaginatedResponse,
  PaginationParams,
} from "@/shared/types/interfaces/pagination.interface";

import type { Album } from "../types/interfaces/album.interface";

export const getAlbumsAction = async ({
  page,
  limit,
}: PaginationParams): Promise<PaginatedResponse<Album>> => {
  try {
    const { data } = await entertainmentApi.get<PaginatedResponse<Album>>(
      "albums",
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
