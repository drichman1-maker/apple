'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { SearchFilters, CoinCategory, GradingService } from '@/types';
import { getCategoryDisplayName } from '@/lib/utils';

interface CatalogFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
          {title}
        </h3>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}

export function CatalogFilters({ filters, onFiltersChange }: CatalogFiltersProps) {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  // Sync with parent when filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.keys(localFilters).some(key => 
    localFilters[key as keyof SearchFilters] !== undefined && 
    localFilters[key as keyof SearchFilters] !== null &&
    localFilters[key as keyof SearchFilters] !== ''
  );

  const categories = [
    { value: CoinCategory.US, label: getCategoryDisplayName(CoinCategory.US) },
    { value: CoinCategory.WORLD, label: getCategoryDisplayName(CoinCategory.WORLD) },
    { value: CoinCategory.ANCIENT, label: getCategoryDisplayName(CoinCategory.ANCIENT) },
  ];

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Australia',
    'Mexico',
    'China',
    'Japan',
    'Other',
  ];

  const compositions = [
    'Gold',
    'Silver',
    'Copper',
    'Bronze',
    'Nickel',
    'Platinum',
    'Palladium',
  ];

  const rarities = [
    'Common',
    'Scarce',
    'Rare',
    'Very Rare',
    'Extremely Rare',
    'Unique',
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center space-x-1"
          >
            <X className="h-3 w-3" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category */}
        <FilterSection title="Category">
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.value} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category.value}
                  checked={localFilters.category === category.value}
                  onChange={(e) => updateFilter('category', e.target.value as CoinCategory)}
                  className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {category.label}
                </span>
              </label>
            ))}
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value=""
                checked={!localFilters.category}
                onChange={() => updateFilter('category', undefined)}
                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                All Categories
              </span>
            </label>
          </div>
        </FilterSection>

        {/* Country */}
        <FilterSection title="Country">
          <select
            value={localFilters.country || ''}
            onChange={(e) => updateFilter('country', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </FilterSection>

        {/* Year Range */}
        <FilterSection title="Year Range">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                From
              </label>
              <input
                type="number"
                placeholder="e.g. 1900"
                value={localFilters.yearFrom || ''}
                onChange={(e) => updateFilter('yearFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                To
              </label>
              <input
                type="number"
                placeholder="e.g. 2024"
                value={localFilters.yearTo || ''}
                onChange={(e) => updateFilter('yearTo', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Min Price ($)
              </label>
              <input
                type="number"
                placeholder="0"
                value={localFilters.priceFrom || ''}
                onChange={(e) => updateFilter('priceFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Max Price ($)
              </label>
              <input
                type="number"
                placeholder="No limit"
                value={localFilters.priceTo || ''}
                onChange={(e) => updateFilter('priceTo', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </FilterSection>

        {/* Grading Service */}
        <FilterSection title="Grading Service">
          <select
            value={localFilters.gradingService || ''}
            onChange={(e) => updateFilter('gradingService', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Services</option>
            <option value={GradingService.PCGS}>PCGS</option>
            <option value={GradingService.NGC}>NGC</option>
            <option value={GradingService.ANACS}>ANACS</option>
            <option value={GradingService.ICG}>ICG</option>
          </select>
        </FilterSection>

        {/* Grade Range */}
        <FilterSection title="Grade Range">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Min Grade
              </label>
              <input
                type="number"
                min="1"
                max="70"
                placeholder="1"
                value={localFilters.gradeFrom || ''}
                onChange={(e) => updateFilter('gradeFrom', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Max Grade
              </label>
              <input
                type="number"
                min="1"
                max="70"
                placeholder="70"
                value={localFilters.gradeTo || ''}
                onChange={(e) => updateFilter('gradeTo', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </FilterSection>

        {/* Composition */}
        <FilterSection title="Composition" defaultOpen={false}>
          <select
            value={localFilters.composition || ''}
            onChange={(e) => updateFilter('composition', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Compositions</option>
            {compositions.map((composition) => (
              <option key={composition} value={composition.toLowerCase()}>
                {composition}
              </option>
            ))}
          </select>
        </FilterSection>

        {/* Rarity */}
        <FilterSection title="Rarity" defaultOpen={false}>
          <select
            value={localFilters.rarity || ''}
            onChange={(e) => updateFilter('rarity', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Rarities</option>
            {rarities.map((rarity) => (
              <option key={rarity} value={rarity.toLowerCase()}>
                {rarity}
              </option>
            ))}
          </select>
        </FilterSection>
      </div>
    </div>
  );
}