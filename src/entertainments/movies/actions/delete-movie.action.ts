import { entertainmentApi } from "@/api/entertainment.api";

export const deleteMovieAction = async (id: string): Promise<void> => {
  try {
    await entertainmentApi.delete(`movies/${id}`);
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
