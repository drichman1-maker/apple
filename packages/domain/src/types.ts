export type ProductCategory = 'Mac' | 'iPad' | 'iPhone' | 'Accessories';
export type ChipGeneration = 'M1' | 'M2' | 'M3' | 'M4' | 'A17' | 'A18';
export type DecisionState = 'WAIT' | 'BUY_NOW';
export type ProductCondition = 'New' | 'Refurbished' | 'Used';

export interface RetailerPrice {
    retailer: 'Apple' | 'Best Buy' | 'B&H' | 'Adorama';
    price: number;
    available: boolean;
    condition: ProductCondition;
    url?: string;
}

export interface PriceHistoryPoint {
    date: string; // ISO date
    price: number;
    retailer: string;
}

export interface ProductConfig {
    sku: string;
    modelNumber?: string;
    name: string;
    category: ProductCategory;
    chip: ChipGeneration;
    releaseYear: number;
    basePrice: number;
    image?: string;
    specs?: {
        ram?: string;
        storage?: string;
        display?: string;
        color?: string;
    };
}

export interface NOCResult {
    netOwnershipCost: number;
    retailPrice: number;
    salesTax: number;
    projectedResaleValue: number;
    decision: DecisionState;
    rationale: string;
}

export interface NotificationPreference {
    enabled: boolean;
    priceDropThreshold: number; // percentage
    targetPrice?: number;
}
