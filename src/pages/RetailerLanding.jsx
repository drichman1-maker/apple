import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ExternalLink, Store, TrendingDown } from 'lucide-react'

const API_BASE_URL = 'https://theresmac-backend.fly.dev'

// Retailer configuration
const RETAILER_CONFIG = {
  amazon: {
    name: 'Amazon',
    displayName: 'Amazon',
    color: '#FF9900',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    description: 'The world\'s largest online retailer with fast Prime shipping and reliable customer service. Amazon offers competitive pricing on Apple products with frequent discounts during Prime Day and Black Friday.',
    pros: ['Prime shipping', 'Easy returns', 'Price protection', 'Customer reviews'],
    cons: ['Sometimes higher prices than competitors', 'Counterfeit concerns with 3rd party sellers'],
    logo: 'AM'
  },
  bestbuy: {
    name: 'Best Buy',
    displayName: 'Best Buy',
    color: '#0046BE',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    description: 'Best Buy is an authorized Apple reseller with physical store locations across the US. They offer Geek Squad support, price matching, and the My Best Buy rewards program.',
    pros: ['Physical stores', 'Geek Squad support', 'Price matching', 'Store pickup'],
    cons: ['Limited online discounts', 'Sales tax in most states'],
    logo: 'BB'
  },
  bh: {
    name: 'B&H Photo',
    displayName: 'B&H Photo',
    color: '#E53935',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    description: 'B&H Photo Video is a trusted New York-based retailer specializing in electronics. Known for excellent customer service and tax-free shipping outside NY/NJ.',
    pros: ['No sales tax outside NY/NJ', 'Expert staff', 'Business accounts', 'Fast shipping'],
    cons: ['No physical stores outside NYC', 'Closed for Jewish holidays'],
    logo: 'BH'
  },
  ebay: {
    name: 'eBay',
    displayName: 'eBay',
    color: '#E53238',
    bgColor: 'bg-amber-600/10',
    borderColor: 'border-amber-600/30',
    description: 'eBay offers both new and used Apple products at competitive prices. Buy from authorized sellers or find deals on refurbished and open-box items with eBay\'s Money Back Guarantee.',
    pros: ['Lowest prices on used/refurb', 'eBay Money Back Guarantee', 'Auction format options', 'Global marketplace'],
    cons: ['Variable seller quality', 'Longer shipping times', 'No manufacturer warranty on used'],
    logo: 'EB'
  },
  apple: {
    name: 'Apple',
    displayName: 'Apple Store',
    color: '#86868B',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    description: 'Buying directly from Apple ensures authentic products, full warranty coverage, and the ability to use AppleCare+. The Apple Store offers trade-ins, financing options, and the best customer support experience.',
    pros: ['Full Apple warranty', 'AppleCare+ available', 'Trade-in program', 'Expert support', 'Latest stock'],
    cons: ['Rarely discounted', 'No price matching', 'Sales tax in all states'],
    logo: 'AP'
  },
  walmart: {
    name: 'Walmart',
    displayName: 'Walmart',
    color: '#FFC220',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    description: 'Walmart offers competitive pricing on Apple products with the convenience of in-store pickup and their extensive retail network. Walmart+ members get free shipping.',
    pros: ['Store pickup available', 'Walmart+ benefits', 'Price matching', 'Easy returns'],
    cons: ['Limited selection online', 'Inconsistent stock'],
    logo: 'WM'
  },
  adorama: {
    name: 'Adorama',
    displayName: 'Adorama',
    color: '#F37021',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    description: 'Adorama is a New York-based authorized Apple reseller known for competitive pricing and professional customer service. They offer tax-free shipping outside NY/NJ.',
    pros: ['No sales tax outside NY/NJ', 'Professional support', 'Business accounts', 'Trade-ins'],
    cons: ['Limited physical presence', 'Smaller selection than major retailers'],
    logo: 'AD'
  },
  target: {
    name: 'Target',
    displayName: 'Target',
    color: '#CC0000',
    bgColor: 'bg-red-600/10',
    borderColor: 'border-red-600/30',
    description: 'Target offers Apple products with RedCard discounts and the convenience of same-day pickup. Great for iPhone, iPad, Apple Watch, and AirPods — but does not sell Mac computers.',
    pros: ['RedCard 5% discount', 'Same Day Delivery', 'Drive Up pickup', 'Circle rewards'],
    cons: ['No MacBooks or Mac desktops', 'Limited selection'],
    logo: 'TG'
  }
}

const RetailerLanding = () => {
  const { retailerId } = useParams()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('savings')

  const retailer = RETAILER_CONFIG[retailerId]

  useEffect(() => {
    if (!retailer) {
      navigate('/')
      return
    }

    fetchProducts()
  }, [retailerId])

  useEffect(() => {
    if (allProducts.length === 0) return

    const formatted = allProducts.map(product => {
      // Handle both array and object formats for prices
      const pricesData = product.prices || {}
      const pricesArray = Array.isArray(pricesData) 
        ? pricesData 
        : Object.entries(pricesData).map(([retailer, data]) => ({ retailer, ...data }))
      
      const hasRetailer = pricesArray.some(p => p.retailer?.toLowerCase() === retailerId.toLowerCase())
      const retailerPrice = pricesArray.find(p => p.retailer?.toLowerCase() === retailerId.toLowerCase())
      const lowestPrice = retailerPrice?.price || product.lowest_price || product.msrp
      
      return {
        ...product,
        hasRetailer,
        retailerPrice: lowestPrice,
        retailerUrl: retailerPrice?.url,
        savings: product.msrp - lowestPrice,
        savingsPercent: product.msrp > 0 
          ? Math.round(((product.msrp - lowestPrice) / product.msrp) * 100)
          : 0
      }
    }).filter(p => {
      if (retailerId === 'target' && p.category === 'mac') return false
      return true
    })

    const sorted = formatted.sort((a, b) => {
      if (sortBy === 'savings') return b.savings - a.savings
      if (sortBy === 'price') return a.retailerPrice - b.retailerPrice
      return (a.model || '').localeCompare(b.model || '')
    })

    setProducts(sorted)
  }, [allProducts, sortBy, retailerId])

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price || 0)
  }

  if (!retailer) return null

  const inStockCount = products.filter(p => p.in_stock && p.hasRetailer).length
  const avgSavings = products.length > 0
    ? Math.round(products.reduce((acc, p) => acc + p.savingsPercent, 0) / products.length)
    : 0

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <title>{`${retailer.displayName} Apple Deals — Best Prices at ${retailer.name} | TheresMac`}</title>
      <meta name="description" content={`Find the best Apple deals at ${retailer.name}. Compare prices on iPhone, iPad, Mac, Apple Watch, and AirPods. Track savings and set price alerts.`} />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-300">{retailer.displayName}</span>
        </nav>

        {/* Hero Section */}
        <div className={`${retailer.bgColor} border ${retailer.borderColor} rounded-2xl p-8 mb-8`}>
          <div className="flex items-start gap-6 flex-wrap">
            <div 
              className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: retailer.color, color: '#000' }}
            >
              {retailer.logo}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {retailer.displayName} Apple Deals
              </h1>
              <p className="text-gray-400 text-lg mb-4 max-w-3xl">
                {retailer.description}
              </p>
              
              {/* Stats */}
              <div className="flex gap-6 mb-4">
                <div>
                  <div className="text-2xl font-bold text-white">{products.length}</div>
                  <div className="text-sm text-gray-500">Products Tracked</div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Store className="w-5 h-5 text-green-400" />
              {retailer.name} Advantages
            </h2>
            <ul className="space-y-2">
              {retailer.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                  <span className="text-green-400 mt-1">✓</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-amber-400" />
              Considerations
            </h2>
            <ul className="space-y-2">
              {retailer.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                  <span className="text-amber-400 mt-1">!</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            Available Products ({products.length})
          </h2>
          <div className="flex gap-2">
            {['savings', 'price', 'name'].map((sort) => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === sort
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#262626]'
                }`}
              >
                Sort by {sort.charAt(0).toUpperCase() + sort.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => {
              const currentPrice = product.retailerPrice
              const currentSavings = product.savings
              const currentSavingsPercent = product.savingsPercent

              return (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-[#141414] border border-[#262626] hover:border-[#333] rounded-xl p-5 transition-all group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</span>
                      <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                        {product.model}
                      </h3>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="text-sm text-gray-500 mb-4">
                    {product.specs?.chip && `• ${product.specs.chip}`}
                    {product.specs?.storage && ` • ${product.specs.storage}`}
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold text-white">
                          {formatPrice(currentPrice)}
                        </span>
                        {currentSavings > 0 && (
                          <span className="text-sm text-green-400">-{currentSavingsPercent}%</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        MSRP: {formatPrice(product.msrp)}
                        {currentSavings > 0 && (
                          <span className="text-green-400 ml-2">Save {formatPrice(currentSavings)}</span>
                        )}
                      </div>
                    </div>
                    
                    {!product.hasRetailer && (
                      <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded">
                        Price via 3rd party
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="mt-4 pt-4 border-t border-[#262626] flex items-center justify-between">
                    <span className={`text-sm ${product.in_stock ? 'text-green-400' : 'text-red-400'}`}>
                      {product.in_stock ? '✓ In Stock' : '✗ Out of Stock'}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 bg-[#141414] border border-[#262626] rounded-xl p-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Why Buy Apple Products at {retailer.name}?
          </h2>
          <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
            <p className="mb-4">
              {retailer.name} is one of TheresMac's tracked retailers for Apple products. 
              We monitor prices on {products.filter(p => p.category === 'iphone').length} iPhone models, 
              {' '}{products.filter(p => p.category === 'mac').length} Mac computers, 
              {' '}{products.filter(p => p.category === 'ipad').length} iPad models, 
              {' '}{products.filter(p => p.category === 'watch').length} Apple Watch variants, and 
              {' '}{products.filter(p => p.category === 'airpods').length} AirPods options.
            </p>
            <p className="mb-4">
              {retailerId === 'target' 
                ? `Note: Target does not sell MacBook or Mac desktop computers. For Mac pricing, check Amazon, Best Buy, B&H, Apple, or other retailers.`
                : `Current average savings at ${retailer.name} is ${avgSavings}%. Prices are updated in real-time from our tracking system.`
              }
            </p>
            <p>
              Use TheresMac to compare {retailer.name} prices against other retailers like 
              {Object.keys(RETAILER_CONFIG).filter(r => r !== retailerId).slice(0, 3).join(', ')}, 
              and more. Set price alerts to get notified when your desired product drops in price at {retailer.name} or any other retailer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RetailerLanding
