import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

import { firebaseConfig } from "@/firebase/config";

export type FirebaseClient = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
};

let firebaseClient: FirebaseClient | null = null;

export function getFirebaseClient(): FirebaseClient | null {
  if (!firebaseConfig) {
    return null;
  }

  if (firebaseClient) {
    return firebaseClient;
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

  firebaseClient = {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app),
  };

  return firebaseClient;
}

export const firebaseClientInstance = getFirebaseClient();
export const firebaseApp = firebaseClientInstance?.app ?? null;
export const firebaseAuth = firebaseClientInstance?.auth ?? null;
export const firestoreDb = firebaseClientInstance?.db ?? null;
export const firebaseStorage = firebaseClientInstance?.storage ?? null;
