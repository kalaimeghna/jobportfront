import axiosInstance from "./axios"

export interface ApplyJobData {
  jobId: string;
  resumeId: string;
}

export interface UpdateStatusData {
  status:
    | "applied"
    | "reviewing"
    | "interviewed"
    | "selected"
    | "rejected";
}

// Apply for a job
export const applyJob = async (data: ApplyJobData) => {
  const response = await axiosInstance.post(
    "/applications",
    data
  );

  return response.data;
};

// Get logged-in user's applications
export const getMyApplications = async () => {
  const response = await axiosInstance.get(
    "/applications/my"
  );

  return response.data;
};

// Get applicants for a specific job (Employer)
export const getJobApplicants = async (
  jobId: string
) => {
  const response = await axiosInstance.get(
    `/applications/job/${jobId}`
  );

  return response.data;
};

// Update application status (ATS)
export const updateApplicationStatus = async (
  applicationId: string,
  data: UpdateStatusData
) => {
  const response = await axiosInstance.put(
    `/applications/${applicationId}/status`,
    data
  );

  return response.data;
};

// Get single application
export const getApplicationById = async (
  applicationId: string
) => {
  const response = await axiosInstance.get(
    `/applications/${applicationId}`
  );

  return response.data;
};

// Withdraw application
export const deleteApplication = async (
  applicationId: string
) => {
  const response = await axiosInstance.delete(
    `/applications/${applicationId}`
  );

  return response.data;
};