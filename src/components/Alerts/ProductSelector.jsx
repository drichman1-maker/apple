import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, X, Loader2 } from 'lucide-react';

const API_BASE_URL = 'https://agg-api-hub.fly.dev';

export default function ProductSelector({ selectedProduct, onSelect, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch products when dropdown opens
  useEffect(() => {
    if (isOpen && products.length === 0) {
      fetchProducts();
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/theresmac/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      const productsList = Array.isArray(data) ? data : (data.products || []);
      
      // Sort by name and filter for active products
      const sortedProducts = productsList
        .filter(p => p.name && !p.name.includes('M2') && !p.name.includes('M3'))
        .sort((a, b) => a.name.localeCompare(b.name));
      
      setProducts(sortedProducts);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = searchTerm 
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const category = product.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  const handleSelect = (product) => {
    onSelect(product);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onSelect(null);
    setSearchTerm('');
  };

  const getBestPrice = (product) => {
    if (!product?.prices) return null;
    const pricesArray = Array.isArray(product.prices) 
      ? product.prices 
      : Object.entries(product.prices)
          .filter(([_, data]) => data && typeof data === 'object')
          .map(([retailer, data]) => ({ retailer, ...data }));
    
    const inStockPrices = pricesArray.filter(p => p.inStock && p.price);
    if (inStockPrices.length === 0) return null;
    return inStockPrices.reduce((min, p) => p.price < min.price ? p : min, inStockPrices[0]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm text-zinc-400 mb-2">Select Product</label>
      
      {/* Selected Product Display / Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-left transition-all flex items-center justify-between ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-zinc-600 cursor-pointer'
        }`}
      >
        {selectedProduct ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-xl">
              {selectedProduct.category === 'macbook' ? '💻' :
               selectedProduct.category === 'iphone' ? '📱' :
               selectedProduct.category === 'ipad' ? '📲' :
               selectedProduct.category === 'watch' ? '⌚' :
               selectedProduct.category === 'airpods' ? '🎧' : '📦'}
            </div>
            <div>
              <p className="text-white font-medium truncate">{selectedProduct.name}</p>
              <p className="text-zinc-500 text-sm">
                Current: ${getBestPrice(selectedProduct)?.price?.toLocaleString() || 'N/A'}
              </p>
            </div>
          </div>
        ) : (
          <span className="text-zinc-500">Search for a product...</span>
        )}
        
        <div className="flex items-center gap-2">
          {selectedProduct && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-zinc-800 rounded transition-colors"
            >
              <X className="h-4 w-4 text-zinc-500" />
            </button>
          )}
          <ChevronDown className={`h-5 w-5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-zinc-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Product List */}
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center">
                <Loader2 className="h-6 w-6 text-blue-500 animate-spin mx-auto mb-2" />
                <p className="text-zinc-500 text-sm">Loading products...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-400">
                <p>{error}</p>
                <button 
                  onClick={fetchProducts}
                  className="mt-2 text-sm text-blue-400 hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-8 text-center text-zinc-500">
                <p>No products found</p>
                {searchTerm && (
                  <p className="text-sm mt-1">Try a different search term</p>
                )}
              </div>
            ) : (
              Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                <div key={category}>
                  <div className="px-4 py-2 bg-zinc-800/50 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    {category}
                  </div>
                  {categoryProducts.map((product) => {
                    const bestPrice = getBestPrice(product);
                    return (
                      <button
                        key={product.id}
                        onClick={() => handleSelect(product)}
                        className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-zinc-800 transition-colors text-left ${
                          selectedProduct?.id === product.id ? 'bg-blue-500/10 border-l-2 border-blue-500' : ''
                        }`}
                      >
                        <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                          {category === 'macbook' ? '💻' :
                           category === 'iphone' ? '📱' :
                           category === 'ipad' ? '📲' :
                           category === 'watch' ? '⌚' :
                           category === 'airpods' ? '🎧' : '📦'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium truncate">{product.name}</p>
                          {product.specs && (
                            <p className="text-zinc-500 text-xs">
                              {product.specs.storage} {product.specs.color && `• ${product.specs.color}`}
                            </p>
                          )}
                        </div>
                        {bestPrice && (
                          <div className="text-right flex-shrink-0">
                            <p className="text-green-400 font-medium text-sm">
                              ${bestPrice.price.toLocaleString()}
                            </p>
                            <p className="text-zinc-500 text-xs capitalize">{bestPrice.retailer}</p>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
