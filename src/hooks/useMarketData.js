import { useState, useEffect } from 'react';
import { marketService } from '../services/marketService';

export const useMarketData = () => {
  const [marketData, setMarketData] = useState([]);
  const [marketStats, setMarketStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarketplace = async () => {
    try {
      setLoading(true);
      const data = await marketService.getMarketplace();
      setMarketData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching marketplace data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMarketStats = async () => {
    try {
      const stats = await marketService.getMarketStats();
      setMarketStats(stats);
    } catch (err) {
      console.error('Error fetching market stats:', err);
    }
  };

  const getMarketTrends = () => {
    // Calculate trends from market data
    const trends = {};
    marketData.forEach(item => {
      if (!trends[item.cropType]) {
        trends[item.cropType] = {
          totalQuantity: 0,
          avgPrice: 0,
          count: 0,
        };
      }
      trends[item.cropType].totalQuantity += item.quantity;
      trends[item.cropType].avgPrice += item.pricePerUnit;
      trends[item.cropType].count += 1;
    });

    // Calculate average prices
    Object.keys(trends).forEach(cropType => {
      trends[cropType].avgPrice = trends[cropType].avgPrice / trends[cropType].count;
    });

    return trends;
  };

  const getRegionalDistribution = () => {
    const regional = {};
    marketData.forEach(item => {
      const location = item.farmer?.location || 'Unknown';
      if (!regional[location]) {
        regional[location] = {
          count: 0,
          totalValue: 0,
        };
      }
      regional[location].count += 1;
      regional[location].totalValue += item.quantity * item.pricePerUnit;
    });
    return regional;
  };

  useEffect(() => {
    fetchMarketplace();
    fetchMarketStats();
  }, []);

  return {
    marketData,
    marketStats,
    loading,
    error,
    fetchMarketplace,
    fetchMarketStats,
    getMarketTrends,
    getRegionalDistribution,
  };
};