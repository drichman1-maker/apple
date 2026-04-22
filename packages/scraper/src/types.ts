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
  /**
   * If defined, returns true only for categories this retailer actually sells.
   * When false, the runner skips calling `fetch` — preventing wasted HTTP
   * calls and wrong-product matches from retailers that don't stock the item.
   */
  supportsCategory?(category: string): boolean;
  /** Returns null if product not found or adapter is unconfigured */
  fetch(product: ProductInput): Promise<ScraperResult | null>;
}
