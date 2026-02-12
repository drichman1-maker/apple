import { ProductConfig, RetailerPrice, PriceHistoryPoint, ProductCategory, ProductCondition } from '@repo/domain';

export interface PriceOracle {
    fetchPrice(sku: string, condition?: ProductCondition): Promise<number>;
    fetchRetailerPrices(sku: string, condition?: ProductCondition): Promise<RetailerPrice[]>;
    fetchPriceHistory(sku: string, days: number): Promise<PriceHistoryPoint[]>;
}

// Helper to generate variants
const generateVariants = (
    base: Omit<ProductConfig, 'sku' | 'specs'>,
    rams: string[],
    storages: string[],
    colors: string[],
    modelNumberPrefix: string
): ProductConfig[] => {
    const variants: ProductConfig[] = [];
    rams.forEach((ram, rIdx) => {
        storages.forEach((storage, sIdx) => {
            colors.forEach((color, cIdx) => {
                const sku = `${base.name.replace(/\s+/g, '-').toUpperCase()}-${ram}-${storage}-${color.replace(/\s+/g, '-').toUpperCase()}`;
                const modelNumber = `${modelNumberPrefix}${rIdx}${sIdx}${cIdx}`;

                // Base price increases with RAM and Storage
                const ramVal = parseInt(ram) || 0;
                const storageVal = parseInt(storage) || 0;
                const ramBump = (ramVal > 8 ? (ramVal - 8) * 12.5 : 0);
                const storageBump = (storageVal > 256 ? (storageVal - 256) * 0.4 : 0);

                variants.push({
                    ...base,
                    sku,
                    modelNumber,
                    basePrice: base.basePrice + ramBump + storageBump,
                    specs: { ram, storage, color }
                });
            });
        });
    });
    return variants;
};

// Expanded product catalog with heavy variation and full specs
const PRODUCT_CATALOG: ProductConfig[] = [
    // MacBooks (2024/2023)
    ...generateVariants(
        { name: 'MacBook Pro 14 M4', category: 'Mac', chip: 'M4', releaseYear: 2024, basePrice: 1599 },
        ['16GB', '24GB', '32GB'],
        ['512GB', '1TB', '2TB'],
        ['Space Black', 'Silver'],
        'MW2'
    ),
    ...generateVariants(
        { name: 'MacBook Pro 16 M4', category: 'Mac', chip: 'M4', releaseYear: 2024, basePrice: 2499 },
        ['24GB', '48GB', '64GB', '128GB'],
        ['512GB', '1TB', '2TB', '4TB', '8TB'],
        ['Space Black', 'Silver'],
        'MN4'
    ),
    ...generateVariants(
        { name: 'MacBook Air 13 M3', category: 'Mac', chip: 'M3', releaseYear: 2024, basePrice: 1099 },
        ['8GB', '16GB', '24GB'],
        ['256GB', '512GB', '1TB', '2TB'],
        ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
        'MRX'
    ),

    // iPhones (2024)
    ...generateVariants(
        { name: 'iPhone 16 Pro', category: 'iPhone', chip: 'A18', releaseYear: 2024, basePrice: 999 },
        ['8GB'],
        ['128GB', '256GB', '512GB', '1TB'],
        ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Desert Titanium'],
        'MYM'
    ),
    ...generateVariants(
        { name: 'iPhone 16', category: 'iPhone', chip: 'A18', releaseYear: 2024, basePrice: 799 },
        ['8GB'],
        ['128GB', '256GB', '512GB'],
        ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'],
        'MYK'
    ),

    // iPads (2024)
    ...generateVariants(
        { name: 'iPad Pro 13 M4', category: 'iPad', chip: 'M4', releaseYear: 2024, basePrice: 1299 },
        ['8GB', '16GB'],
        ['256GB', '512GB', '1TB', '2TB'],
        ['Space Black', 'Silver'],
        'MVX'
    ),
    ...generateVariants(
        { name: 'iPad Air 13 M2', category: 'iPad', chip: 'M2', releaseYear: 2024, basePrice: 799 },
        ['8GB'],
        ['128GB', '256GB', '512GB', '1TB'],
        ['Space Gray', 'Starlight', 'Purple', 'Blue'],
        'MV2'
    ),

    // Accessories & Others
    { sku: 'WATCH-ULTRA-2', modelNumber: 'MREJ3LL', name: 'Apple Watch Ultra 2', category: 'Accessories', chip: 'S9', releaseYear: 2023, basePrice: 799, specs: { color: 'Titanium' } },
    { sku: 'WATCH-SERIES-10', modelNumber: 'MWX83LL', name: 'Apple Watch Series 10', category: 'Accessories', chip: 'S10', releaseYear: 2024, basePrice: 399, specs: { color: 'Jet Black' } },
    { sku: 'AIRPODS-PRO-2', modelNumber: 'MTJV3AM', name: 'AirPods Pro (2nd Gen)', category: 'Accessories', chip: 'H2', releaseYear: 2023, basePrice: 249, specs: { color: 'White' } },
    { sku: 'VISION-PRO', modelNumber: 'MQL83LL', name: 'Apple Vision Pro', category: 'Accessories', chip: 'M2', releaseYear: 2024, basePrice: 3499, specs: { storage: '256GB', color: 'White' } },
    { sku: 'MAC-MINI-M4', modelNumber: 'MC433LL', name: 'Mac mini M4', category: 'Mac', chip: 'M4', releaseYear: 2024, basePrice: 599, specs: { ram: '16GB', storage: '256GB', color: 'Silver' } },
    { sku: 'MAC-PRO-M2-ULTRA', modelNumber: 'MNS83LL', name: 'Mac Pro M2 Ultra', category: 'Mac', chip: 'M2', releaseYear: 2023, basePrice: 6999, specs: { ram: '64GB', storage: '1TB', color: 'Silver' } },
];

export class EnhancedPriceOracle implements PriceOracle {
    private mockRetailerPrices: Record<string, RetailerPrice[]> = {};
    private mockPriceHistory: Record<string, PriceHistoryPoint[]> = {};

    constructor() {
        this.initializeMockData();
    }

    private initializeMockData() {
        PRODUCT_CATALOG.forEach(product => {
            const basePrice = product.basePrice;

            // Generate mock prices for different conditions
            const conditions: ProductCondition[] = ['New', 'Refurbished', 'Used'];
            const retailers: ('Apple' | 'Best Buy' | 'B&H' | 'Adorama')[] = ['Apple', 'Best Buy', 'B&H', 'Adorama'];

            const skuPrices: RetailerPrice[] = [];

            conditions.forEach(condition => {
                const conditionDiscount = condition === 'New' ? 1 : condition === 'Refurbished' ? 0.85 : 0.7;

                retailers.forEach(retailer => {
                    if (retailer === 'Apple' && condition === 'Used') return;

                    skuPrices.push({
                        retailer,
                        price: (basePrice * conditionDiscount) - Math.random() * (condition === 'New' ? 50 : 150),
                        available: Math.random() > (condition === 'New' ? 0.1 : 0.4),
                        condition,
                        url: `https://www.${retailer.toLowerCase().replace(/\s+/g, '')}.com/product/${product.sku}`
                    });
                });
            });

            this.mockRetailerPrices[product.sku] = skuPrices;

            const history: PriceHistoryPoint[] = [];
            for (let i = 90; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dateString = date.toISOString().split('T')[0];
                if (!dateString) continue;

                retailers.forEach(retailer => {
                    const variance = (Math.random() - 0.5) * 150;
                    history.push({
                        date: dateString,
                        price: basePrice + variance,
                        retailer,
                    });
                });
            }

            this.mockPriceHistory[product.sku] = history;
        });
    }

    async fetchPrice(sku: string, condition: ProductCondition = 'New'): Promise<number> {
        const prices = this.mockRetailerPrices[sku];
        if (!prices) return 9999;
        const filtered = prices.filter(p => p.available && p.condition === condition);
        if (filtered.length === 0) return 9999;
        const lowestPrice = Math.min(...filtered.map(p => p.price));
        return lowestPrice;
    }

    async fetchRetailerPrices(sku: string, condition: ProductCondition = 'New'): Promise<RetailerPrice[]> {
        return (this.mockRetailerPrices[sku] || []).filter(p => p.condition === condition);
    }

    async fetchAllConditions(sku: string): Promise<RetailerPrice[]> {
        return this.mockRetailerPrices[sku] || [];
    }

    async fetchPriceHistory(sku: string, days: number = 90): Promise<PriceHistoryPoint[]> {
        const history = this.mockPriceHistory[sku] || [];
        return history.slice(-days * 4);
    }

    getProductCatalog(): ProductConfig[] {
        return PRODUCT_CATALOG;
    }

    getProductsByCategory(category: ProductCategory): ProductConfig[] {
        return PRODUCT_CATALOG.filter(p => p.category === category);
    }

    searchProducts(query: string): ProductConfig[] {
        const q = query.toLowerCase();
        return PRODUCT_CATALOG.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.modelNumber?.toLowerCase().includes(q) ||
            p.specs?.ram?.toLowerCase().includes(q) ||
            p.specs?.storage?.toLowerCase().includes(q) ||
            p.specs?.color?.toLowerCase().includes(q) ||
            p.releaseYear.toString().includes(q)
        );
    }
}
