import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { FIRESTORE_COLLECTIONS } from "@/constants/firestore";
import { firestoreDb } from "@/firebase/client";
import { firebaseConfigError } from "@/firebase/config";
import { defaultCompanySettings } from "@/features/settings/schemas/settings.schema";
import type {
  AppCurrency,
  AppLanguage,
  CompanySettings,
  UpdateCompanySettingsInput,
} from "@/features/settings/types/settings.types";

const companySettingsDocumentId = "company";

type FirestoreCompanySettingsData = Partial<
  Record<keyof CompanySettings, unknown>
>;

function requireFirestore() {
  if (!firestoreDb) {
    throw new Error(firebaseConfigError);
  }

  return firestoreDb;
}

function getCompanySettingsDocument() {
  return doc(
    requireFirestore(),
    FIRESTORE_COLLECTIONS.settings,
    companySettingsDocumentId,
  );
}

function readString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function readNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : fallback;
}

function readLanguage(value: unknown): AppLanguage {
  return value === "ar" || value === "en"
    ? value
    : defaultCompanySettings.defaultLanguage;
}

function readCurrency(value: unknown): AppCurrency {
  return value === "USD" || value === "EUR" || value === "EGP"
    ? value
    : defaultCompanySettings.defaultCurrency;
}

function mapSettingsData(
  data: FirestoreCompanySettingsData,
): CompanySettings {
  return {
    companyNameAr: readString(data.companyNameAr),
    companyNameEn: readString(data.companyNameEn),
    phone: readString(data.phone),
    mobile: readString(data.mobile),
    email: readString(data.email),
    website: readString(data.website),
    addressAr: readString(data.addressAr),
    addressEn: readString(data.addressEn),
    taxId: readString(data.taxId),
    commercialRegister: readString(data.commercialRegister),
    quotationPrefix: readString(
      data.quotationPrefix,
      defaultCompanySettings.quotationPrefix,
    ),
    invoicePrefix: readString(
      data.invoicePrefix,
      defaultCompanySettings.invoicePrefix,
    ),
    quotationCounter: readNumber(
      data.quotationCounter,
      defaultCompanySettings.quotationCounter,
    ),
    invoiceCounter: readNumber(
      data.invoiceCounter,
      defaultCompanySettings.invoiceCounter,
    ),
    defaultLanguage: readLanguage(data.defaultLanguage),
    defaultCurrency: readCurrency(data.defaultCurrency),
    quotationTermsAr: readString(data.quotationTermsAr),
    quotationTermsEn: readString(data.quotationTermsEn),
    invoiceTermsAr: readString(data.invoiceTermsAr),
    invoiceTermsEn: readString(data.invoiceTermsEn),
  };
}

export async function getCompanySettings(): Promise<CompanySettings> {
  const snapshot = await getDoc(getCompanySettingsDocument());

  if (!snapshot.exists()) {
    return defaultCompanySettings;
  }

  return mapSettingsData(snapshot.data());
}

export async function updateCompanySettings(
  input: UpdateCompanySettingsInput,
): Promise<void> {
  await setDoc(
    getCompanySettingsDocument(),
    {
      ...input,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}
