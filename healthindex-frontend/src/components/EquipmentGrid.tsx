'use client'

import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import EquipmentCard from './EquipmentCard'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface Equipment {
  id: string
  name: string
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
  specs?: {
    [key: string]: string
  }
  image?: string
  savings?: number
}

export default function EquipmentGrid() {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    // Show fallback data immediately (backend not deployed yet)
    setEquipment(getFallbackEquipment())
    setLoading(false)
    // TODO: Enable API call when backend is deployed
    // fetchEquipment()
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
      name: 'Red Light Therapy System',
      description: 'High-irradiance full-body panels for pain management and cellular optimization.',
      category: 'redlight',
      prices: {
        amazon: { price: 8500, originalPrice: 9500, inStock: true, url: 'https://amazon.com' },
        direct: { price: 7800, originalPrice: 7800, inStock: true, url: 'https://example.com' }
      },
      specs: { wavelengthRange: '630-850nm', coverage: 'Full body', power: '110V, 10A' },
      savings: 11
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
            <EquipmentCard key={item.id} equipment={item} />
          ))}
        </div>
      </div>
    </section>
  )
}