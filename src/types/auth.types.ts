/**
 * User Roles
 * Used for Role-Based Access Control (RBAC).
 */
export type UserRole = "jobseeker" | "employer";

/**
 * Basic User information
 * Mapped to match your Mongoose User schema structure.
 */
export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  createdAt: string;
}

/**
 * Authentication Response from API
 */
export interface AuthResponse {
  user: User;
  token: string;
  success: boolean;
  message?: string;
}

/**
 * Payload for Registration
 */
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

/**
 * Payload for Login
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Authentication State for Redux/Context
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}