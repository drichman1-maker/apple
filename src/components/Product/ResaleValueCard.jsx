import React from 'react'
import { TrendingUp } from 'lucide-react'

const ResaleValueCard = ({ currentPrice, years = 2 }) => {
  // Calculate estimated resale value (65% retention after 2 years)
  const retentionRate = 0.65
  const resaleValue = Math.round(currentPrice * retentionRate)
  const depreciation = currentPrice - resaleValue
  const annualDepreciation = Math.round(depreciation / years)

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400 uppercase tracking-wide">
          Estimated Resale ({years}YR)
        </span>
        <TrendingUp className="h-5 w-5 text-gray-500" />
      </div>
      <div className="text-4xl font-bold text-white mb-2">
        ${resaleValue.toLocaleString()}
      </div>
      <p className="text-sm text-gray-400">
        Retention: ~{Math.round(retentionRate * 100)}% of current price
      </p>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Annual depreciation:</span>
          <span className="text-red-400">-${annualDepreciation}/year</span>
        </div>
      </div>
    </div>
  )
}

export default ResaleValueCard