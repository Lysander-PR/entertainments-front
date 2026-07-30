export type EntertainmentCategory = "book" | "movie" | "album";

export interface EntertainmentDetailRow {
  label: string;
  value: string;
}

export interface EntertainmentCardItem {
  id: string;
  title: string;
  subtitle: string;
  releaseDate: string;
  imageUrl?: string;
  production: string;
  createdAt: string;
  detailRows?: EntertainmentDetailRow[];
}
