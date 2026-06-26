/**
 * Save data to localStorage
 */
export const setLocalStorage = <T>(
  key: string,
  value: T
): void => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error(
      "Error saving to localStorage:",
      error
    );
  }
};

/**
 * Get data from localStorage
 */
export const getLocalStorage = <T>(
  key: string
): T | null => {
  try {
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    return JSON.parse(item) as T;
  } catch (error) {
    console.error(
      "Error reading from localStorage:",
      error
    );
    return null;
  }
};

/**
 * Remove item from localStorage
 */
export const removeLocalStorage = (
  key: string
): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(
      "Error removing from localStorage:",
      error
    );
  }
};

/**
 * Clear all localStorage
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(
      "Error clearing localStorage:",
      error
    );
  }
};

/**
 * Save Auth Token
 */
export const saveToken = (
  token: string
): void => {
  localStorage.setItem("token", token);
};

/**
 * Get Auth Token
 */
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

/**
 * Remove Auth Token
 */
export const removeToken = (): void => {
  localStorage.removeItem("token");
};