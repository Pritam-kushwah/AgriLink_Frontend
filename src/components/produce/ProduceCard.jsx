import React from 'react';
import { Package, Calendar, MapPin, DollarSign, User } from 'lucide-react';

const ProduceCard = ({ produce, onViewDetails, onUpdateStatus }) => {
  const statusColors = {
    AVAILABLE: 'bg-green-100 text-green-800',
    SOLD: 'bg-gray-100 text-gray-800',
    RESERVED: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
          <Package className="h-6 w-6 text-green-600" />
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[produce.status]}`}>
          {produce.status}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{produce.cropType}</h3>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4" />
          <span>{produce.quantity} {produce.unit}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4" />
          <span>₹{produce.pricePerUnit}/{produce.unit}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Harvest: {new Date(produce.harvestDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>{produce.farmer?.name || 'Unknown Farmer'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>{produce.farmer?.location || 'Unknown Location'}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(produce)}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
          >
            View Details
          </button>
          {produce.status === 'AVAILABLE' && (
            <button
              onClick={() => onUpdateStatus(produce.id, 'SOLD')}
              className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm"
            >
              Mark Sold
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProduceCard;