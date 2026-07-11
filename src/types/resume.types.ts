/**
 * Resume Interface
 * The 'user' field links the resume to the Job Seeker.
 */
export interface Resume {
  _id: string;
  fileName: string;
  fileUrl: string;
  publicId?: string; // Essential for Cloudinary/S3 deletions
  fileSize?: number;
  fileType?: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  uploadedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Payload for uploading a new resume
 */
export interface UploadResumePayload {
  resume: File;
}

/**
 * Payload for updating an existing resume
 */
export interface UpdateResumePayload {
  resumeId: string;
  resume: File;
}

/**
 * API Response for a single resume
 */
export interface ResumeResponse {
  success: boolean;
  message?: string;
  resume: Resume;
}

/**
 * API Response for a list of resumes
 */
export interface ResumesResponse {
  success: boolean;
  count: number;
  resumes: Resume[];
}

/**
 * Global state for resumes
 */
export interface ResumeState {
  resumes: Resume[];
  resume: Resume | null;
  loading: boolean;
  error: string | null;
}