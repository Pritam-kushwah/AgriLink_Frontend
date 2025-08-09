import apiService from './api';

export const marketService = {
  getMarketplace: () => apiService.get('/market/marketplace'),
  getMarketStats: () => apiService.get('/market/stats'),
};