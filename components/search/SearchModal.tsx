'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search, Clock, TrendingUp } from 'lucide-react';
import { coinsApi } from '@/lib/api';
import { Coin } from '@/types';
import { debounce } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState([
    'Morgan Silver Dollar',
    'Walking Liberty',
    'Mercury Dime',
    'Peace Dollar',
    'Franklin Half',
  ]);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Debounced search function
  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await coinsApi.search(searchQuery);
      if (response.success) {
        setResults(response.data.slice(0, 6)); // Show top 6 results
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, 300);

  // Handle search input change
  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  const handleSearchSubmit = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Save to recent searches
    const newRecentSearches = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

    // Navigate to search results
    router.push(`/catalog?q=${encodeURIComponent(searchQuery)}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(query);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0">
          <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8">
            {/* Header */}
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center flex-1 space-x-3">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for coins, series, or countries..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <button
                onClick={onClose}
                className="ml-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : results.length > 0 ? (
                <div className="py-4">
                  <div className="px-6 pb-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                      Search Results
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {results.map((coin) => (
                      <button
                        key={coin.id}
                        onClick={() => {
                          router.push(`/coins/${coin.id}`);
                          onClose();
                        }}
                        className="w-full flex items-center space-x-4 px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                      >
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {coin.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {coin.year && `${coin.year} • `}
                            {coin.country || 'Unknown'}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleSearchSubmit(query)}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      View all results for "{query}"
                    </button>
                  </div>
                </div>
              ) : query ? (
                <div className="py-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    No results found for "{query}"
                  </p>
                  <button
                    onClick={() => handleSearchSubmit(query)}
                    className="mt-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                  >
                    Search anyway
                  </button>
                </div>
              ) : (
                <div className="py-6">
                  {/* Popular Searches */}
                  <div className="px-6 mb-6">
                    <div className="flex items-center mb-3">
                      <TrendingUp className="h-4 w-4 text-gray-400 mr-2" />
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                        Popular Searches
                      </h3>
                    </div>
                    <div className="space-y-1">
                      {popularSearches.map((search) => (
                        <button
                          key={search}
                          onClick={() => handleSearchSubmit(search)}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div className="px-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-2" />
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                            Recent Searches
                          </h3>
                        </div>
                        <button
                          onClick={clearRecentSearches}
                          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="space-y-1">
                        {recentSearches.map((search) => (
                          <button
                            key={search}
                            onClick={() => handleSearchSubmit(search)}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}