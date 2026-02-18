import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Bell, ShoppingCart, ExternalLink } from 'lucide-react'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [priceHistory, setPriceHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [alertPrice, setAlertPrice] = useState('')
  const [alertsEnabled, setAlertsEnabled] = useState(false)

  useEffect(() => {
    fetchProductData()
  }, [id])

  const fetchProductData = async () => {
    try {
      setLoading(true)
      // Try to fetch from API first
      const response = await fetch(`https://mactrackr-backend-new.onrender.com/api/products/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      } else {
        // Fallback to mock data
        setProduct(getMockProduct(id))
      }
    } catch (err) {
      console.error('Failed to fetch product:', err)
      setProduct(getMockProduct(id))
    } finally {
      setLoading(false)
    }
  }

  const getMockProduct = (productId) => {
    // Mock product data based on ID
    const mockProducts = {
      'macbook-pro-16-m4': {
        id: 'macbook-pro-16-m4',
        name: 'MacBook Pro 16" M4 Max',
        category: 'mac',
        brand: 'Apple',
        prices: {
          apple: { price: 2499, inStock: true, url: 'https://apple.com' },
          bestbuy: { price: 2199, inStock: true, url: 'https://bestbuy.com' },
          bh: { price: 2249, inStock: true, url: 'https://bhphotovideo.com' },
          adorama: { price: 2289, inStock: false, url: 'https://adorama.com' }
        },
        specifications: {
          releaseYear: '2025',
          processor: 'M4 Max',
          memory: '36GB',
          storage: '1TB SSD',
          color: 'Space Black'
        },
        msrp: 2499
      }
    }
    return mockProducts[productId] || {
      id: productId,
      name: 'MacBook Pro 16" M4 Max',
      category: 'mac',
      brand: 'Apple',
      prices: {
        apple: { price: 2499, inStock: true, url: 'https://apple.com' },
        bestbuy: { price: 2199, inStock: true, url: 'https://bestbuy.com' },
        bh: { price: 2249, inStock: true, url: 'https://bhphotovideo.com' },
        adorama: { price: 2289, inStock: false, url: 'https://adorama.com' }
      },
      specifications: {
        releaseYear: '2025',
        processor: 'M4 Max',
        memory: '36GB',
        storage: '1TB SSD',
        color: 'Space Black'
      },
      msrp: 2499
    }
  }

  const getBestPrice = (prices) => {
    return Object.entries(prices)
      .filter(([_, data]) => data.inStock)
      .reduce((best, [retailer, data]) => {
        if (data.price < best.price) {
          return { retailer, ...data }
        }
        return best
      }, { price: Infinity })
  }

  const getRetailerDisplayName = (retailer) => {
    const names = {
      apple: 'Apple',
      amazon: 'Amazon',
      walmart: 'Walmart',
      target: 'Target',
      bestbuy: 'Best Buy',
      bh: 'B&H',
      adorama: 'Adorama',
      ebay: 'eBay'
    }
    return names[retailer] || retailer
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Product not found</p>
          <Link to="/products" className="text-blue-400 hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    )
  }

  const bestPrice = getBestPrice(product.prices)
  const msrp = product.msrp || Math.max(...Object.values(product.prices).map(p => p.price))
  const savings = msrp - bestPrice.price
  const savingsPercent = Math.round((savings / msrp) * 100)
  
  // Calculate estimated resale (65% of current price after 2 years)
  const estimatedResale = Math.round(bestPrice.price * 0.65)

  // Map specs to specifications if needed
  const specifications = product.specifications || product.specs || {}
  
  // Get product image based on category/name
  const getProductImage = () => {
    const categoryImages = {
      mac: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800&q=80',
      iphone: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80',
      ipad: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
      watch: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80',
      airpods: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80'
    }
    return product.image || categoryImages[product.category] || categoryImages.mac
  }
  
  // Get retailer URL - use direct URL if available, fallback to search
  const getRetailerUrl = (retailer, productName) => {
    // Check if we have a direct URL from the backend
    const priceData = product.prices[retailer]
    if (priceData && priceData.url) {
      return priceData.url
    }
    
    // Fallback to search URL
    const searchQuery = encodeURIComponent(productName)
    const urls = {
      apple: `https://www.apple.com/search/${searchQuery}`,
      amazon: `https://www.amazon.com/s?k=${searchQuery}`,
      walmart: `https://www.walmart.com/search?q=${searchQuery}`,
      target: `https://www.target.com/s?searchTerm=${searchQuery}`,
      bestbuy: `https://www.bestbuy.com/site/searchpage.jsp?st=${searchQuery}`,
      bh: `https://www.bhphotovideo.com/c/search?q=${searchQuery}`,
      adorama: `https://www.adorama.com/search?q=${searchQuery}`,
      ebay: `https://www.ebay.com/sch/i.html?_nkw=${searchQuery}`,
      cdw: `https://www.cdw.com/search?q=${searchQuery}`
    }
    return urls[retailer] || '#'
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#262626] bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/products" 
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Link>
            <span className="text-gray-500 text-sm">MacBook Pro 16&quot; M4 Max</span>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Title & Buy Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {product.name}
          </h1>
          <a
            href={getRetailerUrl(bestPrice.retailer, product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="hi-btn-primary flex items-center gap-2 w-fit"
          >
            BUY NOW
          </a>
        </div>

        {/* Specs List with Faded Background Image */}
        <div className="relative hi-card overflow-hidden mb-8">
          {/* Faded product image background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ 
              backgroundImage: `url(${getProductImage()})`,
              filter: 'blur(0.5px)',
              transform: 'scale(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/95 via-[#1a1a1a]/85 to-[#1a1a1a]/60" />
          
          {/* Specs content */}
          <div className="relative p-6">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-3 border-b border-[#262626]/50 last:border-0">
                <span className="text-gray-400 uppercase text-xs tracking-wider font-medium">{key}</span>
                <span className="text-white font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Best Market Price */}
          <div className="hi-price-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Best Market Price</span>
              <span className="hi-pill-blue text-xs">
                {getRetailerDisplayName(bestPrice.retailer).toUpperCase()}
              </span>
            </div>
            <div className="text-5xl font-bold text-white mb-2">
              ${bestPrice.price?.toLocaleString()}
            </div>
            {savings > 0 && (
              <p className="text-green-400 text-sm font-medium">
                {savings.toLocaleString()} USD below MSRP
              </p>
            )}
          </div>

          {/* Estimated Resale */}
          <div className="hi-card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Estimated Resale (2YR)</span>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              ${estimatedResale.toLocaleString()}
            </div>
            <p className="text-gray-400 text-sm">
              Retention: ~65% of current price
            </p>
          </div>
        </div>

        {/* Spec Grid with Faded Backgrounds */}
        <div className="hi-spec-grid mb-8">
          {Object.entries(specifications).map(([key, value], index) => (
            <div key={key} className="relative hi-spec-item overflow-hidden">
              {/* Faded product image - offset for each card */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ 
                  backgroundImage: `url(${getProductImage()})`,
                  backgroundPosition: `${-index * 30}px ${-index * 20}px`,
                  filter: 'blur(0.5px)',
                  transform: 'scale(1.2)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#262626] to-[#1a1a1a]" />
              
              {/* Content */}
              <div className="relative">
                <p className="hi-spec-label">{key}</p>
                <p className="hi-spec-value">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Velocity Chart Placeholder */}
        <div className="hi-chart-container mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Price Velocity (90D)</h3>
            <div className="flex gap-2">
              <span className="text-xs text-gray-500">30d</span>
              <span className="text-xs text-gray-500">60d</span>
              <span className="text-xs text-gray-500">90d</span>
            </div>
          </div>
          <div className="h-48 bg-[#0a0a0a] rounded-xl flex items-end justify-center gap-1 p-4">
            {/* Mock chart bars */}
            {[...Array(30)].map((_, i) => (
              <div 
                key={i}
                className="w-2 bg-gradient-to-t from-blue-500/20 to-blue-500 rounded-t"
                style={{ height: `${30 + Math.sin(i * 0.3) * 20 + Math.random() * 10}%` }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Retailer Availability */}
          <div className="hi-card p-6">
            <h3 className="hi-section-title">Retailer Availability</h3>
            <div className="space-y-2">
    {Object.entries(product.prices)
                .sort(([, a], [, b]) => a.price - b.price)
                .map(([retailer, data]) => (
                  <div key={retailer} className="hi-retailer-row">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">
                        {getRetailerDisplayName(retailer)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-semibold">
                        ${data.price.toLocaleString()}
                      </span>
                      <div className={data.inStock ? 'hi-status-green' : 'hi-status-red'} />
                      <a 
                        href={getRetailerUrl(retailer, product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hi-pill-gray text-xs hover:border-blue-500/50 transition-colors"
                      >
                        Visit
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Price Alerts */}
          <div className="hi-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="hi-section-title mb-0">Price Alerts</h3>
              <button 
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className={`hi-toggle ${alertsEnabled ? 'hi-toggle-active' : ''}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${alertsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            
            <p className="text-gray-400 text-sm mb-4">
              Get a push notification when this product reaches your target price.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
                  Target Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input 
                    type="number"
                    value={alertPrice}
                    onChange={(e) => setAlertPrice(e.target.value)}
                    placeholder="1979"
                    className="hi-input pl-8"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Current market low: ${bestPrice.price.toLocaleString()} • Historical average: ${Math.round(bestPrice.price * 1.1).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#262626] rounded-xl">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-white">Push Notifications</span>
                </div>
                <span className="text-xs text-gray-400">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetail
