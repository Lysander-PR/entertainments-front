import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import type { EntertainmentCategory } from "../types/interfaces/entertainment-card-item.interface";
import { deleteBookAction } from "../books/actions/delete-book.action";
import { deleteMovieAction } from "../movies/actions/delete-movie.action";
import { deleteAlbumAction } from "../music/actions/delete-album.action";

interface DeleteEntertainmentParams {
  id: string;
  category: EntertainmentCategory;
}

const CATEGORY_DELETIONS: Record<
  EntertainmentCategory,
  (id: string) => Promise<void>
> = {
  book: deleteBookAction,
  movie: deleteMovieAction,
  album: deleteAlbumAction,
};

export const useDeleteEntertainment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, category }: DeleteEntertainmentParams) =>
      CATEGORY_DELETIONS[category](id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["entertainments"] }),
  });

  const errorMessage = mutation.error
    ? ((isAxiosError(mutation.error)
        ? mutation.error.response?.data?.message
        : null) ?? "We couldn't delete this record. Please try again.")
    : null;

  return {
    deleteEntertainment: mutation.mutate,
    isDeleting: mutation.isPending,
    errorMessage,
    reset: mutation.reset,
  };
};
