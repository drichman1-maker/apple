'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

export default function EquipmentGrid() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const equipment = [
    {
      name: 'Cryotherapy Chamber',
      description: 'Advanced whole-body cryotherapy systems for rapid recovery and performance enhancement. Multi-person units available.',
      range: '-110°C to -150°C',
      price: '$65,000 - $220,000',
      image: '/images/cryo.jpg'
    },
    {
      name: 'Hyperbaric Oxygen',
      description: 'Medical-grade mild and hard chambers delivering concentrated oxygen therapy for accelerated healing and cellular regeneration.',
      range: '1.3 - 3.0 ATA',
      price: '$45,000 - $180,000',
      image: '/images/hyperbaric.jpg'
    },
    {
      name: 'Red Light Therapy',
      description: 'High-irradiance full-body panels and beds for pain management, skin health, and cellular optimization.',
      range: '630-850nm',
      price: '$35,000 - $150,000',
      image: '/images/redlight.jpg'
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Premium Recovery</span>{' '}
            <span className="text-white">Equipment</span>
          </h2>
          <p className="text-xl text-gray-400">
            Enterprise-grade wellness technology for elite facilities
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {equipment.map((item, index) => (
            <div
              key={item.name}
              className="glass-card hover-glow p-8 flex flex-col"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Equipment Image/Placeholder */}
              <div className="aspect-square mb-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-6xl">🔬</div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3">{item.name}</h3>
              <p className="text-gray-400 mb-4 flex-grow">{item.description}</p>

              {/* Specs */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Range</span>
                  <span className="text-cyan-400">{item.range}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Starting at</span>
                  <span className="text-cyan-400">{item.price}</span>
                </div>
              </div>

              {/* CTA */}
              <button className="btn-neon w-full flex items-center justify-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}