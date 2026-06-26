import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// ==========================
// REGISTER USER
// ==========================
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", userData);

      // optional: store token
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// ==========================
// LOGIN USER
// ==========================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/login", userData);

      // store token
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// ==========================
// GET CURRENT USER
// ==========================
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/auth/me");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// ==========================
// LOGOUT USER
// ==========================
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    localStorage.removeItem("token");
    return true;
  }
);