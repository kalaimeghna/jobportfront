/**
 * Application Status Union
 * Used across components, state, and payloads to ensure consistency.
 */
export type ApplicationStatus = 
  | "pending" 
  | "reviewing" 
  | "shortlisted" 
  | "rejected" 
  | "accepted";

/**
 * Applicant Profile Structure
 */
export interface Applicant {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

/**
 * Resume Document Structure
 */
export interface Resume {
  _id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt?: string;
}

/**
 * Main Application Interface
 * Represents a single job application in the system.
 */
export interface Application {
  _id: string;
  applicant: Applicant;
  job: {
    _id: string;
    title: string;
    company?: string;
  };
  resume?: Resume;
  coverLetter?: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Payload for creating a new application.
 */
export interface CreateApplicationPayload {
  jobId: string;
  resume?: File; 
  coverLetter?: string;
}

/**
 * Payload for updating an existing application's status.
 */
export interface UpdateApplicationStatusPayload {
  applicationId: string;
  status: ApplicationStatus;
}

/**
 * The structure of the global application state.
 */
export interface ApplicationState {
  applications: Application[];
  application: Application | null;
  loading: boolean;
  error: string | null;
}