export const FIRESTORE_COLLECTIONS = {
  users: "users",
  customers: "customers",
  products: "products",
  documents: "documents",
  settings: "settings",
  activityLogs: "activityLogs",
} as const;

export type FirestoreCollection =
  (typeof FIRESTORE_COLLECTIONS)[keyof typeof FIRESTORE_COLLECTIONS];
