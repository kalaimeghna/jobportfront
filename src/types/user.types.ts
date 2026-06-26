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

  title?: string;
  bio?: string;

  skills?: string[];

  experience?: string;
  education?: string;

  linkedin?: string;
  github?: string;

  resume?: string;

  company?: {
    _id: string;
    name: string;
  };

  isVerified?: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;

  title?: string;
  bio?: string;

  skills?: string[];

  experience?: string;
  education?: string;

  linkedin?: string;
  github?: string;

  profilePicture?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface UserResponse {
  success: boolean;
  message?: string;

  user: User;
}

export interface UsersResponse {
  success: boolean;

  count: number;

  users: User[];
}

export interface UserState {
  users: User[];

  user: User | null;

  loading: boolean;

  error: string | null;
}