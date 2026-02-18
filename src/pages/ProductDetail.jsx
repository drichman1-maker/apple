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
  const [chartRange, setChartRange] = useState('90d')

  useEffect(() => {
    fetchProductData()
  }, [id])

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://mactrackr-backend-new.onrender.com/api/products/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      } else {
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
    return {
      id: productId,
      name: 'MacBook Pro 16" M4 Max',
      category: 'mac',
      brand: 'Apple',
      prices: {
        apple: { price: 2499, inStock: true, url: 'https://apple.com' },
        bestbuy: { price: 2199, inStock: true, url: 'https://bestbuy.com' },
        bh: { price: 2249, inStock: true, url: 'https://bhphotovideo.com' },
        adorama: { price: 2289, inStock: false, url: 'https://adorama.com' }
      }
    }
  }

  // Get retailer display name
  const getRetailerDisplayName = (retailer) => {
    const names = {
      apple: 'Apple',
      amazon: 'Amazon',
      walmart: 'Walmart',
      target: 'Target',
      bestbuy: 'Best Buy',
      bh: 'B&H',
      adorama: 'Adorama',
      ebay: 'eBay',
      newegg: 'Newegg'
    }
    return names[retailer] || retailer
  }

  // Get retailer URL
  const getRetailerUrl = (retailer, productName) => {
    const priceData = product.prices[retailer]
    if (priceData && priceData.url) {
      return priceData.url
    }
    
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
      cdw: `https://www.cdw.com/search?q=${searchQuery}`,
      newegg: `https://www.newegg.com/p/pl?d=${searchQuery}`
    }
    return urls[retailer] || '#'
  }

  // Mock product image based on category
  const getProductImage = () => {
    const categoryImages = {
      mac: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800&q=80',
      ipad: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
      iphone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      watch: 'https://images.unsplash.com/photo-1579586337278-33bef2b56589?w=800&q=80',
      airpods: 'https://images.unsplash.com/photo-1603351154351-5cfb3d04197c?w=800&q=80'
    }
    return product?.image || categoryImages[product?.category] || categoryImages.mac
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
          <p className="text-gray-400">Product not found</p>
          <Link to="/" className="text-blue-400 hover:underline mt-4 inline-block">
            Back to products
          </Link>
        </div>
      </div>
    )
  }

  // Calculate prices
  const prices = Object.entries(product.prices).map(([retailer, data]) => ({
    retailer,
    ...data
  }))

  const bestPrice = prices.reduce((min, p) => p.price < min.price ? p : min, prices[0])
  const worstPrice = prices.reduce((max, p) => p.price > max.price ? p : max, prices[0])
  const savings = worstPrice.price - bestPrice.price

  // Estimated resale (mock calculation)
  const estimatedResale = Math.round(bestPrice.price * 0.65)

  // Specifications (mock data based on product)
  const specifications = product.specs || {
    'Chip': 'M4 Max',
    'RAM': '32GB',
    'Storage': '1TB SSD',
    'Display': '16.2" XDR',
    'Color': 'Space Black'
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#262626] bg-[#0a0a0a]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back to products</span>
            </Link>
            <Link to="/alerts" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="hidden sm:inline">Alerts</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Header */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {product.name}
          </h1>
          {product.releaseDate && (
            <p className="text-gray-500 text-lg">{new Date(product.releaseDate).getFullYear()}</p>
          )}
        </div>

        {/* Specs Grid - compact version at top */}
        <div className="hi-spec-grid mb-6">
          {Object.entries(specifications).slice(0, 4).map(([key, value], index) => (
            <div key={key} className="relative hi-spec-item overflow-hidden py-3">
              <div className="relative">
                <p className="hi-spec-label text-[10px]">{key}</p>
                <p className="hi-spec-value text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Best Price - Center Stage */}
        <div className="max-w-2xl mx-auto mb-8">
          <a
            href={getRetailerUrl(bestPrice.retailer, product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#333] rounded-2xl p-8 text-center hover:border-blue-500/50 transition-all cursor-pointer"
          >
            <span className="text-xs text-gray-400 uppercase tracking-widest block mb-3">Best Available Price</span>
            <div className="text-6xl font-bold text-white mb-3">
              ${bestPrice.price?.toLocaleString()}
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-gray-400">at {getRetailerDisplayName(bestPrice.retailer)}</span>
              {bestPrice.inStock && <span className="w-2 h-2 bg-green-400 rounded-full"></span>}
            </div>
            {savings > 0 && (
              <p className="text-green-400 text-sm font-medium mb-4">
                Save ${savings.toLocaleString()} vs other retailers
              </p>
            )}
            <span className="hi-btn-primary text-base py-3 px-8 inline-flex items-center gap-2">
              BUY NOW
              <ExternalLink className="h-4 w-4" />
            </span>
          </a>
        </div>

        {/* Top 4 Retailers - Below Price */}
        <div className="max-w-2xl mx-auto mb-8">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3 text-center">Compare Prices</h3>
          <div className="space-y-2">
            {Object.entries(product.prices)
              .sort(([, a], [, b]) => a.price - b.price)
              .slice(0, 4)
              .map(([retailer, data], index) => (
                <a 
                  key={retailer}
                  href={getRetailerUrl(retailer, product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#262626] hover:border-blue-500/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-xs w-5">{index + 1}</span>
                    <span className="text-white font-medium text-sm">
                      {getRetailerDisplayName(retailer)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold ${index === 0 ? 'text-green-400' : 'text-white'}`}>
                      ${data.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">Visit →</span>
                  </div>
                </a>
              ))}
          </div>
        </div>

        {/* Price History & Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Price Alerts */}
          <div className="hi-card p-5">
            <h3 className="hi-section-title text-sm mb-3">Price Alerts</h3>
            <p className="text-gray-400 text-xs mb-3">Get notified when the price drops</p>
            <div className="flex gap-2">
              <input
                type="number"
                value={alertPrice}
                onChange={(e) => setAlertPrice(e.target.value)}
                placeholder="Target price"
                className="hi-input flex-1 text-sm"
              />
              <button className="hi-btn-primary px-4 text-sm">
                Set
              </button>
            </div>
          </div>

          {/* Mini Price Chart */}
          <div className="hi-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase">Price Trend</h3>
              <span className="text-xs text-gray-500">30 days</span>
            </div>
            <div className="h-24 bg-[#0a0a0a] rounded-lg flex items-end justify-center gap-0.5 p-2">
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i}
                  className="w-3 bg-gradient-to-t from-blue-500/30 to-blue-500 rounded-t"
                  style={{ height: `${30 + Math.sin(i * 0.4) * 25 + Math.random() * 15}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductDetail