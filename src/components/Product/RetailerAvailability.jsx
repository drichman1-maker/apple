import React from 'react'
import { ExternalLink } from 'lucide-react'

const RetailerAvailability = ({ prices, productName = '' }) => {
  const retailerNames = {
    apple: 'Apple',
    amazon: 'Amazon',
    walmart: 'Walmart',
    target: 'Target',
    bestbuy: 'Best Buy',
    bh: 'B&H Photo',
    adorama: 'Adorama',
    ebay: 'eBay',
    cdw: 'CDW'
  }

  const sortedPrices = Object.entries(prices)
    .map(([retailer, data]) => ({ retailer, ...data }))
    .sort((a, b) => a.price - b.price)

  const minPrice = Math.min(...sortedPrices.map(p => p.price))

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
        Retailer Availability
      </h3>
      <div className="space-y-3">
        {sortedPrices.map(({ retailer, price, inStock, verified, url }) => {
          // Determine stock display based on verified status
          const isVerified = verified === true
          const stockStatus = isVerified 
            ? (inStock ? 'In Stock' : 'Out of Stock')
            : 'Check Stock'
          const stockColor = isVerified
            ? (inStock ? 'bg-green-500' : 'bg-red-500')
            : 'bg-yellow-500'
          const stockTextColor = isVerified
            ? (inStock ? 'text-green-400' : 'text-red-400')
            : 'text-yellow-400'
          
          return (
          <div 
            key={retailer}
            className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-white font-medium">
                {retailerNames[retailer] || retailer}
              </span>
              <span 
                className={`w-2 h-2 rounded-full ${stockColor}`}
                title={stockStatus}
              />
              {!isVerified && (
                <span className={`text-xs ${stockTextColor} font-medium`}>
                  {stockStatus}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-lg font-bold ${
                price === minPrice ? 'text-green-400' : 'text-white'
              }`}>
                ${price.toLocaleString()}
              </span>
              <a
                href={`/go/${retailer}?url=${encodeURIComponent(url || '')}&query=${encodeURIComponent(productName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
              >
                Visit
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}

export default RetailerAvailability