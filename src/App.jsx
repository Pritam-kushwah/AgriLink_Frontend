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

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            onShowAddFarmer={() => setShowAddFarmer(true)}
            onShowAddProduce={() => setShowAddProduce(true)}
          />
        );
      case 'farmers':
        return <FarmersPage onShowAddFarmer={() => setShowAddFarmer(true)} />;
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
        <AddFarmerModal onClose={() => setShowAddFarmer(false)} />
      )}
      
      {showAddProduce && (
        <AddProduceModal onClose={() => setShowAddProduce(false)} />
      )}
    </div>
  );
};

export default App;