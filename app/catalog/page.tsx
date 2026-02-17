'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CoinCard } from '@/components/coins/CoinCard';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';
import { CatalogHeader } from '@/components/catalog/CatalogHeader';
import { Pagination } from '@/components/ui/Pagination';
import { LoadingGrid } from '@/components/ui/LoadingSpinner';
import { coinsApi } from '@/lib/api';
import { Coin, SearchFilters, CoinCategory } from '@/types';
import { getCategoryDisplayName } from '@/lib/utils';

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const limit = 20;

  // Parse filters from URL params
  const [filters, setFilters] = useState<SearchFilters>(() => {
    const category = searchParams.get('category') as CoinCategory;
    const query = searchParams.get('q');
    const country = searchParams.get('country');
    
    return {
      category: category || undefined,
      query: query || undefined,
      country: country || undefined,
    };
  });

  // Load coins based on filters and pagination
  useEffect(() => {
    const loadCoins = async () => {
      try {
        setLoading(true);
        setError(null);

        let response;
        
        if (filters.query) {
          // Use search endpoint if there's a query
          response = await coinsApi.search(filters.query, filters);
        } else if (filters.category) {
          // Use category endpoint if category is specified
          response = await coinsApi.getByCategory(filters.category, currentPage, limit);
        } else {
          // Use general endpoint with filters
          response = await coinsApi.getAll(filters, currentPage, limit);
        }

        if (response.success) {
          setCoins(response.data);
          setTotalCount(response.pagination?.total || response.data.length);
        } else {
          throw new Error(response.message || 'Failed to load coins');
        }
      } catch (err) {
        console.error('Failed to load coins:', err);
        setError(err instanceof Error ? err.message : 'Failed to load coins');
      } finally {
        setLoading(false);
      }
    };

    loadCoins();
  }, [filters, currentPage]);

  // Update filters when URL params change
  useEffect(() => {
    const category = searchParams.get('category') as CoinCategory;
    const query = searchParams.get('q');
    const country = searchParams.get('country');
    
    setFilters({
      category: category || undefined,
      query: query || undefined,
      country: country || undefined,
    });
    setCurrentPage(1);
  }, [searchParams]);

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const getPageTitle = () => {
    if (filters.query) {
      return `Search Results for "${filters.query}"`;
    }
    if (filters.category) {
      return `${getCategoryDisplayName(filters.category)} Catalog`;
    }
    return 'Coin Catalog';
  };

  const getPageDescription = () => {
    if (filters.query) {
      return `Found ${totalCount.toLocaleString()} coins matching "${filters.query}"`;
    }
    if (filters.category) {
      return `Browse ${totalCount.toLocaleString()} ${getCategoryDisplayName(filters.category).toLowerCase()}`;
    }
    return `Discover ${totalCount.toLocaleString()} rare and collectible coins`;
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <CatalogHeader
          title={getPageTitle()}
          description={getPageDescription()}
          totalCount={totalCount}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
            <div className="sticky top-24">
              <CatalogFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <LoadingGrid count={limit} />
            ) : coins.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.664-2.64L2.64 8.64A9.97 9.97 0 0112 3c4.97 0 9 4.03 9 9 0 2.34-1.009 4.29-2.64 5.664l-3.72-3.72z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No coins found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search criteria or filters.
                </p>
                <button
                  onClick={() => {
                    setFilters({});
                    setCurrentPage(1);
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Results Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                  {coins.map((coin) => (
                    <CoinCard 
                      key={coin.id} 
                      coin={coin} 
                      showCategory={!filters.category}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalCount > limit && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalCount / limit)}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}