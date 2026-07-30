import type {
  EntertainmentCardItem,
  EntertainmentDetailRow,
} from "@/entertainments/types/interfaces/entertainment-card-item.interface";
import { formatDate } from "@/shared/utils/format-date.util";

import type { Book } from "../types/interfaces/book.interface";

export const bookToCardItem = (book: Book): EntertainmentCardItem => {
  const coWriter: EntertainmentDetailRow[] = [];

  if (book.coWriter) {
    coWriter.push({ label: "Coautor", value: book.coWriter });
  }

  return {
    id: book.id,
    title: book.title,
    subtitle: book.author,
    production: book.publisher,
    createdAt: book.createdAt,
    imageId: book.coverId,
    releaseDate: formatDate(book.releaseDate),
    detailRows: [...coWriter],
  };
};
