import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// Assuming you have a Resume interface in your slice
export interface Resume {
  _id: string;
  url: string;
  filename: string;
}

// ==========================
// UPLOAD RESUME
// ==========================
export const uploadResume = createAsyncThunk<Resume, FormData, { rejectValue: string }>(
  "resume/uploadResume",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/resumes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Resume upload failed");
    }
  }
);

// ==========================
// GET USER RESUME
// ==========================
export const fetchResume = createAsyncThunk<Resume, void, { rejectValue: string }>(
  "resume/fetchResume",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/resumes/my-resume");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch resume");
    }
  }
);

// ==========================
// UPDATE RESUME
// ==========================
export const updateResume = createAsyncThunk<Resume, FormData, { rejectValue: string }>(
  "resume/updateResume",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await API.put("/resumes/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Resume update failed");
    }
  }
);

// ==========================
// DELETE RESUME
// ==========================
export const deleteResume = createAsyncThunk<void, void, { rejectValue: string }>(
  "resume/deleteResume",
  async (_, { rejectWithValue }) => {
    try {
      await API.delete("/resumes/delete");
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Resume deletion failed");
    }
  }
);