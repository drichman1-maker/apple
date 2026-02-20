// shared-ui.tsx - Shared UI components for all verticals
import React from 'react';

// Theme configuration
export const themes = {
  mactrackr: { name: 'MacTrackr', accent: '#3b82f6', bestPrice: '#10b981', bg: '#0a0a0a', surface: '#141414', border: '#262626' },
  mintcondition: { name: 'MintCondition', accent: '#10b981', bestPrice: '#10b981', bg: '#0a0a0a', surface: '#141414', border: '#262626' },
  rumblegames: { name: 'RumbleGames', accent: '#8b5cf6', bestPrice: '#10b981', bg: '#0a0a0a', surface: '#141414', border: '#262626' },
  healthindex: { name: 'HealthIndex', accent: '#06b6d4', bestPrice: '#10b981', bg: '#0a0a0a', surface: '#141414', border: '#262626' },
};

export type ThemeKey = keyof typeof themes;

// Utilities
export const cn = (...inputs: (string | false | null | undefined)[]) => inputs.filter(Boolean).join(' ');

export const formatPrice = (price: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);

export const calculateSavings = (original: number, current: number) => 
  `-${Math.round(((original - current) / original) * 100)}%`;

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

// ProductCard
interface ProductCardProps {
  product: Product;
  onClick?: (p: Product) => void;
  theme?: ThemeKey;
}

export const ProductCard = ({ product, onClick, theme = 'mactrackr' }: ProductCardProps) => {
  const t = themes[theme];
  const best = product.prices.reduce((m, p) => p.price < m.price ? p : m);
  const worst = product.prices.reduce((m, p) => p.price > m.price ? p : m);
  const savings = worst.price > best.price ? calculateSavings(worst.price, best.price) : null;

  return (
    <div 
      onClick={() => onClick?.(product)}
      className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden hover:border-opacity-50 transition-all cursor-pointer group"
      style={{ ['--accent' as string]: t.accent }}
    >
      <div className="absolute top-3 left-3 z-10">
        <span className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded" 
          style={{ color: t.accent, backgroundColor: `${t.accent}20` }}>
          {product.category}
        </span>
      </div>

      <div className="h-48 bg-[#0a0a0a] flex items-center justify-center">
        <span className="text-4xl opacity-50">📦</span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-white text-lg leading-tight group-hover:opacity-80 transition-opacity">
          {product.name}
        </h3>

        {product.specs && (
          <div className="flex flex-wrap gap-2 mt-3">
            {Object.values(product.specs).slice(0, 3).map((v, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">{v}</span>
            ))}
          </div>
        )}

        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-2xl font-bold text-white">{formatPrice(best.price)}</span>
          {savings && (
            <span className="text-sm font-medium px-2 py-0.5 rounded-full" 
              style={{ color: t.bestPrice, backgroundColor: `${t.bestPrice}20` }}>
              {savings}
            </span>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-1">from {best.retailer} • {product.prices.length} retailers</p>

        <div className="flex -space-x-2 mt-3">
          {product.prices.slice(0, 4).map((p, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#141414] flex items-center justify-center text-xs font-bold text-white">
              {p.retailer[0].toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// PriceTable
interface PriceTableProps {
  prices: PricePoint[];
  theme?: ThemeKey;
}

export const PriceTable = ({ prices, theme = 'mactrackr' }: PriceTableProps) => {
  const t = themes[theme];
  const sorted = [...prices].sort((a, b) => a.price - b.price);
  const best = sorted[0];

  return (
    <div className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-semibold text-white">Compare Prices</h3>
      </div>
      {sorted.map((p, i) => (
        <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: `${t.accent}20`, color: t.accent }}>
              {p.retailer.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-white capitalize">{p.retailer}</p>
              <p className={`text-xs ${p.inStock ? 'text-emerald-400' : 'text-rose-400'}`}>
                {p.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-xl font-bold ${p.price === best.price ? 'text-emerald-400' : 'text-white'}`}>
              {formatPrice(p.price)}
            </p>
            <p className="text-xs" style={{ color: t.accent }}>View →</p>
          </div>
        </a>
      ))}
    </div>
  );
};

// CategoryFilter
interface CategoryFilterProps {
  options: { id: string; label: string; count?: number }[];
  selected: string[];
  onChange: (s: string[]) => void;
  theme?: ThemeKey;
}

export const CategoryFilter = ({ options, selected, onChange, theme = 'mactrackr' }: CategoryFilterProps) => {
  const t = themes[theme];
  
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {options.map(opt => {
        const isSel = selected.includes(opt.id);
        return (
          <button key={opt.id} onClick={() => onChange(isSel ? [] : [opt.id])}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
              isSel ? "text-white border-white/30" : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
            )}
            style={isSel ? { backgroundColor: `${t.accent}30`, color: t.accent, borderColor: `${t.accent}50` } : undefined}>
            {opt.label}
            {opt.count !== undefined && <span className="ml-2 text-xs opacity-60">{opt.count}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default { ProductCard, PriceTable, CategoryFilter, themes, cn, formatPrice, calculateSavings };
