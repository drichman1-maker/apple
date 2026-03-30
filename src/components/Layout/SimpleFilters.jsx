import React from 'react'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'macbook', label: 'MacBook' },
  { id: 'imac', label: 'iMac' },
  { id: 'mac-studio', label: 'Mac Studio' },
  { id: 'iphone', label: 'iPhone' },
  { id: 'ipad', label: 'iPad' },
  { id: 'watch', label: 'Watch' },
  { id: 'airpods', label: 'AirPods' },
  { id: 'accessories', label: 'Accessories' },
]

const SORT_OPTIONS = [
  { id: 'default', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'savings', label: 'Best Deals' },
]

export default function SimpleFilters({ 
  activeCategory = 'all', 
  onCategoryChange,
  sortBy = 'default',
  onSortChange,
  showConditionToggle = false,
  condition = 'new',
  onConditionChange,
  resultCount = 0
}) {
  return (
    <div className="space-y-4 mb-6">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-white text-black'
                : 'bg-[#141414] text-[#a3a3a3] border border-[#262626] hover:border-[#444] hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm text-[#a3a3a3]">
          {resultCount} products
        </div>

        <div className="flex items-center gap-3">
          {/* Condition Toggle */}
          {showConditionToggle && (
            <div className="flex items-center bg-[#141414] border border-[#262626] rounded-full p-1">
              <button
                onClick={() => onConditionChange('new')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  condition === 'new'
                    ? 'bg-white text-black'
                    : 'text-[#a3a3a3] hover:text-white'
                }`}
              >
                New
              </button>
              <button
                onClick={() => onConditionChange('refurbished')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  condition === 'refurbished'
                    ? 'bg-white text-black'
                    : 'text-[#a3a3a3] hover:text-white'
                }`}
              >
                Refurbished
              </button>
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-[#141414] border border-[#262626] text-white text-sm rounded-full px-4 py-2 pr-10 focus:outline-none focus:border-[#3b82f6] cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3] pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
