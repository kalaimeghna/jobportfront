import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// API Base URL from environment variables
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");


/* ======================================================
   MAIN JSON AXIOS INSTANCE
====================================================== */

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000,
});


/* ======================================================
   FORM DATA AXIOS INSTANCE
   (Resume / Image Uploads)
====================================================== */

export const axiosFormData = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
  timeout: 60000,
});


/* ======================================================
   ATTACH JWT TOKEN
====================================================== */

const attachToken = (
  config: InternalAxiosRequestConfig
) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN FROM STORAGE:", token);

  if (token) {
    config.headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  return config;
};


/* ======================================================
   REQUEST INTERCEPTORS
====================================================== */

axiosInstance.interceptors.request.use(
  attachToken,
  (error) => Promise.reject(error)
);


axiosFormData.interceptors.request.use(
  attachToken,
  (error) => Promise.reject(error)
);



/* ======================================================
   RESPONSE INTERCEPTOR
====================================================== */

axiosInstance.interceptors.response.use(
  (response) => response,

  (error: AxiosError<any>) => {

    if (error.response?.status === 401) {

      console.log(
        "========== 401 UNAUTHORIZED =========="
      );

      console.log(
        "API:",
        error.config?.url
      );

      console.log(
        "Response:",
        error.response.data
      );

      console.log(
        "Sent Authorization:",
        error.config?.headers?.Authorization
      );

      console.log(
        "======================================"
      );


      // Temporarily disabled for debugging
      // Do not remove token while checking issue

      /*
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      */
    }


    return Promise.reject(error);
  }
);



export default axiosInstance;