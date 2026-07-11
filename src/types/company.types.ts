/**
 * Core Company Interface
 * The 'owner' field links back to the User who created the profile.
 */
export interface Company {
  _id: string;
  companyName: string;
  email: string;
  website?: string;
  location?: string;
  industry?: string;
  description?: string;
  logo?: string;
  owner?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Payload for creating a new company profile.
 */
export interface CreateCompanyPayload {
  companyName: string;
  email: string;
  website?: string;
  location?: string;
  industry?: string;
  description?: string;
}

/**
 * Payload for updating an existing company.
 */
export interface UpdateCompanyPayload {
  companyId: string;
  companyName?: string;
  email?: string;
  website?: string;
  location?: string;
  industry?: string;
  description?: string;
  logo?: string | File; // Handles both URL strings and new File uploads
}

/**
 * Standardized API Response for a single company
 */
export interface CompanyResponse {
  success: boolean;
  message?: string;
  company: Company;
}

/**
 * Standardized API Response for a list of companies
 */
export interface CompaniesResponse {
  success: boolean;
  count: number;
  companies: Company[];
}

/**
 * Global state structure for companies (Redux/Context)
 */
export interface CompanyState {
  companies: Company[];
  company: Company | null;
  loading: boolean;
  error: string | null;
}