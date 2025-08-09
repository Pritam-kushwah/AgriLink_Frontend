import React from 'react';
import FarmerCard from './FarmerCard';
import LoadingSpinner from '../common/LoadingSpinner';

const FarmersList = ({ farmers, loading, onViewProfile, onEdit, onDelete }) => {
  if (loading) {
    return <LoadingSpinner text="Loading farmers..." />;
  }

  if (farmers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Users className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No farmers found</h3>
        <p className="text-gray-500">Start by adding your first farmer to the system.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {farmers.map((farmer) => (
        <FarmerCard
          key={farmer.id}
          farmer={farmer}
          onViewProfile={onViewProfile}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default FarmersList;