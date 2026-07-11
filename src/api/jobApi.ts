import axiosInstance from "./axios";

/* =========================
   TYPES
========================= */

export interface JobData {
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  location: string;
  jobType: "full-time" | "part-time" | "contract" | "freelance";
  experienceLevel: "entry" | "mid" | "senior";
}

export interface UpdateJobData extends Partial<JobData> {
  status?: "active" | "closed";
}

export interface Job extends JobData {
  _id: string;
  company: string;
  employer: string;
  status: "active" | "closed";
  createdAt: string;
}

/* =========================
   JOB APIs
========================= */

/** Create a new job post */
export const createJob = async (jobData: JobData): Promise<Job> => {
  const { data } = await axiosInstance.post("/jobs", jobData);
  return data.data;
};

/** Get all jobs (with search/filter/pagination) */
export const getJobs = async (keyword = "", page = 1) => {
  const { data } = await axiosInstance.get("/jobs", {
    params: { keyword, page },
  });
  return data;
};

/** Get a single job by ID */
export const getJobById = async (jobId: string): Promise<Job> => {
  const { data } = await axiosInstance.get(`/jobs/${jobId}`);
  return data.data;
};

/** Update a job post */
export const updateJob = async (jobId: string, jobData: UpdateJobData): Promise<Job> => {
  const { data } = await axiosInstance.put(`/jobs/${jobId}`, jobData);
  return data.data;
};

/** Delete a job post */
export const deleteJob = async (jobId: string): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete(`/jobs/${jobId}`);
  return data;
};

/** Get jobs created by the authenticated employer */
export const getEmployerJobs = async (): Promise<Job[]> => {
  const { data } = await axiosInstance.get("/jobs/employer");
  return data.data;
};