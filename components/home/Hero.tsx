'use client';

import Link from 'next/link';
import { Search, TrendingUp, Shield, Coins } from 'lucide-react';

export function Hero() {
  const features = [
    {
      icon: Search,
      title: 'Comprehensive Catalog',
      description: 'Browse thousands of US, world, and ancient coins with detailed information.',
    },
    {
      icon: Shield,
      title: 'PCGS & NGC Grading',
      description: 'View certified grades and population data from trusted grading services.',
    },
    {
      icon: TrendingUp,
      title: 'Price History',
      description: 'Track market values with historical price charts and auction results.',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="block">Discover</span>
            <span className="block text-primary-600 dark:text-primary-400">
              Rare Coins
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-12">
            Your comprehensive source for rare coin information, grading data, and market prices.
            Explore coins from around the world with PCGS and NGC certification details.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/catalog"
              className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2"
            >
              <Coins className="h-5 w-5" />
              <span>Browse Catalog</span>
            </Link>
            <Link
              href="/catalog?category=us"
              className="btn-secondary text-lg px-8 py-3"
            >
              US Coins
            </Link>
            <Link
              href="/catalog?category=world"
              className="btn-secondary text-lg px-8 py-3"
            >
              World Coins
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Trusted by collectors worldwide
            </p>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                PCGS
              </div>
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                NGC
              </div>
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                ANACS
              </div>
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                ICG
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}