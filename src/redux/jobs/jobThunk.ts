import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// ==========================
// CREATE JOB (Recruiter)
// ==========================
export const createJob = createAsyncThunk(
  "job/createJob",
  async (
    jobData: {
      title: string;
      description: string;
      location?: string;
      salary?: string;
      type?: "full-time" | "part-time" | "internship";
      companyId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/jobs", jobData);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Job creation failed"
      );
    }
  }
);

// ==========================
// GET ALL JOBS (PUBLIC)
// ==========================
export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/jobs");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch jobs"
      );
    }
  }
);

// ==========================
// GET SINGLE JOB BY ID
// ==========================
export const fetchJobById = createAsyncThunk(
  "job/fetchJobById",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/jobs/${id}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch job"
      );
    }
  }
);

// ==========================
// GET MY JOBS (Recruiter)
// ==========================
export const fetchMyJobs = createAsyncThunk(
  "job/fetchMyJobs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/jobs/my-jobs");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch your jobs"
      );
    }
  }
);

// ==========================
// UPDATE JOB
// ==========================
export const updateJob = createAsyncThunk(
  "job/updateJob",
  async (
    {
      id,
      updatedData,
    }: {
      id: string;
      updatedData: {
        title?: string;
        description?: string;
        location?: string;
        salary?: string;
        type?: "full-time" | "part-time" | "internship";
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.put(`/jobs/${id}`, updatedData);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Job update failed"
      );
    }
  }
);

// ==========================
// DELETE JOB
// ==========================
export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/jobs/${id}`);
      return { id, ...data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Job deletion failed"
      );
    }
  }
);