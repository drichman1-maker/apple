'use client';

import { Coin } from '@/types';
import { CoinCard } from '@/components/coins/CoinCard';

interface RelatedCoinsProps {
  coins: Coin[];
  title: string;
}

export function RelatedCoins({ coins, title }: RelatedCoinsProps) {
  if (coins.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {coins.map((coin) => (
          <CoinCard 
            key={coin.id} 
            coin={coin} 
            compact={true}
            showCategory={false}
          />
        ))}
      </div>
    </div>
  );
}