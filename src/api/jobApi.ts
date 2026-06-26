import axiosInstance from "./axios";

/* =========================
   TYPES
========================= */

export interface CompanyData {
  name: string;
  description: string;
  location: string;
  website?: string;
}

export interface UpdateCompanyData {
  name?: string;
  description?: string;
  location?: string;
  website?: string;
}

/* =========================
   COMPANY APIs
========================= */

// Create Company
export const createCompany = async (
  companyData: CompanyData
) => {
  const response = await axiosInstance.post(
    "/company",
    companyData
  );

  return response.data;
};

// Get All Companies
export const getCompanies = async (
  keyword = "",
  page = 1
) => {
  const response = await axiosInstance.get(
    `/company?keyword=${keyword}&page=${page}`
  );

  return response.data;
};

// Get Company By ID
export const getCompanyById = async (
  companyId: string
) => {
  const response = await axiosInstance.get(
    `/company/${companyId}`
  );

  return response.data;
};

// Get Logged-In Employer Company
export const getMyCompany = async () => {
  const response = await axiosInstance.get(
    "/company/my-company"
  );

  return response.data;
};

// Update Company
export const updateCompany = async (
  companyId: string,
  companyData: UpdateCompanyData
) => {
  const response = await axiosInstance.put(
    `/company/${companyId}`,
    companyData
  );

  return response.data;
};

// Delete Company
export const deleteCompany = async (
  companyId: string
) => {
  const response = await axiosInstance.delete(
    `/company/${companyId}`
  );

  return response.data;
};

// Upload Company Logo
export const uploadCompanyLogo = async (
  file: File
) => {
  const formData = new FormData();

  formData.append("logo", file);

  const response = await axiosInstance.post(
    "/company/logo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get Company Jobs
export const getCompanyJobs = async (
  companyId: string
) => {
  const response = await axiosInstance.get(
    `/company/${companyId}/jobs`
  );

  return response.data;
};