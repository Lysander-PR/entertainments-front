import { entertainmentApi } from "@/api/entertainment.api";

export const getFileAction = async (id: string): Promise<Blob> => {
  try {
    const { data } = await entertainmentApi.get<Blob>(`files/${id}`, {
      responseType: "blob",
    });
    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
