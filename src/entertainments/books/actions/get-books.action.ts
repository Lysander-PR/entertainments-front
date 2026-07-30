import { entertainmentApi } from "@/api/entertainment.api";

import type { Book } from "../types/interfaces/book.interface";

export const getBooksAction = async (): Promise<Book[]> => {
  try {
    const { data } = await entertainmentApi.get<Book[]>("books");

    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
