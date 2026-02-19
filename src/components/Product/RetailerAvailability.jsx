import React from 'react'
import { ExternalLink } from 'lucide-react'

const RetailerAvailability = ({ prices }) => {
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
        {sortedPrices.map(({ retailer, price, inStock, url }) => (
          <div 
            key={retailer}
            className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-white font-medium">
                {retailerNames[retailer] || retailer}
              </span>
              <span 
                className={`w-2 h-2 rounded-full ${
                  inStock ? 'bg-green-500' : 'bg-red-500'
                }`}
                title={inStock ? 'In Stock' : 'Out of Stock'}
              />
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-lg font-bold ${
                price === minPrice ? 'text-green-400' : 'text-white'
              }`}>
                ${price.toLocaleString()}
              </span>
              <a
                href={url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
              >
                Visit
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RetailerAvailability