import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Package } from 'lucide-react';
import MarketTrends from '../components/analytics/MarketTrends';
import ProductionSummary from '../components/analytics/ProductionSummary';
import RegionalDistribution from '../components/analytics/RegionalDistribution';
import { useMarketData } from '../hooks/useMarketData';
import { useFarmers } from '../hooks/useFarmers';
import { useProduce } from '../hooks/useProduce';

const AnalyticsPage = () => {
  const { marketData, marketStats } = useMarketData();
  const { farmers } = useFarmers();
  const { produces } = useProduce();
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate key metrics
  const totalFarmers = farmers.length;
  const totalProducts = produces.length;
  const availableProducts = produces.filter(p => p.status === 'AVAILABLE').length;
  const totalMarketValue = produces.reduce((sum, p) => sum + (p.quantity * p.pricePerUnit), 0);
  
  // Growth calculations (mock data for demonstration)
  const lastMonthFarmers = Math.floor(totalFarmers * 0.85);
  const lastMonthProducts = Math.floor(totalProducts * 0.78);
  const farmerGrowth = ((totalFarmers - lastMonthFarmers) / lastMonthFarmers * 100).toFixed(1);
  const productGrowth = ((totalProducts - lastMonthProducts) / lastMonthProducts * 100).toFixed(1);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'trends', label: 'Market Trends', icon: TrendingUp },
    { id: 'production', label: 'Production', icon: Package },
    { id: 'regional', label: 'Regional', icon: Users },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'trends':
        return <MarketTrends marketData={marketData} />;
      case 'production':
        return <ProductionSummary produces={produces} farmers={farmers} />;
      case 'regional':
        return <RegionalDistribution farmers={farmers} produces={produces} />;
      default:
        return (
          <div className="space-y-8">
            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-700" />
                  </div>
                  <span className="text-green-600 text-sm font-medium">+{farmerGrowth}%</span>
                </div>
                <h3 className="text-2xl font-bold text-green-900">{totalFarmers}</h3>
                <p className="text-green-700 font-medium">Total Farmers</p>
                <p className="text-xs text-green-600 mt-1">vs last month</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
                    <Package className="h-6 w-6 text-blue-700" />
                  </div>
                  <span className="text-blue-600 text-sm font-medium">+{productGrowth}%</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-900">{totalProducts}</h3>
                <p className="text-blue-700 font-medium">Total Products</p>
                <p className="text-xs text-blue-600 mt-1">All time listings</p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-200 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-yellow-700" />
                  </div>
                  <span className="text-yellow-600 text-sm font-medium">Active</span>
                </div>
                <h3 className="text-2xl font-bold text-yellow-900">{availableProducts}</h3>
                <p className="text-yellow-700 font-medium">Available Now</p>
                <p className="text-xs text-yellow-600 mt-1">Ready for market</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center">
                    <span className="text-purple-700 text-lg font-bold">₹</span>
                  </div>
                  <span className="text-purple-600 text-sm font-medium">Value</span>
                </div>
                <h3 className="text-2xl font-bold text-purple-900">₹{(totalMarketValue / 100000).toFixed(1)}L</h3>
                <p className="text-purple-700 font-medium">Market Value</p>
                <p className="text-xs text-purple-600 mt-1">Total inventory</p>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Insights</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-800 font-medium">Most Popular Crop</span>
                    <span className="text-green-900 font-bold">
                    {(() => {
                    const counts = produces.reduce((acc, p) => {
                    acc[p.cropType] = (acc[p.cropType] || 0) + 1;
                    return acc;
                    }, {});

                    // Find the crop type with the highest count
                    const mostPopular = Object.keys(counts).reduce((a, b) =>
                    counts[a] > counts[b] ? a : b
                    , '');

                    return mostPopular || 'N/A';
                    })()}
                    </span>

                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-800 font-medium">Avg Farm Size</span>
                    <span className="text-blue-900 font-bold">
                      {(farmers.reduce((sum, f) => sum + (f.farmSize || 0), 0) / farmers.length || 0).toFixed(1)} acres
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-800 font-medium">Active Regions</span>
                    <span className="text-purple-900 font-bold">
                      {new Set(farmers.map(f => f.location)).size}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {produces.slice(0, 5).map((produce, index) => (
                    <div key={produce.id} className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{produce.cropType}</p>
                        <p className="text-sm text-gray-500">{produce.farmer?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">₹{produce.pricePerUnit}</p>
                        <p className="text-xs text-gray-500">{produce.quantity} {produce.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights and market analysis</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <BarChart3 className="h-4 w-4" />
            <span>Real-time data</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl p-2 shadow-lg">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default AnalyticsPage;