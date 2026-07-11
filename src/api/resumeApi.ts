import axiosInstance, { axiosFormData } from "./axios";

/* =========================
   TYPES
========================= */

export interface Resume {
  _id: string;
  user: string;
  file: string;
  title: string;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

/* =========================
   RESUME APIs
========================= */

/** * Upload Resume 
 * Uses the specialized multipart instance for file handling
 */
export const uploadResume = async (
  formData: FormData
): Promise<ApiResponse<Resume>> => {
  const { data } = await axiosFormData.post("/resumes", formData);
  return data;
};

/** Get All Resumes for the logged-in user */
export const getMyResumes = async (): Promise<ApiResponse<Resume[]>> => {
  const { data } = await axiosInstance.get("/resumes/my");
  return data;
};

/** Get specific resume by ID */
export const getResumeById = async (
  resumeId: string
): Promise<ApiResponse<Resume>> => {
  const { data } = await axiosInstance.get(`/resumes/${resumeId}`);
  return data;
};

/** Delete a resume */
export const deleteResume = async (
  resumeId: string
): Promise<ApiResponse<{ message: string }>> => {
  const { data } = await axiosInstance.delete(`/resumes/${resumeId}`);
  return data;
};