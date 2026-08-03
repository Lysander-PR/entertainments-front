import { entertainmentApi } from "@/api/entertainment.api";

export const deleteBookAction = async (id: string): Promise<void> => {
  try {
    await entertainmentApi.delete(`books/${id}`);
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
