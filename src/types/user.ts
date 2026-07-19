export type UserRole = "admin" | "manager" | "sales" | "viewer";

export type AppUser = {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthUser = Pick<
  AppUser,
  "id" | "email" | "displayName" | "role" | "photoUrl"
>;
