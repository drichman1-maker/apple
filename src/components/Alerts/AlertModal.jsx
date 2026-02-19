import React, { useState, useEffect } from 'react'
import { X, Bell, Search } from 'lucide-react'

const AlertModal = ({ isOpen, onClose, onSave, editingAlert, product, currentPrice }) => {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    productCategory: '',
    currentPrice: 0,
    targetPrice: '',
    email: '',
    retailer: 'any'
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (editingAlert) {
      setFormData({
        productId: editingAlert.productId,
        productName: editingAlert.productName,
        productCategory: editingAlert.productCategory,
        currentPrice: editingAlert.currentPrice,
        targetPrice: editingAlert.targetPrice,
        email: editingAlert.email,
        retailer: editingAlert.retailer
      })
    } else if (product) {
      // Pre-fill with product data if coming from product page
      setFormData({
        productId: product.id,
        productName: product.name,
        productCategory: product.category,
        currentPrice: currentPrice || 0,
        targetPrice: Math.round(currentPrice * 0.9), // Suggest 10% discount
        email: localStorage.getItem('userEmail') || '',
        retailer: 'any'
      })
    } else {
      setFormData({
        productId: '',
        productName: '',
        productCategory: '',
        currentPrice: 0,
        targetPrice: '',
        email: localStorage.getItem('userEmail') || '',
        retailer: 'any'
      })
    }
  }, [editingAlert, product, currentPrice])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProductSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    // Simulate API search with mock data
    setTimeout(() => {
      const mockResults = [
        {
          id: 'iphone-15-pro',
          name: 'iPhone 15 Pro',
          category: 'iPhone',
          currentPrice: 999
        },
        {
          id: 'macbook-air-m2',
          name: 'MacBook Air M2',
          category: 'Mac',
          currentPrice: 1199
        },
        {
          id: 'ipad-pro-12-9',
          name: 'iPad Pro 12.9"',
          category: 'iPad',
          currentPrice: 1099
        },
        {
          id: 'airpods-pro-2',
          name: 'AirPods Pro (2nd Gen)',
          category: 'AirPods',
          currentPrice: 249
        }
      ].filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )

      setSearchResults(mockResults)
      setIsSearching(false)
    }, 300)
  }

  const handleProductSelect = (selectedProduct) => {
    setFormData(prev => ({
      ...prev,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productCategory: selectedProduct.category,
      currentPrice: selectedProduct.currentPrice,
      targetPrice: Math.round(selectedProduct.currentPrice * 0.9)
    }))
    setSearchQuery('')
    setSearchResults([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Save email to localStorage for future use
    if (formData.email) {
      localStorage.setItem('userEmail', formData.email)
    }

    onSave(formData)
  }

  const suggestedDiscounts = [5, 10, 15, 20, 25]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <Bell className="h-5 w-5 mr-2 text-apple-blue" />
            {editingAlert ? 'Edit Price Alert' : 'Create Price Alert'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Product Selection */}
          {!product && !editingAlert && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Product
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    handleProductSearch(e.target.value)
                  }}
                  placeholder="Search for iPhone, MacBook, iPad..."
                  className="input-field pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      type="button"
                      onClick={() => handleProductSelect(result)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">
                        {result.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {result.category} • ${result.currentPrice}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Selected Product Display */}
          {formData.productName && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="text-sm text-apple-blue font-medium">
                {formData.productCategory}
              </div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {formData.productName}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Current Price: ${formData.currentPrice}
              </div>
            </div>
          )}

          {/* Target Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <input
                type="number"
                name="targetPrice"
                value={formData.targetPrice}
                onChange={handleInputChange}
                placeholder="Enter target price"
                min="1"
                step="1"
                className="input-field pl-8"
                required
              />
            </div>
            
            {/* Quick Discount Buttons */}
            {formData.currentPrice > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick discounts:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedDiscounts.map((discount) => {
                    const suggestedPrice = Math.round(formData.currentPrice * (1 - discount / 100))
                    return (
                      <button
                        key={discount}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, targetPrice: suggestedPrice }))}
                        className="px-3 py-1 text-xs bg-apple-blue/10 text-apple-blue rounded-md hover:bg-apple-blue/20 transition-colors duration-200"
                      >
                        -{discount}% (${suggestedPrice})
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="input-field"
              required
            />
          </div>

          {/* Retailer Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Retailer Preference
            </label>
            <select
              name="retailer"
              value={formData.retailer}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="any">Any Retailer</option>
              <option value="apple">Apple Store Only</option>
              <option value="amazon">Amazon Only</option>
              <option value="bestbuy">Best Buy Only</option>
              <option value="bh">B&H Photo Only</option>
            </select>
          </div>

          {/* Savings Preview */}
          {formData.currentPrice > 0 && formData.targetPrice && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="text-sm font-medium text-green-800 dark:text-green-200">
                Potential Savings
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${formData.currentPrice - formData.targetPrice}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                {Math.round(((formData.currentPrice - formData.targetPrice) / formData.currentPrice) * 100)}% discount
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
              disabled={!formData.productName || !formData.targetPrice || !formData.email}
            >
              {editingAlert ? 'Update Alert' : 'Create Alert'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AlertModal