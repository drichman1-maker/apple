import axios from 'axios';
import { 
  Coin, 
  Grade, 
  PriceHistory, 
  SearchFilters, 
  ApiResponse, 
  User,
  Collection,
  CoinCategory 
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Coins API
export const coinsApi = {
  getAll: async (filters?: SearchFilters, page = 1, limit = 20): Promise<ApiResponse<Coin[]>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.fromEntries(
        Object.entries(filters || {}).filter(([_, value]) => value !== undefined)
      )
    });
    
    const response = await api.get(`/coins?${params}`);
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Coin>> => {
    const response = await api.get(`/coins/${id}`);
    return response.data;
  },

  search: async (query: string, filters?: SearchFilters): Promise<ApiResponse<Coin[]>> => {
    const response = await api.post('/coins/search', { query, filters });
    return response.data;
  },

  getByCategory: async (category: CoinCategory, page = 1, limit = 20): Promise<ApiResponse<Coin[]>> => {
    const response = await api.get(`/coins/category/${category}?page=${page}&limit=${limit}`);
    return response.data;
  },

  getFeatured: async (): Promise<ApiResponse<Coin[]>> => {
    const response = await api.get('/coins/featured');
    return response.data;
  },

  getRecent: async (limit = 10): Promise<ApiResponse<Coin[]>> => {
    const response = await api.get(`/coins/recent?limit=${limit}`);
    return response.data;
  }
};

// Grades API
export const gradesApi = {
  getByCoinId: async (coinId: string): Promise<ApiResponse<Grade[]>> => {
    const response = await api.get(`/grades/coin/${coinId}`);
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Grade>> => {
    const response = await api.get(`/grades/${id}`);
    return response.data;
  },

  create: async (grade: Partial<Grade>): Promise<ApiResponse<Grade>> => {
    const response = await api.post('/grades', grade);
    return response.data;
  }
};

// Price History API
export const priceHistoryApi = {
  getByCoinId: async (coinId: string, gradeId?: string): Promise<ApiResponse<PriceHistory[]>> => {
    const params = gradeId ? `?gradeId=${gradeId}` : '';
    const response = await api.get(`/price-history/coin/${coinId}${params}`);
    return response.data;
  },

  getLatestPrice: async (coinId: string, gradeId?: string): Promise<ApiResponse<PriceHistory>> => {
    const params = gradeId ? `?gradeId=${gradeId}` : '';
    const response = await api.get(`/price-history/coin/${coinId}/latest${params}`);
    return response.data;
  },

  create: async (priceHistory: Partial<PriceHistory>): Promise<ApiResponse<PriceHistory>> => {
    const response = await api.post('/price-history', priceHistory);
    return response.data;
  }
};

// Collections API
export const collectionsApi = {
  getAll: async (): Promise<ApiResponse<Collection[]>> => {
    const response = await api.get('/collections');
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Collection>> => {
    const response = await api.get(`/collections/${id}`);
    return response.data;
  },

  create: async (collection: Partial<Collection>): Promise<ApiResponse<Collection>> => {
    const response = await api.post('/collections', collection);
    return response.data;
  },

  update: async (id: string, collection: Partial<Collection>): Promise<ApiResponse<Collection>> => {
    const response = await api.put(`/collections/${id}`, collection);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/collections/${id}`);
    return response.data;
  },

  addCoin: async (collectionId: string, coinId: string, gradeId?: string): Promise<ApiResponse<void>> => {
    const response = await api.post(`/collections/${collectionId}/coins`, { coinId, gradeId });
    return response.data;
  },

  removeCoin: async (collectionId: string, coinId: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/collections/${collectionId}/coins/${coinId}`);
    return response.data;
  }
};

// User API
export const userApi = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  updateProfile: async (updates: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put('/user/profile', updates);
    return response.data;
  },

  updatePreferences: async (preferences: User['preferences']): Promise<ApiResponse<User>> => {
    const response = await api.put('/user/preferences', preferences);
    return response.data;
  }
};

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (email: string, password: string, name: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('auth_token');
  }
};

export default api;