import { entertainmentApi } from "@/api/entertainment.api";

import type { Book } from "../types/interfaces/book.interface";

export const getBookAction = async (id: string): Promise<Book> => {
  try {
    const { data } = await entertainmentApi.get<Book>(`books/${id}`);

    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
