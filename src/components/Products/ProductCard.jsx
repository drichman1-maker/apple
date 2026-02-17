import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingDown, TrendingUp, Bell, ExternalLink, ShoppingCart } from 'lucide-react'
import { getAffiliateSearchUrl } from '../../utils/affiliate'
import { getProductImage } from '../../utils/productImages'

const ProductCard = ({ product }) => {
  const prices = Object.entries(product.prices).map(([retailer, data]) => ({
    retailer,
    ...data
  }))

  const minPrice = Math.min(...prices.map(p => p.price))
  const maxPrice = Math.max(...prices.map(p => p.price))
  const bestDeal = prices.find(p => p.price === minPrice)
  const hasDiscount = maxPrice > minPrice
  const discountPercent = hasDiscount ? Math.round(((maxPrice - minPrice) / maxPrice) * 100) : 0

  const inStockCount = prices.filter(p => p.inStock).length
  const totalRetailers = prices.length

  const getRetailerDisplayName = (retailer) => {
    const names = {
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
    return names[retailer] || retailer
  }

  return (
    <div className="product-card p-6">
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden group">
        <img 
          src={getProductImage(product.id, product.category)} 
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <span className="hidden text-gray-500 dark:text-gray-400 text-sm text-center">
          {product.name}
        </span>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        {/* Category & Name */}
        <div>
          <span className="text-sm text-apple-blue font-medium capitalize">
            {product.category === 'iphone' ? 'iPhone' : 
             product.category === 'ipad' ? 'iPad' : 
             product.category === 'mac' ? 'Mac' : 
             product.category === 'watch' ? 'Apple Watch' : 
             product.category === 'airpods' ? 'AirPods' : 
             product.category}
          </span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
            {product.name}
          </h3>
          {product.modelNumber && (
            <p className="text-xs text-gray-500 mt-1">
              Model: {product.modelNumber} | SKU: {product.sku}
            </p>
          )}
        </div>

        {/* Specs */}
        {product.specs && (
          <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded p-2">
            <div className="grid grid-cols-2 gap-1">
              {product.specs.chip && <span><strong>Chip:</strong> {product.specs.chip}</span>}
              {product.specs.ram && <span><strong>RAM:</strong> {product.specs.ram}</span>}
              {product.specs.storage && <span><strong>Storage:</strong> {product.specs.storage}</span>}
              {product.specs.color && <span><strong>Color:</strong> {product.specs.color}</span>}
              {product.specs.display && <span className="col-span-2"><strong>Display:</strong> {product.specs.display}</span>}
              {product.specs.case && <span><strong>Case:</strong> {product.specs.case}</span>}
              {product.specs.connectivity && <span><strong>Cell:</strong> {product.specs.connectivity}</span>}
            </div>
          </div>
        )}

        {/* Price Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${minPrice}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    ${maxPrice}
                  </span>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                    -{discountPercent}%
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-1">
              {hasDiscount ? (
                <TrendingDown className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingUp className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Best price at {getRetailerDisplayName(bestDeal.retailer)}
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between text-sm">
          <span className={`font-medium ${
            inStockCount > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {inStockCount > 0 ? 
              `In stock at ${inStockCount}/${totalRetailers} retailers` : 
              'Out of stock'
            }
          </span>
        </div>

        {/* Price Comparison - All 9 Retailers */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Price Comparison ({totalRetailers} retailers):</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {prices
              .sort((a, b) => a.price - b.price)
              .map(({ retailer, price, inStock }) => (
                <div key={retailer} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {getRetailerDisplayName(retailer)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${
                      price === minPrice ? 'text-green-600' : 'text-gray-900 dark:text-white'
                    }`}>
                      ${price}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${
                      inStock ? 'bg-green-500' : 'bg-red-500'
                    }`} title={inStock ? 'In Stock' : 'Out of Stock'} />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 btn-primary text-center"
          >
            View Details
          </Link>
          <a
            href={getAffiliateSearchUrl(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-3 py-2 bg-amazon text-white rounded-lg hover:bg-amazon-dark transition-colors duration-200"
            title="Shop on Amazon"
          >
            <ShoppingCart className="w-4 h-4" />
          </a>
          <button
            className="flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            title="Create Price Alert"
          >
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard