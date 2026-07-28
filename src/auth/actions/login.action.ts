import { entertainmentApi } from "@/api/entertainment.api";

import { useAuthStore } from "../store/auth.store";
import type { AuthResponse } from "../types/interfaces/auth-response.interface";

export const loginAction = async (email: string, password: string) => {
  try {
    const { data } = await entertainmentApi.post<AuthResponse>("auth/login", {
      email,
      password,
    });

    useAuthStore.getState().login(data.user, data.access_token);

    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
