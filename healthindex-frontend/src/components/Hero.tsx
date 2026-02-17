'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const equipmentTypes = [
    { name: 'Cryotherapy', price: '$45k - $220k', roi: '12-18 months' },
    { name: 'Hyperbaric', price: '$25k - $180k', roi: '8-14 months' },
    { name: 'Red Light', price: '$10k - $45k', roi: '6-12 months' },
    { name: 'Compression', price: '$8k - $35k', roi: '5-10 months' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-black to-black" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className={`space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">Next-Gen Equipment Intelligence</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">Source the Right</span>
              <br />
              <span className="text-white">Recovery Equipment</span>
              <br />
              <span className="text-neon">— At the Right Price.</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-400 max-w-xl">
              Premium, clinical-grade technology for elite facilities, spas, and performance centers. 
              Streamlined procurement for the most advanced wellness modalities.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-neon flex items-center justify-center gap-2 text-lg">
                View Equipment
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-3 rounded-lg border border-gray-700 text-white font-medium hover:border-cyan-500/50 transition-colors">
                Get a Quote
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span className="text-sm">Verified Suppliers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <span className="text-sm">ROI Calculated</span>
              </div>
            </div>
          </div>
          
          {/* Right content - Equipment cards */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {equipmentTypes.map((equip, index) => (
              <div
                key={equip.name}
                className="glass-card p-6 hover-glow cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                  <Zap className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{equip.name}</h3>
                <div className="space-y-1">
                  <p className="text-cyan-400 font-medium">{equip.price}</p>
                  <p className="text-sm text-gray-500">ROI: {equip.roi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom stats */}
        <div className="mt-20 pt-10 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '$2.5B+', label: 'Equipment Sourced' },
              { value: '500+', label: 'Partner Facilities' },
              { value: '45%', label: 'Average Savings' },
              { value: '24/7', label: 'Expert Support' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}