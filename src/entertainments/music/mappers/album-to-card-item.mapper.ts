import type { EntertainmentCardItem } from "@/entertainments/types/interfaces/entertainment-card-item.interface";
import { formatDate } from "@/shared/utils/format-date.util";

import type { Album } from "../types/interfaces/album.interface";

export const albumToCardItem = (album: Album): EntertainmentCardItem => {
  return {
    id: album.id,
    title: album.album,
    subtitle: album.artist,
    createdAt: album.createdAt,
    production: album.studio,
    imageId: album.coverId,
    releaseDate: formatDate(album.releaseDate),
    category: "album",
  };
};
