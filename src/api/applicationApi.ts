import axiosInstance from "./axios";

export interface ApplyJobData {
  resume: string;
  coverLetter: string;
}

export interface UpdateStatusData {
  status:
    | "pending"
    | "shortlisted"
    | "accepted"
    | "rejected";
}

// Apply for a job
export const applyJob = async (
  jobId: string,
  data: ApplyJobData
) => {
  const response = await axiosInstance.post(
    `/applications/apply/${jobId}`,
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

// Get applicants for a specific job
export const getJobApplicants = async (
  jobId: string
) => {
  const response = await axiosInstance.get(
    `/applications/job/${jobId}`
  );

  return response.data;
};

// Update application status
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

// Get application by id
export const getApplicationById = async (
  applicationId: string
) => {
  const response = await axiosInstance.get(
    `/applications/${applicationId}`
  );

  return response.data;
};

// Delete application
export const deleteApplication = async (
  applicationId: string
) => {
  const response = await axiosInstance.delete(
    `/applications/${applicationId}`
  );

  return response.data;
};