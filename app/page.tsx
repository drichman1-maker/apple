'use client';

import { useState, useEffect } from 'react';
import { Hero } from '@/components/home/Hero';
import { FeaturedCoins } from '@/components/home/FeaturedCoins';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { RecentlyAdded } from '@/components/home/RecentlyAdded';
import { StatsSection } from '@/components/home/StatsSection';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { coinsApi } from '@/lib/api';
import { Coin } from '@/types';

export default function HomePage() {
  const [featuredCoins, setFeaturedCoins] = useState<Coin[]>([]);
  const [recentCoins, setRecentCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [featuredResponse, recentResponse] = await Promise.all([
          coinsApi.getFeatured(),
          coinsApi.getRecent(8)
        ]);

        if (featuredResponse.success) {
          setFeaturedCoins(featuredResponse.data);
        }

        if (recentResponse.success) {
          setRecentCoins(recentResponse.data);
        }
      } catch (err) {
        console.error('Failed to load homepage data:', err);
        setError('Failed to load coins. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Coins */}
      {featuredCoins.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedCoins coins={featuredCoins} />
          </div>
        </section>
      )}

      {/* Category Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryShowcase />
        </div>
      </section>

      {/* Recently Added */}
      {recentCoins.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RecentlyAdded coins={recentCoins} />
          </div>
        </section>
      )}
    </div>
  );
}