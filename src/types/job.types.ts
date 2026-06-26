export type JobType =
  | "Full Time"
  | "Part Time"
  | "Internship"
  | "Contract"
  | "Remote";

export interface CompanyInfo {
  _id: string;
  name: string;
  logo?: string;
}

export interface EmployerInfo {
  _id: string;
  name: string;
  email: string;
}

export interface Job {
  _id: string;

  title: string;
  description: string;

  company: CompanyInfo;

  employer?: EmployerInfo;

  location: string;

  salary: string;

  jobType: JobType;

  experience?: string;

  skills?: string[];

  vacancies?: number;

  requirements?: string[];

  responsibilities?: string[];

  benefits?: string[];

  status?: "open" | "closed";

  applicationDeadline?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface CreateJobPayload {
  title: string;
  description: string;

  company: string;

  location: string;

  salary: string;

  jobType: JobType;

  experience?: string;

  skills?: string[];

  vacancies?: number;

  requirements?: string[];

  responsibilities?: string[];

  benefits?: string[];

  applicationDeadline?: string;
}

export interface UpdateJobPayload {
  jobId: string;

  title?: string;
  description?: string;

  company?: string;

  location?: string;

  salary?: string;

  jobType?: JobType;

  experience?: string;

  skills?: string[];

  vacancies?: number;

  requirements?: string[];

  responsibilities?: string[];

  benefits?: string[];

  status?: "open" | "closed";

  applicationDeadline?: string;
}

export interface JobResponse {
  success: boolean;
  message?: string;

  job: Job;
}

export interface JobsResponse {
  success: boolean;

  count: number;

  jobs: Job[];
}

export interface JobState {
  jobs: Job[];

  job: Job | null;

  loading: boolean;

  error: string | null;
}