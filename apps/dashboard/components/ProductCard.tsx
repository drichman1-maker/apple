'use client';

import { ProductConfig, RetailerPrice } from '@repo/domain';

interface ProductCardProps {
    product: ProductConfig;
    retailerPrices: RetailerPrice[];
    onSelect: () => void;
    isSelected: boolean;
}

export default function ProductCard({ product, retailerPrices, onSelect, isSelected }: ProductCardProps) {
    const lowestPrice = Math.min(...retailerPrices.filter(p => p.available).map(p => p.price));
    const lowestRetailer = retailerPrices.find(p => p.price === lowestPrice && p.available);

    return (
        <button
            onClick={onSelect}
            className={`glass-panel p-5 rounded-2xl text-left transition-all duration-300 border ${isSelected
                ? 'border-[#2997ff] bg-[#2997ff]/5 shadow-[0_0_30px_rgba(41,151,255,0.15)] scale-[1.02]'
                : 'border-white/5 hover:border-white/20 hover:bg-white/5 translate-y-0 hover:-translate-y-1'
                }`}
        >
            <div className="flex flex-col h-full justify-between gap-4">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#2997ff] font-bold bg-[#2997ff]/10 px-2 py-0.5 rounded">
                            {product.category}
                        </span>
                        <div className="flex flex-col items-end">
                            {product.specs?.color && (
                                <span className="text-[10px] text-gray-400 font-medium">
                                    {product.specs.color}
                                </span>
                            )}
                            <span className="text-[8px] text-gray-600 font-mono mt-0.5">
                                {product.modelNumber || product.sku.split('-')[0]}
                            </span>
                        </div>
                    </div>
                    <h3 className="font-bold text-white text-lg leading-tight mb-1">
                        {product.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {product.specs?.ram && (
                            <span className="text-[9px] bg-white/10 text-white px-2 py-0.5 rounded border border-white/20 uppercase font-bold font-mono">
                                RAM: {product.specs.ram}
                            </span>
                        )}
                        {product.specs?.storage && (
                            <span className="text-[9px] bg-white/10 text-white px-2 py-0.5 rounded border border-white/20 uppercase font-bold font-mono">
                                SSD: {product.specs.storage}
                            </span>
                        )}
                        {product.specs?.color && (
                            <span className="text-[9px] bg-white/10 text-white px-2 py-0.5 rounded border border-white/20 uppercase font-bold font-mono">
                                CLR: {product.specs.color}
                            </span>
                        )}
                        <span className="text-[9px] bg-[#2997ff]/20 text-[#2997ff] px-2 py-0.5 rounded border border-[#2997ff]/30 uppercase font-bold">
                            YR: {product.releaseYear}
                        </span>
                    </div>
                </div>

                <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Best Price</span>
                        <div className="text-2xl font-black text-white leading-none">${Math.round(lowestPrice)}</div>
                        <span className="text-[10px] text-green-400 font-medium mt-1">
                            at {lowestRetailer?.retailer}
                        </span>
                    </div>

                    <div className="text-right flex flex-col items-end">
                        <span className="text-[10px] text-gray-500 uppercase tracking-tighter">MSRP</span>
                        <div className="text-base font-semibold text-gray-400 line-through opacity-50 decoration-1 decoration-gray-600">
                            ${product.basePrice}
                        </div>
                        <div className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded mt-1 font-bold">
                            -{Math.round((1 - lowestPrice / product.basePrice) * 100)}%
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
}
