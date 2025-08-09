import React from 'react';
import { Package, Calendar, MapPin, DollarSign, User, Scale, FileText } from 'lucide-react';
import Modal from '../common/Modal';

const ProduceDetails = ({ produce, isOpen, onClose, onUpdateStatus }) => {
  if (!produce) return null;

  const statusColors = {
    AVAILABLE: 'bg-green-100 text-green-800',
    SOLD: 'bg-gray-100 text-gray-800',
    RESERVED: 'bg-yellow-100 text-yellow-800',
  };

  const totalValue = produce.quantity * produce.pricePerUnit;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Produce Details"
      size="large"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                <Package className="h-8 w-8 text-green-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{produce.cropType}</h2>
                <p className="text-gray-600">Product ID: #{produce.id}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[produce.status]}`}>
              {produce.status}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Scale className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Quantity</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{produce.quantity} {produce.unit}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="font-medium">Price per {produce.unit}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">₹{produce.pricePerUnit}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-orange-600 text-xl">₹</span>
              <span className="font-medium">Total Value</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">₹{totalValue.toLocaleString()}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Farmer Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-600" />
                <span className="font-medium">{produce.farmer?.name || 'Unknown'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span>{produce.farmer?.location || 'Unknown'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Harvest Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-600" />
                <span>Harvested: {new Date(produce.harvestDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-600" />
                <span>Listed: {new Date(produce.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {produce.description && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Description
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">{produce.description}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        {produce.status === 'AVAILABLE' && (
          <div className="pt-6 border-t border-gray-200">
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => onUpdateStatus(produce.id, 'RESERVED')}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Mark as Reserved
              </button>
              <button
                onClick={() => onUpdateStatus(produce.id, 'SOLD')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Mark as Sold
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ProduceDetails;