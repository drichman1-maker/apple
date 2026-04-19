export type StockStatus = 'in_stock' | 'out_of_stock' | 'backordered' | 'not_carried';

export interface ProductInput {
  slug: string;
  name: string;
  /** Search-friendly name: strips "(Refurbished)" suffix for non-eBay adapters */
  searchName: string;
  category: string;
  msrp: number | null;
  isRefurb: boolean;
}

export interface ScraperResult {
  retailer: string;
  price: number;
  status: StockStatus;
  url: string;
}

export interface Adapter {
  retailer: string;
  /** Returns null if product not found or adapter is unconfigured */
  fetch(product: ProductInput): Promise<ScraperResult | null>;
}
