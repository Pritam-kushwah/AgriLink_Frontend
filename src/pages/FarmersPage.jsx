import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import FarmersList from '../components/farmers/FarmersList';
import FarmerProfile from '../components/farmers/FarmerProfile';
import AddFarmerModal from '../components/farmers/AddFarmerModal';
import { useFarmers } from '../hooks/useFarmers';

const FarmersPage = () => {
  const { farmers, loading, deleteFarmer } = useFarmers();

  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // State for Add/Edit Farmer Modal
  const [isAddFarmerOpen, setIsAddFarmerOpen] = useState(false);
  const [editFarmer, setEditFarmer] = useState(null);

  // Filter farmers based on search and location
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch =
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.phone.includes(searchTerm);
    const matchesLocation = !locationFilter || farmer.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  const locations = [...new Set(farmers.map(f => f.location))];

  const handleViewProfile = (farmer) => {
    setSelectedFarmer(farmer);
    setShowProfile(true);
  };

  const handleAddNew = () => {
    setEditFarmer(null); // clear any edit data
    setIsAddFarmerOpen(true);
  };

  const handleEdit = (farmer) => {
    setEditFarmer(farmer); // store farmer to edit
    setIsAddFarmerOpen(true); // open modal
  };

  const handleDelete = async (farmer) => {
    if (window.confirm(`Are you sure you want to delete ${farmer.name}?`)) {
      try {
        await deleteFarmer(farmer.id);
      } catch (error) {
        alert('Failed to delete farmer');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Farmers Management</h1>
          <p className="text-gray-600 mt-2">Manage and track your network of farmers</p>
        </div>
        <button
          onClick={handleAddNew}
          className="mt-4 sm:mt-0 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-200 flex items-center space-x-2 font-medium"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Farmer</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Total Farmers</h3>
          <p className="text-3xl font-bold text-green-900">{farmers.length}</p>
          <p className="text-sm text-green-600 mt-1">Registered in system</p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Verified Farmers</h3>
          <p className="text-3xl font-bold text-blue-900">
            {farmers.filter(f => f.status === 'VERIFIED').length}
          </p>
          <p className="text-sm text-blue-600 mt-1">Account verified</p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Active Regions</h3>
          <p className="text-3xl font-bold text-purple-900">{locations.length}</p>
          <p className="text-sm text-purple-600 mt-1">Coverage areas</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search farmers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      {(searchTerm || locationFilter) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            Found {filteredFarmers.length} farmers
            {searchTerm && ` matching "${searchTerm}"`}
            {locationFilter && ` in ${locationFilter}`}
          </p>
        </div>
      )}

      {/* Farmers List */}
      <FarmersList
        farmers={filteredFarmers}
        loading={loading}
        onViewProfile={handleViewProfile}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Farmer Profile Modal */}
      <FarmerProfile
        farmer={selectedFarmer}
        isOpen={showProfile}
        onClose={() => {
          setShowProfile(false);
          setSelectedFarmer(null);
        }}
      />

      {/* Add/Edit Farmer Modal */}
      <AddFarmerModal
        isOpen={isAddFarmerOpen}
        onClose={() => setIsAddFarmerOpen(false)}
        editFarmer={editFarmer}
      />
    </div>
  );
};

export default FarmersPage;