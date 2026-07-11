import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";
import { Application, ApplicationStatus } from "./applicationSlice";

// ==========================
// APPLY FOR A JOB
// ==========================
export const applyJob = createAsyncThunk<Application, FormData, { rejectValue: string }>(
  "applications/applyJob",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.post<{ application: Application }>("/applications/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.application;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Job application failed");
    }
  }
);

// ==========================
// GET ALL APPLICATIONS
// ==========================
export const fetchApplications = createAsyncThunk<Application[], void, { rejectValue: string }>(
  "applications/fetchApplications",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get<{ applications: Application[] }>("/applications");
      return data.applications;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch applications");
    }
  }
);

// ==========================
// GET APPLICATIONS BY JOB
// ==========================
export const fetchApplicationsByJob = createAsyncThunk<Application[], string, { rejectValue: string }>(
  "applications/fetchByJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const { data } = await API.get<{ applications: Application[] }>(`/applications/job/${jobId}`);
      return data.applications;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch job applications");
    }
  }
);

// ==========================
// UPDATE APPLICATION STATUS
// ==========================
export const updateApplicationStatus = createAsyncThunk<
  Application,
  { id: string; status: ApplicationStatus },
  { rejectValue: string }
>(
  "applications/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await API.patch<{ application: Application }>(`/applications/${id}`, { status });
      return data.application;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Status update failed");
    }
  }
);