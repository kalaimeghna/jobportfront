import { STORAGE_KEYS } from "./constants";

/**
 * Save data to localStorage with error handling
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

/**
 * Get data from localStorage with generic type support
 */
export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

/**
 * Remove a specific item
 */
export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

/**
 * Clear all data from localStorage
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

// ===============================
// AUTH SPECIFIC HELPERS
// ===============================

export const saveToken = (token: string): void => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

export const removeToken = (): void => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

export const setUser = <T>(user: T): void => {
  setLocalStorage(STORAGE_KEYS.USER, user);
};

export const getUser = <T>(): T | null => {
  return getLocalStorage<T>(STORAGE_KEYS.USER);
};