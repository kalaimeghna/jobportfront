export interface Resume {
  _id: string;

  fileName: string;
  fileUrl: string;

  publicId?: string;

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

export interface UploadResumePayload {
  resume: File;
}

export interface UpdateResumePayload {
  resumeId: string;
  resume: File;
}

export interface ResumeResponse {
  success: boolean;
  message?: string;

  resume: Resume;
}

export interface ResumesResponse {
  success: boolean;
  count: number;

  resumes: Resume[];
}

export interface ResumeState {
  resumes: Resume[];

  resume: Resume | null;

  loading: boolean;

  error: string | null;
}