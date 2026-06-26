// ===============================
// API
// ===============================

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

// ===============================
// USER ROLES
// ===============================

export const USER_ROLES = {
  JOBSEEKER: "jobseeker",
  EMPLOYER: "employer",
  ADMIN: "admin",
} as const;

// ===============================
// JOB TYPES
// ===============================

export const JOB_TYPES = [
  "Full Time",
  "Part Time",
  "Internship",
  "Contract",
  "Remote",
] as const;

// ===============================
// APPLICATION STATUS
// ===============================

export const APPLICATION_STATUS = {
  PENDING: "pending",
  REVIEWING: "reviewing",
  SHORTLISTED: "shortlisted",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const;

// ===============================
// JOB STATUS
// ===============================

export const JOB_STATUS = {
  OPEN: "open",
  CLOSED: "closed",
} as const;

// ===============================
// PAGINATION
// ===============================

export const DEFAULT_PAGE = 1;

export const DEFAULT_LIMIT = 10;

export const JOBS_PER_PAGE = 12;

// ===============================
// FILE UPLOAD
// ===============================

export const MAX_RESUME_SIZE =
  5 * 1024 * 1024; // 5MB

export const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const MAX_PROFILE_IMAGE_SIZE =
  2 * 1024 * 1024; // 2MB

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

// ===============================
// LOCAL STORAGE KEYS
// ===============================

export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  THEME: "theme",
} as const;

// ===============================
// ROUTES
// ===============================

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  JOBS: "/jobs",
  JOB_DETAILS: "/jobs/:id",

  PROFILE: "/profile",
  UPDATE_PROFILE: "/profile/update",

  EMPLOYER_DASHBOARD: "/employer/dashboard",
  CREATE_JOB: "/employer/create-job",
  MY_JOBS: "/employer/jobs",

  ADMIN_DASHBOARD: "/admin",

  UPLOAD_RESUME: "/resume/upload",
} as const;

// ===============================
// COMPANY
// ===============================

export const DEFAULT_COMPANY_LOGO =
  "https://via.placeholder.com/150";

// ===============================
// USER
// ===============================

export const DEFAULT_AVATAR =
  "https://via.placeholder.com/150";

// ===============================
// CLOUDINARY
// ===============================

export const CLOUDINARY = {
  CLOUD_NAME:
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,

  UPLOAD_PRESET:
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
};

// ===============================
// APP
// ===============================

export const APP_NAME =
  "MERN Job Portal";

export const APP_DESCRIPTION =
  "Find jobs, hire talent, and grow your career.";