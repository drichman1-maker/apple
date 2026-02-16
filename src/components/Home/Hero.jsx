import React from 'react'
import { Link } from 'react-router-dom'
import { Search, TrendingDown } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Track Apple Product{' '}
            <span className="text-apple-blue">Prices</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Compare prices across retailers, track price history, and get alerts when your favorite Apple products go on sale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-apple-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 shadow-lg"
            >
              <Search className="h-5 w-5 mr-2" />
              Browse Products
            </Link>
            <Link
              to="/alerts"
              className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <TrendingDown className="h-5 w-5 mr-2" />
              Set Price Alert
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-apple-blue mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Apple Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-apple-blue mb-2">10+</div>
              <div className="text-gray-600 dark:text-gray-400">Retailers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-apple-blue mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Price Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero