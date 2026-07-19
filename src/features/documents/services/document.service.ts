import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  Timestamp,
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
  CreateDocumentResult,
  DocumentStatusHistoryEntry,
  UpdateDocumentInput,
} from "@/features/documents/types/document.types";
import { formatDocumentNumber } from "@/features/documents/utils/document-numbering";
import { assertValidStatusTransition } from "@/features/documents/utils/document-workflow";
import { mapDocumentDocument } from "@/features/documents/utils/document-mappers";
import { defaultCompanySettings } from "@/features/settings/schemas/settings.schema";

function requireFirestore() {
  if (!firestoreDb) {
    throw new Error(firebaseConfigError);
  }

  return firestoreDb;
}

function getDocumentsCollection() {
  return collection(requireFirestore(), FIRESTORE_COLLECTIONS.documents);
}

function getCompanySettingsDocument() {
  return doc(requireFirestore(), FIRESTORE_COLLECTIONS.settings, "company");
}

function getNumberingFields(type: CreateDocumentInput["type"]) {
  return type === "quotation"
    ? {
        prefixField: "quotationPrefix",
        counterField: "quotationCounter",
        defaultPrefix: defaultCompanySettings.quotationPrefix,
        defaultCounter: defaultCompanySettings.quotationCounter,
      }
    : {
        prefixField: "invoicePrefix",
        counterField: "invoiceCounter",
        defaultPrefix: defaultCompanySettings.invoicePrefix,
        defaultCounter: defaultCompanySettings.invoiceCounter,
      };
}

function normalizeCounter(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.max(Math.trunc(value), 1)
    : fallback;
}

function normalizePrefix(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function serializeStatusHistory(
  history: DocumentStatusHistoryEntry[],
): Array<{ status: string; date: Timestamp }> {
  return history.map((entry) => ({
    status: entry.status,
    date: Timestamp.fromDate(entry.date),
  }));
}

export async function createDocument(
  input: CreateDocumentInput,
): Promise<CreateDocumentResult> {
  const validatedInput = createDocumentSchema.parse({
    ...input,
    status: "draft",
  });
  const db = requireFirestore();
  const documentsCollection = getDocumentsCollection();
  const settingsDocument = getCompanySettingsDocument();
  const newDocumentReference = doc(documentsCollection);

  return runTransaction(db, async (transaction) => {
    const settingsSnapshot = await transaction.get(settingsDocument);
    const settingsData = settingsSnapshot.exists() ? settingsSnapshot.data() : {};
    const numbering = getNumberingFields(validatedInput.type);
    const prefix = normalizePrefix(
      settingsData[numbering.prefixField],
      numbering.defaultPrefix,
    );
    const counter = normalizeCounter(
      settingsData[numbering.counterField],
      numbering.defaultCounter,
    );
    const number = formatDocumentNumber(prefix, counter);
    const statusHistory = serializeStatusHistory([
      {
        status: "draft",
        date: new Date(),
      },
    ]);

    transaction.set(
      settingsDocument,
      {
        [numbering.prefixField]: prefix,
        [numbering.counterField]: counter + 1,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
    transaction.set(newDocumentReference, {
      ...validatedInput,
      number,
      status: "draft",
      statusHistory,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      id: newDocumentReference.id,
      number,
    };
  });
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
  const db = requireFirestore();
  const documentReference = doc(db, FIRESTORE_COLLECTIONS.documents, documentId);

  await runTransaction(db, async (transaction) => {
    const existingSnapshot = await transaction.get(documentReference);

    if (!existingSnapshot.exists()) {
      throw new Error("Document was not found.");
    }

    const existingDocument = mapDocumentDocument(
      existingSnapshot.id,
      existingSnapshot.data(),
    );

    assertValidStatusTransition(
      existingDocument.type,
      existingDocument.status,
      validatedInput.status,
    );

    const statusHistory =
      existingDocument.status === validatedInput.status
        ? existingDocument.statusHistory
        : [
            ...existingDocument.statusHistory,
            {
              status: validatedInput.status,
              date: new Date(),
            },
          ];

    transaction.update(documentReference, {
      ...validatedInput,
      number: existingDocument.number,
      statusHistory: serializeStatusHistory(statusHistory),
      updatedAt: serverTimestamp(),
    });
  });
}

export async function duplicateDocument(
  documentToDuplicate: BusinessDocument,
): Promise<CreateDocumentResult> {
  return createDocument({
    type: documentToDuplicate.type,
    language: documentToDuplicate.language,
    number: "",
    customerId: documentToDuplicate.customerId,
    customerSnapshot: documentToDuplicate.customerSnapshot,
    items: documentToDuplicate.items,
    subtotal: documentToDuplicate.subtotal,
    shipping: documentToDuplicate.shipping,
    tax: documentToDuplicate.tax,
    total: documentToDuplicate.total,
    notes: documentToDuplicate.notes,
    currency: documentToDuplicate.currency,
    status: "draft",
    createdBy: "system",
  });
}

export async function deleteDocument(documentId: string): Promise<void> {
  await deleteDoc(
    doc(requireFirestore(), FIRESTORE_COLLECTIONS.documents, documentId),
  );
}
