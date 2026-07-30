import type { Movie } from "../types/interfaces/movie.interface";
import type {
  EntertainmentCardItem,
  EntertainmentDetailRow,
} from "@/entertainments/types/interfaces/entertainment-card-item.interface";
import { formatDate } from "@/shared/utils/format-date.util";

export const movieToCardItem = (movie: Movie): EntertainmentCardItem => {
  const soundtrack: EntertainmentDetailRow[] = [];

  if (movie.soundtrack) {
    soundtrack.push({ label: "Soundtrack", value: movie.soundtrack });
  }

  return {
    id: movie.id,
    title: movie.title,
    subtitle: movie.director,
    production: movie.studio,
    createdAt: movie.createdAt,
    releaseDate: formatDate(movie.releaseDate),
    imageId: movie.posterId,
    category: "movie",
    detailRows: [
      { label: "Writer", value: movie.writer },
      { label: "Lead actor", value: movie.protagonist },
      ...soundtrack,
    ],
  };
};
