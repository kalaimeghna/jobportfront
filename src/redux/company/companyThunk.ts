import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// ==========================
// CREATE COMPANY
// ==========================
export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (
    companyData: { name: string; description: string; website?: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/companies", companyData);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Company creation failed"
      );
    }
  }
);

// ==========================
// GET ALL COMPANIES
// ==========================
export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/companies");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch companies"
      );
    }
  }
);

// ==========================
// GET SINGLE COMPANY BY ID
// ==========================
export const fetchCompanyById = createAsyncThunk(
  "company/fetchCompanyById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/companies/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch company"
      );
    }
  }
);

// ==========================
// GET MY COMPANY (RECRUITER)
// ==========================
export const fetchMyCompany = createAsyncThunk(
  "company/fetchMyCompany",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/companies/my-company");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch your company"
      );
    }
  }
);

// ==========================
// UPDATE COMPANY
// ==========================
export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (
    {
      id,
      updatedData,
    }: {
      id: string;
      updatedData: {
        name?: string;
        description?: string;
        website?: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.put(`/companies/${id}`, updatedData);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Company update failed"
      );
    }
  }
);

// ==========================
// DELETE COMPANY
// ==========================
export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/companies/${id}`);
      return { id, ...data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Company deletion failed"
      );
    }
  }
);