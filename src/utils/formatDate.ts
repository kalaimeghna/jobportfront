export const formatDateTime = (
  date: string | Date
): string => {
  if (!date) return "";

  const formattedDate = new Date(date);

  if (isNaN(formattedDate.getTime())) {
    return "Invalid Date";
  }

  return formattedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};