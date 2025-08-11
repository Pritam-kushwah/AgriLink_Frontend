import React from 'react';
import { Package, Calendar, MapPin, DollarSign, User, Eye } from 'lucide-react';

const ProductCard = ({ product, onViewDetails }) => {
  const totalValue = product.quantity * product.pricePerUnit;
  const daysAgo = Math.floor((Date.now() - new Date(product.harvestDate)) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      {/* Header with crop type and freshness indicator */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 relative">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
            <Package className="h-6 w-6 text-green-700" />
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            daysAgo <= 3 ? 'bg-green-200 text-green-800' :
            daysAgo <= 7 ? 'bg-yellow-200 text-yellow-800' :
            'bg-red-200 text-red-800'
          }`}>
            {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mt-3">{product.cropType}</h3>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Package className="h-4 w-4" />
              <span>{product.quantity} {product.unit}</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">₹{product.pricePerUnit}/{product.unit}</p>
              <p className="text-xs text-gray-500">Total: ₹{totalValue.toLocaleString()}</p>
            </div>
          </div>
            {/* console.log(product); */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span className="truncate">{product.farmerName || 'Unknown Farmer'}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{product.farmerLocation || 'Unknown Location'}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Harvested: {new Date(product.harvestDate).toLocaleDateString()}</span>
          </div>
        </div>

        {product.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        )}

        <button
          onClick={() => onViewDetails(product)}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center space-x-2 font-medium group-hover:bg-green-700"
        >
          <Eye className="h-4 w-4" />
          <span>View Details</span>
        </button>
      </div>

      {/* Quality badge */}
      <div className="absolute top-2 left-2">
        <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
          Fresh
        </span>
      </div>
    </div>
  );
};

export default ProductCard;