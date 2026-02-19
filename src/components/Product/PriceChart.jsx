import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const PriceChart = ({ data }) => {
  const colors = {
    apple: '#007AFF',
    amazon: '#FF9500',
    bestbuy: '#FFD60A',
    bh: '#30D158'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatPrice = (value) => {
    return `$${Math.round(value)}`
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-gray-900 dark:text-white font-medium mb-2">
            {formatDate(label)}
          </p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {entry.dataKey === 'apple' ? 'Apple' :
                   entry.dataKey === 'amazon' ? 'Amazon' :
                   entry.dataKey === 'bestbuy' ? 'Best Buy' :
                   entry.dataKey === 'bh' ? 'B&H Photo' :
                   entry.dataKey}:
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  ${Math.round(entry.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
        No price data available
      </div>
    )
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            className="text-xs"
            stroke="currentColor"
          />
          <YAxis
            tickFormatter={formatPrice}
            className="text-xs"
            stroke="currentColor"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px'
            }}
            formatter={(value) => (
              <span className="capitalize">
                {value === 'apple' ? 'Apple' :
                 value === 'amazon' ? 'Amazon' :
                 value === 'bestbuy' ? 'Best Buy' :
                 value === 'bh' ? 'B&H Photo' :
                 value}
              </span>
            )}
          />
          {Object.keys(colors).map((retailer) => (
            <Line
              key={retailer}
              type="monotone"
              dataKey={retailer}
              stroke={colors[retailer]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              connectNulls={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PriceChart