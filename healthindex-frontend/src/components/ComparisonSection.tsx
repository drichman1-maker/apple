'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Check, X } from 'lucide-react'

export default function ComparisonSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const systems = [
    {
      feature: 'Cooling Agent',
      electric: 'Electric',
      nitrogen: 'Liquid N2'
    },
    {
      feature: 'Temp Range',
      electric: '-15°F to -27°C',
      nitrogen: '-238°F to -150°C'
    },
    {
      feature: 'Monthly Cost',
      electric: '$200-400',
      nitrogen: '$800-1200'
    },
    {
      feature: 'Installation',
      electric: <Check className="text-green-400" />,
      nitrogen: <X className="text-red-400" />
    },
    {
      feature: 'Maintenance',
      electric: 'Minimal',
      nitrogen: 'Regular'
    },
    {
      feature: 'Space Needed',
      electric: '8\' x 8\'',
      nitrogen: '12\' x 12\''
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">System</span>{' '}
            <span className="text-white">Comparison</span>
          </h2>
          <p className="text-xl text-gray-400">
            Electric vs Nitrogen Cryotherapy Systems
          </p>
        </div>

        {/* Comparison Table */}
        <div className={`glass-card transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Feature</th>
                  <th className="py-4 px-6 text-left text-cyan-400 font-medium">Electric</th>
                  <th className="py-4 px-6 text-left text-blue-400 font-medium">Nitrogen</th>
                </tr>
              </thead>
              <tbody>
                {systems.map((row, index) => (
                  <tr
                    key={row.feature}
                    className="border-b border-gray-800/50 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-300">{row.feature}</td>
                    <td className="py-4 px-6 text-gray-400">
                      {typeof row.electric === 'string' ? row.electric : <div className="w-6 h-6">{row.electric}</div>}
                    </td>
                    <td className="py-4 px-6 text-gray-400">
                      {typeof row.nitrogen === 'string' ? row.nitrogen : <div className="w-6 h-6">{row.nitrogen}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="btn-neon inline-flex items-center gap-2">
            Get Custom Quote
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}