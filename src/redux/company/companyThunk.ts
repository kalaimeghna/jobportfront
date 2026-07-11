import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";
import { 
  Company, 
  CreateCompanyPayload, 
  UpdateCompanyPayload,
  CompanyResponse,
  CompaniesResponse
} from "../../types/company.types";

// ==========================
// CREATE COMPANY
// ==========================
export const createCompany = createAsyncThunk<
  Company, 
  CreateCompanyPayload, 
  { rejectValue: string }
>(
  "company/createCompany",
  async (companyData, { rejectWithValue }) => {
    try {
      const { data } = await API.post<CompanyResponse>("/companies", companyData);
      return data.company; // Extracting the actual company object from the response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Company creation failed");
    }
  }
);

// ==========================
// GET ALL COMPANIES
// ==========================
export const fetchCompanies = createAsyncThunk<
  Company[], 
  void, 
  { rejectValue: string }
>(
  "company/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get<CompaniesResponse>("/companies");
      return data.companies;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch companies");
    }
  }
);

// ==========================
// GET SINGLE COMPANY BY ID
// ==========================
export const fetchCompanyById = createAsyncThunk<
  Company, 
  string, 
  { rejectValue: string }
>(
  "company/fetchCompanyById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get<CompanyResponse>(`/companies/${id}`);
      return data.company;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch company");
    }
  }
);

// ==========================
// GET MY COMPANY (EMPLOYER)
// ==========================
export const fetchMyCompany = createAsyncThunk<
  Company, 
  void, 
  { rejectValue: string }
>(
  "company/fetchMyCompany",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get<CompanyResponse>("/companies/my-company");
      return data.company;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch your company");
    }
  }
);

// ==========================
// UPDATE COMPANY (Handles File Uploads)
// ==========================
export const updateCompany = createAsyncThunk<
  Company, 
  UpdateCompanyPayload, 
  { rejectValue: string }
>(
  "company/updateCompany",
  async (payload, { rejectWithValue }) => {
    try {
      const { companyId, ...updateData } = payload;
      let dataToSend: any = updateData;
      let headers = {};

      // If the logo is a File, we must use multipart/form-data
      if (updateData.logo instanceof File) {
        dataToSend = new FormData();
        Object.entries(updateData).forEach(([key, value]) => {
          if (value !== undefined) {
            dataToSend.append(key, value);
          }
        });
        headers = { "Content-Type": "multipart/form-data" };
      }

      const { data } = await API.put<CompanyResponse>(
        `/companies/${companyId}`, 
        dataToSend, 
        { headers }
      );
      
      return data.company;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Company update failed");
    }
  }
);

// ==========================
// DELETE COMPANY
// ==========================
export const deleteCompany = createAsyncThunk<
  { id: string }, 
  string, 
  { rejectValue: string }
>(
  "company/deleteCompany",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/companies/${id}`);
      return { id }; // Returning ID so the slice can filter it out of state
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Company deletion failed");
    }
  }
);