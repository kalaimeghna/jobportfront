/**
 * Formats a date string or Date object into a readable string (e.g., 04 Jul 2026).
 * Handles null/undefined and invalid date objects gracefully.
 */
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return "";

  const d = new Date(date);

  // Check if the date is valid
  if (isNaN(d.getTime())) {
    return "Invalid Date";
  }

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};