import axiosInstance, { axiosFormData } from "./axios";

/* =========================
    TYPES
========================= */

export interface CompanyData {
  companyName: string;
  description: string;
  location: string;
  website?: string;
  industry?: string;
}

export interface UpdateCompanyData extends Partial<CompanyData> {}

export interface Company extends CompanyData {
  _id: string;
  logo?: string;
  employer: string;
}

/* =========================
    COMPANY APIs
========================= */

/** Create Company */
export const createCompany = async (companyData: CompanyData): Promise<Company> => {
  const { data } = await axiosInstance.post("/companies", companyData);
  return data.data;
};

/** Get All Companies (with pagination & search) */
export const getCompanies = async (keyword = "", page = 1) => {
  const { data } = await axiosInstance.get("/companies", {
    params: { keyword, page },
  });
  return data;
};

/** Get Company By ID */
export const getCompanyById = async (companyId: string): Promise<Company> => {
  const { data } = await axiosInstance.get(`/companies/${companyId}`);
  return data.data;
};

/** Get Logged-in Employer Company */
export const getMyCompany = async (): Promise<Company> => {
  const { data } = await axiosInstance.get("/companies/my/company");
  return data.data;
};

/** Update Company */
export const updateCompany = async (companyId: string, companyData: UpdateCompanyData): Promise<Company> => {
  const { data } = await axiosInstance.put(`/companies/${companyId}`, companyData);
  return data.data;
};

/** Delete Company */
export const deleteCompany = async (companyId: string): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete(`/companies/${companyId}`);
  return data;
};

/** Upload Company Logo (Uses multipart instance) */
export const uploadCompanyLogo = async (companyId: string, file: File) => {
  const formData = new FormData();
  formData.append("logo", file);

  const { data } = await axiosFormData.post(`/companies/${companyId}/logo`, formData);
  return data;
};

/** Get Jobs posted by a specific Company */
export const getCompanyJobs = async (companyId: string) => {
  const { data } = await axiosInstance.get(`/companies/${companyId}/jobs`);
  return data.data;
};