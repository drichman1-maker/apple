import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const PriceVelocityChart = ({ data, retailers }) => {
  const colors = {
    apple: '#007AFF',
    amazon: '#FF9900',
    bestbuy: '#0046BE',
    bh: '#CC0000',
    walmart: '#0071CE',
    target: '#CC0000',
    adorama: '#FF6B00',
    ebay: '#E53238',
    cdw: '#0066B3'
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">PRICE VELOCITY (90D)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value) => [`$${value.toFixed(0)}`, '']}
            />
            {retailers.map((retailer) => (
              <Line
                key={retailer}
                type="monotone"
                dataKey={retailer}
                stroke={colors[retailer] || '#8884d8'}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-end gap-4 mt-4 text-xs text-gray-400">
        <span>30d</span>
        <span>60d</span>
        <span className="text-white font-medium">90d</span>
      </div>
    </div>
  )
}

export default PriceVelocityChart