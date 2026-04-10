import React, { useState, useEffect } from 'react'
import { X, Bell, Search } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'

const AlertModal = ({ isOpen, onClose, onSave, editingAlert, product, currentPrice }) => {
  const { user, signInWithGoogle } = useAuth()
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
        email: user?.email || editingAlert.email,
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
        email: user?.email || '',
        retailer: 'any'
      })
    } else {
      setFormData({
        productId: '',
        productName: '',
        productCategory: '',
        currentPrice: 0,
        targetPrice: '',
        email: user?.email || '',
        retailer: 'any'
      })
    }
  }, [editingAlert, product, currentPrice, user])

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
        {!user ? (
          <div className="p-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Sign in to Create Alerts
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get notified when your favorite products drop in price.
              </p>
            </div>
            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        ) : (
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

          {/* Email (from OAuth) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400">
              {user?.email || formData.email || 'Loading...'}
            </div>
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
              disabled={!formData.productName || !formData.targetPrice}
            >
              {editingAlert ? 'Update Alert' : 'Create Alert'}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  )
}

export default AlertModal