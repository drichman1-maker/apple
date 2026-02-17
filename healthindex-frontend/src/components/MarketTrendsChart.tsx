import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const MarketTrendsChart = ({ data }) => {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-cyan-500/20">
      <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wide">
        Market Price Trends (90D)
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #06b6d4', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value) => [`$${value.toLocaleString()}`, '']}
            />
            <Line type="monotone" dataKey="amazon" stroke="#06b6d4" strokeWidth={2} dot={false} name="Amazon" />
            <Line type="monotone" dataKey="market" stroke="#8b5cf6" strokeWidth={2} dot={false} name="Market Avg" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-end gap-4 mt-4 text-xs text-gray-500">
        <span>30d</span>
        <span>60d</n        <span className="text-cyan-400 font-medium">90d</span>
      </div>
    </div>
  )
}

export default MarketTrendsChart