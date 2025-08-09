import { PRICE_RANGES } from './constants';

/**
 * Debounce function to limit API calls
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Calculate days ago from date
 */
export const getDaysAgo = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffTime = Math.abs(now - targetDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Filter products based on criteria
 */
export const filterProducts = (products, filters) => {
  let filtered = [...products];

  // Search filter
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(product => 
      product.cropType.toLowerCase().includes(search) ||
      product.farmer?.name.toLowerCase().includes(search) ||
      product.farmer?.location.toLowerCase().includes(search)
    );
  }

  // Crop type filter
  if (filters.cropType) {
    filtered = filtered.filter(product => product.cropType === filters.cropType);
  }

  // Location filter
  if (filters.location) {
    filtered = filtered.filter(product => product.farmer?.location === filters.location);
  }

  // Price range filter
  if (filters.priceRange) {
    const [min, max] = filters.priceRange.split('-');
    if (max === '+') {
      filtered = filtered.filter(product => product.pricePerUnit >= parseInt(min));
    } else {
      filtered = filtered.filter(product => 
        product.pricePerUnit >= parseInt(min) && product.pricePerUnit <= parseInt(max)
      );
    }
  }

  // Status filter
  if (filters.status) {
    filtered = filtered.filter(product => product.status === filters.status);
  }

  return filtered;
};

/**
 * Sort products based on criteria
 */
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt || b.harvestDate) - new Date(a.createdAt || a.harvestDate));
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt || a.harvestDate) - new Date(b.createdAt || b.harvestDate));
    case 'price-low':
      return sorted.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
    case 'price-high':
      return sorted.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
    case 'quantity-high':
      return sorted.sort((a, b) => b.quantity - a.quantity);
    case 'quantity-low':
      return sorted.sort((a, b) => a.quantity - b.quantity);
    default:
      return sorted;
  }
};

/**
 * Get unique locations from farmers
 */
export const getUniqueLocations = (farmers) => {
  return [...new Set(farmers.map(farmer => farmer.location).filter(Boolean))];
};

/**
 * Get unique crop types from produces
 */
export const getUniqueCropTypes = (produces) => {
  return [...new Set(produces.map(produce => produce.cropType).filter(Boolean))];
};

/**
 * Calculate market statistics
 */
export const calculateMarketStats = (produces) => {
  const available = produces.filter(p => p.status === 'AVAILABLE');
  const totalValue = produces.reduce((sum, p) => sum + (p.quantity * p.pricePerUnit), 0);
  const avgPrice = produces.length > 0 ? 
    produces.reduce((sum, p) => sum + p.pricePerUnit, 0) / produces.length : 0;
  
  return {
    total: produces.length,
    available: available.length,
    sold: produces.filter(p => p.status === 'SOLD').length,
    reserved: produces.filter(p => p.status === 'RESERVED').length,
    totalValue,
    avgPrice: Math.round(avgPrice)
  };
};

/**
 * Check if produce is fresh (within 7 days)
 */
export const isFresh = (harvestDate) => {
  const days = getDaysAgo(harvestDate);
  return days <= 7;
};

/**
 * Get freshness indicator
 */
export const getFreshnessIndicator = (harvestDate) => {
  const days = getDaysAgo(harvestDate);
  
  if (days === 0) return { label: 'Today', color: 'green' };
  if (days <= 3) return { label: `${days}d ago`, color: 'green' };
  if (days <= 7) return { label: `${days}d ago`, color: 'yellow' };
  return { label: `${days}d ago`, color: 'red' };
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Convert file size to readable format
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};