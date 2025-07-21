import { format } from "date-fns";

const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "HH:mm a - dd/MM").toLowerCase();
};

const formatDateGroup = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "MMMM, d");
};

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export { formatDateGroup, formatDateTime, sleep };
