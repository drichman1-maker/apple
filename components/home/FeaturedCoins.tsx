'use client';

import Link from 'next/link';
import { Coin } from '@/types';
import { CoinCard } from '@/components/coins/CoinCard';

interface FeaturedCoinsProps {
  coins: Coin[];
}

export function FeaturedCoins({ coins }: FeaturedCoinsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Featured Coins
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover exceptional coins selected by our experts. From rare historical pieces 
          to investment-grade specimens.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {coins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/catalog"
          className="btn-primary"
        >
          View All Coins
        </Link>
      </div>
    </div>
  );
}