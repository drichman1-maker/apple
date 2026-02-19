'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ExternalLink, ChevronDown, ChevronUp, Shield, Truck, RefreshCcw } from 'lucide-react'
import { equipment } from '@/data/equipment'
import RelatedProducts from '@/components/RelatedProducts'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [showAllRetailers, setShowAllRetailers] = useState(false)
  
  const product = equipment.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  // Sort retailers by price (lowest first)
  const sortedRetailers = Object.entries(product.prices).sort(([, a], [, b]) => a.price - b.price)
  const top3Retailers = sortedRetailers.slice(0, 3)
  const remainingRetailers = sortedRetailers.slice(3)

  const lowestPrice = sortedRetailers[0]?.[1].price
  const highestPrice = sortedRetailers[sortedRetailers.length - 1]?.[1].price
  const savings = highestPrice - lowestPrice

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-600'
        }`}
      />
    ))
  }

  const getRetailerName = (key: string) => {
    const names: Record<string, string> = {
      amazon: 'Amazon',
      bestbuy: 'Best Buy',
      walmart: 'Walmart',
      target: 'Target',
      costco: 'Costco',
      direct: 'Direct',
      rei: 'REI',
      rogue: 'Rogue Fitness',
      therabody: 'Therabody',
      hyperice: 'Hyperice',
      joovv: 'Joovv',
      bemer: 'BEMER',
      clearlight: 'Clearlight',
      plunge: 'Plunge',
      oxyhealth: 'OxyHealth',
      cryo: 'Cryo',
      wayfair: 'Wayfair'
    }
    return names[key] || key.charAt(0).toUpperCase() + key.slice(1)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-[#00e5ff] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#00e5ff] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-[#00e5ff]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#12121a] to-[#0a0a0f] border border-white/10">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {/* Savings Badge */}
              {savings > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                  Save ${savings.toLocaleString()}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <span className="text-sm font-semibold text-[#00e5ff] uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">
                {product.name}
              </h1>
              <p className="text-xl text-gray-400 mt-1">
                by {product.name.split(' ')[0]}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating || 4.5)}
              </div>
              <span className="text-sm text-gray-400">
                ({product.reviewCount || 100}+ reviews)
              </span>
            </div>

            {/* Price Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-white">
                  ${lowestPrice?.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  ${highestPrice?.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-emerald-400">
                Lowest price found across {sortedRetailers.length} retailers
              </p>
            </div>

            {/* Top 3 Retailers */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Best Prices
              </h3>
              
              {top3Retailers.map(([retailer, data], index) => (
                <a
                  key={retailer}
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#00e5ff]/50 hover:bg-white/[0.07] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-400'
                    }`}>
                      {index === 0 ? '★' : index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-white capitalize">
                        {getRetailerName(retailer)}
                      </p>
                      <p className={`text-sm ${data.inStock ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {data.inStock ? '✓ In Stock' : 'Out of Stock'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">
                      ${data.price.toLocaleString()}
                    </p>
                    {data.originalPrice && data.originalPrice > data.price && (
                      <p className="text-sm text-gray-500 line-through">
                        ${data.originalPrice.toLocaleString()}
                      </p>
                    )}
                  </div>
                </a>
              ))}

              {/* Show All / Hide Button */}
              {remainingRetailers.length > 0 && (
                <button
                  onClick={() => setShowAllRetailers(!showAllRetailers)}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/[0.07] transition-all flex items-center justify-center gap-2 text-[#00e5ff]"
                >
                  {showAllRetailers ? (
                    <>
                      <ChevronUp className="w-5 h-5" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5" />
                      Compare All {sortedRetailers.length} Retailers
                    </>
                  )}
                </button>
              )}

              {/* Remaining Retailers */}
              {showAllRetailers && remainingRetailers.map(([retailer, data]) => (
                <a
                  key={retailer}
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#00e5ff]/50 hover:bg-white/[0.07] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-gray-400 flex items-center justify-center text-sm font-bold">
                      {getRetailerName(retailer).charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white capitalize">
                        {getRetailerName(retailer)}
                      </p>
                      <p className={`text-sm ${data.inStock ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {data.inStock ? '✓ In Stock' : 'Out of Stock'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">
                      ${data.price.toLocaleString()}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-[#00e5ff] mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                <p className="text-xs text-gray-400">Secure Checkout</p>
              </div>
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <p className="text-xs text-gray-400">Fast Shipping</p>
              </div>
              <div className="text-center">
                <RefreshCcw className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <p className="text-xs text-gray-400">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specs && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Specifications
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-white/10 last:border-b-0">
                    <span className="text-gray-400">{key}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        <RelatedProducts currentProduct={product} />
      </div>
    </div>
  )
}
