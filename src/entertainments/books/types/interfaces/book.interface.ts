import type { EntertainmentFile } from "@/entertainments/types/interfaces/entertainment-file.interface";

export interface Book {
  id: string;
  author: string;
  coWriter: string | null;
  title: string;
  releaseDate: string;
  publisher: string;
  createdAt: string;
  coverId: string;
  cover: EntertainmentFile;
}
