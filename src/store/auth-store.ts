import { create } from "zustand";

import type { AuthStore } from "@/features/auth/types";

const initialState = {
  user: null,
  status: "idle" as const,
  error: null,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  setUser: (user) =>
    set({
      user,
      status: user ? "authenticated" : "guest",
      error: null,
    }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
