import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// ==========================
// UPLOAD RESUME
// ==========================
export const uploadResume = createAsyncThunk(
  "resume/uploadResume",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/resumes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Resume upload failed"
      );
    }
  }
);

// ==========================
// GET USER RESUME
// ==========================
export const fetchResume = createAsyncThunk(
  "resume/fetchResume",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/resumes/my-resume");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch resume"
      );
    }
  }
);

// ==========================
// UPDATE RESUME
// ==========================
export const updateResume = createAsyncThunk(
  "resume/updateResume",
  async (
    formData: FormData,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.put("/resumes/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Resume update failed"
      );
    }
  }
);

// ==========================
// DELETE RESUME
// ==========================
export const deleteResume = createAsyncThunk(
  "resume/deleteResume",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.delete("/resumes/delete");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Resume deletion failed"
      );
    }
  }
);