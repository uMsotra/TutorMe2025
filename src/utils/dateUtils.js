// src/utils/dateUtils.js
/**
 * Format a date as a human-readable string (e.g., "May 15, 2025")
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format a time string (e.g., "14:00" to "2:00 PM")
 * @param {string} timeStr - Time string in 24-hour format (e.g., "14:00")
 * @returns {string} Formatted time string in 12-hour format
 */
export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  
  const [hours, minutes] = timeStr.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * Get day of week from a date object or string
 * @param {Date|string} date - The date to get the day of week from
 * @returns {string} Day of week (e.g., "monday", "tuesday", etc.)
 */
export const getDayOfWeek = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Fix: use 'long' instead of 'lowercase' and then convert to lowercase
  return dateObj.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
};

/**
 * Check if a date is in the past
 * @param {Date|string} date - The date to check
 * @returns {boolean} True if the date is in the past
 */
export const isDatePast = (date) => {
  if (!date) return false;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  // Reset time to compare dates only
  today.setHours(0, 0, 0, 0);
  dateObj.setHours(0, 0, 0, 0);
  
  return dateObj < today;
};

/**
 * Get the next N days from a start date
 * @param {number} days - Number of days to get
 * @param {Date} startDate - Starting date (defaults to today)
 * @returns {Array<Date>} Array of Date objects
 */
export const getNextDays = (days, startDate = new Date()) => {
  const result = [];
  const start = new Date(startDate);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    result.push(date);
  }
  
  return result;
};

/**
 * Calculate the difference in days between two dates
 * @param {Date|string} dateA - First date
 * @param {Date|string} dateB - Second date
 * @returns {number} Difference in days
 */
export const daysBetween = (dateA, dateB) => {
  const a = typeof dateA === 'string' ? new Date(dateA) : dateA;
  const b = typeof dateB === 'string' ? new Date(dateB) : dateB;
  
  // Reset time to compare dates only
  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);
  
  const diffTime = Math.abs(b - a);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};