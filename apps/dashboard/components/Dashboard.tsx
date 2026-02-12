'use client';

import { useState, useEffect } from 'react';
import { EnhancedPriceOracle } from '@repo/infra';
import { ProductConfig, NOCResult, DecisionState, RetailerPrice, PriceHistoryPoint } from '@repo/domain';
import ProductCard from './ProductCard';
import PriceChart from './PriceChart';
import NotificationToggle from './NotificationToggle';

const oracle = new EnhancedPriceOracle();

export default function Dashboard() {
    const [activeCategory, setActiveCategory] = useState<'All' | 'Mac' | 'iPad' | 'iPhone' | 'Accessories'>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<ProductConfig[]>([]);
    const [selectedSku, setSelectedSku] = useState<string | null>(null);
    const [retailerPrices, setRetailerPrices] = useState<Record<string, RetailerPrice[]>>({});
    const [priceHistory, setPriceHistory] = useState<Record<string, PriceHistoryPoint[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial load
        const allProducts = oracle.getProductCatalog();
        setProducts(allProducts);
        setSelectedSku(allProducts[0]?.sku || null);

        // Prefetch prices for visible products
        const fetchVisiblePrices = async () => {
            const pricePromises = allProducts.slice(0, 12).map(p => oracle.fetchRetailerPrices(p.sku));
            const historyPromises = allProducts.slice(0, 4).map(p => oracle.fetchPriceHistory(p.sku, 30));

            const results = await Promise.all(pricePromises);
            const historyResults = await Promise.all(historyPromises);

            const priceMap: any = {};
            const historyMap: any = {};

            allProducts.slice(0, 12).forEach((p, i) => { priceMap[p.sku] = results[i]; });
            allProducts.slice(0, 4).forEach((p, i) => { historyMap[p.sku] = historyResults[i]; });

            setRetailerPrices(priceMap);
            setPriceHistory(historyMap);
            setLoading(false);
        };

        fetchVisiblePrices();
    }, []);

    useEffect(() => {
        const filtered = oracle.searchProducts(searchQuery).filter(p =>
            activeCategory === 'All' || p.category === activeCategory
        );
        setProducts(filtered);
        if (filtered.length > 0 && (!selectedSku || !filtered.some(p => p.sku === selectedSku))) {
            setSelectedSku(filtered[0]?.sku || null);
        }
    }, [searchQuery, activeCategory]);

    const handleSelectProduct = async (sku: string) => {
        setSelectedSku(sku);
        if (!retailerPrices[sku]) {
            const prices = await oracle.fetchRetailerPrices(sku);
            setRetailerPrices(prev => ({ ...prev, [sku]: prices }));
        }
        if (!priceHistory[sku]) {
            const history = await oracle.fetchPriceHistory(sku, 90);
            setPriceHistory(prev => ({ ...prev, [sku]: history }));
        }
    };

    const selectedProduct = products.find(p => p.sku === selectedSku);
    const currentRetailerPrices = selectedSku ? retailerPrices[selectedSku] || [] : [];
    const currentPriceHistory = selectedSku ? priceHistory[selectedSku] || [] : [];
    const lowestPrice = currentRetailerPrices.length > 0
        ? Math.min(...currentRetailerPrices.filter(p => p.available).map(p => p.price))
        : 0;

    return (
        <div className="z-10 w-full max-w-[1400px] flex flex-col gap-8">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-left w-full md:w-auto">
                    <h1 className="text-4xl font-black tracking-tighter text-white mb-1">
                        HARDWARE INT<span className="text-[#2997ff]">ELLIGENCE</span>
                    </h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Comprehensive Apple Asset Tracking</p>
                </div>

                <div className="relative w-full md:max-w-2xl flex gap-4">
                    <input
                        type="text"
                        placeholder="Search MacBook Pro, iPhone, 16GB, Silver..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-[#2997ff] transition-all shadow-inner"
                    />
                    <div className="flex gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
                        {['New', 'Refurbished', 'Used'].map((condition) => (
                            <button
                                key={condition}
                                disabled={condition !== 'New'}
                                className={`text-[10px] font-bold px-4 py-2 rounded-xl transition-all ${condition === 'New'
                                    ? 'bg-[#2997ff] text-white'
                                    : 'text-gray-600 cursor-not-allowed'
                                    }`}
                            >
                                {condition}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-4 justify-center">
                {['All', 'Mac', 'iPad', 'iPhone', 'Accessories'].map((cat: any) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-xs font-bold px-6 py-2 rounded-full border transition-all ${activeCategory === cat
                            ? 'bg-white text-black border-white'
                            : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* Product Grid */}
                <div className="xl:col-span-4 flex flex-col gap-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                            {products.length} Results
                        </span>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {products.map((p) => (
                            <ProductCard
                                key={p.sku}
                                product={p}
                                isSelected={selectedSku === p.sku}
                                retailerPrices={retailerPrices[p.sku] || []}
                                onSelect={() => handleSelectProduct(p.sku)}
                            />
                        ))}
                        {products.length === 0 && (
                            <div className="glass-panel p-12 text-center rounded-2xl">
                                <p className="text-gray-500">No products matching your search.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Detailed Analysis View */}
                <div className="xl:col-span-8 space-y-8">
                    {selectedProduct ? (
                        <>
                            {/* Main Analysis Card */}
                            <div className="glass-panel p-10 rounded-[2.5rem] relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8">
                                    <span className={`text-xs font-black px-4 py-2 rounded-full ${lowestPrice < selectedProduct.basePrice * 0.95 ? 'bg-green-500 text-black' : 'bg-yellow-500 text-black'
                                        }`}>
                                        {lowestPrice < selectedProduct.basePrice * 0.95 ? 'BUY NOW' : 'WAIT'}
                                    </span>
                                </div>

                                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-10">
                                    <div className="w-full md:w-1/3">
                                        <h2 className="text-3xl font-black text-white leading-tight mb-4">{selectedProduct.name}</h2>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                                <span className="text-gray-500 uppercase font-semibold text-[10px] tracking-widest">Release Year</span>
                                                <span className="text-white font-mono">{selectedProduct.releaseYear}</span>
                                            </div>
                                            <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                                <span className="text-gray-500 uppercase font-semibold text-[10px] tracking-widest">Processor</span>
                                                <span className="text-white font-mono">{selectedProduct.chip}</span>
                                            </div>
                                            <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                                <span className="text-gray-500 uppercase font-semibold text-[10px] tracking-widest">Memory</span>
                                                <span className="text-white font-mono">{selectedProduct.specs?.ram || 'Standard'}</span>
                                            </div>
                                            <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                                <span className="text-gray-500 uppercase font-semibold text-[10px] tracking-widest">Storage</span>
                                                <span className="text-white font-mono">{selectedProduct.specs?.storage}</span>
                                            </div>
                                            <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                                <span className="text-gray-500 uppercase font-semibold text-[10px] tracking-widest">Color</span>
                                            </div>

                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                                <div className="bg-[#2997ff]/5 border border-[#2997ff]/20 p-6 rounded-3xl relative overflow-hidden">
                                                    <div className="absolute top-4 right-6 text-[10px] font-black text-[#2997ff] uppercase tracking-widest bg-[#2997ff]/10 px-2 py-1 rounded">
                                                        {currentRetailerPrices.find(p => p.price === lowestPrice)?.retailer}
                                                    </div>
                                                    <span className="text-[10px] text-gray-500 uppercase font-black mb-1 block">Best Market Price</span>
                                                    <div className="text-5xl font-black text-white mb-2">${lowestPrice.toFixed(0)}</div>
                                                    <div className="text-xs text-green-400 font-bold">
                                                        {Math.round((selectedProduct.basePrice - lowestPrice))} USD below MSRP
                                                    </div>
                                                </div>
                                                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                                                    <span className="text-[10px] text-gray-500 uppercase font-black mb-1 block">Estimated Resale (2yr)</span>
                                                    <div className="text-5xl font-black text-gray-300 mb-2">
                                                        ${Math.round(lowestPrice * 0.65)}
                                                    </div>
                                                    <div className="text-xs text-gray-500 font-bold">
                                                        Retention: ~65% of current price
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-white/10">
                                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                                    <span className="text-[9px] text-gray-500 uppercase font-black block mb-1">RAM / MEMORY</span>
                                                    <span className="text-lg font-bold text-white">{selectedProduct.specs?.ram || 'Standard'}</span>
                                                </div>
                                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                                    <span className="text-[9px] text-gray-500 uppercase font-black block mb-1">SSD STORAGE</span>
                                                    <span className="text-lg font-bold text-white">{selectedProduct.specs?.storage || 'N/A'}</span>
                                                </div>
                                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                                    <span className="text-[9px] text-gray-500 uppercase font-black block mb-1">FINISH / COLOR</span>
                                                    <span className="text-lg font-bold text-white">{selectedProduct.specs?.color || 'N/A'}</span>
                                                </div>
                                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                                    <span className="text-[9px] text-gray-500 uppercase font-black block mb-1">PROCESSOR</span>
                                                    <span className="text-lg font-bold text-white">{selectedProduct.chip}</span>
                                                </div>
                                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                                    <span className="text-[9px] text-gray-500 uppercase font-black block mb-1">LAUNCH YEAR</span>
                                                    <span className="text-lg font-bold text-white">{selectedProduct.releaseYear}</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-sm font-black text-white uppercase tracking-widest">Price Velocity (90d)</h3>
                                                <div className="flex gap-4">
                                                    {['30d', '60d', '90d'].map(d => (
                                                        <button key={d} className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors">{d}</button>
                                                    ))}
                                                </div>
                                            </div>
                                            <PriceChart data={currentPriceHistory} />
                                        </div>
                                    </div>

                                    {/* Tools Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="glass-panel p-8 rounded-3xl">
                                            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Retailer Availability</h3>
                                            <div className="space-y-3">
                                                {currentRetailerPrices.map(rp => (
                                                    <div key={rp.retailer} className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                                                        <span className="text-xs font-bold text-gray-300">{rp.retailer}</span>
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-sm font-mono text-white">${rp.price.toFixed(2)}</span>
                                                            <span className={`w-2 h-2 rounded-full ${rp.available ? 'bg-green-500' : 'bg-red-500'}`} />
                                                            {rp.url && (
                                                                <a
                                                                    href={rp.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[9px] bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded transition-colors"
                                                                >
                                                                    VISIT
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <NotificationToggle productName={selectedProduct.name} currentPrice={lowestPrice} />
                                    </div>
                                </div>
                            </>
                            ) : (
                            <div className="glass-panel p-20 text-center rounded-[3rem]">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-black text-white">Select a device to start analysis</h2>
                                <p className="text-gray-500 mt-2">Browse the catalog or use search to find specific configurations.</p>
                            </div>
                    )}
                        </div>
                </div>
            </div>
            );
}
