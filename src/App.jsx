import React, { useState } from 'react';
import Navigation from './components/common/Navigation';
import Dashboard from './pages/Dashboard';
import FarmersPage from './pages/FarmersPage';
import MarketplacePage from './pages/MarketplacePage';
import AnalyticsPage from './pages/AnalyticsPage';
import AddFarmerModal from './components/farmers/AddFarmerModal';
import AddProduceModal from './components/produce/AddProduceModal';
import LoadingSpinner from './components/common/LoadingSpinner';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddFarmer, setShowAddFarmer] = useState(false);
  const [showAddProduce, setShowAddProduce] = useState(false);
  const [editFarmer, setEditFarmer] = useState(null);


  const handleEditFarmer = (farmer) => {
    setEditFarmer(farmer);
    setShowAddFarmer(true);
  };

  const handleAddFarmer = () => {
    setEditFarmer(null); // Clear editFarmer for new farmer
    setShowAddFarmer(true);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            onShowAddFarmer={handleAddFarmer}
            onShowAddProduce={() => setShowAddProduce(true)}
          />
        );
      case 'farmers':
        return <FarmersPage onShowAddFarmer={handleAddFarmer} onEditFarmer={handleEditFarmer} />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>

      {showAddFarmer && (
  <AddFarmerModal isOpen={showAddFarmer} onClose={() => setShowAddFarmer(false)} />
   )}
      
      {showAddProduce && (
        <AddProduceModal isOpen={showAddProduce} onClose={() => setShowAddProduce(false)} />
      )}
    </div>
  );
};

export default App;