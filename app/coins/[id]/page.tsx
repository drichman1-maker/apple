'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Coin, Grade, PriceHistory } from '@/types';
import { coinsApi, gradesApi, priceHistoryApi } from '@/lib/api';
import { CoinHeader } from '@/components/coin-detail/CoinHeader';
import { CoinImage } from '@/components/coin-detail/CoinImage';
import { CoinSpecs } from '@/components/coin-detail/CoinSpecs';
import { GradeDisplay } from '@/components/coin-detail/GradeDisplay';
import { PriceChart } from '@/components/coin-detail/PriceChart';
import { RelatedCoins } from '@/components/coin-detail/RelatedCoins';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function CoinDetailPage() {
  const params = useParams();
  const coinId = params.id as string;

  const [coin, setCoin] = useState<Coin | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [relatedCoins, setRelatedCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);

  useEffect(() => {
    const loadCoinData = async () => {
      if (!coinId) return;

      try {
        setLoading(true);
        setError(null);

        // Load coin details
        const coinResponse = await coinsApi.getById(coinId);
        if (!coinResponse.success) {
          throw new Error(coinResponse.message || 'Coin not found');
        }

        setCoin(coinResponse.data);

        // Load related data in parallel
        const [gradesResponse, priceHistoryResponse, relatedResponse] = await Promise.all([
          gradesApi.getByCoinId(coinId),
          priceHistoryApi.getByCoinId(coinId),
          coinsApi.getByCategory(coinResponse.data.category, 1, 8)
        ]);

        if (gradesResponse.success) {
          setGrades(gradesResponse.data);
          // Set first grade as selected by default
          if (gradesResponse.data.length > 0) {
            setSelectedGrade(gradesResponse.data[0]);
          }
        }

        if (priceHistoryResponse.success) {
          setPriceHistory(priceHistoryResponse.data);
        }

        if (relatedResponse.success) {
          // Filter out the current coin
          setRelatedCoins(relatedResponse.data.filter(c => c.id !== coinId));
        }

      } catch (err) {
        console.error('Failed to load coin:', err);
        setError(err instanceof Error ? err.message : 'Failed to load coin');
        
        // If coin not found, redirect to 404
        if (err instanceof Error && err.message.includes('not found')) {
          notFound();
        }
      } finally {
        setLoading(false);
      }
    };

    loadCoinData();
  }, [coinId]);

  // Update price history when grade selection changes
  useEffect(() => {
    if (selectedGrade && coin) {
      const loadGradeSpecificPrices = async () => {
        try {
          const response = await priceHistoryApi.getByCoinId(coin.id, selectedGrade.id);
          if (response.success) {
            setPriceHistory(response.data);
          }
        } catch (err) {
          console.error('Failed to load grade-specific prices:', err);
        }
      };

      loadGradeSpecificPrices();
    }
  }, [selectedGrade, coin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error === 'Coin not found' ? 'Coin Not Found' : 'Something went wrong'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error === 'Coin not found' 
              ? "The coin you're looking for doesn't exist or has been removed."
              : error
            }
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <CoinHeader coin={coin} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Image */}
          <div>
            <CoinImage coin={coin} />
          </div>

          {/* Right Column - Info */}
          <div className="space-y-6">
            <CoinSpecs coin={coin} />
            
            {grades.length > 0 && (
              <GradeDisplay
                grades={grades}
                selectedGrade={selectedGrade}
                onGradeSelect={setSelectedGrade}
              />
            )}
          </div>
        </div>

        {/* Price Chart */}
        {priceHistory.length > 0 && (
          <div className="mb-8">
            <PriceChart
              priceHistory={priceHistory}
              coinName={coin.name}
              selectedGrade={selectedGrade}
            />
          </div>
        )}

        {/* Related Coins */}
        {relatedCoins.length > 0 && (
          <RelatedCoins
            coins={relatedCoins}
            title={`More ${coin.category === 'us' ? 'US' : coin.category === 'world' ? 'World' : 'Ancient'} Coins`}
          />
        )}
      </div>
    </div>
  );
}