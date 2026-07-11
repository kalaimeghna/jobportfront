import { 
  ALLOWED_RESUME_TYPES, 
  MAX_RESUME_SIZE, 
  ALLOWED_IMAGE_TYPES, 
  MAX_PROFILE_IMAGE_SIZE 
} from "../../src/utils/constants";

/**
 * Basic String/Format Validations
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  // Matches 10-15 digit phone numbers
  const phoneRegex = /^\+?[1-9]\d{9,14}$/;
  return phoneRegex.test(phone);
};

export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2;
};

/**
 * Resume Validation
 */
export const validateResume = (file: File): { valid: boolean; message: string } => {
  if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
    return {
      valid: false,
      message: "Only PDF, DOC, and DOCX files are allowed.",
    };
  }

  if (file.size > MAX_RESUME_SIZE) {
    const sizeInMB = MAX_RESUME_SIZE / (1024 * 1024);
    return {
      valid: false,
      message: `File size must be less than ${sizeInMB}MB.`,
    };
  }

  return { valid: true, message: "Valid file." };
};

/**
 * Image Validation
 */
export const validateImage = (file: File): { valid: boolean; message: string } => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      message: "Only JPG, PNG, and WEBP images are allowed.",
    };
  }

  if (file.size > MAX_PROFILE_IMAGE_SIZE) {
    const sizeInMB = MAX_PROFILE_IMAGE_SIZE / (1024 * 1024);
    return {
      valid: false,
      message: `Image size must be less than ${sizeInMB}MB.`,
    };
  }

  return { valid: true, message: "Valid image." };
};

/**
 * Form Validation Helper
 */
export const validateForm = (data: Record<string, any>): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (data.email && !isValidEmail(data.email)) errors.email = "Invalid email format.";
  if (data.name && !isValidName(data.name)) errors.name = "Name must be at least 2 characters.";
  if (data.phone && !isValidPhone(data.phone)) errors.phone = "Invalid phone number format.";

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};