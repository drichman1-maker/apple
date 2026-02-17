'use client'

import { useState, useEffect } from 'react'
import { Zap, DollarSign, LineChart, Clock } from 'lucide-react'

export default function Features() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: 'Equipment Expertise',
      description: 'Deep knowledge of recovery technology specs, requirements, and performance metrics.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-cyan-400" />,
      title: 'Price Intelligence',
      description: 'Real-time market data and volume pricing to ensure you get the best possible deal.'
    },
    {
      icon: <LineChart className="w-6 h-6 text-cyan-400" />,
      title: 'ROI Analysis',
      description: 'Detailed financial projections and breakeven analysis for your specific market.'
    },
    {
      icon: <Clock className="w-6 h-6 text-cyan-400" />,
      title: 'Lifetime Support',
      description: '24/7 access to our team of equipment specialists and technical experts.'
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Why Choose</span>{' '}
            <span className="text-white">Health Index</span>
          </h2>
          <p className="text-xl text-gray-400">
            Your trusted partner in wellness equipment procurement
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card hover-glow p-8"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}