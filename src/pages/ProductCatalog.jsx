import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import ProductGrid from '../components/Products/ProductGrid'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const ProductCatalog = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState(category || 'All')

  const categories = ['All', 'Mac', 'iPad', 'iPhone', 'Watch', 'AirPods']

  // Update activeFilter when URL category changes
  useEffect(() => {
    setActiveFilter(category || 'All')
  }, [category])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const url = 'https://mactrackr-backend-new.onrender.com/api/products'
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          setProducts(data.products || [])
        } else {
          setProducts(getMockProducts())
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setProducts(getMockProducts())
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  const getMockProducts = () => {
    return [
      {
        id: 'macbook-pro-16-m4',
        name: 'MacBook Pro 16" M4 Max',
        category: 'mac',
        brand: 'Apple',
        prices: {
          bestbuy: { price: 2199, inStock: true, url: 'https://bestbuy.com' },
          apple: { price: 2499, inStock: true, url: 'https://apple.com' },
          bh: { price: 2249, inStock: true, url: 'https://bhphotovideo.com' }
        },
        specifications: {
          ram: '36GB',
          storage: '1TB',
          color: 'Space Black',
          year: '2025'
        },
        msrp: 2499
      },
      {
        id: 'iphone-16-pro-max',
        name: 'iPhone 16 Pro Max 256GB',
        category: 'iphone',
        brand: 'Apple',
        prices: {
          bh: { price: 1149, inStock: true, url: 'https://bhphotovideo.com' },
          apple: { price: 1199, inStock: true, url: 'https://apple.com' },
          amazon: { price: 1149, inStock: true, url: 'https://amazon.com' }
        },
        specifications: {
          storage: '256GB',
          color: 'Natural Titanium',
          year: '2025'
        },
        msrp: 1199
      },
      {
        id: 'ipad-pro-13-m4',
        name: 'iPad Pro 13" M4 WiFi+Cell',
        category: 'ipad',
        brand: 'Apple',
        prices: {
          adorama: { price: 1799, inStock: true, url: 'https://adorama.com' },
          apple: { price: 1999, inStock: true, url: 'https://apple.com' },
          amazon: { price: 1849, inStock: true, url: 'https://amazon.com' }
        },
        specifications: {
          ram: '16GB',
          storage: '1TB',
          color: 'Silver',
          year: '2025'
        },
        msrp: 1999
      },
      {
        id: 'macbook-air-15-m3',
        name: 'MacBook Air 15" M3',
        category: 'mac',
        brand: 'Apple',
        prices: {
          apple: { price: 1399, inStock: true, url: 'https://apple.com' },
          amazon: { price: 1299, inStock: true, url: 'https://amazon.com' },
          bestbuy: { price: 1349, inStock: true, url: 'https://bestbuy.com' }
        },
        specifications: {
          ram: '24GB',
          storage: '512GB',
          color: 'Midnight',
          year: '2024'
        },
        msrp: 1499
      }
    ]
  }

  // Filter products by category with strict matching
  const filteredProducts = useMemo(() => {
    // Remove duplicates by ID
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

  // Debug: Log products with their categories
  useEffect(() => {
    if (products.length > 0) {
      console.log('All products:', products.map(p => ({ id: p.id, category: p.category })))
      console.log('Active filter:', activeFilter)
      console.log('Filtered:', filteredProducts.map(p => ({ id: p.id, category: p.category })))
    }
  }, [products, activeFilter, filteredProducts])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <LoadingSpinner size="large" />
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
