import type { User } from "firebase/auth";

import type { AuthUser } from "@/types/user";

export function mapFirebaseUserToAuthUser(user: User): AuthUser {
  return {
    id: user.uid,
    email: user.email ?? "",
    displayName: user.displayName ?? user.email ?? "California Agro User",
    role: "viewer",
    photoUrl: user.photoURL,
  };
}
