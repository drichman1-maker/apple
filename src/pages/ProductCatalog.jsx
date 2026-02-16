import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductGrid from '../components/Products/ProductGrid'
import ProductFilters from '../components/Products/ProductFilters'
import ProductCategories from '../components/Products/ProductCategories'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const ProductCatalog = () => {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: category || 'all',
    priceRange: [0, 5000],
    inStock: false,
    onSale: false,
    sortBy: 'price-asc'
  })

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      // Simulate API call with mock data
      setTimeout(() => {
        setProducts(getMockProducts(category))
        setLoading(false)
      }, 500)
    }

    fetchProducts()
  }, [category])

  const getMockProducts = (categoryFilter) => {
    const allProducts = [
      // iPhone Products
      {
        id: 'iphone-15-pro-max',
        name: 'iPhone 15 Pro Max',
        category: 'iphone',
        image: '/images/iphone-15-pro-max.jpg',
        prices: {
          apple: { price: 1199, inStock: true },
          amazon: { price: 1149, inStock: true },
          bestbuy: { price: 1199, inStock: false },
          bh: { price: 1179, inStock: true }
        },
        specifications: {
          storage: ['256GB', '512GB', '1TB'],
          colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
        }
      },
      {
        id: 'iphone-15-pro',
        name: 'iPhone 15 Pro',
        category: 'iphone',
        image: '/images/iphone-15-pro.jpg',
        prices: {
          apple: { price: 999, inStock: true },
          amazon: { price: 949, inStock: true },
          bestbuy: { price: 999, inStock: true },
          bh: { price: 979, inStock: true }
        },
        specifications: {
          storage: ['128GB', '256GB', '512GB', '1TB'],
          colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
        }
      },
      {
        id: 'iphone-15',
        name: 'iPhone 15',
        category: 'iphone',
        image: '/images/iphone-15.jpg',
        prices: {
          apple: { price: 799, inStock: true },
          amazon: { price: 749, inStock: true },
          bestbuy: { price: 799, inStock: true },
          bh: { price: 779, inStock: true }
        },
        specifications: {
          storage: ['128GB', '256GB', '512GB'],
          colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black']
        }
      },
      // iPad Products
      {
        id: 'ipad-pro-12-9-m2',
        name: 'iPad Pro 12.9" M2',
        category: 'ipad',
        image: '/images/ipad-pro-12-9-m2.jpg',
        prices: {
          apple: { price: 1099, inStock: true },
          amazon: { price: 1049, inStock: true },
          bestbuy: { price: 1099, inStock: false },
          bh: { price: 1079, inStock: true }
        },
        specifications: {
          storage: ['128GB', '256GB', '512GB', '1TB', '2TB'],
          colors: ['Silver', 'Space Gray']
        }
      },
      {
        id: 'ipad-air-m1',
        name: 'iPad Air M1',
        category: 'ipad',
        image: '/images/ipad-air-m1.jpg',
        prices: {
          apple: { price: 599, inStock: true },
          amazon: { price: 549, inStock: true },
          bestbuy: { price: 599, inStock: true },
          bh: { price: 579, inStock: true }
        },
        specifications: {
          storage: ['64GB', '256GB'],
          colors: ['Space Gray', 'Starlight', 'Pink', 'Purple', 'Blue']
        }
      },
      // Mac Products
      {
        id: 'macbook-pro-16-m3-max',
        name: 'MacBook Pro 16" M3 Max',
        category: 'mac',
        image: '/images/macbook-pro-16-m3-max.jpg',
        prices: {
          apple: { price: 3499, inStock: true },
          amazon: { price: 3399, inStock: false },
          bestbuy: { price: 3499, inStock: true },
          bh: { price: 3449, inStock: true }
        },
        specifications: {
          storage: ['512GB', '1TB', '2TB', '4TB'],
          colors: ['Space Black', 'Silver']
        }
      },
      {
        id: 'macbook-air-m2',
        name: 'MacBook Air M2',
        category: 'mac',
        image: '/images/macbook-air-m2.jpg',
        prices: {
          apple: { price: 1199, inStock: true },
          amazon: { price: 1099, inStock: true },
          bestbuy: { price: 1149, inStock: true },
          bh: { price: 1129, inStock: true }
        },
        specifications: {
          storage: ['256GB', '512GB', '1TB', '2TB'],
          colors: ['Silver', 'Starlight', 'Space Gray', 'Midnight']
        }
      },
      // Apple Watch Products
      {
        id: 'apple-watch-series-9-45mm',
        name: 'Apple Watch Series 9 45mm',
        category: 'watch',
        image: '/images/apple-watch-series-9-45mm.jpg',
        prices: {
          apple: { price: 429, inStock: true },
          amazon: { price: 379, inStock: true },
          bestbuy: { price: 429, inStock: true },
          bh: { price: 409, inStock: true }
        },
        specifications: {
          sizes: ['41mm', '45mm'],
          colors: ['Pink', 'Starlight', 'Silver', 'Product RED', 'Midnight']
        }
      },
      {
        id: 'apple-watch-ultra-2',
        name: 'Apple Watch Ultra 2',
        category: 'watch',
        image: '/images/apple-watch-ultra-2.jpg',
        prices: {
          apple: { price: 799, inStock: true },
          amazon: { price: 749, inStock: true },
          bestbuy: { price: 799, inStock: false },
          bh: { price: 779, inStock: true }
        },
        specifications: {
          sizes: ['49mm'],
          colors: ['Natural', 'Blue', 'White']
        }
      },
      // AirPods Products
      {
        id: 'airpods-pro-2',
        name: 'AirPods Pro (2nd Gen)',
        category: 'airpods',
        image: '/images/airpods-pro-2.jpg',
        prices: {
          apple: { price: 249, inStock: true },
          amazon: { price: 199, inStock: true },
          bestbuy: { price: 229, inStock: true },
          bh: { price: 219, inStock: true }
        },
        specifications: {
          features: ['Active Noise Cancellation', 'Spatial Audio', 'MagSafe Charging']
        }
      },
      {
        id: 'airpods-max',
        name: 'AirPods Max',
        category: 'airpods',
        image: '/images/airpods-max.jpg',
        prices: {
          apple: { price: 549, inStock: true },
          amazon: { price: 479, inStock: true },
          bestbuy: { price: 549, inStock: true },
          bh: { price: 519, inStock: true }
        },
        specifications: {
          colors: ['Space Gray', 'Silver', 'Sky Blue', 'Green', 'Pink']
        }
      }
    ]

    if (!categoryFilter || categoryFilter === 'all') {
      return allProducts
    }

    return allProducts.filter(product => product.category === categoryFilter)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const filterProducts = (products) => {
    return products.filter(product => {
      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false
      }

      // Price range filter
      const minPrice = Math.min(...Object.values(product.prices).map(p => p.price))
      if (minPrice < filters.priceRange[0] || minPrice > filters.priceRange[1]) {
        return false
      }

      // In stock filter
      if (filters.inStock) {
        const hasStock = Object.values(product.prices).some(p => p.inStock)
        if (!hasStock) return false
      }

      // On sale filter
      if (filters.onSale) {
        const prices = Object.values(product.prices).map(p => p.price)
        const maxPrice = Math.max(...prices)
        const minPrice = Math.min(...prices)
        if (maxPrice === minPrice) return false // No price variation
      }

      return true
    })
  }

  const sortProducts = (products) => {
    const sorted = [...products]
    
    switch (filters.sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => {
          const priceA = Math.min(...Object.values(a.prices).map(p => p.price))
          const priceB = Math.min(...Object.values(b.prices).map(p => p.price))
          return priceA - priceB
        })
      case 'price-desc':
        return sorted.sort((a, b) => {
          const priceA = Math.min(...Object.values(a.prices).map(p => p.price))
          const priceB = Math.min(...Object.values(b.prices).map(p => p.price))
          return priceB - priceA
        })
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      default:
        return sorted
    }
  }

  const filteredAndSortedProducts = sortProducts(filterProducts(products))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {category ? 
            `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 
            'All Products'
          }
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Compare prices and track your favorite Apple products
        </p>
      </div>

      <ProductCategories currentCategory={category} />

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="lg:w-1/4">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="lg:w-3/4">
          <ProductGrid products={filteredAndSortedProducts} />
        </div>
      </div>
    </div>
  )
}

export default ProductCatalog