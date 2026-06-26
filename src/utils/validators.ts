// ================================
// Email Validation
// ================================

export const isValidEmail = (
  email: string
): boolean => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

// ================================
// Password Validation
// Minimum 6 characters
// ================================

export const isValidPassword = (
  password: string
): boolean => {
  return password.trim().length >= 6;
};

// ================================
// Phone Number Validation
// Supports Indian 10-digit numbers
// ================================

export const isValidPhone = (
  phone: string
): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;

  return phoneRegex.test(phone);
};

// ================================
// URL Validation
// ================================

export const isValidUrl = (
  url: string
): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ================================
// Required Field Validation
// ================================

export const isRequired = (
  value: string
): boolean => {
  return value.trim().length > 0;
};

// ================================
// Name Validation
// Minimum 2 characters
// ================================

export const isValidName = (
  name: string
): boolean => {
  return name.trim().length >= 2;
};

// ================================
// Resume Validation
// ================================

export const validateResume = (
  file: File
): {
  valid: boolean;
  message: string;
} => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message:
        "Only PDF, DOC, and DOCX files are allowed.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      message:
        "File size must be less than 5MB.",
    };
  }

  return {
    valid: true,
    message: "Valid file.",
  };
};

// ================================
// Image Validation
// ================================

export const validateImage = (
  file: File
): {
  valid: boolean;
  message: string;
} => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message:
        "Only JPG, PNG, and WEBP images are allowed.",
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      message:
        "Image size must be less than 2MB.",
    };
  }

  return {
    valid: true,
    message: "Valid image.",
  };
};

// ================================
// Login Form Validation
// ================================

export const validateLoginForm = (
  email: string,
  password: string
): string[] => {
  const errors: string[] = [];

  if (!isValidEmail(email)) {
    errors.push("Please enter a valid email.");
  }

  if (!isValidPassword(password)) {
    errors.push(
      "Password must be at least 6 characters."
    );
  }

  return errors;
};

// ================================
// Register Form Validation
// ================================

export const validateRegisterForm = (
  name: string,
  email: string,
  password: string
): string[] => {
  const errors: string[] = [];

  if (!isValidName(name)) {
    errors.push(
      "Name must be at least 2 characters."
    );
  }

  if (!isValidEmail(email)) {
    errors.push("Please enter a valid email.");
  }

  if (!isValidPassword(password)) {
    errors.push(
      "Password must be at least 6 characters."
    );
  }

  return errors;
};