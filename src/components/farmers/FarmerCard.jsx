import React from 'react';
import { User, Phone, MapPin, Mail } from 'lucide-react';

const FarmerCard = ({ farmer, onViewProfile, onEdit, onDelete }) => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
          <User className="h-6 w-6 text-green-700" />
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          farmer.status === 'VERIFIED' 
            ? 'bg-green-200 text-green-800' 
            : 'bg-blue-200 text-blue-800'
        }`}>
          {farmer.status}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{farmer.name}</h3>
      
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-2">
          <Phone className="h-4 w-4" />
          <span>{farmer.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>{farmer.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Mail className="h-4 w-4" />
          <span>{farmer.email}</span>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={() => onViewProfile(farmer)}
          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
        >
          View Profile
        </button>
        <button 
          onClick={() => typeof onEdit === 'function' && onEdit(farmer)}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default FarmerCard;