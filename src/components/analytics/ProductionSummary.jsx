import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Package, Users, ShoppingCart, Calendar } from 'lucide-react';

const ProductionSummary = ({ produces, farmers }) => {
  // Process production data
  const cropDistribution = {};
  const statusDistribution = { AVAILABLE: 0, SOLD: 0, RESERVED: 0 };
  let totalValue = 0;

  produces.forEach(produce => {
    // Crop distribution
    if (!cropDistribution[produce.cropType]) {
      cropDistribution[produce.cropType] = { count: 0, quantity: 0, value: 0 };
    }
    cropDistribution[produce.cropType].count += 1;
    cropDistribution[produce.cropType].quantity += produce.quantity;
    cropDistribution[produce.cropType].value += produce.quantity * produce.pricePerUnit;

    // Status distribution
    statusDistribution[produce.status] += 1;

    // Total value
    totalValue += produce.quantity * produce.pricePerUnit;
  });

  // Prepare data for charts
  const cropData = Object.entries(cropDistribution)
    .map(([crop, data]) => ({ name: crop, value: data.count, quantity: data.quantity }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const statusData = Object.entries(statusDistribution)
    .map(([status, count]) => ({ name: status, value: count }));

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316', '#06B6D4', '#84CC16'];
  const STATUS_COLORS = { AVAILABLE: '#10B981', SOLD: '#6B7280', RESERVED: '#F59E0B' };

  // Recent activity (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentProduces = produces.filter(p => 
    new Date(p.createdAt || p.harvestDate) >= thirtyDaysAgo
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Production Summary</h2>
        <Package className="h-6 w-6 text-green-600" />
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-900">{produces.length}</p>
          <p className="text-sm text-green-600">Total Products</p>
        </div>

        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-900">{farmers.length}</p>
          <p className="text-sm text-blue-600">Active Farmers</p>
        </div>

        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <ShoppingCart className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-900">{statusDistribution.AVAILABLE}</p>
          <p className="text-sm text-yellow-600">Available Items</p>
        </div>

        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-900">{recentProduces.length}</p>
          <p className="text-sm text-purple-600">Recent (30d)</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Crop Distribution */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Crop Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cropData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {cropData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Crops Table */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Crops</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-700">Crop</th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">Listings</th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">Total Qty</th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">Market Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cropDistribution)
                .sort(([,a], [,b]) => b.value - a.value)
                .slice(0, 5)
                .map(([crop, data], index) => (
                <tr key={crop} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-gray-900">{crop}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{data.count}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{data.quantity.toFixed(1)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">₹{data.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductionSummary;