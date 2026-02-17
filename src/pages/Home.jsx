import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, TrendingDown, Sparkles, ArrowRight } from 'lucide-react'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('https://mactrackr-backend-new.onrender.com/api/products')
      if (response.ok) {
        const data = await response.json()
        // Select featured products: cheapest MBA, MBP, iPad Pro, iPhone, Mac mini
        const products = data.products || []
        const featured = [
          products.find(p => p.id === 'macbook-air-13-m4'), // Cheapest MacBook Air
          products.find(p => p.id === 'macbook-pro-14-m5'), // MacBook Pro
          products.find(p => p.id === 'ipad-pro-11-m5-wifi'), // iPad Pro
          products.find(p => p.id === 'iphone-17-256'), // iPhone
          products.find(p => p.id === 'mac-mini-m4'), // Mac mini
        ].filter(Boolean)
        setFeaturedProducts(featured)
      }
    } catch (error) {
      console.error('Failed to fetch featured products:', error)
    } finally {
      setLoading(false)
    }
  }

  const getBestPrice = (product) => {
    if (!product?.prices) return null
    const prices = Object.entries(product.prices)
      .filter(([_, data]) => data.inStock)
      .map(([retailer, data]) => ({ retailer, ...data }))
    if (prices.length === 0) return null
    return prices.reduce((min, p) => p.price < min.price ? p : min, prices[0])
  }

  const getCategoryDisplay = (category) => {
    const categories = {
      iphone: 'IPHONE',
      ipad: 'IPAD',
      mac: 'MAC',
      watch: 'WATCH',
      airpods: 'AIRPODS'
    }
    return categories[category] || category.toUpperCase()
  }

  const getCategoryColor = (category) => {
    const colors = {
      mac: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      iphone: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
      ipad: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
      watch: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
      airpods: 'bg-green-500/20 border-green-500/30 text-green-400'
    }
    return colors[category] || 'bg-gray-500/20 border-gray-500/30 text-gray-400'
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#333] bg-[#1a1a1a] text-sm text-gray-400 mb-8">
              <Sparkles className="h-4 w-4 text-blue-400" />
              Real-time price tracking across 10+ retailers
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Hardware{' '}
              <span className="hi-gradient-text">
                Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-4">
              Apple Asset Tracking
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Compare prices across retailers, track price history, and get alerts when your favorite Apple products go on sale.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
              >
                <Search className="h-5 w-5" />
                Browse Products
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a1a1a] border border-[#333] text-white rounded-xl font-semibold hover:bg-[#262626] transition-all duration-300"
              >
                <TrendingDown className="h-5 w-5" />
                Set Price Alert
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">35+</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">9</div>
                <div className="text-sm text-gray-500">Retailers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-500">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 border-t border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Featured Products</h2>
            <Link to="/products" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="hi-card p-5 animate-pulse">
                  <div className="h-4 bg-[#262626] rounded w-16 mb-3"></div>
                  <div className="h-6 bg-[#262626] rounded w-full mb-2"></div>
                  <div className="h-8 bg-[#262626] rounded w-24"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {featuredProducts.map((product) => {
                const bestPrice = getBestPrice(product)
                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="hi-card-hover p-5 group"
                  >
                    <span className={`hi-pill ${getCategoryColor(product.category)} text-xs mb-3`}>
                      {getCategoryDisplay(product.category)}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                    {product.specs?.chip && (
                      <p className="text-xs text-gray-500 mb-3">{product.specs.chip}</p>
                    )}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">FROM</p>
                        <p className="text-2xl font-bold text-white">
                          ${bestPrice?.price?.toLocaleString() || '—'}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-t border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Mac', 'iPad', 'iPhone', 'Watch', 'AirPods'].map((cat) => (
              <Link
                key={cat}
                to={cat === 'All' ? '/products' : `/products/${cat.toLowerCase()}`}
                className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                  cat === 'All' 
                    ? 'bg-white text-black border-white' 
                    : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:border-[#555] hover:text-white'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
