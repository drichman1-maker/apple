import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ProductGrid from '../components/Products/ProductGrid'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { API_URL } from '../lib/env.js'

const ProductCatalog = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState(category || 'All')

  const categories = ['All', 'Mac', 'iPad', 'iPhone', 'Watch', 'AirPods']

  // Update activeFilter when URL category changes
  useEffect(() => {
    setActiveFilter(category || 'All')
  }, [category])

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/api/products`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      } else {
        setError(`Failed to load products (HTTP ${response.status})`)
      }
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setError('Failed to load products. Please try again.')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Filter products by category with strict matching
  const filteredProducts = useMemo(() => {
    // Remove duplicates by ID (backend sometimes returns duplicates)
    const uniqueProducts = products.filter((p, index, self) => 
      index === self.findIndex((t) => t.id === p.id)
    )
    
    if (activeFilter === 'All') return uniqueProducts
    
    const filterLower = activeFilter.toLowerCase()
    return uniqueProducts.filter(p => {
      // Skip products without category
      if (!p.category) return false
      
      // Normalize category to lowercase string
      const productCategory = String(p.category).toLowerCase().trim()
      
      // Strict equality check
      return productCategory === filterLower
    })
  }, [products, activeFilter])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-red-400 mb-2">{error}</p>
          <button
            onClick={fetchProducts}
            className="text-blue-400 hover:underline mt-2 inline-block"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {filteredProducts.length} Results
          </h1>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-white text-black'
                  : 'bg-[#1a1a1a] text-gray-400 border border-[#333] hover:border-[#555] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  )
}

export default ProductCatalog
