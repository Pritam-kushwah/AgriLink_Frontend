import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Mail, Calendar, Wheat, Award } from 'lucide-react';
import Modal from '../common/Modal';
import { useProduce } from '../../hooks/useProduce';
import LoadingSpinner from '../common/LoadingSpinner';

const FarmerProfile = ({ farmer, isOpen, onClose }) => {
  const { getProduceByFarmer } = useProduce();
  const [farmerProduce, setFarmerProduce] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && farmer?.id) {
      fetchFarmerProduce();
    }
  }, [isOpen, farmer]);

  const fetchFarmerProduce = async () => {
    try {
      setLoading(true);
      const produce = await getProduceByFarmer(farmer.id);
      setFarmerProduce(produce);
    } catch (error) {
      console.error('Error fetching farmer produce:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!farmer) return null;

  const totalValue = farmerProduce.reduce((sum, p) => sum + (p.pricePerUnit * p.quantity), 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Farmer Profile"
      size="xl"
    >
      <div className="space-y-6">
        {/* Farmer Info */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-green-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{farmer.name}</h2>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                farmer.status === 'VERIFIED' 
                  ? 'bg-green-200 text-green-800' 
                  : 'bg-blue-200 text-blue-800'
              }`}>
                {farmer.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-green-600" />
              <span>{farmer.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-green-600" />
              <span>{farmer.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span>{farmer.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-green-600" />
              <span>{farmer.experience} years experience</span>
            </div>
          </div>
        </div>

        {/* Farm Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Wheat className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Farm Size</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{farmer.farmSize} acres</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span className="font-medium">Active Listings</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{farmerProduce.length}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-orange-600">₹</span>
              <span className="font-medium">Total Value</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">₹{totalValue.toLocaleString()}</p>
          </div>
        </div>

        {/* Crop Types */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Crop Types</h3>
          <div className="flex flex-wrap gap-2">
            {farmer.cropTypes?.map((crop, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                {crop}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Produce */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Produce Listings</h3>
          {loading ? (
            <LoadingSpinner size="small" />
          ) : farmerProduce.length > 0 ? (
            <div className="space-y-3">
              {farmerProduce.slice(0, 5).map((produce) => (
                <div key={produce.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{produce.cropType}</p>
                    <p className="text-sm text-gray-500">{produce.quantity} {produce.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{produce.pricePerUnit}/{produce.unit}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      produce.status === 'AVAILABLE' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {produce.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No produce listings found</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FarmerProfile;