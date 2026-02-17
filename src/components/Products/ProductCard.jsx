import React from 'react'
import { Link } from 'react-router-dom'
import { getProductImage } from '../../utils/productImages'
import { useProductCondition } from '../../contexts/ProductConditionContext'

const ProductCard = ({ product }) => {
  const { isNew, isRefurbished } = useProductCondition()
  
  // Get prices based on condition (new vs refurbished)
  const priceData = isRefurbished && product.refurbishedPrices 
    ? product.refurbishedPrices 
    : product.prices
  
  // Authorized retailers for new products (prioritized order)
  const authorizedRetailers = ['apple', 'amazon', 'bestbuy', 'bh', 'adorama', 'walmart', 'target', 'cdw']
  
  // For refurbished, include Apple Certified Refurbished and Amazon Renewed
  const refurbishedRetailers = ['apple', 'amazon', 'bestbuy']
  
  const relevantRetailers = isRefurbished ? refurbishedRetailers : authorizedRetailers
  
  // Convert prices to array and filter for in-stock items
  let prices = Object.entries(priceData)
    .filter(([retailer, data]) => data.inStock && relevantRetailers.includes(retailer))
    .map(([retailer, data]) => ({
      retailer,
      ...data
    }))
  
  // Fallback logic
  if (prices.length === 0) {
    prices = Object.entries(priceData)
      .filter(([retailer, data]) => data.inStock && retailer !== 'ebay')
      .map(([retailer, data]) => ({
        retailer,
        ...data
      }))
  }
  
  if (prices.length === 0) {
    prices = Object.entries(priceData)
      .filter(([retailer, data]) => data.inStock)
      .map(([retailer, data]) => ({
        retailer,
        ...data
      }))
  }

  const minPrice = prices.length > 0 ? Math.min(...prices.map(p => p.price)) : 0
  const maxPrice = prices.length > 0 ? Math.max(...prices.map(p => p.price)) : 0
  const bestDeal = prices.find(p => p.price === minPrice) || { retailer: 'apple', price: 0 }
  const hasDiscount = maxPrice > minPrice && maxPrice > 0
  const discountPercent = hasDiscount ? Math.round(((maxPrice - minPrice) / maxPrice) * 100) : 0

  const getRetailerDisplayName = (retailer) => {
    const names = {
      apple: 'Apple',
      amazon: 'Amazon',
      walmart: 'Walmart',
      target: 'Target',
      bestbuy: 'Best Buy',
      bh: 'B&H',
      adorama: 'Adorama',
      ebay: 'eBay',
      cdw: 'CDW',
      hyperice: 'Hyperice',
      rei: 'REI',
      rogue: 'Rogue'
    }
    return names[retailer] || retailer
  }

  const getCategoryDisplay = (category) => {
    const categories = {
      iphone: 'IPHONE',
      ipad: 'IPAD',
      mac: 'MAC',
      watch: 'WATCH',
      airpods: 'AIRPODS'
    }
    return categories[category] || category.toUpperCase()
  }

  const getCategoryColor = (category) => {
    const colors = {
      mac: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      iphone: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
      ipad: 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400',
      watch: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
      airpods: 'bg-green-500/20 border-green-500/30 text-green-400'
    }
    return colors[category] || 'bg-gray-500/20 border-gray-500/30 text-gray-400'
  }

  // Extract specs for pills
  const getSpecPills = () => {
    const pills = []
    const specs = product.specifications || product.specs || {}
    
    if (specs.chip || specs.processor) {
      const chip = Array.isArray(specs.chip) ? specs.chip[0] : specs.chip
      const processor = Array.isArray(specs.processor) ? specs.processor[0] : specs.processor
      pills.push({ label: 'chip', value: chip || processor })
    }
    if (specs.memory || specs.ram) {
      const mem = Array.isArray(specs.memory) ? specs.memory[0] : specs.memory
      const ram = Array.isArray(specs.ram) ? specs.ram[0] : specs.ram
      pills.push({ label: 'ram', value: mem || ram })
    }
    if (specs.storage) {
      const storage = Array.isArray(specs.storage) ? specs.storage[0] : specs.storage
      pills.push({ label: 'storage', value: storage })
    }
    if (specs.colors) {
      const color = Array.isArray(specs.colors) ? specs.colors[0] : specs.colors
      pills.push({ label: 'color', value: color })
    }
    if (specs.year || specs.releaseYear) {
      pills.push({ label: 'yr', value: specs.year || specs.releaseYear })
    }
    
    return pills.slice(0, 4) // Max 4 pills
  }

  const specPills = getSpecPills()

  // Generate retailer links
  const getRetailerUrl = (retailer, productName) => {
    const encoded = encodeURIComponent(productName)
    const urls = {
      apple: `https://apple.com/search/${encoded}`,
      amazon: `https://amazon.com/s?k=${encoded}`,
      bestbuy: `https://bestbuy.com/site/searchpage.jsp?st=${encoded}`,
      bh: `https://bhphotovideo.com/c/search?q=${encoded}`,
      adorama: `https://adorama.com/search?q=${encoded}`,
      walmart: `https://walmart.com/search?q=${encoded}`,
      target: `https://target.com/s?searchTerm=${encoded}`,
      ebay: `https://ebay.com/sch/i.html?_nkw=${encoded}`,
      cdw: `https://cdw.com/search/?key=${encoded}`
    }
    return urls[retailer] || '#'
  }

  return (
    <div className="hi-card-hover overflow-hidden flex flex-col">
      {/* Clickable area for product detail */}
      <Link 
        to={`/product/${product.id}`}
        className="group flex-1 p-5"
      >
        {/* Header with category badge */}
        <div className="flex items-start justify-between mb-3">
          <span className={`hi-pill ${getCategoryColor(product.category)}`}>
            {getCategoryDisplay(product.category)}
          </span>
          {isRefurbished ? (
            <span className="hi-pill bg-green-500/20 border-green-500/30 text-green-400 text-[10px]">
              REFURB
            </span>
          ) : (
            <span className="text-xs text-gray-500">{product.brand || 'Apple'}</span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>

        {/* Spec Pills */}
        {specPills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {specPills.map((pill, idx) => (
              <span 
                key={idx}
                className="hi-pill-gray text-[10px] uppercase"
              >
                {pill.label}: {pill.value}
              </span>
            ))}
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">BEST PRICE</p>
            <p className="text-2xl font-bold text-white">
              ${minPrice.toLocaleString()}
            </p>
            <p className="text-xs text-green-400">
              at {getRetailerDisplayName(bestDeal.retailer)}
            </p>
          </div>
          
          {hasDiscount && discountPercent > 0 && (
            <div className="text-right">
              <p className="text-sm text-gray-500 line-through">
                ${maxPrice.toLocaleString()}
              </p>
              <span className="hi-pill-green text-xs">
                -{discountPercent}%
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Retailer Links - outside Link so they work independently */}
      <div className="px-5 pb-4 pt-2 border-t border-[#262626]">
        <p className="text-[10px] text-gray-600 mb-2 uppercase tracking-wider">Buy From</p>
        <div className="flex flex-wrap gap-2">
          {prices.slice(0, 3).map(({ retailer, price }) => (
            <a
              key={retailer}
              href={getRetailerUrl(retailer, product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[70px] text-center px-2 py-1.5 bg-white/5 hover:bg-white/10 rounded text-xs transition-colors"
            >
              <span className="block text-gray-500 text-[10px]">{getRetailerDisplayName(retailer)}</span>
              <span className="block text-blue-400 font-medium">${price.toLocaleString()}</span>
            </a>
          ))}
          {prices.length > 3 && (
            <Link
              to={`/product/${product.id}`}
              className="flex-1 min-w-[70px] text-center px-2 py-1.5 bg-white/5 hover:bg-white/10 rounded text-xs transition-colors"
            >
              <span className="block text-gray-500 text-[10px]">More</span>
              <span className="block text-gray-400 font-medium">+{prices.length - 3}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
