import { entertainmentApi } from "@/api/entertainment.api";
import type { AuthResponse } from "../types/interfaces/auth-response.interface";
import { TOKEN_STORAGE } from "@/shared/types/consts/token-storage.const";
import { useAuthStore } from "../store/auth.store";

export const refreshAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem(TOKEN_STORAGE);

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const { data } = await entertainmentApi.post<AuthResponse>("auth/refresh");

    useAuthStore.getState().login(data.user, data.access_token);

    return data;
  } catch (error) {
    console.warn(error);
    useAuthStore.getState().logout();
    throw error;
  }
};
