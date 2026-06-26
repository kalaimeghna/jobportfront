export interface Applicant {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

export interface Resume {
  _id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt?: string;
}

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

  status:
    | "pending"
    | "reviewing"
    | "shortlisted"
    | "rejected"
    | "accepted";

  createdAt: string;
  updatedAt?: string;
}

export interface CreateApplicationPayload {
  jobId: string;
  resume?: File;
  coverLetter?: string;
}

export interface UpdateApplicationStatusPayload {
  applicationId: string;

  status:
    | "pending"
    | "reviewing"
    | "shortlisted"
    | "rejected"
    | "accepted";
}

export interface ApplicationState {
  applications: Application[];

  application: Application | null;

  loading: boolean;

  error: string | null;
}