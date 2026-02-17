import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Bell, Mail, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const PriceAlerts = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      <Helmet>
        <title>Price Alerts | MacTrackr</title>
        <meta name="description" content="Get notified when Apple products drop in price. Coming soon." />
      </Helmet>
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-white mb-8 text-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to products
        </Link>
        
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 rounded-full mb-6">
            <Bell className="h-10 w-10 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Price Alerts</h1>
          <p className="text-gray-400 text-lg">
            Get notified instantly when your favorite Apple products drop in price.
          </p>
        </div>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-12">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
          Coming Soon
        </div>

        {/* Waitlist Form */}
        <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-8">
          <div className="flex items-center justify-center w-12 h-12 bg-[#262626] rounded-xl mb-4 mx-auto">
            <Mail className="h-6 w-6 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Join the waitlist</h2>
          <p className="text-gray-500 mb-6">
            Be the first to know when price alerts go live. No spam, ever.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              disabled
              className="px-6 py-3 bg-blue-500/50 text-white rounded-lg font-medium cursor-not-allowed"
            >
              Notify Me
            </button>
          </form>
          
          <p className="text-xs text-gray-600 mt-4">
            We'll only email you when price alerts launch. Unsubscribe anytime.
          </p>
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-4">
            <div className="text-2xl mb-2">🔔</div>
            <h3 className="text-white font-medium mb-1">Instant Alerts</h3>
            <p className="text-sm text-gray-500">Get notified the moment prices drop across any retailer.</p>
          </div>
          <div className="p-4">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-white font-medium mb-1">Price History</h3>
            <p className="text-sm text-gray-500">See price trends and know when to buy.</p>
          </div>
          <div className="p-4">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="text-white font-medium mb-1">Target Prices</h3>
            <p className="text-sm text-gray-500">Set your price and we'll alert you when it hits.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceAlerts
