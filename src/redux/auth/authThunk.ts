import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";
import { User } from "../../types/auth.types";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "jobseeker" | "employer";
}

interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

// ==========================
// REGISTER USER
// ==========================
export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterData,
  { rejectValue: string }
>(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/register", userData);
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
export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginData,
  { rejectValue: string }
>(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", userData);
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
export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/auth/me");

      // Backend returns: { success: true, data: user }
      return data.data;
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
export const logoutUser = createAsyncThunk<
  boolean,
  void,
  { rejectValue: string }
>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await API.get("/auth/logout");

      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);