import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// ==========================
// APPLY FOR A JOB
// ==========================
export const applyJob = createAsyncThunk(
  "applications/applyJob",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/applications/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Job apply failed"
      );
    }
  }
);

// ==========================
// GET ALL APPLICATIONS
// ==========================
export const fetchApplications = createAsyncThunk(
  "application/fetchApplications",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/applications");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch applications"
      );
    }
  }
);

// ==========================
// GET APPLICATION BY JOB
// ==========================
export const fetchApplicationsByJob = createAsyncThunk(
  "application/fetchByJob",
  async (jobId: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/applications/job/${jobId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch job applications"
      );
    }
  }
);

// ==========================
// UPDATE APPLICATION STATUS
// ==========================
export const updateApplicationStatus = createAsyncThunk(
  "application/updateStatus",
  async (
    { id, status }: { id: string; status: "pending" | "accepted" | "rejected" },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.patch(`/applications/${id}`, {
        status,
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Status update failed"
      );
    }
  }
);