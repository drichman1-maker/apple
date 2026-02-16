import React from 'react'
import { ExternalLink, Clock } from 'lucide-react'

const PriceComparison = ({ prices }) => {
  const getRetailerDisplayName = (retailer) => {
    const names = {
      apple: 'Apple Store',
      amazon: 'Amazon',
      bestbuy: 'Best Buy',
      bh: 'B&H Photo'
    }
    return names[retailer] || retailer
  }

  const getRetailerLogo = (retailer) => {
    // In a real app, these would be actual logo images
    const logos = {
      apple: '🍎',
      amazon: '📦',
      bestbuy: '🛒',
      bh: '📷'
    }
    return logos[retailer] || '🏪'
  }

  const sortedPrices = [...prices].sort((a, b) => a.price - b.price)
  const lowestPrice = sortedPrices[0]?.price

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Price Comparison
      </h3>
      
      <div className="space-y-3">
        {sortedPrices.map(({ retailer, price, inStock, url, updated }) => (
          <div
            key={retailer}
            className={`price-card flex items-center justify-between p-4 ${
              price === lowestPrice ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">
                {getRetailerLogo(retailer)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {getRetailerDisplayName(retailer)}
                  </h4>
                  {price === lowestPrice && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                      Best Price
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-sm font-medium ${
                    inStock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  {updated && (
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      Updated {updated}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                ${price}
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center text-sm font-medium mt-1 ${
                  inStock 
                    ? 'text-apple-blue hover:text-blue-600' 
                    : 'text-gray-400 cursor-not-allowed'
                } transition-colors duration-200`}
                onClick={!inStock ? (e) => e.preventDefault() : undefined}
              >
                {inStock ? 'View Deal' : 'Unavailable'}
                {inStock && <ExternalLink className="h-3 w-3 ml-1" />}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Pro Tip:</strong> Prices are updated every few hours. 
          Set up a price alert to get notified when the price drops below your target.
        </p>
      </div>
    </div>
  )
}

export default PriceComparison