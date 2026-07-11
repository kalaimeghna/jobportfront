import axiosInstance, { axiosFormData } from "./axios";

/* ===========================
   TYPES
=========================== */

export interface Application {
  _id: string;
  job: any;
  applicant: any;
  resumeUrl: string;
  coverLetterUrl?: string;
  status: "pending" | "reviewed" | "interview" | "accepted" | "rejected";
  createdAt: string;
}

export interface UpdateStatusData {
  status: Application["status"];
}

/* ===========================
   APPLY FOR A JOB
=========================== */

export const applyJob = async (
  jobId: string,
  file: File,
  coverLetter?: string
): Promise<{ message: string; application: Application }> => {
  const formData = new FormData();

  formData.append("resume", file);

  if (coverLetter) {
    formData.append("coverLetter", coverLetter);
  }

  const { data } = await axiosFormData.post(
    `/applications/apply/${jobId}`,
    formData
  );

  return data;
};

/* ===========================
   GET MY APPLICATIONS
=========================== */

export const getMyApplications = async (): Promise<Application[]> => {
  const { data } = await axiosInstance.get("/applications/my");
  return data.data;
};

/* ===========================
   GET EMPLOYER APPLICATIONS
=========================== */

export const getEmployerApplications = async (): Promise<Application[]> => {
  const { data } = await axiosInstance.get(
    "/applications/employer/dashboard"
  );

  return data.data;
};

/* ===========================
   GET APPLICATIONS FOR A JOB
=========================== */

export const getJobApplicants = async (
  jobId: string
): Promise<Application[]> => {
  const { data } = await axiosInstance.get(
    `/applications/job/${jobId}`
  );

  return data.data;
};

/* ===========================
   UPDATE APPLICATION STATUS
=========================== */

export const updateApplicationStatus = async (
  applicationId: string,
  status: UpdateStatusData
): Promise<Application> => {
  const { data } = await axiosInstance.patch(
    `/applications/${applicationId}/status`,
    status
  );

  return data.data;
};

/* ===========================
   DELETE APPLICATION
=========================== */

export const deleteApplication = async (
  applicationId: string
): Promise<void> => {
  await axiosInstance.delete(`/applications/${applicationId}`);
};