import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, X, Share2, Check } from 'lucide-react'
import { getProducts } from '../api.js'

const Compare = () => {
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock data for fallback
  const mockProducts = [
    {
      id: 'macbook-air-13-m4',
      name: 'MacBook Air 13" M4',
      specs: { chip: 'M4', ram: '16GB', storage: '256GB SSD', display: '13.6" Liquid Retina', battery: '18 hours', color: 'Midnight' },
      prices: { apple: { price: 999 }, amazon: { price: 949 }, bestbuy: { price: 999 }, bh: { price: 899 } }
    },
    {
      id: 'macbook-air-15-m4',
      name: 'MacBook Air 15" M4',
      specs: { chip: 'M4', ram: '16GB', storage: '256GB SSD', display: '15.3" Liquid Retina', battery: '18 hours', color: 'Starlight' },
      prices: { apple: { price: 1299 }, amazon: { price: 1249 }, bestbuy: { price: 1299 }, bh: { price: 1199 } }
    },
    {
      id: 'macbook-pro-14-m4',
      name: 'MacBook Pro 14" M4',
      specs: { chip: 'M4', ram: '16GB', storage: '512GB SSD', display: '14.2" Liquid Retina XDR', battery: '24 hours', color: 'Space Black' },
      prices: { apple: { price: 1599 }, amazon: { price: 1549 }, bestbuy: { price: 1599 }, bh: { price: 1499 } }
    },
    {
      id: 'macbook-pro-14-m4-pro',
      name: 'MacBook Pro 14" M4 Pro',
      specs: { chip: 'M4 Pro', ram: '24GB', storage: '512GB SSD', display: '14.2" Liquid Retina XDR', battery: '24 hours', color: 'Space Black' },
      prices: { apple: { price: 1999 }, amazon: { price: 1949 }, bestbuy: { price: 1999 }, bh: { price: 1899 } }
    },
    {
      id: 'macbook-pro-16-m4-pro',
      name: 'MacBook Pro 16" M4 Pro',
      specs: { chip: 'M4 Pro', ram: '24GB', storage: '512GB SSD', display: '16.2" Liquid Retina XDR', battery: '24 hours', color: 'Space Black' },
      prices: { apple: { price: 2499 }, amazon: { price: 2449 }, bestbuy: { price: 2499 }, bh: { price: 2399 } }
    },
    {
      id: 'mac-mini-m4',
      name: 'Mac mini M4',
      specs: { chip: 'M4', ram: '16GB', storage: '256GB SSD', display: 'External', battery: 'N/A', color: 'Silver' },
      prices: { apple: { price: 599 }, amazon: { price: 569 }, bestbuy: { price: 599 }, bh: { price: 569 } }
    },
    {
      id: 'iphone-16-pro',
      name: 'iPhone 16 Pro',
      specs: { chip: 'A18 Pro', ram: '8GB', storage: '128GB', display: '6.3" Super Retina XDR', battery: '27 hours', color: 'Natural Titanium' },
      prices: { apple: { price: 999 }, amazon: { price: 949 }, bestbuy: { price: 999 }, bh: { price: 949 } }
    },
    {
      id: 'iphone-16-pro-max',
      name: 'iPhone 16 Pro Max',
      specs: { chip: 'A18 Pro', ram: '8GB', storage: '256GB', display: '6.9" Super Retina XDR', battery: '33 hours', color: 'Desert Titanium' },
      prices: { apple: { price: 1199 }, amazon: { price: 1149 }, bestbuy: { price: 1199 }, bh: { price: 1149 } }
    }
  ]

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products: data } = await getProducts()
        setProducts(data.slice(0, 24))
        setLoading(false)
      } catch (err) {
        // Use mock data as fallback
        console.log('API failed, using mock data:', err.message)
        setProducts(mockProducts)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Load selected products from URL
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-400">Loading products...</div>
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
              <p className="text-gray-400 mt-1">Select 2-4 products to compare side-by-side</p>
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
              {products.slice(0, 24).map(product => (
                <button
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    selectedProducts.includes(product.id)
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="text-sm font-medium text-white truncate mb-1">{product.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    From ${Math.min(...Object.values(product.prices).map(p => p.price))}
                  </div>
                  {selectedProducts.includes(product.id) && (
                    <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Selected
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          {selectedProductData.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h2 className="text-xl font-semibold text-white">Comparison</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-gray-400 font-medium sticky left-0 bg-[#0a0a0a]">Feature</th>
                      {selectedProductData.map(product => (
                        <th key={product.id} className="text-left p-4 min-w-[200px]">
                          <div className="text-white font-semibold">{product.name}</div>
                          <div className="text-sm text-gray-400">{product.specs?.chip || product.specs?.storage}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Price Row */}
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-400 sticky left-0 bg-[#0a0a0a]">Starting Price</td>
                      {selectedProductData.map(product => {
                        const minPrice = Math.min(...Object.values(product.prices).map(p => p.price))
                        return (
                          <td key={product.id} className="p-4">
                            <span className="text-2xl font-bold text-green-400">${minPrice}</span>
                          </td>
                        )
                      })}
                    </tr>

                    {/* Specs Rows */}
                    {['chip', 'ram', 'storage', 'display', 'battery', 'color'].map(spec => (
                      <tr key={spec} className="border-b border-white/10">
                        <td className="p-4 text-gray-400 capitalize sticky left-0 bg-[#0a0a0a]">{spec}</td>
                        {selectedProductData.map(product => (
                          <td key={product.id} className="p-4 text-white">
                            {product.specs?.[spec] || '—'}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Retailer Prices */}
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-400 sticky left-0 bg-[#0a0a0a]">Apple</td>
                      {selectedProductData.map(product => (
                        <td key={product.id} className="p-4 text-white">
                          ${product.prices?.apple?.price || '—'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 text-gray-400 sticky left-0 bg-[#0a0a0a]">Amazon</td>
                      {selectedProductData.map(product => (
                        <td key={product.id} className="p-4 text-white">
                          ${product.prices?.amazon?.price || '—'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-400 sticky left-0 bg-[#0a0a0a]">Best Buy</td>
                      {selectedProductData.map(product => (
                        <td key={product.id} className="p-4 text-white">
                          ${product.prices?.bestbuy?.price || '—'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
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