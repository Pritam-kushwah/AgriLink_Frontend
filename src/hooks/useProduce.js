import { useState, useEffect } from 'react';
import { produceService } from '../services/produceService';

export const useProduce = () => {
  const [produces, setProduces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduces = async () => {
    try {
      setLoading(true);
      const data = await produceService.getAllProduce();
      setProduces(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching produces:', err);
    } finally {
      setLoading(false);
    }
  };

  const addProduce = async (produceData) => {
    try {
      const newProduce = await produceService.addProduce(produceData);
      setProduces(prev => [...prev, newProduce]);
      return newProduce;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProduceStatus = async (id, status) => {
    try {
      await produceService.updateProduceStatus(id, status);
      setProduces(prev => 
        prev.map(produce => 
          produce.id === id ? { ...produce, status } : produce
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getProduceByFarmer = async (farmerId) => {
    try {
      const data = await produceService.getProduceByFarmer(farmerId);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getAvailableProduce = async () => {
    try {
      const data = await produceService.getAvailableProduce();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchProduces();
  }, []);

  return {
    produces,
    loading,
    error,
    fetchProduces,
    addProduce,
    updateProduceStatus,
    getProduceByFarmer,
    getAvailableProduce,
  };
};