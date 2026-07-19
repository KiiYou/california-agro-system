import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { FIRESTORE_COLLECTIONS } from "@/constants/firestore";
import { firestoreDb, firebaseStorage } from "@/firebase/client";
import { firebaseConfigError } from "@/firebase/config";
import type {
  CreateProductInput,
  Product,
  ProductImageUpload,
  UpdateProductInput,
} from "@/features/products/types/product";
import { mapProductDocument } from "@/features/products/utils/product-mappers";

function requireFirestore() {
  if (!firestoreDb) {
    throw new Error(firebaseConfigError);
  }

  return firestoreDb;
}

function requireStorage() {
  if (!firebaseStorage) {
    throw new Error(firebaseConfigError);
  }

  return firebaseStorage;
}

function getProductsCollection() {
  return collection(requireFirestore(), FIRESTORE_COLLECTIONS.products);
}

function normalizeProductCode(code: string): string {
  return code.trim().toUpperCase();
}

async function assertUniqueProductCode(
  code: string,
  existingProductId?: string,
): Promise<void> {
  const productCode = normalizeProductCode(code);
  const productCodeQuery = query(
    getProductsCollection(),
    where("code", "==", productCode),
    limit(1),
  );
  const snapshot = await getDocs(productCodeQuery);
  const matchingProduct = snapshot.docs.at(0);

  if (matchingProduct && matchingProduct.id !== existingProductId) {
    throw new Error("Product code already exists. Use a unique product code.");
  }
}

export async function getProducts(): Promise<Product[]> {
  const productsQuery = query(
    getProductsCollection(),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(productsQuery);

  return snapshot.docs.map((productDocument) =>
    mapProductDocument(productDocument.id, productDocument.data()),
  );
}

export async function createProduct(input: CreateProductInput): Promise<string> {
  await assertUniqueProductCode(input.code);

  const productDocument = await addDoc(getProductsCollection(), {
    ...input,
    code: normalizeProductCode(input.code),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return productDocument.id;
}

export async function updateProduct(
  productId: string,
  input: UpdateProductInput,
): Promise<void> {
  await assertUniqueProductCode(input.code, productId);

  await updateDoc(doc(requireFirestore(), FIRESTORE_COLLECTIONS.products, productId), {
    ...input,
    code: normalizeProductCode(input.code),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(productId: string): Promise<void> {
  await deleteDoc(doc(requireFirestore(), FIRESTORE_COLLECTIONS.products, productId));
}

export async function uploadProductImage({
  file,
  productCode,
}: ProductImageUpload): Promise<string> {
  const extension = file.name.split(".").pop() ?? "png";
  const fileName = `${normalizeProductCode(productCode)}-${Date.now()}.${extension}`;
  const imageRef = ref(requireStorage(), `products/${fileName}`);
  const uploadResult = await uploadBytes(imageRef, file);

  return getDownloadURL(uploadResult.ref);
}
