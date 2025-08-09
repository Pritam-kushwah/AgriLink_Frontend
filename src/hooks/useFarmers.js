import { useState, useEffect } from 'react';
import { farmerService } from '../services/farmerService';

export const useFarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFarmers = async () => {
    try {
      setLoading(true);
      const data = await farmerService.getAllFarmers();
      setFarmers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching farmers:', err);
    } finally {
      setLoading(false);
    }
  };

  const addFarmer = async (farmerData) => {
    try {
      const newFarmer = await farmerService.createFarmer(farmerData);
      setFarmers(prev => [...prev, newFarmer]);
      return newFarmer;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateFarmer = async (id, farmerData) => {
    try {
      const updatedFarmer = await farmerService.updateFarmer(id, farmerData);
      setFarmers(prev => 
        prev.map(farmer => farmer.id === id ? updatedFarmer : farmer)
      );
      return updatedFarmer;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteFarmer = async (id) => {
    try {
      await farmerService.deleteFarmer(id);
      setFarmers(prev => prev.filter(farmer => farmer.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  return {
    farmers,
    loading,
    error,
    fetchFarmers,
    addFarmer,
    updateFarmer,
    deleteFarmer,
  };
};