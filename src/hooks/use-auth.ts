import { useAuthStore } from "@/store/auth-store";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);
  const error = useAuthStore((state) => state.error);

  return {
    user,
    status,
    error,
    isLoading: status === "loading" || status === "idle",
    isAuthenticated: status === "authenticated",
  };
}
