import axiosInstance from "./axios";

/* ============================
   TYPES
============================ */

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "jobseeker" | "employer";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
}

/* ============================
   AUTH APIs
============================ */

// Register User
export const registerUser = async (
  data: RegisterData
) => {
  const response = await axiosInstance.post(
    "/auth/register",
    data
  );

  return response.data;
};

// Login User
export const loginUser = async (
  data: LoginData
) => {
  const response = await axiosInstance.post(
    "/auth/login",
    data
  );

  if (response.data.token) {
    localStorage.setItem(
      "token",
      response.data.token
    );
  }

  return response.data;
};

// Logout User
export const logoutUser = async () => {
  localStorage.removeItem("token");

  const response = await axiosInstance.post(
    "/auth/logout"
  );

  return response.data;
};

// Get Current User
export const getCurrentUser = async () => {
  const response = await axiosInstance.get(
    "/auth/me"
  );

  return response.data;
};

// Forgot Password
export const forgotPassword = async (
  data: ForgotPasswordData
) => {
  const response = await axiosInstance.post(
    "/auth/forgot-password",
    data
  );

  return response.data;
};

// Reset Password
export const resetPassword = async (
  token: string,
  data: ResetPasswordData
) => {
  const response = await axiosInstance.post(
    `/auth/reset-password/${token}`,
    data
  );

  return response.data;
};

// Change Password
export const changePassword = async (
  data: ChangePasswordData
) => {
  const response = await axiosInstance.put(
    "/auth/change-password",
    data
  );

  return response.data;
};

// Refresh User Profile
export const refreshUser = async () => {
  const response = await axiosInstance.get(
    "/auth/me"
  );

  return response.data;
};