'use client';

import Link from 'next/link';
import { Coin } from '@/types';
import { CoinCard } from '@/components/coins/CoinCard';
import { Clock } from 'lucide-react';

interface RecentlyAddedProps {
  coins: Coin[];
}

export function RecentlyAdded({ coins }: RecentlyAddedProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Recently Added
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Fresh additions to our catalog. Be the first to discover newly listed coins 
          with complete grading and price information.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {coins.map((coin) => (
          <div key={coin.id} className="relative">
            <CoinCard coin={coin} />
            {/* New badge */}
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
              NEW
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/catalog?sort=newest"
          className="btn-secondary"
        >
          View All Recent Additions
        </Link>
      </div>
    </div>
  );
}