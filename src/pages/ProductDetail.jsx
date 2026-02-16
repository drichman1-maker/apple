import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Bell, ExternalLink, TrendingDown, TrendingUp, Star } from 'lucide-react'
import PriceChart from '../components/Product/PriceChart'
import PriceComparison from '../components/Product/PriceComparison'
import ProductSpecs from '../components/Product/ProductSpecs'
import AlertModal from '../components/Alerts/AlertModal'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [priceHistory, setPriceHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('3M')

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true)
      // Simulate API calls
      setTimeout(() => {
        setProduct(getMockProduct(id))
        setPriceHistory(generateMockPriceHistory(id, selectedTimeframe))
        setLoading(false)
      }, 500)
    }

    fetchProductData()
  }, [id, selectedTimeframe])

  const getMockProduct = (productId) => {
    const products = {
      'iphone-15-pro': {
        id: 'iphone-15-pro',
        name: 'iPhone 15 Pro',
        category: 'iPhone',
        model: 'A3108',
        description: 'The iPhone 15 Pro features a titanium design, A17 Pro chip, and Pro camera system with 3x zoom.',
        image: '/images/iphone-15-pro.jpg',
        prices: {
          apple: { price: 999, inStock: true, url: 'https://apple.com', updated: '2 hours ago' },
          amazon: { price: 949, inStock: true, url: 'https://amazon.com', updated: '1 hour ago' },
          bestbuy: { price: 999, inStock: true, url: 'https://bestbuy.com', updated: '3 hours ago' },
          bh: { price: 979, inStock: true, url: 'https://bhphotovideo.com', updated: '4 hours ago' }
        },
        specifications: {
          'Display': '6.1" Super Retina XDR OLED',
          'Chip': 'A17 Pro',
          'Storage': '128GB, 256GB, 512GB, 1TB',
          'Camera': 'Pro 48MP camera system',
          'Colors': 'Natural Titanium, Blue Titanium, White Titanium, Black Titanium',
          'Battery': 'Up to 23 hours video playback',
          'Water Resistance': 'IP68'
        },
        features: [
          'Titanium design',
          'A17 Pro chip with 6-core GPU',
          'Pro camera system with 3x Telephoto',
          'Action Button',
          'USB-C with USB 3',
          'Face ID',
          'MagSafe and Qi2 wireless charging'
        ],
        rating: 4.6,
        reviews: 1247
      }
      // Add more mock products as needed
    }

    return products[productId] || products['iphone-15-pro']
  }

  const generateMockPriceHistory = (productId, timeframe) => {
    const now = new Date()
    const data = []
    let days
    
    switch (timeframe) {
      case '1M': days = 30; break
      case '3M': days = 90; break
      case '6M': days = 180; break
      case '1Y': days = 365; break
      default: days = 90
    }

    const basePrice = 999
    for (let i = days; i >= 0; i--) {
      const date = new Date(now - i * 24 * 60 * 60 * 1000)
      const volatility = 0.1 + (Math.random() * 0.05)
      const trend = Math.sin((days - i) / 20) * 30
      
      data.push({
        date: date.toISOString().split('T')[0],
        apple: basePrice + trend + (Math.random() - 0.5) * 50,
        amazon: basePrice - 50 + trend + (Math.random() - 0.5) * 40,
        bestbuy: basePrice + trend + (Math.random() - 0.5) * 30,
        bh: basePrice - 20 + trend + (Math.random() - 0.5) * 35
      })
    }

    return data
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">
            Browse All Products
          </Link>
        </div>
      </div>
    )
  }

  const prices = Object.entries(product.prices).map(([retailer, data]) => ({
    retailer,
    ...data
  }))
  const minPrice = Math.min(...prices.map(p => p.price))
  const maxPrice = Math.max(...prices.map(p => p.price))
  const bestDeal = prices.find(p => p.price === minPrice)
  const savings = maxPrice - minPrice

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
        <Link to="/products" className="hover:text-apple-blue flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Products
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Image & Basic Info */}
        <div>
          <div className="w-full h-96 bg-gray-100 dark:bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">{product.name} Image</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <span className="text-apple-blue font-medium">{product.category}</span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {product.name}
              </h1>
              {product.model && (
                <p className="text-gray-600 dark:text-gray-400">Model: {product.model}</p>
              )}
            </div>

            {product.rating && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            )}

            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
          </div>
        </div>

        {/* Price Info & Actions */}
        <div className="space-y-6">
          {/* Current Best Price */}
          <div className="card p-6">
            <div className="text-center space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Best Price</p>
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${minPrice}
                  </span>
                  {savings > 0 && (
                    <div className="text-center">
                      <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                        Save ${savings}
                      </span>
                      <div className="flex items-center justify-center mt-1">
                        <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">
                          {Math.round((savings / maxPrice) * 100)}% off
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Available at {bestDeal.retailer === 'apple' ? 'Apple' : 
                              bestDeal.retailer === 'amazon' ? 'Amazon' :
                              bestDeal.retailer === 'bestbuy' ? 'Best Buy' : 'B&H Photo'}
                </p>
              </div>

              <div className="flex space-x-3">
                <a
                  href={bestDeal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary flex items-center justify-center"
                >
                  Buy Now
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
                <button
                  onClick={() => setShowAlertModal(true)}
                  className="btn-secondary flex items-center justify-center"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Alert
                </button>
              </div>
            </div>
          </div>

          {/* Price Comparison */}
          <PriceComparison prices={prices} />
        </div>
      </div>

      {/* Price Chart */}
      <div className="mb-12">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Price History
            </h2>
            <div className="flex space-x-2">
              {['1M', '3M', '6M', '1Y'].map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    selectedTimeframe === timeframe
                      ? 'bg-apple-blue text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {timeframe}
                </button>
              ))}
            </div>
          </div>
          <PriceChart data={priceHistory} />
        </div>
      </div>

      {/* Product Specifications */}
      <ProductSpecs specifications={product.specifications} features={product.features} />

      {/* Alert Modal */}
      {showAlertModal && (
        <AlertModal
          isOpen={showAlertModal}
          onClose={() => setShowAlertModal(false)}
          product={product}
          currentPrice={minPrice}
        />
      )}
    </div>
  )
}

export default ProductDetail