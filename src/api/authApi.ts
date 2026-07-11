import axiosInstance from "./axios";

/* ============================
    TYPES
============================ */

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
  user?: T;
}

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

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "jobseeker" | "employer" | "admin";
  phone?: string;
  location?: string;
  headline?: string;
  profilePicture?: string;
}

/* ============================
    AUTH API SERVICES
============================ */

/**
 * Register a new user
 */
export const registerUser = async (data: RegisterData): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

/**
 * Login user and persist token/user data to localStorage
 */
export const loginUser = async (data: LoginData): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.post("/auth/login", data);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  if (response.data.user) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

/**
 * Logout user and clear local storage
 */
export const logoutUser = async (): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.get("/auth/logout");
    return response.data;
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

/**
 * Fetch the currently authenticated user
 */
export const getMe = async (): Promise<User> => {
  const response = await axiosInstance.get("/auth/me");
  return response.data.data;
};

/**
 * Request a password reset email
 */
export const forgotPassword = async (data: ForgotPasswordData): Promise<ApiResponse> => {
  const response = await axiosInstance.post("/auth/forgot-password", data);
  return response.data;
};

/**
 * Reset password using a token
 */
export const resetPassword = async (token: string, data: ResetPasswordData): Promise<ApiResponse> => {
  const response = await axiosInstance.put(`/auth/reset-password/${token}`, data);
  return response.data;
};

/**
 * Change authenticated user's password
 */
export const changePassword = async (data: ChangePasswordData): Promise<ApiResponse> => {
  const response = await axiosInstance.put("/auth/change-password", data);
  return response.data;
};

/**
 * Update authenticated user's profile details
 */
export const updateProfile = async (data: Partial<User>): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.put("/auth/me", data);
  return response.data;
};