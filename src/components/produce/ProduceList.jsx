import React from 'react';
import ProduceCard from './ProduceCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { Package } from 'lucide-react';

const ProduceList = ({ produces, loading, onViewDetails, onUpdateStatus }) => {
  if (loading) {
    return <LoadingSpinner text="Loading produce..." />;
  }

  if (produces.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Package className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No produce found</h3>
        <p className="text-gray-500">Start by adding produce items to the system.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {produces.map((produce) => (
        <ProduceCard
          key={produce.id}
          produce={produce}
          onViewDetails={onViewDetails}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

export default ProduceList;