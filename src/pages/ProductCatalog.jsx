import React, { useState, useEffect, useMemo } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { ChevronRight, RefreshCw } from 'lucide-react'

const ProductCatalog = () => {
  const { category } = useParams()
  const location = useLocation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState(category || 'All')
  const [livePrices, setLivePrices] = useState({})
  const [lastUpdated, setLastUpdated] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const categories = ['All', 'MacBook', 'Mac', 'iPad', 'iPhone', 'Watch', 'AirPods']
  const [condition, setCondition] = useState('new') // 'new' or 'refurbished'
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch live prices from /api/prices
  const fetchLivePrices = async (showSpinner = false) => {
    if (showSpinner) setRefreshing(true)
    try {
      // Fetch from existing backend (has live prices)
      const response = await fetch('https://mactrackr-backend-fresh.fly.dev/api/products')
      if (response.ok) {
        const data = await response.json()
        // Build price map from backend data
        const priceMap = {}
        data.forEach(product => {
          const key = product.name.toLowerCase()
          // Get the lowest price from all retailers
          const retailers = product.prices || {}
          let lowestPrice = null
          let lowestRetailer = null
          Object.entries(retailers).forEach(([retailer, info]) => {
            if (info && info.price) {
              if (!lowestPrice || info.price < lowestPrice) {
                lowestPrice = info.price
                lowestRetailer = retailer
              }
            }
          })
          if (lowestPrice) {
            priceMap[key] = { 
              price: lowestPrice, 
              timestamp: new Date().toISOString(), 
              stock: true,
              retailer: lowestRetailer
            }
          }
        })
        setLivePrices(priceMap)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error('Failed to fetch live prices:', error)
    }
    if (showSpinner) setRefreshing(false)
  }

  useEffect(() => {
    setActiveFilter(category || 'All')
  }, [category])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const url = 'https://mactrackr-backend-fresh.fly.dev/api/products'
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          setProducts(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
      setLoading(false)
    }

    fetchProducts()
    fetchLivePrices()
    
    // Poll live prices every 30 seconds
    const interval = setInterval(() => fetchLivePrices(), 30000)
    return () => clearInterval(interval)
  }, [])

  const getBestPrice = (product) => {
    if (!product?.prices) return null
    // Handle both array and object formats from backend
    const pricesArray = Array.isArray(product.prices) 
      ? product.prices 
      : Object.entries(product.prices)
          .filter(([_, data]) => data && typeof data === 'object')
          .map(([retailer, data]) => ({ retailer, ...data }))
    
    const inStockPrices = pricesArray.filter(p => p.inStock && p.price)
    if (inStockPrices.length === 0) return null
    return inStockPrices.reduce((min, p) => p.price < min.price ? p : min, inStockPrices[0])
  }

  const getWorstPrice = (product) => {
    if (!product?.prices) return null
    // Handle both array and object formats from backend
    const pricesArray = Array.isArray(product.prices) 
      ? product.prices 
      : Object.entries(product.prices)
          .filter(([_, data]) => data && typeof data === 'object')
          .map(([retailer, data]) => ({ retailer, ...data }))
    
    const pricedProducts = pricesArray.filter(p => p.price)
    if (pricedProducts.length === 0) return null
    return pricedProducts.reduce((max, p) => p.price > max.price ? p : max, pricedProducts[0])
  }

  const filteredProducts = useMemo(() => {
    const unique = products.filter((p, i, self) => 
      i === self.findIndex(t => t.id === p.id)
    )
    
    // Filter by condition (new/refurbished)
    let conditionFiltered = unique
    if (condition === 'refurbished') {
      // Only show products explicitly marked as refurbished
      conditionFiltered = unique.filter(p => p.condition === 'refurbished')
    } else {
      // 'new' shows products where condition is NOT 'refurbished' (includes undefined)
      conditionFiltered = unique.filter(p => !p.condition || p.condition !== 'refurbished')
    }
    
    // Filter by search query
    let searchFiltered = conditionFiltered
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      searchFiltered = conditionFiltered.filter(p => 
        p.name?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query) ||
        p.specs && Object.values(p.specs).some(v => String(v).toLowerCase().includes(query))
      )
    }
    
    if (activeFilter === 'All') return searchFiltered
    
    // Handle MacBook vs Mac separation (case-insensitive)
    if (activeFilter.toLowerCase() === 'macbook') {
      return conditionFiltered.filter(p => 
        p.category?.toLowerCase() === 'mac' && 
        (p.name?.toLowerCase().includes('macbook') || p.name?.toLowerCase().includes('mac book'))
      )
    }
    
    if (activeFilter.toLowerCase() === 'mac') {
      return conditionFiltered.filter(p => 
        p.category?.toLowerCase() === 'mac' && 
        !p.name?.toLowerCase().includes('macbook') && 
        !p.name?.toLowerCase().includes('mac book')
      )
    }
    
    return searchFiltered.filter(p => 
      p.category?.toLowerCase() === activeFilter.toLowerCase()
    )
  }, [products, activeFilter, condition, searchQuery])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="animate-pulse text-[#3b82f6]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#262626]">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight text-[#fafafa]">
              Mac<span className="text-[#3b82f6]">Trackr</span>
            </span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Link 
              to="/home" 
              className="hidden lg:flex px-4 py-2 text-sm font-medium text-[#a3a3a3] hover:text-[#fafafa] transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className="hidden lg:flex px-4 py-2 text-sm font-medium text-[#a3a3a3] hover:text-[#fafafa] transition-colors"
            >
              Blog
            </Link>
            <Link 
              to="/alerts"
              className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white text-sm font-medium rounded-lg hover:bg-[#2563eb] transition-colors"
            >
              <span>✨</span>
              Price Alerts
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => {
            const count = cat === 'All' 
              ? products.length 
              : cat === 'Home'
              ? 0
              : cat === 'MacBook'
              ? products.filter(p => 
                  p.category?.toLowerCase() === 'mac' && 
                  (p.name?.toLowerCase().includes('macbook') || p.name?.toLowerCase().includes('mac book'))
                ).length
              : cat === 'Mac'
              ? products.filter(p => 
                  p.category?.toLowerCase() === 'mac' && 
                  !p.name?.toLowerCase().includes('macbook') && 
                  !p.name?.toLowerCase().includes('mac book')
                ).length
              : products.filter(p => p.category?.toLowerCase() === cat.toLowerCase()).length
            return (
              <Link
                key={cat}
                to={cat === 'Home' ? '/' : cat === 'All' ? '/products' : `/products/${cat.toLowerCase()}`}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                  activeFilter.toLowerCase() === cat.toLowerCase()
                    ? 'bg-white text-black border-white'
                    : 'bg-[#141414] text-[#a3a3a3] border-[#262626] hover:border-[#333] hover:text-[#fafafa]'
                }`}
              >
                {cat}
              </Link>
            )
          })}
        </div>

        {/* Condition Toggle & Results Count */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <p className="text-[#a3a3a3] text-sm">
              Showing {filteredProducts.length} {condition} products
              {activeFilter !== 'All' && ` in ${activeFilter}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
            
            {/* Live Price Status */}
            {lastUpdated && (
              <button 
                onClick={() => fetchLivePrices(true)}
                className="flex items-center gap-1.5 text-xs text-[#22c55e] hover:text-[#4ade80] transition-colors"
                title="Click to refresh prices"
              >
                <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Live</span>
                <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse" />
              </button>
            )}
          </div>
          
          {/* New/Refurbished Toggle */}
          <div className="flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-full p-1">
            <button
              onClick={() => setCondition('new')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                condition === 'new'
                  ? 'bg-white text-black'
                  : 'text-[#a3a3a3] hover:text-[#fafafa]'
              }`}
            >
              New
            </button>
            <button
              onClick={() => setCondition('refurbished')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                condition === 'refurbished'
                  ? 'bg-white text-black'
                  : 'text-[#a3a3a3] hover:text-[#fafafa]'
              }`}
            >
              Refurbished
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <svg 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a3a3a3]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products by name, category, or specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#141414] border border-[#262626] rounded-xl text-[#fafafa] placeholder-[#525252] focus:outline-none focus:border-[#3b82f6] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#525252] hover:text-[#a3a3a3] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => {
            const bestPrice = getBestPrice(product)
            const worstPrice = getWorstPrice(product)
            const savings = worstPrice && bestPrice ? Math.round(((worstPrice.price - bestPrice.price) / worstPrice.price) * 100) : 0
            const year = product.releaseDate ? new Date(product.releaseDate).getFullYear() : null
            
            // Use live prices from the product data directly (no separate matching needed)
            // The product already has the latest prices from the backend
            const retailers = product.prices || {}
            let livePriceData = null
            let lowestPrice = null
            
            // Filter out retailers with known bad stock data
            const badStockRetailers = ['bh'] // B&H reports out of stock incorrectly
            
            Object.entries(retailers).forEach(([retailer, info]) => {
              // Skip retailers with known bad stock data or out of stock
              if (info && info.price && !badStockRetailers.includes(retailer) && info.inStock !== false) {
                if (!lowestPrice || info.price < lowestPrice) {
                  lowestPrice = info.price
                  livePriceData = { price: info.price, retailer }
                }
              }
            })
            
            const hasLivePrice = livePriceData && livePriceData.price > 0
            
            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block bg-[#141414] border border-[#262626] rounded-2xl p-5 hover:border-[#333] transition-all"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-1">
                  <span className="inline-block px-2 py-1 rounded text-xs font-medium uppercase tracking-wider bg-[#3b82f6]/20 text-[#3b82f6]">
                    {product.category}
                  </span>
                  <div className="text-right">
                    {bestPrice && year ? (
                      <span className="text-sm text-[#a3a3a3]">{bestPrice.retailer} • {year}</span>
                    ) : bestPrice ? (
                      <span className="text-sm text-[#a3a3a3]">{bestPrice.retailer}</span>
                    ) : year ? (
                      <span className="text-sm text-[#a3a3a3]">{year}</span>
                    ) : null}
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-semibold text-[#fafafa] mb-3">
                  {product.name}
                </h3>

                {/* Specs */}
                {product.specs && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <span key={key} className="text-xs px-2.5 py-1.5 rounded-lg bg-[#0a0a0a] border border-[#262626] text-[#a3a3a3] uppercase">
                        {key}: <span className="text-[#fafafa]">{value}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Price Section */}
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-xs text-[#a3a3a3] uppercase tracking-wider mb-1">
                      {hasLivePrice ? 'Live Price' : 'Best Price'}
                    </p>
                    <p className="text-3xl font-bold text-[#fafafa]">
                      {formatPrice(hasLivePrice ? livePriceData.price : (bestPrice?.price || 0))}
                    </p>
                    <p className="text-sm text-[#10b981]">
                      {hasLivePrice ? 'Just updated' : `at ${bestPrice?.retailer}`}
                    </p>
                  </div>
                  {savings > 0 && worstPrice && (
                    <div className="text-right">
                      <p className="text-sm text-[#a3a3a3]">MSRP {formatPrice(worstPrice.price)}</p>
                      <span className="inline-block mt-1 text-sm font-medium text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-lg">
                        -{savings}% savings
                      </span>
                    </div>
                  )}
                </div>

                {/* Buy From Section */}
                <div className="border-t border-[#262626] pt-4">
                  <p className="text-xs text-[#a3a3a3] uppercase tracking-wider mb-3">Buy From</p>
                  <div className="space-y-2">
                    {(() => {
                      // Convert prices to array format
                      const pricesArray = Array.isArray(product.prices)
                        ? product.prices
                        : Object.entries(product.prices)
                            .filter(([_, data]) => data && typeof data === 'object')
                            .map(([retailer, data]) => ({ retailer, ...data }))
                      
                      return pricesArray
                        .filter(p => p.price)
                        .sort((a, b) => a.price - b.price)
                        .slice(0, 3)
                        .map((price, i) => (
                          <div
                            key={i}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(price.url || '#', '_blank', 'noopener,noreferrer');
                            }}
                            className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-xl hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                          >
                            <span className="text-[#fafafa] font-medium capitalize">{price.retailer}</span>
                              {price.inStock === false && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">Out of Stock</span>
                              )}
                            <div className="flex items-center gap-3">
                              <span className={`font-bold ${price.price === bestPrice?.price ? 'text-[#10b981]' : 'text-[#fafafa]'}`}>
                                {formatPrice(price.price)}
                              </span>
                              <span className="px-3 py-1.5 text-sm bg-[#262626] text-[#a3a3a3] rounded-lg hover:bg-[#333] transition-colors">
                                Visit
                              </span>
                            </div>
                          </div>
                        ))
                    })()}
                    
                    {(() => {
                      const pricesArray = Array.isArray(product.prices)
                        ? product.prices
                        : Object.entries(product.prices)
                            .filter(([_, data]) => data && typeof data === 'object')
                            .map(([retailer, data]) => ({ retailer, ...data }))
                      const pricedProducts = pricesArray.filter(p => p.price)
                      return pricedProducts.length > 3 ? (
                        <div className="flex items-center justify-between p-3 text-[#a3a3a3]">
                          <span>More retailers</span>
                          <span className="flex items-center gap-1">
                            +{pricedProducts.length - 3}
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      ) : null
                    })()
                    }
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#a3a3a3] text-lg">No products found</p>
            <p className="text-[#a3a3a3] text-sm mt-2">Try a different category</p>
          </div>
        )}
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

export default ProductCatalog
