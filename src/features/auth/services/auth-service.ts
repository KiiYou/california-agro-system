import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type Unsubscribe,
  type UserCredential,
} from "firebase/auth";

import { firebaseAuth } from "@/firebase/client";
import { firebaseConfigError } from "@/firebase/config";
import type {
  AuthCredentials,
  FirebaseAuthObserver,
  RegisterCredentials,
} from "@/features/auth/types";

function requireAuth() {
  if (!firebaseAuth) {
    throw new Error(firebaseConfigError);
  }

  return firebaseAuth;
}

export async function signInWithEmail(
  credentials: AuthCredentials,
): Promise<UserCredential> {
  const auth = requireAuth();

  return signInWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password,
  );
}

export async function registerWithEmail(
  credentials: RegisterCredentials,
): Promise<UserCredential> {
  const auth = requireAuth();
  const credential = await createUserWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password,
  );

  await updateProfile(credential.user, {
    displayName: credentials.displayName,
  });

  return credential;
}

export async function signOutCurrentUser(): Promise<void> {
  const auth = requireAuth();

  await signOut(auth);
}

export function subscribeToAuthState(
  observer: FirebaseAuthObserver,
): Unsubscribe {
  const auth = requireAuth();

  return onAuthStateChanged(auth, observer);
}
