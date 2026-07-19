import type { User } from "firebase/auth";

import type { AuthUser, UserRole } from "@/types/user";

export type AuthCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = AuthCredentials & {
  displayName: string;
  role?: UserRole;
};

export type AuthStateStatus = "idle" | "loading" | "authenticated" | "guest";

export type AuthState = {
  user: AuthUser | null;
  status: AuthStateStatus;
  error: string | null;
};

export type AuthActions = {
  setUser: (user: AuthUser | null) => void;
  setStatus: (status: AuthStateStatus) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

export type AuthStore = AuthState & AuthActions;

export type FirebaseAuthObserver = (user: User | null) => void;
