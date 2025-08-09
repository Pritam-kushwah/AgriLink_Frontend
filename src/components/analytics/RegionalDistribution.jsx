import React from 'react';
import { MapPin, TrendingUp, Users, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RegionalDistribution = ({ farmers, produces }) => {
  // Process regional data
  const regionalData = {};
  
  farmers.forEach(farmer => {
    const location = farmer.location || 'Unknown';
    if (!regionalData[location]) {
      regionalData[location] = {
        name: location,
        farmers: 0,
        produces: 0,
        totalValue: 0,
        avgFarmSize: 0,
        totalFarmSize: 0,
      };
    }
    regionalData[location].farmers += 1;
    regionalData[location].totalFarmSize += farmer.farmSize || 0;
  });

  produces.forEach(produce => {
    const location = produce.farmer?.location || 'Unknown';
    if (regionalData[location]) {
      regionalData[location].produces += 1;
      regionalData[location].totalValue += produce.quantity * produce.pricePerUnit;
    }
  });

  // Calculate averages
  Object.values(regionalData).forEach(region => {
    region.avgFarmSize = region.farmers > 0 ? region.totalFarmSize / region.farmers : 0;
  });

  const regions = Object.values(regionalData)
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 8);

  const topRegion = regions[0];
  const totalRegions = regions.length;
  const totalRegionalValue = regions.reduce((sum, r) => sum + r.totalValue, 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Regional Distribution</h2>
        <MapPin className="h-6 w-6 text-green-600" />
      </div>

      {/* Regional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Active Regions</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{totalRegions}</p>
          <p className="text-xs text-blue-600">Coverage areas</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">Top Region</span>
          </div>
          <p className="text-lg font-bold text-green-900">{topRegion?.name || 'N/A'}</p>
          <p className="text-xs text-green-600">Highest production value</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-purple-600">₹</span>
            <span className="text-sm font-medium text-purple-700">Total Value</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">₹{(totalRegionalValue / 100000).toFixed(1)}L</p>
          <p className="text-xs text-purple-600">All regions combined</p>
        </div>
      </div>

      {/* Regional Value Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Value by Region</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={regions} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Market Value']} />
            <Bar dataKey="totalValue" fill="#10B981" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Regional Statistics Table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Statistics</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-700">Region</th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">
                  <Users className="h-4 w-4 inline mr-1" />
                  Farmers
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">
                  <Package className="h-4 w-4 inline mr-1" />
                  Products
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">
                  Avg Farm Size
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">
                  Market Value
                </th>
              </tr>
            </thead>
            <tbody>
              {regions.map((region, index) => (
                <tr key={region.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{region.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">{region.farmers}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{region.produces}</td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {region.avgFarmSize.toFixed(1)} acres
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600 font-medium">
                    ₹{region.totalValue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegionalDistribution;