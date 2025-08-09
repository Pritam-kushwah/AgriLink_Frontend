import React, { useState } from 'react';
import { Leaf, Bell, User, Menu, X } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'farmers', label: 'Farmers' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-200" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                AgriLink
              </h1>
            </div>
            <div className="hidden md:block">
              <span className="text-green-200 text-sm font-medium">Smart Farm-to-Market Platform</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-white text-green-700 shadow-lg' 
                    : 'hover:bg-green-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-green-200 hover:text-white cursor-pointer transition-colors" />
            <div className="hidden md:flex items-center space-x-2">
              <User className="h-6 w-6" />
              <span className="text-sm font-medium">Admin Panel</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-green-700 border-t border-green-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === item.id 
                    ? 'bg-green-800 text-white' 
                    : 'text-green-200 hover:bg-green-600 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;