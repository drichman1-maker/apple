import React from 'react'
import { Filter, X } from 'lucide-react'

const ProductFilters = ({ filters, onFilterChange }) => {
  const handlePriceRangeChange = (value, index) => {
    const newPriceRange = [...filters.priceRange]
    newPriceRange[index] = parseInt(value)
    onFilterChange({
      ...filters,
      priceRange: newPriceRange
    })
  }

  const handleCheckboxChange = (key) => {
    onFilterChange({
      ...filters,
      [key]: !filters[key]
    })
  }

  const handleSortChange = (sortBy) => {
    onFilterChange({
      ...filters,
      sortBy
    })
  }

  const clearFilters = () => {
    onFilterChange({
      category: 'all',
      priceRange: [0, 5000],
      inStock: false,
      onSale: false,
      sortBy: 'price-asc'
    })
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </h3>
          <button
            onClick={clearFilters}
            className="text-apple-blue hover:text-blue-600 text-sm font-medium flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </button>
        </div>

        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <h4 className="font-medium text-white mb-3">Price Range</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400 w-8">$0</span>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="50"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(e.target.value, 0)}
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-sm text-gray-400 w-12">${filters.priceRange[0]}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400 w-8">Max</span>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="50"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(e.target.value, 1)}
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-sm text-gray-400 w-12">${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h4 className="font-medium text-white mb-3">Availability</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={() => handleCheckboxChange('inStock')}
                  className="w-4 h-4 text-apple-blue bg-white/10 border-white/20 rounded focus:ring-apple-blue focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-300">In Stock Only</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.onSale}
                  onChange={() => handleCheckboxChange('onSale')}
                  className="w-4 h-4 text-apple-blue bg-white/10 border-white/20 rounded focus:ring-apple-blue focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-300">On Sale</span>
              </label>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h4 className="font-medium text-white mb-3">Sort By</h4>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-apple-blue transition-colors"
            >
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.inStock || filters.onSale || filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) && (
        <div className="card p-4">
          <h4 className="font-medium text-white mb-3">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.inStock && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-apple-blue text-white">
                In Stock
                <button
                  onClick={() => handleCheckboxChange('inStock')}
                  className="ml-1 hover:bg-blue-600 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.onSale && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                On Sale
                <button
                  onClick={() => handleCheckboxChange('onSale')}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
                <button
                  onClick={() => onFilterChange({ ...filters, priceRange: [0, 5000] })}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductFilters