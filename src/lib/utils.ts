import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format bytes to human readable string
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Format date to human readable string
export function formatDate(date: string | number | Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Get severity color
export function getSeverityColor(severity: string) {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'text-red-500 dark:text-red-400';
    case 'high':
      return 'text-orange-500 dark:text-orange-400';
    case 'medium':
      return 'text-yellow-500 dark:text-yellow-400';
    case 'low':
      return 'text-blue-500 dark:text-blue-400';
    default:
      return 'text-gray-500 dark:text-gray-400';
  }
}

// Generate random ID
export function generateRandomId(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}
