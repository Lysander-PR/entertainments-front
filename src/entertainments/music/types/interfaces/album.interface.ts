import type { EntertainmentFile } from "@/entertainments/types/interfaces/entertainment-file.interface";

export interface Album {
  id: string;
  album: string;
  releaseDate: string;
  studio: string;
  artist: string;
  createdAt: string;
  coverId: string;
  cover: EntertainmentFile;
}
