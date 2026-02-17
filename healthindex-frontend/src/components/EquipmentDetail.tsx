import React, { useState, useEffect } from 'react'
import { ArrowLeft, ShoppingCart, Check, Bell } from 'lucide-react'
import Link from 'next/link'
import MarketTrendsChart from './MarketTrendsChart'

interface SpecPillsProps {
  specs: {
    temperatureRange?: string
    pressureRange?: string
    wavelengthRange?: string
    capacity?: string
    power?: string
    finish?: string
  }
}

const SpecPills = ({ specs }: SpecPillsProps) => {
  const specLabels: Record<string, string> = {
    temperatureRange: 'Temp Range',
    pressureRange: 'Pressure',
    wavelengthRange: 'Wavelength',
    capacity: 'Capacity',
    power: 'Power',
    finish: 'Finish'
  }

  return (
    <div className="flex flex-wrap gap-3">
      {Object.entries(specs).map(([key, value]) => {
        if (!value) return null
        return (
          <div key={key} className="bg-gray-800 rounded-lg px-4 py-3 border border-gray-700">
            <span className="text-[10px] text-gray-500 uppercase tracking-wide block mb-1">
              {specLabels[key] || key}
            </span>
            <span className="text-sm font-semibold text-cyan-400">{value}</span>
          </div>
        )
      })}
    </div>
  )
}

interface EquipmentDetailProps {
  equipment: {
    id: string
    name: string
    description: string
    benefits: string[]
    pricing: {
      single: number
      package: { sessions: number; price: number }
    }
    specs: Record<string, string>
    affiliateLinks: { amazon?: string; directBuy?: string }
  }
}

export default function EquipmentDetail({ equipment }: EquipmentDetailProps) {
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [targetPrice, setTargetPrice] = useState(Math.round(equipment.pricing.single * 0.85))
  const [priceHistory, setPriceHistory] = useState([])

  useEffect(() => {
    // Generate 90-day price history
    const data = []
    const basePrice = equipment.pricing.single
    for (let i = 90; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toISOString().split('T')[0],
        amazon: basePrice + (Math.random() - 0.5) * basePrice * 0.1,
        market: basePrice + (Math.random() - 0.5) * basePrice * 0.15
      })
    }
    setPriceHistory(data)
  }, [equipment])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Link>
            <h1 className="text-xl font-bold">{equipment.name}</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {equipment.name}
            </h2>
            <p className="text-gray-400 max-w-2xl">{equipment.description}</p>
          </div>
          <a
            href={equipment.affiliateLinks?.amazon || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            VIEW ON AMAZON
          </a>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {equipment.benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-900/50 rounded-lg p-4 border border-gray-800">
              <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span className="text-gray-300">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Best Price */}
          <div className="bg-gray-900 rounded-xl p-6 border border-cyan-500/30">
            <span className="text-xs text-gray-500 uppercase tracking-wide block mb-2">
              Best Market Price
            </span>
            <div className="text-5xl font-bold text-white mb-2">
              ${equipment.pricing.single.toLocaleString()}
            </div>
            <p className="text-cyan-400 text-sm">Single unit price</p>
          </div>

          {/* Package Deal */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <span className="text-xs text-gray-500 uppercase tracking-wide block mb-2">
              Package Deal ({equipment.pricing.package.sessions} sessions)
            </span>
            <div className="text-5xl font-bold text-white mb-2">
              ${equipment.pricing.package.price.toLocaleString()}
            </div>
            <p className="text-green-400 text-sm">
              Save ${equipment.pricing.single * equipment.pricing.package.sessions - equipment.pricing.package.price}
            </p>
          </div>
        </div>

        {/* Spec Pills */}
        {equipment.specs && (
          <div className="mb-8">
            <SpecPills specs={equipment.specs} />
          </div>
        )}

        {/* Market Trends */}
        {priceHistory.length > 0 && (
          <div className="mb-8">
            <MarketTrendsChart data={priceHistory} />
          </div>
        )}

        {/* Price Alert */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold uppercase tracking-wide">Price Alerts</h3>
            </div>
            <button
              onClick={() => setShowAlertModal(!showAlertModal)}
              className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              Set Alert
            </button>
          </div>
          
          {showAlertModal && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <label className="text-sm text-gray-400 block mb-2">Target Price</label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(Number(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 pl-8 pr-4 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button className="px-6 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-600 transition-colors">
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}