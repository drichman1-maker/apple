import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, Check } from 'lucide-react';

const API_BASE_URL = 'https://theresmac-backend.fly.dev';

export default function MultiProductSelector({ selectedProducts = [], onChange, maxProducts = 5 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

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
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      const productsList = Array.isArray(data) ? data : (data.products || []);
      
      // Sort by name
      const sortedProducts = productsList
        .filter(p => p.name)
        .sort((a, b) => a.name.localeCompare(b.name));
      
      setProducts(sortedProducts);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const isSelected = (productId) => selectedProducts.some(p => p.id === productId);

  const toggleProduct = (product) => {
    if (isSelected(product.id)) {
      // Remove
      onChange(selectedProducts.filter(p => p.id !== product.id));
    } else {
      // Add (if under max)
      if (selectedProducts.length >= maxProducts) {
        return; // Silently ignore if at max
      }
      onChange([...selectedProducts, product]);
    }
  };

  const removeProduct = (productId) => {
    onChange(selectedProducts.filter(p => p.id !== productId));
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
    <div className="space-y-3" ref={dropdownRef}>
      <label className="block text-sm text-zinc-400">
        Select Products ({selectedProducts.length}/{maxProducts})
      </label>
      
      {/* Selected Products Tags */}
      {selectedProducts.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedProducts.map((product) => (
            <div 
              key={product.id}
              className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-2"
            >
              <span className="text-white text-sm truncate max-w-[200px]">{product.name}</span>
              <button
                onClick={() => removeProduct(product.id)}
                className="text-blue-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add More Button / Dropdown */}
      {selectedProducts.length < maxProducts && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-left transition-all flex items-center justify-between hover:border-zinc-600"
          >
            <span className="text-zinc-500">
              {isOpen ? 'Click products to add them...' : 'Click to add products...'}
            </span>
            <div className="flex items-center gap-2">
              {isOpen ? <X className="h-5 w-5 text-zinc-500" /> : <span className="text-zinc-500 text-sm">+</span>}
            </div>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden max-h-[400px]">
              {/* Search Input */}
              <div className="p-3 border-b border-zinc-800 sticky top-0 bg-zinc-900">
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
              <div className="overflow-y-auto max-h-[320px]">
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
                  </div>
                ) : (
                  Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                    <div key={category}>
                      <div className="px-4 py-2 bg-zinc-800/50 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        {category}
                      </div>
                      {categoryProducts.map((product) => {
                        const bestPrice = getBestPrice(product);
                        const selected = isSelected(product.id);
                        const atMax = selectedProducts.length >= maxProducts && !selected;
                        
                        return (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() => !atMax && toggleProduct(product)}
                            disabled={atMax}
                            className={`w-full px-4 py-3 flex items-center gap-3 transition-colors text-left ${
                              selected 
                                ? 'bg-blue-500/10 border-l-2 border-blue-500' 
                                : atMax
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'hover:bg-zinc-800'
                            }`}
                          >
                            {selected ? (
                              <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                            ) : (
                              <div className="w-5 h-5 rounded border border-zinc-600 flex-shrink-0" />
                            )}
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
      )}
    </div>
  );
}
