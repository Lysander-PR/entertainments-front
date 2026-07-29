import { create } from "zustand";

import type { User } from "@/shared/types/interfaces/user.interface";
import { TOKEN_STORAGE } from "@/shared/types/consts/token-storage.const";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) => {
    localStorage.setItem(TOKEN_STORAGE, token);
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem(TOKEN_STORAGE);
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
