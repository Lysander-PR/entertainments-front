import { entertainmentApi } from "@/api/entertainment.api";

export const deleteAlbumAction = async (id: string): Promise<void> => {
  try {
    await entertainmentApi.delete(`albums/${id}`);
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
