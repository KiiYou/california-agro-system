import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { FIRESTORE_COLLECTIONS } from "@/constants/firestore";
import { firestoreDb } from "@/firebase/client";
import { firebaseConfigError } from "@/firebase/config";
import {
  createDocumentSchema,
  updateDocumentSchema,
} from "@/features/documents/schemas/document.schema";
import type {
  BusinessDocument,
  CreateDocumentInput,
  UpdateDocumentInput,
} from "@/features/documents/types/document.types";
import { mapDocumentDocument } from "@/features/documents/utils/document-mappers";

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
  const validatedInput = createDocumentSchema.parse({
    ...input,
    status: "draft",
  });
  const documentReference = await addDoc(getDocumentsCollection(), {
    ...validatedInput,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return documentReference.id;
}

export async function getDocuments(): Promise<BusinessDocument[]> {
  const documentsQuery = query(
    getDocumentsCollection(),
    orderBy("updatedAt", "desc"),
  );
  const snapshot = await getDocs(documentsQuery);

  return snapshot.docs.map((documentSnapshot) =>
    mapDocumentDocument(documentSnapshot.id, documentSnapshot.data()),
  );
}

export async function updateDocument(
  documentId: string,
  input: UpdateDocumentInput,
): Promise<void> {
  const validatedInput = updateDocumentSchema.parse(input);

  await updateDoc(
    doc(requireFirestore(), FIRESTORE_COLLECTIONS.documents, documentId),
    {
      ...validatedInput,
      updatedAt: serverTimestamp(),
    },
  );
}

export async function deleteDocument(documentId: string): Promise<void> {
  await deleteDoc(
    doc(requireFirestore(), FIRESTORE_COLLECTIONS.documents, documentId),
  );
}
