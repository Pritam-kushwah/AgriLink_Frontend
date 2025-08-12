import React, { useState, useEffect } from 'react';
import { ShoppingCart, TrendingUp } from 'lucide-react';
import MarketplaceGrid from '../components/marketplace/MarketplaceGrid';
import SearchFilter from '../components/marketplace/SearchFilter';
import ProduceDetails from '../components/produce/ProduceDetails';
import { useMarketData } from '../hooks/useMarketData';
import { useFarmers } from '../hooks/useFarmers';
import { useProduce } from '../hooks/useProduce';

const MarketplacePage = () => {
  const { marketData, loading } = useMarketData();
  const { farmers } = useFarmers();
  const { updateProduceStatus } = useProduce();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
  // Remove duplicates by product id
  const uniqueProducts = Array.from(
    new Map(marketData.map(item => [item.id, item])).values()
  );
  setFilteredProducts(uniqueProducts);
  console.log('marketData:', marketData);
}, [marketData]);

  const handleFilterChange = (filters) => {
    let filtered = [...marketData];

    // Apply search filter
    if (filters.search) {
  const search = filters.search.toLowerCase();
  filtered = filtered.filter(product => 
    product.cropType.toLowerCase().includes(search) ||
    (product.farmerName && product.farmerName.toLowerCase().includes(search)) ||
    (product.farmerLocation && product.farmerLocation.toLowerCase().includes(search))
    );
  }

    // Apply crop type filter
    if (filters.cropType) {
      filtered = filtered.filter(product => product.cropType === filters.cropType);
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(product => product.farmerLocation === filters.location);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-');
      if (max === '+') {
        filtered = filtered.filter(product => product.pricePerUnit >= parseInt(min));
      } else {
        filtered = filtered.filter(product => 
          product.pricePerUnit >= parseInt(min) && product.pricePerUnit <= parseInt(max)
        );
      }
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || b.harvestDate) - new Date(a.createdAt || a.harvestDate));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt || a.harvestDate) - new Date(b.createdAt || b.harvestDate));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
        break;
      case 'quantity-high':
        filtered.sort((a, b) => b.quantity - a.quantity);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (searchTerm) => {
    const filtered = marketData.filter(product => 
      product.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmerLocation.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateProduceStatus(id, status);
      // Update the local state
       setFilteredProducts(prev => 
        prev.map(product => 
          product.id === id ? { ...product, status } : product
        )
      );
      if (selectedProduct?.id === id) {
        setSelectedProduct(prev => ({ ...prev, status }));
      }
    } catch (error) {
      alert('Failed to update product status');
    }
  };

  // Calculate market statistics
  const availableProducts = filteredProducts.filter(p => p.status === 'AVAILABLE');
  const totalValue = filteredProducts.reduce((sum, p) => sum + (p.quantity * p.pricePerUnit), 0);
  const avgPrice = filteredProducts.length > 0 ? 
    filteredProducts.reduce((sum, p) => sum + p.pricePerUnit, 0) / filteredProducts.length : 0;

  return (
    <div className="space-y-6"
       style={{
        //backgroundImage: "url('/Farming2.jpg')",
        backgroundImage: "url('/Home farm 1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Marketplace</h1>
          <h3 className="text-black mt-2">Browse and manage available produce</h3>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <ShoppingCart className="h-4 w-4" />
            <span>{availableProducts.length} products available</span>
          </div>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">Available Products</span>
          </div>
          <p className="text-3xl font-bold text-green-900">{availableProducts.length}</p>
          <p className="text-sm text-green-600 mt-1">Ready for purchase</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-blue-600">₹</span>
            <span className="text-sm font-medium text-blue-700">Market Value</span>
          </div>
          <p className="text-3xl font-bold text-blue-900">₹{(totalValue / 100000).toFixed(1)}L</p>
          <p className="text-sm text-blue-600 mt-1">Total inventory value</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Avg Price</span>
          </div>
          <p className="text-3xl font-bold text-purple-900">₹{Math.round(avgPrice)}</p>
          <p className="text-sm text-purple-600 mt-1">Per unit average</p>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchFilter
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        farmers={farmers}
      />

      {/* Results Summary */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
        <span className="text-gray-700 font-medium">
          Showing {filteredProducts.length} of {marketData.length} products
        </span>
        <span className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* Products Grid */}
      <MarketplaceGrid
        products={filteredProducts}
        loading={loading}
        onViewDetails={handleViewDetails}
      />

      {/* Product Details Modal */}
      <ProduceDetails
        produce={selectedProduct}
        isOpen={showDetails}
        onClose={() => {
          setShowDetails(false);
          setSelectedProduct(null);
        }}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default MarketplacePage;