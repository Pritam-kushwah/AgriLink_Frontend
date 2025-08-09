/**
 * Format currency (Indian Rupees)
 */
export const formatCurrency = (amount, showSymbol = true) => {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
  
  return showSymbol ? formatted : `₹${formatted}`;
};

/**
 * Format large numbers (e.g., 100000 -> 1L)
 */
export const formatLargeNumber = (num) => {
  if (num >= 10000000) { // 1 crore
    return (num / 10000000).toFixed(1) + 'Cr';
  } else if (num >= 100000) { // 1 lakh
    return (num / 100000).toFixed(1) + 'L';
  } else if (num >= 1000) { // 1 thousand
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Format date to readable string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };
  
  return new Date(date).toLocaleDateString('en-IN', defaultOptions);
};

/**
 * Format date and time
 */
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now - target;
  
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return formatDate(date);
};

/**
 * Format phone number (Indian format)
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Format as +91 XXXXX XXXXX
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  
  // If already has country code
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  
  return phone;
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format quantity with unit
 */
export const formatQuantity = (quantity, unit) => {
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(quantity);
  
  return `${formatted} ${unit}`;
};

/**
 * Format farm size
 */
export const formatFarmSize = (size) => {
  if (!size) return 'Not specified';
  return `${size} acres`;
};

/**
 * Format address/location
 */
export const formatLocation = (location) => {
  if (!location) return 'Location not specified';
  return location.split(',').map(part => part.trim()).join(', ');
};

/**
 * Format status with proper casing
 */
export const formatStatus = (status) => {
  if (!status) return '';
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

/**
 * Format farmer experience
 */
export const formatExperience = (years) => {
  if (!years || years === 0) return 'New farmer';
  if (years === 1) return '1 year';
  return `${years} years`;
};

/**
 * Format crop types list
 */
export const formatCropTypes = (cropTypes) => {
  if (!cropTypes || cropTypes.length === 0) return 'No crops specified';
  if (cropTypes.length <= 3) return cropTypes.join(', ');
  return `${cropTypes.slice(0, 3).join(', ')} +${cropTypes.length - 3} more`;
};

/**
 * Format market value for display
 */
export const formatMarketValue = (value) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)} Crore`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)} Lakh`;
  } else if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }
  return formatCurrency(value);
};

/**
 * Format file name for display
 */
export const formatFileName = (fileName, maxLength = 20) => {
  if (!fileName || fileName.length <= maxLength) return fileName;
  
  const extension = fileName.split('.').pop();
  const name = fileName.substring(0, fileName.lastIndexOf('.'));
  const truncatedName = name.substring(0, maxLength - extension.length - 4) + '...';
  
  return `${truncatedName}.${extension}`;
};

/**
 * Format search results count
 */
export const formatSearchResults = (count, total, searchTerm = '') => {
  if (searchTerm) {
    return `Found ${count} of ${total} results for "${searchTerm}"`;
  }
  return `Showing ${count} of ${total} results`;
};

/**
 * Format validation error message
 */
export const formatValidationError = (field, type) => {
  const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
  
  switch (type) {
    case 'required':
      return `${fieldName} is required`;
    case 'email':
      return 'Please enter a valid email address';
    case 'phone':
      return 'Please enter a valid phone number';
    case 'min':
      return `${fieldName} must be greater than 0`;
    case 'max':
      return `${fieldName} exceeds maximum limit`;
    default:
      return `${fieldName} is invalid`;
  }
};

/**
 * Format API error message
 */
export const formatApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.status) {
    switch (error.response.status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'You are not authorized to perform this action.';
      case 403:
        return 'Access denied.';
      case 404:
        return 'Resource not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  }
  
  if (error.code === 'NETWORK_ERROR') {
    return 'Network error. Please check your connection.';
  }
  
  return error.message || 'Something went wrong. Please try again.';
};

/**
 * Format loading state message
 */
export const formatLoadingMessage = (action) => {
  const messages = {
    'loading': 'Loading...',
    'saving': 'Saving...',
    'deleting': 'Deleting...',
    'uploading': 'Uploading...',
    'fetching': 'Fetching data...',
    'updating': 'Updating...',
    'processing': 'Processing...'
  };
  
  return messages[action] || 'Please wait...';
};