import { entertainmentApi } from "@/api/entertainment.api";
import type {
  PaginatedResponse,
  PaginationParams,
} from "@/shared/types/interfaces/pagination.interface";

import type { Book } from "../types/interfaces/book.interface";

export const getBooksAction = async ({
  page,
  limit,
}: PaginationParams): Promise<PaginatedResponse<Book>> => {
  try {
    const { data } = await entertainmentApi.get<PaginatedResponse<Book>>(
      "books",
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
