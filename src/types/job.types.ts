/**
 * src/types/job.types.ts
 */

// --- User & Profile Interfaces ---
export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  experience: number;
  education: string;
  profilePicture?: string;
}

export interface UserUpdatePayload {
  name: string;
  phone: string;
  bio: string;
  skills: string[];
  experience: number;
  education: string;
}

// --- Company Interfaces ---
export interface Company {
  _id: string;
  companyName: string;
  email: string;
  website?: string;
  location?: string;
  industry?: string;
  description?: string;
  logo?: string;
  owner?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCompanyPayload {
  companyName: string;
  email: string;
  website?: string;
  location?: string;
  industry?: string;
  description?: string;
}

export interface UpdateCompanyPayload {
  companyId: string;
  companyName?: string;
  email?: string;
  website?: string;
  location?: string;
  industry?: string;
  description?: string;
  logo?: string | File;
}

export interface CompanyResponse {
  success: boolean;
  message?: string;
  company: Company;
}

export interface CompaniesResponse {
  success: boolean;
  count: number;
  companies: Company[];
}

export interface CompanyState {
  companies: Company[];
  company: Company | null;
  loading: boolean;
  error: string | null;
}

export interface EmployerProfileData extends Company {
  jobs: Job[];
}

// --- Job Interfaces ---
// NOTE: casing here MUST match whatever your backend actually sends.
// Your live API response used "Full-Time" (capital T) — update this
// union (and the backend model) so both sides agree. Also confirm
// which convention you want long-term and update the DB/schema to match.
export type JobType = 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship';

export interface Job {
  _id: string;
  title: string;
  description: string;
  // Real API responses observed this as a plain string (often "").
  // If requirements is meant to be a bullet list, the backend schema
  // and the job-creation form both need to change to actually store
  // an array. Left as string[] here ONLY if you've confirmed the
  // backend is fixed to match — otherwise change back to `string`.
  requirements: string[];
  salary: number;
  jobType: JobType;
  location: string;
  companyId: string;
  createdAt?: string;
}

export interface JobsResponse {
  success: boolean;
  count: number;
  data: Job[];
  message?: string;
}

export interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  loading: boolean;
  error: string | null;
}

export type ApplicationStatus =
  | 'Applied'
  | 'Interview'
  | 'Shortlisted'
  | 'Rejected'
  | 'Hired';

export interface UpdateStatusPayload {
  id: string;
  status: ApplicationStatus;
}

