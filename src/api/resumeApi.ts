import axiosInstance from "./axios";

export interface Resume {
  _id: string;
  user: string;
  file: string;
  title: string;
  createdAt: string;
}

export interface ResumeResponse {
  success: boolean;
  data: Resume;
}

// Upload Resume
export const uploadResume = async (
  formData: FormData
): Promise<ResumeResponse> => {
  const response = await axiosInstance.post(
    "/resumes",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get My Resumes
export const getMyResumes = async () => {
  const response = await axiosInstance.get(
    "/resumes/my"
  );

  return response.data;
};

// Get Resume By ID
export const getResumeById = async (
  resumeId: string
) => {
  const response = await axiosInstance.get(
    `/resumes/${resumeId}`
  );

  return response.data;
};

// Delete Resume
export const deleteResume = async (
  resumeId: string
) => {
  const response = await axiosInstance.delete(
    `/resumes/${resumeId}`
  );

  return response.data;
};