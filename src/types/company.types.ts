export interface Company {
  _id: string;

  name: string;
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

export interface CreateCompanyPayload {
  name: string;
  email: string;

  website?: string;
  location?: string;
  industry?: string;

  description?: string;
}

export interface UpdateCompanyPayload {
  companyId: string;

  name?: string;
  email?: string;

  website?: string;
  location?: string;
  industry?: string;

  description?: string;

  logo?: string;
}

export interface CompanyResponse {
  success: boolean;
  message?: string;

  company: Company;
}

export interface CompaniesResponse {
  success: boolean;
  count: number;

  companies: Company[];
}

export interface CompanyState {
  companies: Company[];

  company: Company | null;

  loading: boolean;

  error: string | null;
}