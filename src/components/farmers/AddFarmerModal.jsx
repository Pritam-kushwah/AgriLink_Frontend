import React, { useState } from 'react';
import { User, Phone, MapPin, Mail, Building } from 'lucide-react';
import Modal from '../common/Modal';
import { useFarmers } from '../../hooks/useFarmers';

const AddFarmerModal = ({ isOpen, onClose, editFarmer = null }) => {
  const { addFarmer, updateFarmer } = useFarmers();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: editFarmer?.name || '',
    phone: editFarmer?.phone || '',
    email: editFarmer?.email || '',
    location: editFarmer?.location || '',
    farmSize: editFarmer?.farmSize || '',
    cropTypes: editFarmer?.cropTypes?.join(', ') || '',
    experience: editFarmer?.experience || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const farmerData = {
        ...formData,
        cropTypes: formData.cropTypes.split(',').map(crop => crop.trim()).filter(Boolean),
        farmSize: parseFloat(formData.farmSize) || 0,
        experience: parseInt(formData.experience) || 0,
      };

      if (editFarmer) {
        await updateFarmer(editFarmer.id, farmerData);
      } else {
        await addFarmer(farmerData);
      }

      onClose();
      setFormData({
        name: '',
        phone: '',
        email: '',
        location: '',
        farmSize: '',
        cropTypes: '',
        experience: '',
      });
    } catch (error) {
      console.error('Error saving farmer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editFarmer ? 'Edit Farmer' : 'Add New Farmer'}
      size="large"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter farmer's full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4 inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="farmer@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-2" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Village, District, State"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building className="h-4 w-4 inline mr-2" />
              Farm Size (acres)
            </label>
            <input
              type="number"
              name="farmSize"
              value={formData.farmSize}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="5.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience (years)
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Crop Types (comma-separated)
          </label>
          <input
            type="text"
            name="cropTypes"
            value={formData.cropTypes}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Rice, Wheat, Tomatoes, Potatoes"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : editFarmer ? 'Update Farmer' : 'Add Farmer'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddFarmerModal;