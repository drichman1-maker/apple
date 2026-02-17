import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingDown, TrendingUp, Bell, ShoppingCart, ExternalLink, Check, X } from 'lucide-react'
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

  const getCategoryDisplay = (category) => {
    const categories = {
      iphone: 'iPhone',
      ipad: 'iPad',
      mac: 'Mac',
      watch: 'Apple Watch',
      airpods: 'AirPods'
    }
    return categories[category] || category
  }

  return (
    <div className="group relative bg-[#12121a] rounded-2xl border border-white/5 overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
      {/* Best Deal Badge */}
      {hasDiscount && discountPercent > 5 && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Save {discountPercent}%
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-[#1a1a25] to-[#12121a] overflow-hidden">
        <img 
          src={getProductImage(product.id, product.category)} 
          alt={product.name}
          className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Category & Name */}
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            {getCategoryDisplay(product.category)}
          </span>
          <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">
            {product.name}
          </h3>
          {product.modelNumber && (
            <p className="text-sm text-gray-500 mt-1">
              {product.modelNumber}
            </p>
          )}
        </div>

        {/* Specs Pills */}
        {product.specs && (
          <div className="flex flex-wrap gap-2">
            {product.specs.chip && (
              <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/5">
                {product.specs.chip}
              </span>
            )}
            {product.specs.ram && (
              <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/5">
                {product.specs.ram}
              </span>
            )}
            {product.specs.storage && (
              <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/5">
                {product.specs.storage}
              </span>
            )}
          </div>
        )}

        {/* Price Section */}
        <div className="pt-4 border-t border-white/5">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white">
              ${minPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-lg text-gray-500 line-through">
                ${maxPrice.toLocaleString()}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Best at <span className="text-emerald-400 font-medium">{getRetailerDisplayName(bestDeal.retailer)}</span>
          </p>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${inStockCount > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
          <span className={inStockCount > 0 ? 'text-emerald-400' : 'text-red-400'}>
            {inStockCount > 0 ? `In stock at ${inStockCount} retailers` : 'Out of stock'}
          </span>
        </div>

        {/* Top 3 Prices */}
        <div className="space-y-2 pt-2">
          {prices
            .sort((a, b) => a.price - b.price)
            .slice(0, 3)
            .map(({ retailer, price, inStock }, idx) => (
              <div key={retailer} className="flex items-center justify-between text-sm py-1">
                <div className="flex items-center gap-2">
                  {idx === 0 && <span className="text-emerald-400 text-xs">★</span>}
                  <span className="text-gray-400">{getRetailerDisplayName(retailer)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${price === minPrice ? 'text-emerald-400' : 'text-white'}`}>
                    ${price.toLocaleString()}
                  </span>
                  {inStock ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <X className="w-3 h-3 text-red-500" />
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25"
          >
            View Details
            <ExternalLink className="w-4 h-4" />
          </Link>
          <a
            href={getAffiliateSearchUrl(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors duration-200"
            title="Shop on Amazon"
          >
            <ShoppingCart className="w-5 h-5 text-gray-300" />
          </a>
          <button
            className="flex items-center justify-center px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors duration-200"
            title="Price Alert"
          >
            <Bell className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard