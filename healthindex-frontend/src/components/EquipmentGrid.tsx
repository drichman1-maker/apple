'use client'

import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import EquipmentCard from './EquipmentCard'

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
  specs: Record<string, string>
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
      pricing: { single: 45000, package: { sessions: 1, price: 45000 } },
      specs: { temperatureRange: '-110°C to -150°C', capacity: '1-3 people', power: '220V, 30A' },
      affiliateLinks: { amazon: 'https://amazon.com' }
    },
    {
      id: 'hyperbaric',
      name: 'Hyperbaric Oxygen Chamber',
      description: 'Medical-grade mild and hard chambers delivering concentrated oxygen therapy for accelerated healing.',
      benefits: ['Accelerates healing', 'Improves cognition', 'Reduces inflammation'],
      pricing: { single: 65000, package: { sessions: 1, price: 65000 } },
      specs: { pressureRange: '1.3 - 3.0 ATA', capacity: '1 person', power: '110V, 15A' },
      affiliateLinks: { amazon: 'https://amazon.com' }
    },
    {
      id: 'redlight',
      name: 'Red Light Therapy System',
      description: 'High-irradiance full-body panels and beds for pain management, skin health, and cellular optimization.',
      benefits: ['Pain relief', 'Skin rejuvenation', 'Cellular repair'],
      pricing: { single: 8500, package: { sessions: 1, price: 8500 } },
      specs: { wavelengthRange: '630-850nm', coverage: 'Full body', power: '110V, 10A' },
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
            <EquipmentCard key={item.id} equipment={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}