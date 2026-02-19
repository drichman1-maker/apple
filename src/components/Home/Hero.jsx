import React from 'react'
import { Link } from 'react-router-dom'
import { Search, TrendingDown, Sparkles } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-black dark:bg-black py-20 lg:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apple-blue/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8">
            <Sparkles className="h-4 w-4 mr-2 text-apple-blue" />
            Real-time price tracking across 10+ retailers
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Track Apple Product{' '}
            <span className="bg-gradient-to-r from-apple-blue to-purple-500 bg-clip-text text-transparent">
              Prices
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Compare prices across retailers, track price history, and get alerts when your favorite Apple products go on sale.
          </p>
          
          {/* CTA Buttons with glass effect */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-apple-blue to-blue-600 text-white rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(0,122,255,0.4)] transition-all duration-300 hover:-translate-y-1"
            >
              <Search className="h-5 w-5 mr-2" />
              Browse Products
            </Link>
            <Link
              to="/alerts"
              className="inline-flex items-center px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/10 border border-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <TrendingDown className="h-5 w-5 mr-2" />
              Set Price Alert
            </Link>
          </div>

          {/* Glass stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="glass-card-dark p-6 rounded-2xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-apple-blue to-cyan-400 bg-clip-text text-transparent mb-2">50+</div>
              <div className="text-gray-400">Apple Products</div>
            </div>
            <div className="glass-card-dark p-6 rounded-2xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-apple-blue to-cyan-400 bg-clip-text text-transparent mb-2">10+</div>
              <div className="text-gray-400">Retailers Tracked</div>
            </div>
            <div className="glass-card-dark p-6 rounded-2xl">
              <div className="text-3xl font-bold bg-gradient-to-r from-apple-blue to-cyan-400 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-400">Price Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
