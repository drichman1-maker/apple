import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingDown, TrendingUp } from 'lucide-react'

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 'iphone-15-pro',
      name: 'iPhone 15 Pro',
      category: 'iPhone',
      image: '/images/iphone-15-pro.jpg',
      currentPrice: 999,
      originalPrice: 1199,
      discount: 17,
      trend: 'down',
      retailer: 'Amazon',
      inStock: true
    },
    {
      id: 'macbook-air-m2',
      name: 'MacBook Air M2',
      category: 'Mac',
      image: '/images/macbook-air-m2.jpg',
      currentPrice: 1099,
      originalPrice: 1199,
      discount: 8,
      trend: 'down',
      retailer: 'Best Buy',
      inStock: true
    },
    {
      id: 'ipad-pro-12-9',
      name: 'iPad Pro 12.9"',
      category: 'iPad',
      image: '/images/ipad-pro-12-9.jpg',
      currentPrice: 1099,
      originalPrice: 1099,
      discount: 0,
      trend: 'up',
      retailer: 'Apple',
      inStock: true
    },
    {
      id: 'airpods-pro-2',
      name: 'AirPods Pro (2nd Gen)',
      category: 'AirPods',
      image: '/images/airpods-pro-2.jpg',
      currentPrice: 199,
      originalPrice: 249,
      discount: 20,
      trend: 'down',
      retailer: 'Target',
      inStock: true
    },
    {
      id: 'apple-watch-series-9',
      name: 'Apple Watch Series 9',
      category: 'Apple Watch',
      image: '/images/apple-watch-series-9.jpg',
      currentPrice: 359,
      originalPrice: 399,
      discount: 10,
      trend: 'down',
      retailer: 'B&H',
      inStock: true
    },
    {
      id: 'mac-studio-m2',
      name: 'Mac Studio M2',
      category: 'Mac',
      image: '/images/mac-studio-m2.jpg',
      currentPrice: 1999,
      originalPrice: 1999,
      discount: 0,
      trend: 'up',
      retailer: 'Apple',
      inStock: false
    }
  ]

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
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-card p-6 block"
            >
              {/* Product Image */}
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {product.name} Image
                </span>
              </div>

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