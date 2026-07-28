import type { User } from "@/shared/types/interfaces/user.interface";

export interface AuthResponse {
  user: User;
  access_token: string;
}
