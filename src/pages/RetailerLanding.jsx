import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom'
import { ExternalLink, Store, TrendingDown, Grid3X3, List, ArrowLeft } from 'lucide-react'
import RetailerSortDropdown from '../components/RetailerSortDropdown'

const API_BASE_URL = 'https://theresmac-backend.fly.dev'

// Retailer configuration
const RETAILER_CONFIG = {
  amazon: {
    name: 'Amazon',
    displayName: 'Amazon',
    color: '#FF9900',
    description: 'The world\'s largest online retailer with fast Prime shipping and reliable customer service.',
    pros: ['Prime shipping', 'Easy returns', 'Price protection'],
    cons: ['Sometimes higher prices', 'Counterfeit concerns with 3rd party sellers'],
  },
  bestbuy: {
    name: 'Best Buy',
    displayName: 'Best Buy',
    color: '#0046BE',
    description: 'Authorized Apple reseller with physical store locations across the US.',
    pros: ['Physical stores', 'Geek Squad support', 'Price matching'],
    cons: ['Limited online discounts', 'Sales tax in most states'],
  },
  bh: {
    name: 'B&H Photo',
    displayName: 'B&H Photo',
    color: '#E53935',
    description: 'Trusted New York-based retailer specializing in electronics.',
    pros: ['No sales tax outside NY/NJ', 'Expert staff', 'Business accounts'],
    cons: ['No physical stores outside NYC', 'Closed for Jewish holidays'],
  },
  ebay: {
    name: 'eBay',
    displayName: 'eBay',
    color: '#E53238',
    description: 'New and used Apple products at competitive prices.',
    pros: ['Lowest prices on used/refurb', 'Money Back Guarantee', 'Auction format'],
    cons: ['Variable seller quality', 'Longer shipping times'],
  },
  apple: {
    name: 'Apple',
    displayName: 'Apple Store',
    color: '#86868B',
    description: 'Buying directly from Apple ensures authentic products and full warranty coverage.',
    pros: ['Full Apple warranty', 'AppleCare+ available', 'Trade-in program'],
    cons: ['Rarely discounted', 'No price matching'],
  },
  walmart: {
    name: 'Walmart',
    displayName: 'Walmart',
    color: '#FFC220',
    description: 'Competitive pricing on Apple products with convenient in-store pickup.',
    pros: ['Store pickup available', 'Walmart+ benefits', 'Price matching'],
    cons: ['Limited selection', 'Inconsistent stock'],
  },
  target: {
    name: 'Target',
    displayName: 'Target',
    color: '#CC0000',
    description: 'Apple products with RedCard discounts and same-day pickup.',
    pros: ['RedCard 5% discount', 'Same Day Delivery', 'Drive Up pickup'],
    cons: ['No MacBooks or Mac desktops', 'Limited selection'],
  },
  adorama: {
    name: 'Adorama',
    displayName: 'Adorama',
    color: '#F37021',
    description: 'New York-based authorized Apple reseller with competitive pricing.',
    pros: ['No sales tax outside NY/NJ', 'Professional support', 'Trade-ins'],
    cons: ['Limited physical presence', 'Smaller selection'],
  },
  microcenter: {
    name: 'Micro Center',
    displayName: 'Micro Center',
    color: '#00A651',
    description: 'Computer and electronics retailer with physical stores.',
    pros: ['In-store only deals', 'Knowledgeable staff', 'Price matching'],
    cons: ['Limited locations', 'In-store pickup often required'],
  },
  backmarket: {
    name: 'Back Market',
    displayName: 'Back Market',
    color: '#00C853',
    description: 'Leading marketplace for refurbished electronics.',
    pros: ['Significant savings', '1-year warranty', '30-day returns'],
    cons: ['All products are refurbished', 'Not latest generation models'],
  }
}

const RetailerLanding = () => {
  const { retailerId } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Read view/sort mode from URL or default
  const viewMode = searchParams.get('view') || 'grid'
  const sortBy = searchParams.get('sort') || 'savings'

  const retailer = RETAILER_CONFIG[retailerId]

  // Fetch products on mount
  useEffect(() => {
    if (!retailer) {
      navigate('/')
      return
    }
    fetchProducts()
  }, [retailerId])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/products`)
      const data = await response.json()
      setAllProducts(data || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setAllProducts([])
    } finally {
      setLoading(false)
    }
  }

  // Process products
  const products = useMemo(() => {
    if (allProducts.length === 0) return []

    // Format products with retailer-specific data
    let formatted = allProducts.map(product => {
      const pricesData = product.prices || {}
      const pricesArray = Array.isArray(pricesData) 
        ? pricesData 
        : Object.entries(pricesData).map(([retailer, data]) => ({ retailer, ...data }))
      
      const retailerPrice = pricesArray.find(p => 
        p.retailer?.toLowerCase() === retailerId.toLowerCase()
      )
      const lowestPrice = retailerPrice?.price || product.msrp
      
      return {
        ...product,
        retailerPrice: lowestPrice,
        retailerUrl: retailerPrice?.url,
        isInStock: retailerPrice?.inStock ?? product.in_stock ?? false,
        savings: product.msrp - lowestPrice,
        savingsPercent: product.msrp > 0 
          ? Math.round(((product.msrp - lowestPrice) / product.msrp) * 100)
          : 0
      }
    })

    // Filter: Target doesn't sell Macs
    if (retailerId === 'target') {
      formatted = formatted.filter(p => p.category !== 'mac')
    }

    // Sort
    const sorted = [...formatted]
    switch (sortBy) {
      case 'price':
        sorted.sort((a, b) => (a.retailerPrice || 0) - (b.retailerPrice || 0))
        break
      case 'price-desc':
        sorted.sort((a, b) => (b.retailerPrice || 0) - (a.retailerPrice || 0))
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'savings':
      default:
        sorted.sort((a, b) => (b.savingsPercent || 0) - (a.savingsPercent || 0))
        break
    }

    return sorted
  }, [allProducts, retailerId, sortBy])

  // Update URL param
  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams)
    if (value && value !== 'grid') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    setSearchParams(params, { replace: true })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price || 0)
  }

  if (!retailer) return null

  const inStockCount = products.filter(p => p.isInStock).length
  const avgSavings = products.length > 0
    ? Math.round(products.reduce((acc, p) => acc + (p.savingsPercent || 0), 0) / products.length)
    : 0

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-gray-500 hover:text-white flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Hero */}
        <div 
          className="border rounded-2xl p-8 mb-8"
          style={{ borderColor: `${retailer.color}40`, backgroundColor: `${retailer.color}10` }}
        >
          <div className="flex items-start gap-6 flex-wrap">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: retailer.color, color: '#000' }}
            >
              {retailer.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {retailer.displayName} Apple Deals
              </h1>
              <p className="text-gray-400 mb-4 max-w-2xl">
                {retailer.description}
              </p>
              
              <div className="flex gap-6">
                <div>
                  <div className="text-2xl font-bold text-white">{products.length}</div>
                  <div className="text-sm text-gray-500">Products</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{inStockCount}</div>
                  <div className="text-sm text-gray-500">In Stock</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{avgSavings}%</div>
                  <div className="text-sm text-gray-500">Avg Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4">
            <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Pros</h3>
            <ul className="space-y-2">
              {retailer.pros.map((pro, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-green-400">✓</span> {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-4">
            <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-3">Considerations</h3>
            <ul className="space-y-2">
              {retailer.cons.map((con, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-amber-400">!</span> {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sort & View toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Products</h2>
          <div className="flex items-center gap-3">
            <RetailerSortDropdown value={sortBy} onChange={(v) => updateParam('sort', v)} />
            <div className="flex items-center bg-[#262626] rounded-lg p-1">
            <button
              onClick={() => updateParam('view', 'grid')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-[#3b82f6] text-white' : 'text-gray-400'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => updateParam('view', 'list')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-[#3b82f6] text-white' : 'text-gray-400'}`}
            >
              <List className="w-4 h-4" />
            </button>
            </div>
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#141414] border border-[#262626] rounded-xl p-5 animate-pulse h-48" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <Store className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-[#141414] border border-[#262626] hover:border-[#333] rounded-xl p-5 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 uppercase">{product.category}</span>
                  {product.isInStock ? (
                    <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded">In Stock</span>
                  ) : (
                    <span className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded">Out</span>
                  )}
                </div>

                <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {product.specs && (
                  <div className="text-sm text-gray-500 mb-3 space-y-0.5">
                    {product.specs.chip && <div>• {product.specs.chip}</div>}
                    {product.specs.storage && <div>• {product.specs.storage}</div>}
                  </div>
                )}

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xl font-bold text-white">
                    {formatPrice(product.retailerPrice)}
                  </span>
                  {product.savings > 0 && (
                    <span className="text-sm text-green-400 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {product.savingsPercent}%
                    </span>
                  )}
                </div>
                {product.savings > 0 && (
                  <div className="text-sm text-gray-500">
                    <span className="line-through">{formatPrice(product.msrp)}</span>
                    <span className="text-green-400 ml-2">Save {formatPrice(product.savings)}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {products.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-[#141414] border border-[#262626] hover:border-[#333] rounded-xl p-4 transition-all group flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500 uppercase">{product.category}</span>
                    {product.isInStock ? (
                      <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded">In Stock</span>
                    ) : (
                      <span className="text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded">Out</span>
                    )}
                  </div>
                  <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors truncate">
                    {product.name}
                  </h3>
                  {product.specs?.chip && (
                    <div className="text-sm text-gray-500">{product.specs.chip} • {product.specs.storage}</div>
                  )}
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-lg font-bold text-white">
                      {formatPrice(product.retailerPrice)}
                    </span>
                    {product.savings > 0 && (
                      <span className="text-sm text-green-400">-{product.savingsPercent}%</span>
                    )}
                  </div>
                  {product.savings > 0 && (
                    <div className="text-sm text-gray-500">
                      <span className="line-through">{formatPrice(product.msrp)}</span>
                    </div>
                  )}
                </div>

                <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RetailerLanding
