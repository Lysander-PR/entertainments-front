import { entertainmentApi } from "@/api/entertainment.api";

import { useAuthStore } from "../store/auth.store";
import type { AuthResponse } from "../types/interfaces/auth-response.interface";

export const register = async (
  email: string,
  password: string,
  username: string,
) => {
  try {
    const { data } = await entertainmentApi.post<AuthResponse>(
      "auth/register",
      {
        email,
        password,
        username,
      },
    );

    useAuthStore.getState().login(data.user, data.access_token);

    return data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};
