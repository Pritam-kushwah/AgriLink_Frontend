export const API_BASE_URL = 'http://localhost:8080/api';

export const CROP_TYPES = [
  'Rice', 'Wheat', 'Corn', 'Tomatoes', 'Potatoes', 'Onions',
  'Carrots', 'Cabbage', 'Spinach', 'Beans', 'Peas', 'Mangoes',
  'Apples', 'Bananas', 'Oranges', 'Grapes', 'Cotton', 'Sugarcane',
  'Barley', 'Millet', 'Soybean', 'Groundnut', 'Mustard', 'Sesame'
];

export const UNITS = [
  'KG', 'QUINTAL', 'TON', 'PIECE', 'DOZEN', 'LITER', 'GRAM', 'BAG'
];

export const FARMER_STATUS = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  SUSPENDED: 'SUSPENDED'
};

export const PRODUCE_STATUS = {
  AVAILABLE: 'AVAILABLE',
  SOLD: 'SOLD',
  RESERVED: 'RESERVED',
  EXPIRED: 'EXPIRED'
};

export const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const PRICE_RANGES = [
  { label: '₹0 - ₹50', value: '0-50' },
  { label: '₹50 - ₹100', value: '50-100' },
  { label: '₹100 - ₹200', value: '100-200' },
  { label: '₹200 - ₹500', value: '200-500' },
  { label: '₹500+', value: '500+' }
];

export const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Quantity: High to Low', value: 'quantity-high' },
  { label: 'Quantity: Low to High', value: 'quantity-low' }
];

export const COLORS = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d'
  },
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6'
};

export const MESSAGES = {
  SUCCESS: {
    FARMER_ADDED: 'Farmer added successfully!',
    FARMER_UPDATED: 'Farmer updated successfully!',
    FARMER_DELETED: 'Farmer deleted successfully!',
    PRODUCE_ADDED: 'Produce added successfully!',
    PRODUCE_UPDATED: 'Produce updated successfully!',
    STATUS_UPDATED: 'Status updated successfully!'
  },
  ERROR: {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    VALIDATION: 'Please fill in all required fields.',
    UNAUTHORIZED: 'You are not authorized to perform this action.'
  },
  CONFIRM: {
    DELETE_FARMER: 'Are you sure you want to delete this farmer? This action cannot be undone.',
    DELETE_PRODUCE: 'Are you sure you want to delete this produce listing?',
    CHANGE_STATUS: 'Are you sure you want to change the status?'
  }
};