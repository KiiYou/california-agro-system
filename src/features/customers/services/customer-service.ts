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
import { mapCustomerDocument } from "@/features/customers/utils/customer-mappers";
import type {
  CreateCustomerInput,
  Customer,
  UpdateCustomerInput,
} from "@/features/customers/types/customer";

function requireFirestore() {
  if (!firestoreDb) {
    throw new Error(firebaseConfigError);
  }

  return firestoreDb;
}

function getCustomersCollection() {
  return collection(requireFirestore(), FIRESTORE_COLLECTIONS.customers);
}

export async function getCustomers(): Promise<Customer[]> {
  const customersQuery = query(
    getCustomersCollection(),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(customersQuery);

  return snapshot.docs.map((customerDocument) =>
    mapCustomerDocument(customerDocument.id, customerDocument.data()),
  );
}

export async function createCustomer(
  input: CreateCustomerInput,
): Promise<string> {
  const customerDocument = await addDoc(getCustomersCollection(), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return customerDocument.id;
}

export async function updateCustomer(
  customerId: string,
  input: UpdateCustomerInput,
): Promise<void> {
  await updateDoc(doc(requireFirestore(), FIRESTORE_COLLECTIONS.customers, customerId), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCustomer(customerId: string): Promise<void> {
  await deleteDoc(doc(requireFirestore(), FIRESTORE_COLLECTIONS.customers, customerId));
}
