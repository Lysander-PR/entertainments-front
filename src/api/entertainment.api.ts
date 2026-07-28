import axios from "axios";

const entertainmentApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

entertainmentApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token-entertainment");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { entertainmentApi };
