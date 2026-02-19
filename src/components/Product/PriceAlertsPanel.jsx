import React, { useState } from 'react'
import { Bell, ToggleLeft, ToggleRight } from 'lucide-react'

const PriceAlertsPanel = ({ currentPrice, productId }) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [targetPrice, setTargetPrice] = useState(Math.round(currentPrice * 0.9))
  const [threshold, setThreshold] = useState(-10)

  const handleToggle = () => {
    setIsEnabled(!isEnabled)
    // In production, this would call the API to enable/disable alerts
  }

  const handleTargetChange = (e) => {
    const value = parseInt(e.target.value)
    setTargetPrice(value)
    // Calculate threshold percentage
    const newThreshold = Math.round(((value - currentPrice) / currentPrice) * 100)
    setThreshold(newThreshold)
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-white" />
          <h3 className="text-lg font-semibold text-white uppercase tracking-wide">
            Price Alerts
          </h3>
        </div>
        <button 
          onClick={handleToggle}
          className="transition-colors"
        >
          {isEnabled ? (
            <ToggleRight className="h-8 w-8 text-blue-500" />
          ) : (
            <ToggleLeft className="h-8 w-8 text-gray-500" />
          )}
        </button>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Get a push notification when this product reaches your target price.
      </p>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-wide block mb-2">
            Target Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              value={targetPrice}
              onChange={handleTargetChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-8 pr-4 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Current market: ${currentPrice.toLocaleString()}</span>
          <span className={`font-medium ${threshold <= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {threshold > 0 ? '+' : ''}{threshold}%
          </span>
        </div>

        {isEnabled && (
          <div className="pt-4 border-t border-gray-700">
            <div className="flex items-center gap-2 text-sm text-green-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Monitoring active</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PriceAlertsPanel