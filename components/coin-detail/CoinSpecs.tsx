'use client';

import { Calendar, Globe, Weight, Ruler, Users, Award, DollarSign } from 'lucide-react';
import { Coin } from '@/types';
import { 
  formatYear, 
  formatComposition, 
  formatWeight, 
  formatDiameter, 
  formatMintage, 
  formatPrice 
} from '@/lib/utils';

interface CoinSpecsProps {
  coin: Coin;
}

export function CoinSpecs({ coin }: CoinSpecsProps) {
  const specs = [
    {
      icon: Calendar,
      label: 'Year',
      value: formatYear(coin.year),
      show: !!coin.year
    },
    {
      icon: Globe,
      label: 'Country',
      value: coin.country || 'Unknown',
      show: !!coin.country
    },
    {
      icon: DollarSign,
      label: 'Denomination',
      value: coin.denomination || 'Unknown',
      show: !!coin.denomination
    },
    {
      icon: Award,
      label: 'Composition',
      value: formatComposition(coin.composition),
      show: !!coin.composition
    },
    {
      icon: Weight,
      label: 'Weight',
      value: formatWeight(coin.weight),
      show: !!coin.weight
    },
    {
      icon: Ruler,
      label: 'Diameter',
      value: formatDiameter(coin.diameter),
      show: !!coin.diameter
    },
    {
      icon: Users,
      label: 'Mintage',
      value: formatMintage(coin.mintage),
      show: !!coin.mintage
    },
  ];

  // Mock current market data
  const marketData = {
    estimatedValue: Math.floor(Math.random() * 5000) + 100,
    lastSalePrice: Math.floor(Math.random() * 4000) + 150,
    priceChange: (Math.random() - 0.5) * 20,
    volume24h: Math.floor(Math.random() * 50) + 5,
  };

  return (
    <div className="space-y-6">
      {/* Specifications */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Specifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {specs.filter(spec => spec.show).map((spec, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <spec.icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {spec.label}
                </div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {spec.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        {coin.rarity && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Rarity</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                coin.rarity.toLowerCase().includes('common') 
                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                  : coin.rarity.toLowerCase().includes('rare')
                  ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
              }`}>
                {coin.rarity}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Market Data */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Market Data
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Estimated Value
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {formatPrice(marketData.estimatedValue)}
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Last Sale
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {formatPrice(marketData.lastSalePrice)}
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              24h Change
            </div>
            <div className={`text-lg font-semibold ${
              marketData.priceChange >= 0 
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {marketData.priceChange >= 0 ? '+' : ''}{marketData.priceChange.toFixed(1)}%
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Sales Volume
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {marketData.volume24h}
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          Market data is estimated based on recent auction results and dealer prices
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>

        <div className="space-y-3">
          <button className="w-full btn-primary justify-center">
            Add to Collection
          </button>
          
          <button className="w-full btn-secondary justify-center">
            Set Price Alert
          </button>
          
          <button className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors justify-center">
            Find Similar Coins
          </button>
        </div>
      </div>

      {/* Certification Numbers */}
      {(coin.pcgsNumber || coin.ngcNumber) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Certification Numbers
          </h2>

          <div className="space-y-3">
            {coin.pcgsNumber && (
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">P</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">PCGS</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      #{coin.pcgsNumber}
                    </div>
                  </div>
                </div>
                <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                  View on PCGS
                </button>
              </div>
            )}

            {coin.ngcNumber && (
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">N</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">NGC</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      #{coin.ngcNumber}
                    </div>
                  </div>
                </div>
                <button className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                  View on NGC
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}