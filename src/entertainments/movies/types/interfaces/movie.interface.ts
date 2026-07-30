import type { EntertainmentFile } from "@/entertainments/types/interfaces/entertainment-file.interface";

export interface Movie {
  id: string;
  director: string;
  title: string;
  writer: string;
  studio: string;
  protagonist: string;
  releaseDate: string;
  soundtrack: string | null;
  createdAt: string;
  posterId: string;
  poster: EntertainmentFile;
}
