import React from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingDown } from 'lucide-react'

interface Equipment {
  id: string
  name: string
  description: string
  benefits: string[]
  pricing: {
    single: number
    package: { sessions: number; price: number }
  }
  specs: Record<string, string>
  affiliateLinks: { amazon?: string }
}

interface EquipmentCardProps {
  equipment: Equipment
  index: number
}

export default function EquipmentCard({ equipment, index }: EquipmentCardProps) {
  const savings = equipment.pricing.single * equipment.pricing.package.sessions - equipment.pricing.package.price
  const discountPercent = Math.round((savings / (equipment.pricing.single * equipment.pricing.package.sessions)) * 100)

  const getIcon = (id: string) => {
    if (id.includes('cryo')) return '❄️'
    if (id.includes('hyper')) return '💨'
    if (id.includes('red') || id.includes('light')) return '🔴'
    if (id.includes('comp')) return '⚡'
    if (id.includes('pemf')) return '🔋'
    if (id.includes('sauna')) return '🔥'
    return '🔬'
  }

  return (
    <div 
      className="glass-card hover-glow p-6 flex flex-col group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Icon & Title */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-5xl">{getIcon(equipment.id)}</div>
        {discountPercent > 0 && (
          <div className="flex items-center gap-1 text-green-400 text-sm">
            <TrendingDown className="w-4 h-4" />
            <span>Save {discountPercent}%</span>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-white mb-2">{equipment.name}</h3>
      <p className="text-gray-400 mb-4 flex-grow text-sm">{equipment.description}</p>

      {/* Specs */}
      {equipment.specs && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(equipment.specs).slice(0, 3).map(([key, value]) => (
            <span key={key} className="text-xs bg-gray-800 text-cyan-400 px-2 py-1 rounded">
              {value}
            </span>
          ))}
        </div>
      )}

      {/* Benefits */}
      <div className="mb-4 space-y-1">
        {equipment.benefits.slice(0, 3).map((benefit, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-1 h-1 bg-cyan-400 rounded-full" />
            {benefit}
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">Single Unit</span>
          <span className="text-cyan-400 font-bold">${equipment.pricing.single.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">Package ({equipment.pricing.package.sessions})</span>
          <span className="text-white font-bold">${equipment.pricing.package.price.toLocaleString()}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-2">
        <Link 
          href={`/equipment/${equipment.id}`}
          className="flex-1 btn-neon flex items-center justify-center gap-2"
        >
          View Details
          <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href={equipment.affiliateLinks?.amazon || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-cyan-400 rounded-lg transition-colors"
        >
          Buy
        </a>
      </div>
    </div>
  )
}