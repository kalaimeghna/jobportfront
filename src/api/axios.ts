import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// API Base URL from environment variables
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

// 1. Main JSON Instance
const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000,
});

// 2. Multipart Instance (For Resume Uploads)
export const axiosFormData = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
  timeout: 60000, // Longer timeout for file uploads
});

// Interceptor helper to attach tokens to both instances
const attachToken = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
};

// Apply Request Interceptors
axiosInstance.interceptors.request.use(attachToken, (error) => Promise.reject(error));
axiosFormData.interceptors.request.use(attachToken, (error) => Promise.reject(error));

// Apply Global Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    // Global 401 Unauthorized handling
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;