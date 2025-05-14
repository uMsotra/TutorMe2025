// src/utils/formatUtils.js
/**
 * Format a price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (default: 'ZAR')
 * @returns {string} Formatted price with currency symbol
 */
export const formatPrice = (price, currency = 'ZAR') => {
  if (price == null) return '';
  
  const currencySymbols = {
    ZAR: 'R',
    USD: '$',
    EUR: '€',
    GBP: '£'
  };
  
  const symbol = currencySymbols[currency] || currency;
  
  return `${symbol}${price.toFixed(2)}`;
};

/**
 * Format a phone number for display
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // Format based on length
  if (digitsOnly.length === 10) {
    // Regular South African number (e.g., 0XX XXX XXXX)
    return digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '0$1 $2 $3');
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('27')) {
    // South African number with country code (e.g., +27 XX XXX XXXX)
    return '+' + digitsOnly.replace(/(\d{2})(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4');
  } else {
    // Return as is for other formats
    return phoneNumber;
  }
};

/**
 * Truncate text to a specific length and add ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

/**
 * Format a file size in bytes to a human-readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} Human-readable file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Convert string to title case
 * @param {string} str - String to convert
 * @returns {string} Title cased string
 */
export const toTitleCase = (str) => {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format a duration in minutes to a human-readable string
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration string
 */
export const formatDuration = (minutes) => {
  if (!minutes && minutes !== 0) return '';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins} min${mins !== 1 ? 's' : ''}`;
  } else if (mins === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else {
    return `${hours} hour${hours !== 1 ? 's' : ''} ${mins} min${mins !== 1 ? 's' : ''}`;
  }
};