"use client";

import { useEffect } from "react";

import { mapFirebaseUserToAuthUser } from "@/features/auth/lib/auth-mappers";
import { subscribeToAuthState } from "@/features/auth/services/auth-service";
import { isFirebaseConfigured } from "@/firebase/config";
import { useAuthStore } from "@/store/auth-store";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const setStatus = useAuthStore((state) => state.setStatus);
  const setError = useAuthStore((state) => state.setError);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setStatus("guest");
      return;
    }

    setStatus("loading");

    try {
      return subscribeToAuthState((firebaseUser) => {
        setUser(firebaseUser ? mapFirebaseUserToAuthUser(firebaseUser) : null);
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to initialize Firebase Authentication.";

      setError(message);
      setStatus("guest");
    }
  }, [setError, setStatus, setUser]);

  return children;
}
