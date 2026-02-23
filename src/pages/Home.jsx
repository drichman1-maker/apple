import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell, ArrowRight } from 'lucide-react'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('https://mactrackr-api-backup.fly.dev/api/products')
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
    if (!product?.prices || !Array.isArray(product.prices)) return null
    const prices = product.prices.filter(p => p.inStock)
    if (prices.length === 0) return null
    return prices.reduce((min, p) => p.price < min.price ? p : min, prices[0])
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price || 0)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#262626]">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight text-[#fafafa]">
              Mac<span className="text-[#3b82f6]">Trackr</span>
            </span>
          </Link>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/" className="px-4 py-2 text-sm font-medium text-[#fafafa] bg-[#262626] rounded-lg">
              Home
            </Link>
            <Link to="/products" className="px-4 py-2 text-sm font-medium text-[#a3a3a3] hover:text-[#fafafa] transition-colors">
              Products
            </Link>
            <Link to="/products/iphone" className="px-4 py-2 text-sm font-medium text-[#a3a3a3] hover:text-[#fafafa] transition-colors">
              iPhone
            </Link>
            <Link to="/products/ipad" className="px-4 py-2 text-sm font-medium text-[#a3a3a3] hover:text-[#fafafa] transition-colors">
              iPad
            </Link>
            <Link to="/products/mac" className="px-4 py-2 text-sm font-medium text-[#a3a3a3] hover:text-[#fafafa] transition-colors">
              Mac
            </Link>
            <Link to="/products/watch" className="px-4 py-2 text-sm font-medium text-[#a3a3a3] hover:text-[#fafafa] transition-colors">
              Watch
            </Link>
            <Link to="/products/airpods" className="px-4 py-2 text-sm font-medium text-[#a3a3a3] hover:text-[#fafafa] transition-colors">
              AirPods
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Link to="/blog" className="hidden lg:flex px-4 py-2 text-sm font-medium text-[#a3a3a3] hover:text-[#fafafa] transition-colors">
              Blog
            </Link>
            <Link 
              to="/alerts"
              className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white text-sm font-medium rounded-lg hover:bg-[#2563eb] transition-colors"
            >
              <Bell className="w-4 h-4" />
              Price Alerts
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-[900px] mx-auto px-6 py-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#262626] rounded-full text-sm text-[#a3a3a3] mb-8">
            <Search className="w-4 h-4 text-[#3b82f6]" />
            Real-time price tracking across 10+ retailers
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#fafafa] mb-4">
            Hardware <span className="text-[#3b82f6]">Intelligence</span>
          </h1>

          <p className="text-xl text-[#3b82f6] mb-4">Apple Asset Tracking</p>

          <p className="text-[#a3a3a3] text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Compare prices across retailers, track price history, and get alerts when your favorite Apple products go on sale.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3b82f6] text-white rounded-xl font-medium hover:bg-[#2563eb] transition-colors"
            >
              <Search className="w-5 h-5" />
              Browse Products
            </Link>
            <Link
              to="/alerts"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#141414] border border-[#262626] text-[#fafafa] rounded-xl font-medium hover:bg-[#1a1a1a] transition-colors"
            >
              <Bell className="w-5 h-5" />
              Set Price Alert
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#fafafa]">35+</div>
              <div className="text-sm text-[#a3a3a3]">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#fafafa]">9</div>
              <div className="text-sm text-[#a3a3a3]">Retailers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#fafafa]">24/7</div>
              <div className="text-sm text-[#a3a3a3]">Monitoring</div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-[#fafafa]">Featured Products</h2>
            <Link to="/products" className="text-[#3b82f6] hover:text-[#60a5fa] text-sm flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#141414] border border-[#262626] rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-[#262626] rounded w-16 mb-3"></div>
                  <div className="h-6 bg-[#262626] rounded w-full mb-2"></div>
                  <div className="h-8 bg-[#262626] rounded w-24"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 6).map((product) => {
                const bestPrice = getBestPrice(product)
                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group bg-[#141414] border border-[#262626] rounded-2xl p-6 hover:bg-[#1a1a1a] hover:border-[#333] transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium uppercase tracking-wider bg-[#3b82f6]/20 text-[#3b82f6]">
                        {product.category}
                      </span>
                      <span className="text-sm text-[#a3a3a3] capitalize">{bestPrice?.retailer}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#fafafa] mb-1 group-hover:text-[#3b82f6] transition-colors">
                      {product.name}
                    </h3>
                    {product.releaseDate && (
                      <p className="text-[#a3a3a3] text-sm mb-3">{new Date(product.releaseDate).getFullYear()}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.specs && Object.values(product.specs).slice(0, 3).map((spec, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-[#0a0a0a] border border-[#262626] rounded text-[#a3a3a3]">
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-[#a3a3a3] uppercase tracking-wider mb-1">Best Price</p>
                        <p className="text-2xl font-bold text-[#fafafa]">
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
      <footer className="border-t border-[#262626] mt-16 py-8 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-[#a3a3a3] text-sm mb-2">
            <Link to="/privacy" className="hover:text-[#3b82f6] mx-2">Privacy</Link>
            <span className="text-[#333]">|</span>
            <Link to="/terms" className="hover:text-[#3b82f6] mx-2">Terms</Link>
            <span className="text-[#333]">|</span>
            <Link to="/about" className="hover:text-[#3b82f6] mx-2">About</Link>
          </p>
          <p className="text-[#a3a3a3] text-sm">© 2026 MacTrackr</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
