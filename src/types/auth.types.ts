export type UserRole =
  | "jobseeker"
  | "employer"
  | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;

  phone?: string;
  location?: string;

  profilePicture?: string;

  skills?: string[];
  experience?: string;
  education?: string;

  bio?: string;

  resume?: string;

  company?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;

  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;

  token: string | null;

  loading: boolean;

  error: string | null;

  isAuthenticated: boolean;
}