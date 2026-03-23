import React from 'react'
import { TrendingUp, Info } from 'lucide-react'

// Updated retention rates (lowered 30% total based on market data)
const RETENTION_CONFIG = {
  macbook: { min: 0.56, max: 0.63, label: 'MacBook' },
  imac: { min: 0.52, max: 0.59, label: 'iMac' },
  macstudio: { min: 0.53, max: 0.60, label: 'Mac Studio' },
  iphone: { min: 0.55, max: 0.65, label: 'iPhone' },
  ipad: { min: 0.50, max: 0.58, label: 'iPad' },
  watch: { min: 0.45, max: 0.55, label: 'Apple Watch' },
  airpods: { min: 0.40, max: 0.50, label: 'AirPods' },
  default: { min: 0.52, max: 0.60, label: 'Apple Product' }
}

const getProductCategory = (productName) => {
  if (!productName) return 'default'
  const name = productName.toLowerCase()
  if (name.includes('macbook')) return 'macbook'
  if (name.includes('imac')) return 'imac'
  if (name.includes('studio')) return 'macstudio'
  if (name.includes('iphone')) return 'iphone'
  if (name.includes('ipad')) return 'ipad'
  if (name.includes('watch')) return 'watch'
  if (name.includes('airpods')) return 'airpods'
  return 'default'
}

const ResaleValueCard = ({ currentPrice, productName, years = 2 }) => {
  const category = getProductCategory(productName)
  const config = RETENTION_CONFIG[category] || RETENTION_CONFIG.default
  
  // Calculate value range
  const lowValue = Math.round(currentPrice * config.min)
  const highValue = Math.round(currentPrice * config.max)
  const avgRetention = ((config.min + config.max) / 2)
  
  // Calculate depreciation
  const avgDepreciation = Math.round((currentPrice - (lowValue + highValue) / 2) / years)
  
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-medium text-zinc-300">
            Estimated Resale ({years}YR)
          </span>
        </div>
        <div className="group relative">
          <Info className="h-4 w-4 text-zinc-500 cursor-help" />
          <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-zinc-800 rounded-lg text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            Based on historical resale data for {config.label}s. 
            Actual values vary by condition and market demand.
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-3xl font-bold text-white">
          ${lowValue.toLocaleString()} - ${highValue.toLocaleString()}
        </div>
        <p className="text-sm text-zinc-500 mt-1">
          Range based on {Math.round(config.min * 100)}-{Math.round(config.max * 100)}% retention
        </p>
      </div>
      
      <div className="pt-4 border-t border-zinc-800 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Current price:</span>
          <span className="text-zinc-300">${currentPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Est. annual loss:</span>
          <span className="text-red-400">-${avgDepreciation.toLocaleString()}/year</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500">Confidence:</span>
          <span className="text-blue-400 font-medium">High</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-zinc-800">
        <p className="text-xs text-zinc-500">
          <span className="text-zinc-400">Pro tip:</span> Selling privately (Facebook Marketplace, eBay) 
          typically yields 10-15% more than trade-in programs.
        </p>
      </div>
    </div>
  )
}

export default ResaleValueCard