import axiosInstance from "./axios";

/* =========================
   TYPES
========================= */

export interface Resume {
  _id: string;
  fileUrl: string;
  originalName: string;
  uploadedAt: string;
}

export interface ResumeResponse {
  success: boolean;
  message: string;
  resume: Resume;
}

/* =========================
   RESUME APIs
========================= */

// Upload Resume
export const uploadResume = async (
  file: File
): Promise<ResumeResponse> => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await axiosInstance.post(
    "/resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get My Resume
export const getMyResume = async () => {
  const response = await axiosInstance.get(
    "/resume"
  );

  return response.data;
};

// Get Resume By ID
export const getResumeById = async (
  resumeId: string
) => {
  const response = await axiosInstance.get(
    `/resume/${resumeId}`
  );

  return response.data;
};

// Update Resume
export const updateResume = async (
  resumeId: string,
  file: File
) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await axiosInstance.put(
    `/resume/${resumeId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete Resume
export const deleteResume = async (
  resumeId: string
) => {
  const response = await axiosInstance.delete(
    `/resume/${resumeId}`
  );

  return response.data;
};

// Download Resume
export const downloadResume = async (
  resumeId: string
) => {
  const response = await axiosInstance.get(
    `/resume/download/${resumeId}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};

// View Resume
export const viewResume = async (
  resumeId: string
) => {
  const response = await axiosInstance.get(
    `/resume/view/${resumeId}`
  );

  return response.data;
};