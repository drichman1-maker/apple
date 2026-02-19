// shared-ui.tsx - Shared UI components for MacTrackr
import React, { useState, useRef, useEffect } from 'react';

// Utility functions
export const cn = (...inputs) => {
  return inputs.filter(Boolean).join(' ');
};

export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const calculateSavings = (original, current) => {
  const savings = ((original - current) / original) * 100;
  return `-${Math.round(savings)}%`;
};

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  const intervals = { year: 31536000, month: 2592000, week: 604800, day: 86400, hour: 3600, minute: 60 };
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval}${unit[0]} ago`;
    }
  }
  return 'Just now';
};

// Types
export interface PricePoint {
  retailer: string;
  price: number;
  inStock: boolean;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  specs?: Record<string, string>;
  prices: PricePoint[];
  releaseDate?: string;
}

// ProductCard Component
export const ProductCard = ({ product, onClick }) => {
  const bestPrice = product.prices.reduce((min, p) => p.price < min.price ? p : min, product.prices[0]);
  const worstPrice = product.prices.reduce((max, p) => p.price > max.price ? p : max, product.prices[0]);
  const savings = worstPrice && bestPrice ? calculateSavings(worstPrice.price, bestPrice.price) : null;

  return (
    <div
      onClick={() => onClick?.(product)}
      className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all cursor-pointer group"
    >
      {/* Category Badge */}
      <div className="absolute top-3 left-3">
        <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider bg-cyan-500/10 px-2 py-1 rounded">
          {product.category}
        </span>
      </div>

      {/* Image placeholder */}
      <div className="h-48 bg-[#0a0a0a] flex items-center justify-center">
        <span className="text-4xl">💰</span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-white text-lg leading-tight group-hover:text-cyan-400 transition-colors">
          {product.name}
        </h3>

        {/* Specs */}
        {product.specs && (
          <div className="flex flex-wrap gap-2 mt-3">
            {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
              <span key={key} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">
                {value}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-2xl font-bold text-white">
            {formatPrice(bestPrice.price)}
          </span>
          {savings && (
            <span className="text-sm font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              {savings}
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-1">
          from {bestPrice.retailer} • {product.prices.length} retailers
        </p>

        {/* Retailer icons */}
        <div className="flex -space-x-2 mt-3">
          {product.prices.slice(0, 3).map((price, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#0a0a0a] flex items-center justify-center text-xs font-bold text-white"
              title={price.retailer}
            >
              {price.retailer[0].toUpperCase()}
            </div>
          ))}
          {product.prices.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border-2 border-[#0a0a0a] flex items-center justify-center text-xs font-bold text-cyan-400">
              +{product.prices.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// PriceTable Component
export const PriceTable = ({ prices, onRetailerClick }) => {
  const sortedPrices = [...prices].sort((a, b) => a.price - b.price);
  const bestPrice = sortedPrices[0];

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-semibold text-white">Retailer Comparison</h3>
        <span className="text-xs text-gray-400">{sortedPrices.length} retailers</span>
      </div>
      <div className="divide-y divide-white/5">
        {sortedPrices.map((price, index) => (
          <div
            key={index}
            onClick={() => onRetailerClick?.(price)}
            className={`p-4 cursor-pointer transition-all hover:bg-white/5 ${
              price.price === bestPrice?.price ? 'bg-emerald-500/5' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                  {price.retailer.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-white capitalize">{price.retailer}</p>
                  <span className={`text-xs ${price.inStock ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {price.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xl font-bold ${price.price === bestPrice?.price ? 'text-emerald-400' : 'text-white'}`}>
                  {formatPrice(price.price)}
                </p>
                <a
                  href={price.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:underline"
                >
                  View Deal →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// CategoryFilter Component
export const CategoryFilter = ({ options, selected, onChange, variant = 'pills' }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {options.map((option) => {
        const isSelected = selected.includes(option.id);
        return (
          <button
            key={option.id}
            onClick={() => onChange(isSelected ? [] : [option.id])}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              isSelected
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50'
                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
            } border`}
          >
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// AffiliateLink Component
export const AffiliateLink = ({ retailer, url, price, isBestPrice, inStock = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-lg font-medium transition-all ${
        sizeClasses[size]
      } ${isBestPrice
        ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white'
        : 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white'
      }`}
    >
      <span className="capitalize">{retailer}</span>
      {price && <span>•</span>}
      {price && <span>${price}</span>}
    </a>
  );
};

// SearchBar Component
export const SearchBar = ({ value, onChange, onSearch, placeholder = 'Search products...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-10 text-sm',
    md: 'h-12 text-base',
    lg: 'h-14 text-lg',
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div className={`flex items-center gap-3 px-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl ${sizeClasses[size]}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-500"
        />
        {value && (
          <button
            onClick={() => onChange?.('')}
            className="text-gray-500 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
        <button
          onClick={() => onSearch?.(value)}
          className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default {
  ProductCard,
  PriceTable,
  CategoryFilter,
  AffiliateLink,
  SearchBar,
  cn,
  formatPrice,
  calculateSavings,
  timeAgo,
};