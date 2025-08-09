import apiService from './api';

export const produceService = {
  getAllProduce: () => apiService.get('/produce'),
  getProduceById: (id) => apiService.get(`/produce/${id}`),
  addProduce: (produceData) => apiService.post('/produce', produceData),
  getProduceByFarmer: (farmerId) => apiService.get(`/produce/farmer/${farmerId}`),
  getAvailableProduce: () => apiService.get('/produce/available'),
  getProduceByCropType: (cropType) => apiService.get(`/produce/crop/${cropType}`),
  updateProduceStatus: (id, status) => 
    apiService.put(`/produce/${id}/status?status=${status}`),
};