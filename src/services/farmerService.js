import apiService from './api';

export const farmerService = {
  getAllFarmers: () => apiService.get('/farmers'),
  getFarmerById: (id) => apiService.get(`/farmers/${id}`),
  createFarmer: (farmerData) => apiService.post('/farmers/register', farmerData),
  updateFarmer: (id, farmerData) => apiService.put(`/farmers/${id}`, farmerData),
  deleteFarmer: (id) => apiService.delete(`/farmers/${id}`),
  getFarmersByLocation: (location) => apiService.get(`/farmers/location/${location}`),
};