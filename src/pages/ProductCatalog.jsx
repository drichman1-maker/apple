import React, { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Disclaimer from '../components/Layout/Disclaimer'

const ProductCatalog = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [condition, setCondition] = useState('new')

  const categories = ['All', 'MacBook', 'Mac', 'iPad', 'iPhone', 'Watch', 'AirPods', 'Accessories']

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (category) {
      const formatted = category.charAt(0).toUpperCase() + category.slice(1)
      const matched = categories.find(c => c.toLowerCase() === formatted.toLowerCase())
      if (matched) setActiveCategory(matched)
    }
  }, [category])

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://theresmac-backend.fly.dev/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
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
    
    // First try in-stock prices
    const inStockPrices = pricesArray.filter(p => p.inStock !== false && p.price)
    if (inStockPrices.length > 0) {
      return inStockPrices.reduce((min, p) => p.price < min.price ? p : min, inStockPrices[0])
    }
    
    // Fall back to any price (even out of stock)
    const anyPrices = pricesArray.filter(p => p.price)
    if (anyPrices.length > 0) {
      const best = anyPrices.reduce((min, p) => p.price < min.price ? p : min, anyPrices[0])
      return { ...best, outOfStock: true }
    }
    
    return null
  }

  const getWorstPrice = (product) => {
    if (!product?.prices) return null
    const pricesArray = Array.isArray(product.prices) 
      ? product.prices 
      : Object.entries(product.prices)
          .filter(([_, data]) => data && typeof data === 'object')
          .map(([retailer, data]) => ({ retailer, ...data }))
    
    const pricedProducts = pricesArray.filter(p => p.price)
    if (pricedProducts.length === 0) return null
    return pricedProducts.reduce((max, p) => p.price > max.price ? p : max, pricedProducts[0])
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price || 0)
  }

  // Helper functions for robust sorting
  const getProductPrice = (product, type = 'best') => {
    if (!product?.prices) return null
    const pricesArray = Array.isArray(product.prices) 
      ? product.prices 
      : Object.entries(product.prices)
          .filter(([_, data]) => data && typeof data === 'object' && data.price)
          .map(([retailer, data]) => ({ retailer, ...data }))
    
    if (!pricesArray.length) return null
    
    if (type === 'best') {
      // Prefer in-stock prices
      const inStockPrices = pricesArray.filter(p => p.inStock !== false)
      const targetPrices = inStockPrices.length > 0 ? inStockPrices : pricesArray
      return targetPrices.reduce((min, curr) => curr.price < min.price ? curr : min, targetPrices[0])
    } else if (type === 'worst') {
      return pricesArray.reduce((max, curr) => curr.price > max.price ? curr : max, pricesArray[0])
    }
    return null
  }

  const getSavingsPercentage = (product) => {
    const bestPrice = getProductPrice(product, 'best')
    const worstPrice = getProductPrice(product, 'worst')
    
    if (!bestPrice?.price || !worstPrice?.price || worstPrice.price <= bestPrice.price) {
      return 0
    }
    
    return (worstPrice.price - bestPrice.price) / worstPrice.price
  }

  const getProductReleaseDate = (product) => {
    if (!product?.releaseDate) return new Date(0) // Fallback to epoch
    const date = new Date(product.releaseDate)
    return isNaN(date.getTime()) ? new Date(0) : date
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    console.log('[ProductCatalog] Filtering - activeCategory:', activeCategory, 'products count:', products.length)
    let result = [...products] // Always work with a copy

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter(product => {
        const productCat = (product.category || '').toLowerCase()
        const productName = (product.name || '').toLowerCase()
        
        let matches = false
        if (activeCategory === 'MacBook') {
          matches = productCat === 'mac' && productName.includes('macbook')
        } else if (activeCategory === 'Mac') {
          matches = productCat === 'mac' && !productName.includes('macbook')
        } else {
          matches = productCat === activeCategory.toLowerCase()
        }
        return matches
      })
      console.log('[ProductCatalog] After category filter:', result.length)
    }

    // Condition filter
    result = result.filter(product => {
      if (condition === 'refurbished') {
        return product.condition === 'refurbished'
      }
      return product.condition !== 'refurbished'
    })

    // Robust sorting with proper fallbacks
    result.sort((a, b) => {
      try {
        switch (sortBy) {
          case 'price-low': {
            const aPriceData = getProductPrice(a, 'best')
            const bPriceData = getProductPrice(b, 'best')
            const aPrice = aPriceData?.price || Number.MAX_SAFE_INTEGER
            const bPrice = bPriceData?.price || Number.MAX_SAFE_INTEGER
            return aPrice - bPrice
          }
          
          case 'price-high': {
            const aPriceData = getProductPrice(a, 'best')
            const bPriceData = getProductPrice(b, 'best')
            const aPrice = aPriceData?.price || 0
            const bPrice = bPriceData?.price || 0
            return bPrice - aPrice
          }
          
          case 'deals': {
            const aSavings = getSavingsPercentage(a)
            const bSavings = getSavingsPercentage(b)
            
            // Sort by savings percentage first, then by actual savings amount
            if (Math.abs(aSavings - bSavings) > 0.01) {
              return bSavings - aSavings
            }
            
            // Secondary sort by absolute savings amount
            const aBest = getProductPrice(a, 'best')?.price || 0
            const aWorst = getProductPrice(a, 'worst')?.price || 0
            const bBest = getProductPrice(b, 'best')?.price || 0
            const bWorst = getProductPrice(b, 'worst')?.price || 0
            const aAmount = aWorst - aBest
            const bAmount = bWorst - bBest
            return bAmount - aAmount
          }
          
          case 'newest':
          case 'default':
          default: {
            const aDate = getProductReleaseDate(a)
            const bDate = getProductReleaseDate(b)
            const dateDiff = bDate.getTime() - aDate.getTime()
            
            // If dates are the same or missing, sort by name for consistency
            if (dateDiff === 0) {
              const aName = (a.name || '').toLowerCase()
              const bName = (b.name || '').toLowerCase()
              return aName.localeCompare(bName)
            }
            
            return dateDiff
          }
        }
      } catch (error) {
        console.error('[ProductCatalog] Sort error:', error)
        // Fallback to name sorting if anything goes wrong
        const aName = (a.name || '').toLowerCase()
        const bName = (b.name || '').toLowerCase()
        return aName.localeCompare(bName)
      }
    })

    console.log('[ProductCatalog] Sort applied:', sortBy, 'Result count:', result.length)
    return result
  }, [products, activeCategory, condition, sortBy])

  // Get counts for each category
  const getCategoryCount = (cat) => {
    return products.filter(p => {
      if (condition === 'refurbished' ? p.condition !== 'refurbished' : p.condition === 'refurbished') {
        return false
      }
      if (cat === 'All') return true
      const productCat = p.category?.toLowerCase() || ''
      const productName = p.name?.toLowerCase() || ''
      if (cat === 'MacBook') return productCat === 'mac' && productName.includes('macbook')
      if (cat === 'Mac') return productCat === 'mac' && !productName.includes('macbook')
      return productCat === cat.toLowerCase()
    }).length
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
      <main className="max-w-[1200px] mx-auto px-6 py-6">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => {
            const count = getCategoryCount(cat)
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat
                    ? 'bg-white text-black border-white'
                    : 'bg-[#141414] text-[#a3a3a3] border-[#262626] hover:border-[#333] hover:text-[#fafafa]'
                }`}
              >
                {cat} {count > 0 && <span className="opacity-50">({count})</span>}
              </button>
            )
          })}
        </div>

        {/* Results Count & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <p className="text-[#a3a3a3] text-sm">
            Showing {filteredProducts.length} {condition} products
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </p>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#141414] border border-[#262626] text-[#fafafa] text-sm font-medium rounded-full px-4 py-2 pr-8 focus:outline-none focus:border-[#3b82f6] cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="deals">Sort: Best Deals</option>
              <option value="price-low">Sort: Price Low → High</option>
              <option value="price-high">Sort: Price High → Low</option>
            </select>

            {/* Condition Toggle */}
            <div className="flex items-center bg-[#141414] border border-[#262626] rounded-full p-1">
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
                Refurb
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div key={`grid-${activeCategory}-${condition}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {console.log('[ProductCatalog] Rendering grid with', filteredProducts.length, 'products')}
          {filteredProducts.map((product) => {
            const bestPrice = getBestPrice(product)
            const worstPrice = getWorstPrice(product)
            const savings = worstPrice && bestPrice ? Math.round(((worstPrice.price - bestPrice.price) / worstPrice.price) * 100) : 0
            const year = product.releaseDate ? new Date(product.releaseDate).getFullYear() : null
            
            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block bg-[#141414] border border-[#262626] rounded-2xl p-5 hover:border-[#333] transition-all"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                  <span className="inline-block px-2 py-1 rounded text-xs font-medium uppercase tracking-wider bg-[#3b82f6]/20 text-[#3b82f6]">
                    {product.category}
                  </span>
                  <div className="text-right">
                    {bestPrice?.outOfStock && (
                      <span className="text-xs text-red-400 mr-2">Out of Stock</span>
                    )}
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
                    <p className="text-xs text-[#a3a3a3] uppercase tracking-wider mb-0.5">
                      {bestPrice?.outOfStock ? 'Last Known Price' : 'Best Price'}
                    </p>
                    <p className="text-3xl font-bold text-[#fafafa]">
                      {formatPrice(bestPrice?.price)}
                    </p>
                    <p className="text-sm text-[#10b981]">
                      {bestPrice?.outOfStock ? 'Out of stock' : `at ${bestPrice?.retailer}`}
                    </p>
                  </div>
                  {savings > 0 && worstPrice && (
                    <div className="text-right">
                      <p className="text-sm text-[#a3a3a3] line-through">{formatPrice(worstPrice.price)}</p>
                      <span className="inline-block mt-1 text-sm font-medium text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-lg">
                        -{savings}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Retailer Links */}
                <div className="border-t border-[#262626] pt-4">
                  <p className="text-xs text-[#a3a3a3] uppercase tracking-wider mb-3">Buy From</p>
                  <div className="space-y-2">
                    {(() => {
                      const pricesArray = Array.isArray(product.prices)
                        ? product.prices
                        : Object.entries(product.prices || {})
                            .filter(([_, data]) => data && typeof data === 'object')
                            .map(([retailer, data]) => ({ retailer, ...data }))
                      
                      return pricesArray
                        .filter(p => p.price)
                        .sort((a, b) => a.price - b.price)
                        .slice(0, 3)
                        .map((price, i) => (
                          <a
                            key={i}
                            href={`/go/${price.retailer.toLowerCase()}?url=${encodeURIComponent(price.url || '')}&query=${encodeURIComponent(product.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                            className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-xl hover:bg-[#1a1a1a] transition-colors"
                          >
                            <span className="text-[#fafafa] font-medium capitalize">{price.retailer}</span>
                            <div className="flex items-center gap-3">
                              <span className={`font-bold ${price.price === bestPrice?.price ? 'text-[#10b981]' : 'text-[#fafafa]'}`}>
                                {formatPrice(price.price)}
                              </span>
                              <span className="px-3 py-1.5 text-sm bg-[#262626] text-[#a3a3a3] rounded-lg hover:bg-[#333]">
                                Visit
                              </span>
                            </div>
                          </a>
                        ))
                    })()}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#a3a3a3] text-lg">No products found</p>
            <p className="text-[#a3a3a3] text-sm mt-2">Try a different category or condition</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#262626] mt-16 py-8 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <Disclaimer />
          <p className="text-[#a3a3a3] text-sm mb-2">
            <Link to="/privacy" className="hover:text-[#3b82f6] mx-2">Privacy</Link>
            <span className="text-[#333]">|</span>
            <Link to="/terms" className="hover:text-[#3b82f6] mx-2">Terms</Link>
            <span className="text-[#333]">|</span>
            <Link to="/about" className="hover:text-[#3b82f6] mx-2">About</Link>
          </p>
          <p className="text-[#a3a3a3] text-sm">© 2026 TheresMac</p>
        </div>
      </footer>
    </div>
  )
}

export default ProductCatalog

// Build: 1774454765.6451268
