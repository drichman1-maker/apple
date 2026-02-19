'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingDown, TrendingUp, Bell, ExternalLink, ShoppingCart } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  prices: {
    [retailer: string]: {
      price: number;
      originalPrice?: number;
      inStock: boolean;
      url: string;
    };
  };
  specs?: Record<string, string | number | boolean>;
  image?: string;
  savings?: number;
}

interface EquipmentCardProps {
  equipment: Equipment;
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
  const priceEntries = Object.entries(equipment.prices);
  const lowestPrice = Math.min(...priceEntries.map(([, data]) => data.price));
  const highestPrice = Math.max(...priceEntries.map(([, data]) => data.price));
  const bestRetailer = priceEntries.find(([, data]) => data.price === lowestPrice)?.[0];
  const inStockCount = priceEntries.filter(([, data]) => data.inStock).length;
  
  const discount = highestPrice > lowestPrice 
    ? Math.round(((highestPrice - lowestPrice) / highestPrice) * 100)
    : 0;

  const isSteal = discount > 20;
  const isDeal = discount > 10 && discount <= 20;

  return (
    <article 
      className="group relative"
      aria-label={`${equipment.name} - $${lowestPrice.toLocaleString()}`}
    >
      {/* Card Container - Glassmorphism */}
      <div 
        className="relative bg-[#1a1a25]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-[#00e5ff]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]"
        role="region"
        aria-labelledby={`equipment-${equipment.id}-title`}
      >
        
        {/* Badges */}
        {isSteal && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/25 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              SAVE {discount}%
            </div>
          </div>
        )}
        
        {isDeal && !isSteal && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-gradient-to-r from-[#00e5ff] to-[#00b8d9] text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-cyan-500/25">
              DEAL
            </div>
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-[#12121a] to-[#0a0a0f] overflow-hidden">
          {equipment.image ? (
            <Image
              src={equipment.image}
              alt={`${equipment.name} - ${equipment.category} wellness equipment`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00e5ff]/20 to-[#7c3aed]/20 flex items-center justify-center">
                <span className="text-4xl">
                  {equipment.category === 'cryotherapy' ? '❄️' :
                   equipment.category === 'hyperbaric' ? '💨' :
                   equipment.category === 'redlight' ? '🔴' :
                   equipment.category === 'sauna' ? '🧖' :
                   equipment.category === 'massage' ? '💆' : '🔬'}
                </span>
              </div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a25] via-transparent to-transparent" />
          
          {/* Stock Indicator */}
          <div className="absolute top-4 right-4 z-20">
            <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
              inStockCount > 0 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${inStockCount > 0 ? 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]' : 'bg-rose-400'}`} />
              {inStockCount > 0 ? `${inStockCount} in stock` : 'Out of stock'}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Category & Title */}
          <div>
            <span className="text-xs font-semibold text-[#00e5ff] uppercase tracking-wider">
              {equipment.category}
            </span>
            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-[#00e5ff] transition-colors line-clamp-2">
              {equipment.name}
            </h3>
            <p className="text-sm text-white/50 mt-1 line-clamp-2">
              {equipment.description}
            </p>
          </div>

          {/* Specs Pills */}
          {equipment.specs && Object.keys(equipment.specs).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(equipment.specs).slice(0, 3).map(([key, value]) => (
                <span 
                  key={key}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-white/70"
                >
                  {value}
                </span>
              ))}
            </div>
          )}

          {/* Price Section */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                ${lowestPrice.toLocaleString()}
              </span>
              {highestPrice > lowestPrice && (
                <span className="text-base text-white/40 line-through">
                  ${highestPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-sm text-white/60 mt-1">
              Best at <span className="text-[#00e5ff] font-medium capitalize">{bestRetailer}</span>
            </p>
          </div>

          {/* Top 3 Prices */}
          <div className="space-y-1">
            {priceEntries
              .sort(([, a], [, b]) => a.price - b.price)
              .slice(0, 3)
              .map(([retailer, data], idx) => (
                <div 
                  key={retailer}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {idx === 0 && <span className="text-emerald-400 text-xs">★</span>}
                    <span className="text-sm text-white/60 capitalize">{retailer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${
                      data.price === lowestPrice ? 'text-emerald-400' : 'text-white'
                    }`}>
                      ${data.price.toLocaleString()}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      data.inStock 
                        ? 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]' 
                        : 'bg-rose-400'
                    }`} />
                  </div>
                </div>
              ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Link
              href={`/products/${equipment.slug}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#00e5ff] to-[#00b8d9] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 text-sm"
            >
              View Details
              <ExternalLink className="w-4 h-4" />
            </Link>
            <button className="flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all">
              <Bell className="w-5 h-5 text-white/70" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}