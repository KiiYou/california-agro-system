import type { FirebaseOptions } from "firebase/app";
import { z } from "zod";

const firebaseEnvSchema = z.object({
  apiKey: z.string().min(1),
  authDomain: z.string().min(1),
  projectId: z.string().min(1),
  storageBucket: z.string().min(1),
  messagingSenderId: z.string().min(1),
  appId: z.string().min(1),
});

const parsedConfig = firebaseEnvSchema.safeParse({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

export const firebaseConfig: FirebaseOptions | null = parsedConfig.success
  ? parsedConfig.data
  : null;

export const isFirebaseConfigured = parsedConfig.success;

export const firebaseConfigError =
  "Firebase is not configured. Add the required NEXT_PUBLIC_FIREBASE_* values to your root .env.local file.";
