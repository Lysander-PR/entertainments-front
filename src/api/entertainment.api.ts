import axios from "axios";

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

export { entertainmentApi };
