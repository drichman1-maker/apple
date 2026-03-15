import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, X, Share2, Check, ExternalLink, AlertCircle, Cpu, Monitor, Battery, HardDrive, Palette } from 'lucide-react'
import { getProducts } from '../api.js'

// Retailer labels and styling
const RETAILER_CONFIG = {
  apple: { label: 'Apple', color: 'text-gray-300', bg: 'bg-gray-500/10' },
  amazon: { label: 'Amazon', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  bestbuy: { label: 'Best Buy', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  bh: { label: 'B&H Photo', color: 'text-red-400', bg: 'bg-red-500/10' },
  adorama: { label: 'Adorama', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  microcenter: { label: 'Micro Center', color: 'text-amber-400', bg: 'bg-amber-500/10' },
}

// Spec icons mapping
const SPEC_ICONS = {
  chip: Cpu,
  processor: Cpu,
  display: Monitor,
  screen: Monitor,
  battery: Battery,
  storage: HardDrive,
  memory: HardDrive,
  ram: HardDrive,
  color: Palette,
  colors: Palette,
}

const Compare = () => {
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products: data } = await getProducts()
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.slice(0, 24))
        } else {
          setError('No products available')
        }
        setLoading(false)
      } catch (err) {
        console.error('API failed:', err.message)
        setError('Failed to load products. Please try again later.')
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const compareIds = params.get('compare')
    if (compareIds) {
      setSelectedProducts(compareIds.split(','))
    }
  }, [])

  const toggleProduct = (id) => {
    setSelectedProducts(prev => {
      if (prev.includes(id)) {
        return prev.filter(p => p !== id)
      }
      if (prev.length >= 4) return prev
      return [...prev, id]
    })
  }

  const shareComparison = () => {
    const url = new URL(window.location.href)
    url.searchParams.set('compare', selectedProducts.join(','))
    navigator.clipboard.writeText(url.toString())
    alert('Comparison link copied!')
  }

  const clearComparison = () => {
    setSelectedProducts([])
    window.history.replaceState({}, '', '/compare')
  }

  const selectedProductData = products.filter(p => selectedProducts.includes(p.id))

  // Get retailer URL from price data
  const getRetailerUrl = (priceData) => {
    return priceData?.affiliateUrl || priceData?.url || '#'
  }

  // Get all retailers sorted by price for a product
  const getRetailersSorted = (product) => {
    if (!product.prices) return []
    
    return Object.entries(product.prices)
      .filter(([, data]) => data && data.price > 0)
      .map(([retailer, data]) => ({ retailer, ...data }))
      .sort((a, b) => a.price - b.price)
  }

  // Get best price (lowest, prefer in-stock)
  const getBestPrice = (product) => {
    const retailers = getRetailersSorted(product)
    if (retailers.length === 0) return null
    
    const inStock = retailers.filter(p => p.inStock)
    return inStock.length > 0 ? inStock[0] : retailers[0]
  }

  // Get top 3 retailers
  const getTop3Retailers = (product) => {
    return getRetailersSorted(product).slice(0, 3)
  }

  // Get all unique spec keys from selected products
  const getAllSpecKeys = () => {
    const keys = new Set()
    selectedProductData.forEach(p => {
      if (p.specs) {
        Object.keys(p.specs).forEach(key => keys.add(key))
      }
    })
    return Array.from(keys)
  }

  const specKeys = getAllSpecKeys()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-400">Loading products...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-400">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Compare Products | MacTrackr</title>
        <meta name="description" content="Compare Apple products side-by-side. Find the best MacBook, iPhone, iPad, or Apple Watch for your needs." />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 mb-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </Link>
              <h1 className="text-3xl font-bold text-white">Compare Products</h1>
              <p className="text-gray-400 mt-1">Compare specs and find the best prices across retailers</p>
            </div>
            {selectedProducts.length > 0 && (
              <div className="flex gap-3">
                <button
                  onClick={shareComparison}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <button
                  onClick={clearComparison}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Product Selector */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">
              Select Products ({selectedProducts.length}/4)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {products.slice(0, 24).map(product => {
                const isSelected = selectedProducts.includes(product.id)
                const bestPrice = getBestPrice(product)
                
                return (
                  <button
                    key={product.id}
                    onClick={() => toggleProduct(product.id)}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-sm font-medium text-white truncate mb-1">{product.name}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {bestPrice ? (
                        <span className="flex items-center gap-1">
                          From ${bestPrice.price.toLocaleString()}
                          {bestPrice.verified && <span className="text-yellow-500">✓</span>}
                        </span>
                      ) : (
                        'Price unavailable'
                      )}
                    </div>
                    {isSelected && (
                      <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Selected
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Comparison Table */}
          {selectedProductData.length > 0 && (
            <div className="space-y-6">
              {/* Specs Comparison */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-white/5">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-blue-400" />
                    Specifications
                  </h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-gray-400 font-medium sticky left-0 bg-[#0a0a0a] min-w-[140px]">Spec</th>
                        {selectedProductData.map(product => (
                          <th key={product.id} className="text-left p-4 min-w-[200px]">
                            <div className="text-white font-bold text-lg">{product.name}</div>
                            <div className="text-sm text-gray-400">{product.category}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Specs Rows First */}
                      {specKeys.map((spec, idx) => {
                        const Icon = SPEC_ICONS[spec.toLowerCase()] || Monitor
                        return (
                          <tr key={spec} className={`border-b border-white/10 ${idx % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                            <td className="p-4 text-gray-400 sticky left-0 bg-[#0a0a0a] capitalize">
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-gray-500" />
                                {spec}
                              </div>
                            </td>
                            {selectedProductData.map(product => (
                              <td key={product.id} className="p-4 text-white font-medium">
                                {product.specs?.[spec] || '—'}
                              </td>
                            ))}
                          </tr>
                        )
                      })}

                      {/* Category */}
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        <td className="p-4 text-gray-400 sticky left-0 bg-[#0a0a0a]">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4 text-gray-500" />
                            Category
                          </div>
                        </td>
                        {selectedProductData.map(product => (
                          <td key={product.id} className="p-4 text-white capitalize">{product.category || '—'}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pricing Comparison */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-white/5">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="text-green-400">$</span>
                    Pricing & Availability
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Top 3 retailers by price. <span className="text-yellow-500">✓</span> = Verified stock status
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-gray-400 font-medium sticky left-0 bg-[#0a0a0a] min-w-[140px]">Retailer</th>
                        {selectedProductData.map(product => (
                          <th key={product.id} className="text-left p-4 min-w-[220px]">
                            <Link 
                              to={`/product/${product.id}`}
                              className="text-white font-semibold hover:text-blue-400 transition-colors"
                            >
                              {product.name}
                            </Link>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Best Price Summary Row */}
                      <tr className="border-b border-white/10 bg-green-500/5">
                        <td className="p-4 text-green-400 font-semibold sticky left-0 bg-[#0a0a0a]">
                          Best Price
                        </td>
                        {selectedProductData.map(product => {
                          const bestPrice = getBestPrice(product)
                          if (!bestPrice) {
                            return (
                              <td key={product.id} className="p-4 text-gray-500">
                                <AlertCircle className="w-4 h-4 inline mr-1" />
                                Unavailable
                              </td>
                            )
                          }
                          
                          const msrp = product.prices?.apple?.price || bestPrice.price
                          const savings = msrp - bestPrice.price
                          
                          return (
                            <td key={product.id} className="p-4">
                              <div className="flex flex-col gap-1">
                                <a 
                                  href={getRetailerUrl(bestPrice)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-2xl font-bold text-white hover:text-green-400 transition-colors"
                                >
                                  ${bestPrice.price.toLocaleString()}
                                </a>
                                {savings > 0 && (
                                  <span className="text-sm text-green-400">
                                    Save ${savings.toLocaleString()}
                                  </span>
                                )}
                                <a 
                                  href={getRetailerUrl(bestPrice)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                  at {RETAILER_CONFIG[bestPrice.retailer]?.label || bestPrice.retailer}
                                  {bestPrice.verified && <span className="text-yellow-500 ml-1">✓</span>}
                                  <ExternalLink className="w-3 h-3 inline ml-1" />
                                </a>
                                <span className={`text-sm ${bestPrice.inStock ? 'text-green-400' : 'text-red-400'}`}>
                                  {bestPrice.inStock ? '● In Stock' : '○ Out of Stock'}
                                </span>
                              </div>
                            </td>
                          )
                        })}
                      </tr>

                      {/* MSRP Row */}
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        <td className="p-4 text-gray-400 sticky left-0 bg-[#0a0a0a] font-medium">MSRP</td>
                        {selectedProductData.map(product => (
                          <td key={product.id} className="p-4 text-gray-300">
                            ${product.prices?.apple?.price?.toLocaleString() || '—'}
                          </td>
                        ))}
                      </tr>

                      {/* Top 3 Retailers */}
                      {[0, 1, 2].map((index) => (
                        <tr key={`retailer-${index}`} className={`border-b border-white/10 ${index % 2 === 1 ? 'bg-white/[0.02]' : ''}`}>
                          <td className="p-4 text-gray-400 sticky left-0 bg-[#0a0a0a] font-medium">
                            {index === 0 ? '1st' : index === 1 ? '2nd' : '3rd'} Best
                          </td>
                          {selectedProductData.map(product => {
                            const top3 = getTop3Retailers(product)
                            const retailerData = top3[index]
                            
                            if (!retailerData) {
                              return (
                                <td key={product.id} className="p-4 text-gray-600">
                                  <span className="text-sm">—</span>
                                </td>
                              )
                            }
                            
                            const isBestPrice = index === 0
                            const config = RETAILER_CONFIG[retailerData.retailer]
                            
                            return (
                              <td key={product.id} className="p-4">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    <a 
                                      href={getRetailerUrl(retailerData)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`text-lg font-semibold hover:underline ${isBestPrice ? 'text-green-400' : 'text-white'}`}
                                    >
                                      ${retailerData.price.toLocaleString()}
                                    </a>
                                    {retailerData.verified && <span className="text-yellow-500 text-xs">✓</span>}
                                  </div>
                                  <a 
                                    href={getRetailerUrl(retailerData)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-sm hover:underline ${config?.color || 'text-gray-400'}`}
                                  >
                                    {config?.label || retailerData.retailer}
                                    <ExternalLink className="w-3 h-3 inline ml-1" />
                                  </a>
                                  <span className={`text-sm ${retailerData.inStock ? 'text-green-400' : 'text-red-400'}`}>
                                    {retailerData.inStock ? '● In Stock' : '○ Out of Stock'}
                                  </span>
                                </div>
                              </td>
                            )
                          })}
                        </tr>
                      ))}

                      {/* See All Link Row */}
                      <tr>
                        <td className="p-4 text-gray-400 sticky left-0 bg-[#0a0a0a]"></td>
                        {selectedProductData.map(product => {
                          const allRetailers = getRetailersSorted(product)
                          return (
                            <td key={product.id} className="p-4">
                              <Link 
                                to={`/product/${product.id}`}
                                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                              >
                                See all {allRetailers.length} retailers
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </td>
                          )
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {selectedProductData.length === 0 && (
            <div className="text-center py-16 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">No products selected</h3>
              <p className="text-gray-400">Select 2-4 products above to start comparing</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Compare
