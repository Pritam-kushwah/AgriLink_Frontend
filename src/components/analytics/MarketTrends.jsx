import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const MarketTrends = ({ marketData }) => {
  // Process data for trends
  const processTrendData = () => {
    const trends = {};
    marketData.forEach(item => {
      if (!trends[item.cropType]) {
        trends[item.cropType] = {
          name: item.cropType,
          totalQuantity: 0,
          avgPrice: 0,
          count: 0,
          totalValue: 0,
        };
      }
      trends[item.cropType].totalQuantity += item.quantity;
      trends[item.cropType].totalValue += item.quantity * item.pricePerUnit;
      trends[item.cropType].avgPrice += item.pricePerUnit;
      trends[item.cropType].count += 1;
    });

    return Object.values(trends).map(trend => ({
      ...trend,
      avgPrice: Math.round(trend.avgPrice / trend.count),
    })).sort((a, b) => b.totalValue - a.totalValue);
  };

  const trendData = processTrendData();
  const topCrops = trendData.slice(0, 6);

  // Calculate market insights
  const totalMarketValue = trendData.reduce((sum, item) => sum + item.totalValue, 0);
  const avgPrice = trendData.reduce((sum, item) => sum + item.avgPrice, 0) / trendData.length || 0;
  const mostPopularCrop = trendData[0];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Market Trends</h2>
        <Activity className="h-6 w-6 text-green-600" />
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">Market Value</span>
          </div>
          <p className="text-2xl font-bold text-green-900">₹{(totalMarketValue / 100000).toFixed(1)}L</p>
          <p className="text-xs text-green-600">Total inventory value</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Avg Price</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">₹{Math.round(avgPrice)}</p>
          <p className="text-xs text-blue-600">Per unit average</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Top Crop</span>
          </div>
          <p className="text-lg font-bold text-purple-900">{mostPopularCrop?.name || 'N/A'}</p>
          <p className="text-xs text-purple-600">Highest value crop</p>
        </div>
      </div>

      {/* Price Trends Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Prices by Crop</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topCrops}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip formatter={(value) => [`₹${value}`, 'Avg Price']} />
            <Bar dataKey="avgPrice" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quantity Distribution */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={topCrops}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip formatter={(value) => [value, 'Total Quantity']} />
            <Line type="monotone" dataKey="totalQuantity" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketTrends;