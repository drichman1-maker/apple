import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TrendingDown, TrendingUp, Loader2, AlertCircle } from 'lucide-react'
import { getProducts } from '../../api'
import { getProductImage } from '../../utils/productImages'

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts({ featured: true, limit: 6 })
      // If API returns empty, use fallback data
      if (!data || data.length === 0) {
        setProducts(getFallbackProducts())
      } else {
        setProducts(data)
      }
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setError('Unable to load products')
      setProducts(getFallbackProducts())
    } finally {
      setLoading(false)
    }
  }

  // Fallback data if backend fails
  const getFallbackProducts = () => [
    {
      id: 'iphone-15-pro',
      name: 'iPhone 15 Pro',
      category: 'iphone',
      image: getProductImage('iphone-15-pro', 'iphone'),
      currentPrice: 999,
      originalPrice: 1199,
      discount: 17,
      trend: 'down',
      retailer: 'Amazon',
      inStock: true
    },
    {
      id: 'macbook-air-m3-15',
      name: 'MacBook Air 15" M3',
      category: 'mac',
      image: getProductImage('macbook-air-15-m3', 'mac'),
      currentPrice: 1299,
      originalPrice: 1499,
      discount: 13,
      trend: 'down',
      retailer: 'Best Buy',
      inStock: true
    },
    {
      id: 'ipad-pro-13-m4',
      name: 'iPad Pro 13" M4',
      category: 'ipad',
      image: getProductImage('ipad-pro-13-m4', 'ipad'),
      currentPrice: 1299,
      originalPrice: 1299,
      discount: 0,
      trend: 'up',
      retailer: 'Apple',
      inStock: true
    },
    {
      id: 'airpods-pro-2',
      name: 'AirPods Pro (2nd Gen)',
      category: 'airpods',
      image: getProductImage('airpods-pro-2', 'airpods'),
      currentPrice: 199,
      originalPrice: 249,
      discount: 20,
      trend: 'down',
      retailer: 'Target',
      inStock: true
    },
    {
      id: 'apple-watch-series-10-46',
      name: 'Apple Watch Series 10',
      category: 'watch',
      image: getProductImage('apple-watch-series-10', 'watch'),
      currentPrice: 399,
      originalPrice: 449,
      discount: 11,
      trend: 'down',
      retailer: 'Amazon',
      inStock: true
    },
    {
      id: 'mac-mini-m4',
      name: 'Mac mini M4',
      category: 'mac',
      image: getProductImage('mac-mini-m4', 'mac'),
      currentPrice: 599,
      originalPrice: 599,
      discount: 0,
      trend: 'stable',
      retailer: 'Apple',
      inStock: true
    }
  ]

  // Image component with fallback
  const ProductImage = ({ product }) => {
    const [imgError, setImgError] = useState(false)
    
    if (imgError || !product.image) {
      return (
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-4 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📱</div>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {product.category}
            </span>
          </div>
        </div>
      )
    }

    return (
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    )
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-apple-blue" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading deals...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error && products.length === 0) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-4 text-apple-blue hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Deals
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Hot deals and price drops on popular Apple products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-card p-6 block hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image */}
              <ProductImage product={product} />

              {/* Product Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-apple-blue font-medium">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    {product.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      product.trend === 'down' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.trend === 'down' ? '↓' : '↑'}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${product.currentPrice}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    at {product.retailer}
                  </span>
                  <span className={`font-medium ${
                    product.inStock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="btn-primary inline-block"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts