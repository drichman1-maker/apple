'use client';

import { Filter, Grid, List, SortAsc } from 'lucide-react';

interface CatalogHeaderProps {
  title: string;
  description: string;
  totalCount: number;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export function CatalogHeader({
  title,
  description,
  totalCount,
  showFilters,
  onToggleFilters,
}: CatalogHeaderProps) {
  return (
    <div className="mb-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Toggle */}
          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white dark:bg-gray-700 rounded shadow-sm">
              <Grid className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Sort */}
          <button className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <SortAsc className="h-4 w-4" />
            <span>Sort</span>
          </button>

          {/* Filter Toggle */}
          <button
            onClick={onToggleFilters}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-colors lg:hidden"
          >
            <Filter className="h-4 w-4" />
            <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
          </button>
        </div>
      </div>

      {/* Results count */}
      {totalCount > 0 && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Showing {totalCount.toLocaleString()} coin{totalCount === 1 ? '' : 's'}
        </div>
      )}
    </div>
  );
}