import React from 'react';
import { Users, Package, ShoppingCart, DollarSign, Plus } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import { useFarmers } from '../hooks/useFarmers';
import { useProduce } from '../hooks/useProduce';

const Dashboard = ({ onShowAddFarmer, onShowAddProduce }) => {
  const { farmers } = useFarmers();
  const { produces } = useProduce();

  const stats = {
    totalFarmers: farmers.length,
    availableItems: produces.filter(p => p.status === 'AVAILABLE').length,
    totalProduce: produces.length,
    totalValue: produces.reduce((sum, p) => sum + (p.pricePerUnit * p.quantity), 0),
  };

  return (
    <div className="space-y-8"
      style={{
        //backgroundImage: "url('/Farming2.jpg')",
        backgroundImage: "url('/Home farm 2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
       >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black">Dashboard Overview</h2>
          <h3 className="text-black mt-2">Monitor your agricultural supply chain in real-time</h3>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button 
            onClick={onShowAddFarmer}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-200 flex items-center space-x-2 font-medium"
          >
            <Plus className="h-4 w-4" />
            <span>Add Farmer</span>
          </button>
          <button 
            onClick={onShowAddProduce}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 font-medium"
          >
            <Package className="h-4 w-4" />
            <span>Add Produce</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          title="Active Farmers" 
          value={stats.totalFarmers} 
          subtitle="Registered in system"
          trend="up"
        />
        <StatCard 
          icon={Package} 
          title="Available Produce" 
          value={stats.availableItems} 
          subtitle="Ready for market"
          color="blue"
          trend="up"
        />
        <StatCard 
          icon={ShoppingCart} 
          title="Total Listings" 
          value={stats.totalProduce} 
          subtitle="All time"
          color="purple"
          trend="stable"
        />
        <StatCard 
          icon={DollarSign} 
          title="Market Value" 
          value={`₹${(stats.totalValue / 100000).toFixed(1)}L`}
          subtitle="Current inventory"
          color="orange"
          trend="up"
        />
      </div>

      {/* Recent activity sections would go here */}
    </div>
  );
};

export default Dashboard;