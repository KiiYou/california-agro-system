import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { FIRESTORE_COLLECTIONS } from "@/constants/firestore";
import { firestoreDb } from "@/firebase/client";
import { firebaseConfigError } from "@/firebase/config";
import { createDocumentSchema } from "@/features/documents/schemas/document.schema";
import type { CreateDocumentInput } from "@/features/documents/types/document.types";

function requireFirestore() {
  if (!firestoreDb) {
    throw new Error(firebaseConfigError);
  }

  return firestoreDb;
}

function getDocumentsCollection() {
  return collection(requireFirestore(), FIRESTORE_COLLECTIONS.documents);
}

export async function createDocument(
  input: CreateDocumentInput,
): Promise<string> {
  const validatedInput = createDocumentSchema.parse(input);
  const documentReference = await addDoc(getDocumentsCollection(), {
    ...validatedInput,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return documentReference.id;
}
