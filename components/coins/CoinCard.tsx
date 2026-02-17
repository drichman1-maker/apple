'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Heart, Eye, Star, Award } from 'lucide-react';
import { Coin, CoinCategory } from '@/types';
import { 
  formatPrice, 
  formatYear, 
  getCategoryDisplayName, 
  getImageUrl,
  cn 
} from '@/lib/utils';

interface CoinCardProps {
  coin: Coin;
  showCategory?: boolean;
  compact?: boolean;
}

export function CoinCard({ coin, showCategory = true, compact = false }: CoinCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist API call
  };

  const imageUrl = getImageUrl(coin.thumbnailUrl || coin.imageUrl);
  const categoryName = getCategoryDisplayName(coin.category);

  return (
    <Link href={`/coins/${coin.id}`} className="block group">
      <div className={cn(
        'coin-card p-4 h-full relative',
        compact ? 'p-3' : 'p-4'
      )}>
        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white dark:hover:bg-gray-700"
          aria-label="Add to wishlist"
        >
          <Heart 
            className={cn(
              'h-4 w-4 transition-colors',
              isWishlisted 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-600 dark:text-gray-400 hover:text-red-500'
            )}
          />
        </button>

        {/* Image */}
        <div className={cn(
          'aspect-square relative mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800',
          compact ? 'mb-2' : 'mb-3'
        )}>
          {!imageError ? (
            <Image
              src={imageUrl}
              alt={coin.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-gray-400 dark:text-gray-600">
                <Star className="h-8 w-8 mx-auto mb-2" />
                <span className="text-xs">No Image</span>
              </div>
            </div>
          )}
          
          {/* Category badge */}
          {showCategory && (
            <div className="absolute top-2 left-2">
              <span className="text-xs font-medium bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                {categoryName}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          {/* Title */}
          <h3 className={cn(
            'font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors',
            compact ? 'text-sm' : 'text-base'
          )}>
            {coin.name}
          </h3>

          {/* Details */}
          <div className="space-y-1">
            {coin.year && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {formatYear(coin.year)}
                {coin.country && coin.country !== 'US' && (
                  <span className="ml-1">• {coin.country}</span>
                )}
              </div>
            )}

            {coin.denomination && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {coin.denomination}
              </div>
            )}

            {coin.composition && (
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {coin.composition}
              </div>
            )}
          </div>

          {/* Price and stats */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <div>
              {/* TODO: Get latest price from API */}
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                From {formatPrice(Math.floor(Math.random() * 5000) + 100)}
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-400">
              <Eye className="h-3 w-3" />
              <span className="text-xs">
                {Math.floor(Math.random() * 1000) + 50}
              </span>
            </div>
          </div>

          {/* Grading info */}
          <div className="flex items-center space-x-2 pt-1">
            <Award className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-500">
              PCGS • NGC Certified
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}