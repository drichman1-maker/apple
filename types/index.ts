export interface Coin {
  id: string;
  name: string;
  description?: string;
  type: CoinType;
  country?: string;
  year?: number;
  denomination?: string;
  composition?: string;
  weight?: number;
  diameter?: number;
  mintage?: number;
  rarity?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  category: CoinCategory;
  pcgsNumber?: string;
  ngcNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export enum CoinType {
  COIN = 'coin',
  TOKEN = 'token',
  MEDAL = 'medal',
  BULLION = 'bullion'
}

export enum CoinCategory {
  US = 'us',
  WORLD = 'world',
  ANCIENT = 'ancient'
}

export interface Grade {
  id: string;
  coinId: string;
  service: GradingService;
  grade: string;
  numericGrade?: number;
  certificationNumber?: string;
  population?: number;
  populationHigher?: number;
  imageUrl?: string;
  notes?: string;
  gradedDate?: string;
  createdAt: string;
}

export enum GradingService {
  PCGS = 'PCGS',
  NGC = 'NGC',
  ANACS = 'ANACS',
  ICG = 'ICG',
  OTHER = 'OTHER'
}

export interface PriceHistory {
  id: string;
  coinId: string;
  gradeId?: string;
  price: number;
  currency: string;
  source: string;
  saleDate: string;
  auction?: string;
  lot?: string;
  createdAt: string;
}

export interface PricePoint {
  date: string;
  price: number;
  source: string;
}

export interface SearchFilters {
  category?: CoinCategory;
  country?: string;
  yearFrom?: number;
  yearTo?: number;
  priceFrom?: number;
  priceTo?: number;
  gradingService?: GradingService;
  gradeFrom?: number;
  gradeTo?: number;
  composition?: string;
  rarity?: string;
  query?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    darkMode: boolean;
    currency: string;
    notifications: boolean;
  };
}

export interface Collection {
  id: string;
  userId: string;
  name: string;
  description?: string;
  coins: CollectionCoin[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionCoin {
  id: string;
  coinId: string;
  coin: Coin;
  gradeId?: string;
  grade?: Grade;
  purchasePrice?: number;
  purchaseDate?: string;
  notes?: string;
  addedAt: string;
}