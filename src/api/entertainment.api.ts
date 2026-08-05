import axios from "axios";

import { useAuthStore } from "@/auth/store/auth.store";
import { TOKEN_STORAGE } from "@/shared/types/consts/token-storage.const";

const entertainmentApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

entertainmentApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

entertainmentApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url ?? "";
    const isAuthRequest = url.startsWith("auth/");

    if (error.response?.status === 401 && !isAuthRequest) {
      useAuthStore.getState().logout();
      window.location.href = "/signature";
    }

    return Promise.reject(error);
  },
);

export { entertainmentApi };
