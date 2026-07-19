export type AppLanguage = "ar" | "en";

export type AppCurrency = "USD" | "EUR" | "EGP";

export type CompanySettings = {
  companyNameAr: string;
  companyNameEn: string;
  phone: string;
  mobile: string;
  email: string;
  website: string;
  addressAr: string;
  addressEn: string;
  taxId: string;
  commercialRegister: string;
  quotationPrefix: string;
  invoicePrefix: string;
  quotationCounter: number;
  invoiceCounter: number;
  defaultLanguage: AppLanguage;
  defaultCurrency: AppCurrency;
  quotationTermsAr: string;
  quotationTermsEn: string;
  invoiceTermsAr: string;
  invoiceTermsEn: string;
};

export type UpdateCompanySettingsInput = CompanySettings;
