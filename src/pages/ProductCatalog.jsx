import React, { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Disclaimer from '../components/Layout/Disclaimer'
import SortDropdown from '../components/SortDropdown'
import ConditionToggle from '../components/ConditionToggle'

const ProductCatalog = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [condition, setCondition] = useState('new')

  const categories = ['All', 'MacBook', 'Mac', 'iPad', 'iPhone', 'Watch', 'AirPods', 'Accessories']

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'deals', label: 'Best Deals' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ]

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
    
    const inStockPrices = pricesArray.filter(p => p.inStock !== false && p.price)
    if (inStockPrices.length > 0) {
      return inStockPrices.reduce((min, p) => p.price < min.price ? p : min, inStockPrices[0])
    }
    
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

  const getProductPrice = (product, type = 'best') => {
    if (!product?.prices) return null
    const pricesArray = Array.isArray(product.prices) 
      ? product.prices 
      : Object.entries(product.prices)
          .filter(([_, data]) => data && typeof data === 'object' && data.price)
          .map(([retailer, data]) => ({ retailer, ...data }))
    
    if (!pricesArray.length) return null
    
    if (type === 'best') {
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
    if (!product?.releaseDate) return new Date(0)
    const date = new Date(product.releaseDate)
    return isNaN(date.getTime()) ? new Date(0) : date
  }

  // Filter and sort - REBUILT FROM SCRATCH
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter(product => {
        const productCat = (product.category || '').toLowerCase()
        const productName = (product.name || '').toLowerCase()
        
        if (activeCategory === 'MacBook') {
          return productCat === 'mac' && productName.includes('macbook')
        } else if (activeCategory === 'Mac') {
          return productCat === 'mac' && !productName.includes('macbook')
        } else {
          return productCat === activeCategory.toLowerCase()
        }
      })
    }

    // Condition filter
    // Note: Products without a condition field are treated as 'new'
    result = result.filter(product => {
      const isRefurb = product.condition === 'refurbished'
      if (condition === 'refurbished') {
        return isRefurb
      }
      return !isRefurb
    })

    // Sorting - using new array to avoid mutation issues
    const sortedResult = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-low': {
          const aPrice = getProductPrice(a, 'best')?.price || Number.MAX_SAFE_INTEGER
          const bPrice = getProductPrice(b, 'best')?.price || Number.MAX_SAFE_INTEGER
          return aPrice - bPrice
        }
        
        case 'price-high': {
          const aPrice = getProductPrice(a, 'best')?.price || 0
          const bPrice = getProductPrice(b, 'best')?.price || 0
          return bPrice - aPrice
        }
        
        case 'deals': {
          const aSavings = getSavingsPercentage(a)
          const bSavings = getSavingsPercentage(b)
          return bSavings - aSavings
        }
        
        case 'newest':
        default: {
          const aDate = getProductReleaseDate(a).getTime()
          const bDate = getProductReleaseDate(b).getTime()
          if (aDate === bDate) {
            return (a.name || '').localeCompare(b.name || '')
          }
          return bDate - aDate
        }
      }
    })

    return sortedResult
  }, [products, activeCategory, condition, sortBy])

  // Get counts
  const getCategoryCount = (cat) => {
    return products.filter(p => {
      // First apply condition filter to counts
      if (condition === 'refurbished') {
        if (p.condition !== 'refurbished') return false
      } else {
        if (p.condition === 'refurbished') return false
      }
      
      // Then apply category filter
      if (cat === 'All') return true
      const productCat = (p.category || '').toLowerCase()
      const productName = (p.name || '').toLowerCase()
      if (cat === 'MacBook') return productCat === 'mac' && productName.includes('macbook')
      if (cat === 'Mac') return productCat === 'mac' && !productName.includes('macbook')
      return productCat === cat.toLowerCase()
    }).length
  }

  const getConditionCounts = () => {
    let newCount = 0
    let refurbCount = 0
    
    products.forEach(p => {
      if (activeCategory !== 'All') {
        const productCat = (p.category || '').toLowerCase()
        const productName = (p.name || '').toLowerCase()
        let matches = false
        if (activeCategory === 'MacBook') {
          matches = productCat === 'mac' && productName.includes('macbook')
        } else if (activeCategory === 'Mac') {
          matches = productCat === 'mac' && !productName.includes('macbook')
        } else {
          matches = productCat === activeCategory.toLowerCase()
        }
        if (!matches) return
      }
      
      if (p.condition === 'refurbished') {
        refurbCount++
      } else {
        newCount++
      }
    })
    
    return { newCount, refurbCount }
  }

  const { newCount, refurbCount } = getConditionCounts()

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
            <SortDropdown 
              value={sortBy} 
              onChange={setSortBy} 
              options={sortOptions} 
            />
            <ConditionToggle 
              value={condition} 
              onChange={setCondition}
              newCount={newCount}
              refurbCount={refurbCount}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

                <h3 className="text-xl font-semibold text-[#fafafa] mb-3">
                  {product.name}
                </h3>

                {product.specs && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <span key={key} className="text-xs px-2.5 py-1.5 rounded-lg bg-[#0a0a0a] border border-[#262626] text-[#a3a3a3] uppercase">
                        {key}: <span className="text-[#fafafa]">{value}</span>
                      </span>
                    ))}
                  </div>
                )}

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