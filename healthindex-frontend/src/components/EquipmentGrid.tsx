'use client'

import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import EquipmentCard from './EquipmentCard'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface Equipment {
  id: string
  name: string
  slug: string
  description: string
  category: string
  prices: {
    [retailer: string]: {
      price: number
      originalPrice?: number
      inStock: boolean
      url: string
    }
  }
  specs?: Record<string, string | number | boolean>
  image?: string
  savings?: number
}

interface EquipmentGridProps {
  initialEquipment?: Equipment[]
}

export default function EquipmentGrid({ initialEquipment = [] }: EquipmentGridProps) {
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment)
  const [loading, setLoading] = useState(initialEquipment.length === 0)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    // If no initial equipment, try to fetch from API
    if (initialEquipment.length === 0) {
      setEquipment(getFallbackEquipment())
      setLoading(false)
    }
    // TODO: Enable API call when backend is deployed
    // fetchEquipment()
  }, [initialEquipment])

  const fetchEquipment = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${API_URL}/api/equipment`)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }
      
      const data = await response.json()
      setEquipment(data)
    } catch (err) {
      console.error('Error fetching equipment:', err)
      setError('Failed to load equipment. Using fallback data.')
      // Use fallback data on error
      setEquipment(getFallbackEquipment())
    } finally {
      setLoading(false)
    }
  }

  const getFallbackEquipment = (): Equipment[] => [
    {
      id: 'cryotherapy',
      slug: 'cryotherapy-chamber',
      name: 'Cryotherapy Chamber',
      description: 'Advanced whole-body cryotherapy systems for rapid recovery and performance enhancement.',
      category: 'cryotherapy',
      prices: {
        amazon: { price: 45000, originalPrice: 55000, inStock: true, url: 'https://amazon.com' },
        direct: { price: 42000, originalPrice: 42000, inStock: true, url: 'https://example.com' }
      },
      specs: { temperatureRange: '-110°C to -150°C', capacity: '1-3 people', power: '220V, 30A' },
      savings: 18
    },
    {
      id: 'hyperbaric',
      slug: 'hyperbaric-oxygen-chamber',
      name: 'Hyperbaric Oxygen Chamber',
      description: 'Medical-grade mild and hard chambers delivering concentrated oxygen therapy.',
      category: 'hyperbaric',
      prices: {
        amazon: { price: 65000, originalPrice: 75000, inStock: true, url: 'https://amazon.com' },
        direct: { price: 62000, originalPrice: 62000, inStock: false, url: 'https://example.com' }
      },
      specs: { pressureRange: '1.3 - 3.0 ATA', capacity: '1 person', power: '110V, 15A' },
      savings: 13
    },
    {
      id: 'redlight',
      slug: 'red-light-therapy-system',
      name: 'Red Light Therapy System',
      description: 'High-irradiance full-body panels for pain management and cellular optimization.',
      category: 'red-light',
      prices: {
        amazon: { price: 8500, originalPrice: 9500, inStock: true, url: 'https://amazon.com' },
        direct: { price: 7800, originalPrice: 7800, inStock: true, url: 'https://example.com' }
      },
      specs: { wavelengthRange: '630-850nm', coverage: 'Full body', power: '110V, 10A' },
      savings: 11
    },
    {
      id: 'normatec',
      slug: 'normatec-compression-system',
      name: 'Normatec Compression System',
      description: 'Advanced pneumatic compression for recovery and circulation enhancement.',
      category: 'compression',
      prices: {
        amazon: { price: 1295, originalPrice: 1495, inStock: true, url: 'https://amazon.com' },
        direct: { price: 1195, originalPrice: 1195, inStock: true, url: 'https://example.com' }
      },
      specs: { zones: '7 levels', sessions: 'Multiple programs', battery: '3 hours' },
      savings: 15
    },
    {
      id: 'plunge',
      slug: 'cold-plunge-pro',
      name: 'Cold Plunge Pro',
      description: 'Professional cold water immersion tub with temperature control and filtration.',
      category: 'contrast-therapy',
      prices: {
        amazon: { price: 5990, originalPrice: 6990, inStock: true, url: 'https://amazon.com' },
        direct: { price: 5490, originalPrice: 5490, inStock: true, url: 'https://example.com' }
      },
      specs: { temperature: '39-55°F', filtration: 'UV + Ozone', capacity: '1 person' },
      savings: 14
    },
    {
      id: 'bemer',
      slug: 'bemer-pemf-mat',
      name: 'BEMER PEMF Mat',
      description: ' PEMF therapy mat for improved microcirculation and recovery.',
      category: 'pemf',
      prices: {
        amazon: { price: 5990, originalPrice: 6990, inStock: true, url: 'https://amazon.com' },
        direct: { price: 5490, originalPrice: 5490, inStock: true, url: 'https://example.com' }
      },
      specs: { intensity: '3-100 μT', programs: '10 preset', blanket: 'Included' },
      savings: 14
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
          <div className="text-center text-red-400">
            <AlertCircle className="h-12 w-12 mx-auto mb-4" />
            <p>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-cyan-400">Equipment</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Compare prices across multiple retailers and find the best deals on professional-grade wellness equipment
          </p>
          {error && (
            <p className="text-yellow-400 mt-4 text-sm">{error}</p>
          )}
        </div>

        {/* Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {equipment.map((item) => (
            <EquipmentCard key={item.id} equipment={item} />
          ))}
        </div>
      </div>
    </section>
  )
}