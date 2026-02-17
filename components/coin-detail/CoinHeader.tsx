'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart, Share2, ArrowLeft, Eye, Calendar, MapPin } from 'lucide-react';
import { Coin } from '@/types';
import { getCategoryDisplayName, formatYear, formatDate, copyToClipboard } from '@/lib/utils';

interface CoinHeaderProps {
  coin: Coin;
}

export function CoinHeader({ coin }: CoinHeaderProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

  const handleWishlistToggle = async () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist API call
  };

  const handleShare = async () => {
    setShareLoading(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: coin.name,
          text: `Check out this ${coin.name} on CoinCurator`,
          url: window.location.href,
        });
      } else {
        await copyToClipboard(window.location.href);
        // TODO: Show toast notification
      }
    } catch (error) {
      console.error('Failed to share:', error);
    } finally {
      setShareLoading(false);
    }
  };

  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link 
          href="/catalog" 
          className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          Catalog
        </Link>
        <span>/</span>
        <Link 
          href={`/catalog?category=${coin.category}`} 
          className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          {getCategoryDisplayName(coin.category)}
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">
          {coin.name}
        </span>
      </nav>

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Catalog</span>
      </button>

      {/* Main Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Title and Info */}
          <div className="flex-1 mb-4 lg:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {coin.name}
              </h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                {getCategoryDisplayName(coin.category)}
              </span>
            </div>

            {coin.description && (
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-3xl">
                {coin.description}
              </p>
            )}

            {/* Quick Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              {coin.year && (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatYear(coin.year)}</span>
                </div>
              )}
              
              {coin.country && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{coin.country}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{Math.floor(Math.random() * 5000) + 500} views</span>
              </div>

              <div className="text-xs text-gray-400">
                Added {formatDate(coin.createdAt)}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Heart 
                className={`h-4 w-4 ${
                  isWishlisted 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-gray-500 dark:text-gray-400'
                }`} 
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {isWishlisted ? 'Saved' : 'Save'}
              </span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              disabled={shareLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              <span className="text-sm">
                {shareLoading ? 'Sharing...' : 'Share'}
              </span>
            </button>
          </div>
        </div>

        {/* Coin IDs */}
        {(coin.pcgsNumber || coin.ngcNumber) && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              {coin.pcgsNumber && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">PCGS #:</span>
                  <span className="ml-1 font-medium text-gray-900 dark:text-white">
                    {coin.pcgsNumber}
                  </span>
                </div>
              )}
              
              {coin.ngcNumber && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">NGC #:</span>
                  <span className="ml-1 font-medium text-gray-900 dark:text-white">
                    {coin.ngcNumber}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}