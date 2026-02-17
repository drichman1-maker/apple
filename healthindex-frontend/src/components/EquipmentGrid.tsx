'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface Equipment {
  id: string
  name: string
  description: string
  benefits: string[]
  pricing: {
    single: number
    package: {
      sessions: number
      price: number
    }
  }
  affiliateLinks: {
    amazon?: string
    directBuy?: string
  }
}

export default function EquipmentGrid() {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    fetchEquipment()
  }, [])

  const fetchEquipment = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/products`)
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setEquipment(data.products || [])
    } catch (err) {
      console.error('Failed to fetch equipment:', err)
      setError('Unable to load equipment data')
      // Use fallback data
      setEquipment(getFallbackEquipment())
    } finally {
      setLoading(false)
    }
  }

  const getFallbackEquipment = (): Equipment[] => [
    {
      id: 'cryotherapy',
      name: 'Cryotherapy Chamber',
      description: 'Advanced whole-body cryotherapy systems for rapid recovery and performance enhancement. Multi-person units available.',
      benefits: ['Reduces inflammation', 'Accelerates recovery', 'Boosts metabolism'],
      pricing: { single: 75, package: { sessions: 5, price: 325 } },
      affiliateLinks: { amazon: 'https://amazon.com' }
    },
    {
      id: 'hyperbaric',
      name: 'Hyperbaric Oxygen',
      description: 'Medical-grade mild and hard chambers delivering concentrated oxygen therapy for accelerated healing.',
      benefits: ['Accelerates healing', 'Improves cognition', 'Reduces inflammation'],
      pricing: { single: 150, package: { sessions: 5, price: 650 } },
      affiliateLinks: { amazon: 'https://amazon.com' }
    },
    {
      id: 'redlight',
      name: 'Red Light Therapy',
      description: 'High-irradiance full-body panels and beds for pain management, skin health, and cellular optimization.',
      benefits: ['Pain relief', 'Skin rejuvenation', 'Cellular repair'],
      pricing: { single: 50, package: { sessions: 5, price: 200 } },
      affiliateLinks: { amazon: 'https://amazon.com' }
    }
  ]

  if (loading) {
    return (
      <section className="relative py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-cyan-400" />
            <p className="mt-4 text-gray-400">Loading equipment...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error && equipment.length === 0) {
    return (
      <section className="relative py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500" />
            <p className="mt-4 text-gray-400">{error}</p>
            <button onClick={fetchEquipment} className="mt-4 text-cyan-400 hover:underline">
              Try again
            </button>
          </div>
        </div>
      </section>
    )
  }

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
              key={item.id}
              className="glass-card hover-glow p-8 flex flex-col"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Equipment Icon */}
              <div className="aspect-square mb-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center overflow-hidden">
                <div className="text-6xl">
                  {item.id === 'cryotherapy' ? '❄️' : 
                   item.id === 'hyperbaric' ? '💨' : 
                   item.id === 'redlight' ? '🔴' : '🔬'}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3">{item.name}</h3>
              <p className="text-gray-400 mb-4 flex-grow">{item.description}</p>

              {/* Benefits */}
              <div className="mb-4">
                <ul className="space-y-1">
                  {item.benefits?.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Single Session</span>
                  <span className="text-cyan-400">${item.pricing?.single}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Package ({item.pricing?.package?.sessions} sessions)</span>
                  <span className="text-cyan-400">${item.pricing?.package?.price}</span>
                </div>
              </div>

              {/* CTA */}
              <a 
                href={item.affiliateLinks?.amazon || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon w-full flex items-center justify-center gap-2"
              >
                View on Amazon
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}