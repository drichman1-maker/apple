import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell, ArrowRight } from 'lucide-react'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('featured') // 'featured' or 'deals'

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('https://theresmac-backend.fly.dev/api/products')
      if (response.ok) {
        const data = await response.json()
        const products = Array.isArray(data) ? data : (data.products || [])
        setFeaturedProducts(products.slice(0, 6))
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  const getBestPrice = (product) => {
    if (!product?.prices) return null
    const pricesArray = Array.isArray(product.prices) 
      ? product.prices 
      : Object.entries(product.prices)
          .filter(([_, data]) => data && typeof data === 'object')
          .map(([retailer, data]) => ({ retailer, ...data }))
    
    const inStockPrices = pricesArray.filter(p => p.inStock && p.price)
    if (inStockPrices.length === 0) return null
    return inStockPrices.reduce((min, p) => p.price < min.price ? p : min, inStockPrices[0])
  }

  const calculateSavings = (product) => {
    const bestPrice = getBestPrice(product)
    if (!bestPrice?.price || !product.msrp) return 0
    return product.msrp - bestPrice.price
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price || 0)
  }

  // Filter and sort products based on view mode
  const getProductsToShow = () => {
    if (viewMode === 'deals') {
      return featuredProducts
        .filter(p => {
          const bestPrice = getBestPrice(p)
          return bestPrice && bestPrice.price > 0 // Show products with valid prices
        })
        .sort((a, b) => {
          // Sort by savings if available, otherwise by price
          const aSavings = calculateSavings(a)
          const bSavings = calculateSavings(b)
          if (aSavings > 0 || bSavings > 0) {
            return bSavings - aSavings // Most savings first
          }
          // If no savings data, sort by price (low to high)
          const aPrice = getBestPrice(a)?.price || 0
          const bPrice = getBestPrice(b)?.price || 0
          return aPrice - bPrice
        })
    }
    return featuredProducts
  }

  const productsToShow = getProductsToShow()

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <main>
        {/* Hero Section */}
        <section className="max-w-[900px] mx-auto px-6 py-12 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#262626] rounded-full text-sm text-[#a3a3a3] mb-6">
            <Search className="w-4 h-4 text-[#3b82f6]" />
            Real-time price tracking across 10+ retailers
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#fafafa] mb-4">
            Hardware <span className="text-[#3b82f6]">Intelligence</span>
          </h1>

          <p className="text-base text-[#a3a3a3] max-w-2xl mx-auto mb-6 leading-relaxed">
            Compare prices across retailers, track price history, and get alerts when your favorite Apple products go on sale.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#3b82f6] text-white rounded-xl font-medium hover:bg-[#2563eb] transition-colors"
            >
              <Search className="w-5 h-5" />
              Browse Products
            </Link>
            <Link
              to="/alerts"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#141414] border border-[#262626] text-[#fafafa] rounded-xl font-medium hover:bg-[#1a1a1a] transition-colors"
            >
              <Bell className="w-5 h-5" />
              Set Price Alert
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#fafafa]">35+</div>
              <div className="text-xs text-[#a3a3a3]">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#fafafa]">9</div>
              <div className="text-xs text-[#a3a3a3]">Retailers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#fafafa]">24/7</div>
              <div className="text-xs text-[#a3a3a3]">Monitoring</div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-[#fafafa]">{viewMode === 'featured' ? 'Featured Products' : 'Top Deals'}</h2>
              
              {/* View Toggle */}
              <div className="flex items-center bg-[#141414] border border-[#262626] rounded-full p-1">
                <button
                  onClick={() => setViewMode('featured')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    viewMode === 'featured'
                      ? 'bg-[#3b82f6] text-white'
                      : 'text-[#a3a3a3] hover:text-white'
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setViewMode('deals')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    viewMode === 'deals'
                      ? 'bg-green-600 text-white'
                      : 'text-[#a3a3a3] hover:text-white'
                  }`}
                >
                  Deals
                </button>
              </div>
            </div>
            
            <Link to="/products" className="text-[#3b82f6] hover:text-[#60a5fa] text-sm flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#141414] border border-[#262626] rounded-2xl p-5 animate-pulse">
                  <div className="h-4 bg-[#262626] rounded w-16 mb-3"></div>
                  <div className="h-5 bg-[#262626] rounded w-full mb-2"></div>
                  <div className="h-6 bg-[#262626] rounded w-20"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productsToShow.slice(0, 6).map((product) => {
                const bestPrice = getBestPrice(product)
                const savings = calculateSavings(product)
                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group bg-[#141414] border border-[#262626] rounded-2xl p-5 hover:bg-[#1a1a1a] hover:border-[#333] transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium uppercase tracking-wider bg-[#3b82f6]/20 text-[#3b82f6]">
                        {product.category}
                      </span>
                      <span className="text-xs text-[#a3a3a3] capitalize">{bestPrice?.retailer}</span>
                    </div>
                    <h3 className="text-base font-semibold text-[#fafafa] mb-1 group-hover:text-[#3b82f6] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    {savings > 0 && (
                      <p className="text-green-400 text-xs mb-2">
                        Save {formatPrice(savings)}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.specs && Object.values(product.specs).slice(0, 2).map((spec, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-[#0a0a0a] border border-[#262626] rounded text-[#a3a3a3]">
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-[#a3a3a3] uppercase tracking-wider mb-0.5">Best Price</p>
                        <p className="text-xl font-bold text-[#fafafa]">
                          {formatPrice(bestPrice?.price)}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#262626] mt-12 py-6 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[#a3a3a3] text-xs mb-1">
            <Link to="/privacy" className="hover:text-[#3b82f6] mx-2">Privacy</Link>
            <span className="text-[#333]">|</span>
            <Link to="/terms" className="hover:text-[#3b82f6] mx-2">Terms</Link>
            <span className="text-[#333]">|</span>
            <Link to="/about" className="hover:text-[#3b82f6] mx-2">About</Link>
          </p>
          <p className="text-[#a3a3a3] text-xs">© 2026 TheresMac</p>
        </div>
      </footer>
    </div>
  )
}

export default Home