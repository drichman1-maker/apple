import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TrendingDown, TrendingUp, Loader2, AlertCircle, Sparkles } from 'lucide-react'
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

  // Fallback data - 2026 LATEST (MacBooks, iPads, Watch priority)
  const getFallbackProducts = () => [
    {
      id: 'macbook-pro-14-m5',
      name: 'MacBook Pro 14" M5',
      category: 'mac',
      image: getProductImage('macbook-pro-14-m5', 'mac'),
      currentPrice: 1599,
      originalPrice: 1599,
      discount: 0,
      trend: 'stable',
      retailer: 'Apple',
      inStock: true
    },
    {
      id: 'macbook-air-13-m4',
      name: 'MacBook Air 13" M4',
      category: 'mac',
      image: getProductImage('macbook-air-13-m4', 'mac'),
      currentPrice: 999,
      originalPrice: 1199,
      discount: 17,
      trend: 'down',
      retailer: 'Apple',
      inStock: true
    },
    {
      id: 'ipad-pro-13-m5',
      name: 'iPad Pro 13" M5',
      category: 'ipad',
      image: getProductImage('ipad-pro-13-m5', 'ipad'),
      currentPrice: 1099,
      originalPrice: 1099,
      discount: 0,
      trend: 'stable',
      retailer: 'Apple',
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
    },
    {
      id: 'airpods-4-nc',
      name: 'AirPods 4 with ANC',
      category: 'airpods',
      image: getProductImage('airpods-4-nc', 'airpods'),
      currentPrice: 179,
      originalPrice: 199,
      discount: 10,
      trend: 'down',
      retailer: 'Amazon',
      inStock: true
    },
    {
      id: 'apple-watch-series-11-46',
      name: 'Apple Watch Series 11',
      category: 'watch',
      image: getProductImage('apple-watch-series-11-46', 'watch'),
      currentPrice: 399,
      originalPrice: 429,
      discount: 7,
      trend: 'down',
      retailer: 'Amazon',
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
        <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-6 flex items-center justify-center border border-white/5">
          <div className="text-center">
            <div className="text-5xl mb-3">📱</div>
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">
              {product.category}
            </span>
          </div>
        </div>
      )
    }

    return (
      <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-6 overflow-hidden border border-white/5">
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
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="glass-card-dark rounded-2xl p-12">
              <Loader2 className="h-16 w-16 animate-spin mx-auto text-apple-blue" />
              <p className="mt-6 text-gray-400 text-lg">Loading premium deals...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error && products.length === 0) {
    return (
      <section className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="glass-card-dark rounded-2xl p-12">
              <AlertCircle className="h-16 w-16 mx-auto text-red-400 mb-6" />
              <p className="mt-4 text-gray-400 text-lg">{error}</p>
              <button
                onClick={fetchProducts}
                className="mt-6 text-apple-blue hover:text-cyan-400 font-medium transition-colors"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-apple-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6">
            <Sparkles className="h-4 w-4 mr-2 text-apple-blue" />
            Premium Price Tracking
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured <span className="bg-gradient-to-r from-apple-blue to-purple-500 bg-clip-text text-transparent">Deals</span>
          </h2>
          <p className="text-xl text-gray-400">
            Hot deals and price drops on popular Apple products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group glass-card-dark p-6 rounded-2xl hover:shadow-[0_0_40px_rgba(0,122,255,0.2)] transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image */}
              <ProductImage product={product} />

              {/* Product Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-apple-blue font-medium uppercase tracking-wider">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    {product.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-red-400" />
                    )}
                    <span className={`text-sm font-medium ${
                      product.trend === 'down' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {product.trend === 'down' ? '↓' : '↑'}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white group-hover:text-apple-blue transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      ${product.currentPrice}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <span className="bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 text-xs font-medium px-3 py-1 rounded-full border border-red-500/20">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm pt-2 border-t border-white/5">
                  <span className="text-gray-400">
                    at {product.retailer}
                  </span>
                  <span className={`font-medium flex items-center space-x-1 ${
                    product.inStock ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      product.inStock ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/products"
            className="btn-neon inline-flex items-center px-8 py-4 text-lg"
          >
            View All Products
            <Sparkles className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts