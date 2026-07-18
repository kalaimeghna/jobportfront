/**
 * src/types/job.types.ts
 */

// ======================================================
// USER TYPES
// ======================================================

export interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  experience: number;
  education: string;
  location?: string;
  headline?: string;
  profilePicture?: string;
}

export interface UserUpdatePayload {
  name: string;
  phone: string;
  bio: string;
  skills: string[];
  experience: number;
  education: string;
  location?: string;
  headline?: string;
  profilePicture?: string;
}

// ======================================================
// COMPANY TYPES
// ======================================================

export interface CompanyLogo {
  url: string;
  publicId?: string;
}

export interface CompanyOwner {
  _id: string;
  name: string;
  email: string;
}

export interface Company {
  _id: string;

  companyName: string;

  email: string;

  website?: string;

  location?: string;

  industry?: string;

  description?: string;

  phone?: string;

  companySize?: string;

  foundedYear?: number;

  logo?: CompanyLogo;

  owner?: CompanyOwner;

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
  phone?: string;
  companySize?: string;
  foundedYear?: number;
}

export interface UpdateCompanyPayload {
  companyId: string;

  companyName?: string;

  email?: string;

  website?: string;

  location?: string;

  industry?: string;

  description?: string;

  phone?: string;

  companySize?: string;

  foundedYear?: number;

  logo?: CompanyLogo | File;
}

export interface CompanyResponse {
  success: boolean;
  message?: string;
  data: Company;
}

export interface CompaniesResponse {
  success: boolean;
  count: number;
  data: Company[];
}

export interface CompanyState {
  companies: Company[];
  company: Company | null;
  loading: boolean;
  error: string | null;
}

// ======================================================
// JOB TYPES
// ======================================================

export type JobType =
  | "Full-Time"
  | "Part-Time"
  | "Contract"
  | "Internship"
  | "Remote";

export interface Job {
  _id: string;

  title: string;

  description: string;

  requirements: string[];

  location: string;

  jobType: JobType | string;

  salary?: number;

  salaryMin?: number;

  salaryMax?: number;

  experienceLevel?: string;

  status?: string;

  company?: Company;

  companyId?: string;

  createdBy?: string;

  applicationDeadline?: string;

  createdAt?: string;

  updatedAt?: string;
}

export interface EmployerProfileData extends Company {
  jobs?: Job[];
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

// ======================================================
// APPLICATION TYPES
// ======================================================

export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "interview"
  | "accepted"
  | "rejected";

export interface Application {
  _id: string;
  applicant: {
    _id: string;
    name: string;
    email: string;
  };
  job: Job;
  resumeUrl?: string;
  coverLetterUrl?: string;
  status: ApplicationStatus;
  createdAt: string;
}

export interface UpdateStatusPayload {
  id: string;
  status: ApplicationStatus;
}

// ======================================================
// RESUME TYPES
// ======================================================

export interface Resume {
  _id: string;
  resumeUrl: string;
  public_id?: string;
  createdAt?: string;
}

// ======================================================
// API RESPONSE TYPES
// ======================================================

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}