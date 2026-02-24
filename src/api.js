// api.js
import axios from 'axios';

const API_URL = 'https://mactrackr-backend-fresh.fly.dev';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Health check
export const checkHealth = async () => {
  try {
    const { data } = await api.get('/api/health');
    return data;
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'error', message: error.message };
  }
};

// Products
export const getProducts = async (filters = {}) => {
  try {
    const { data } = await api.get('/api/products', { params: filters });
    // New API returns array directly, not wrapped
    if (Array.isArray(data)) {
      return { products: data, count: data.length };
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const getProduct = async (productId) => {
  try {
    const { data } = await api.get(`/api/products/${productId}`);
    return data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    const { data } = await api.get('/api/products/search', { params: { q: query } });
    return data;
  } catch (error) {
    console.error('Failed to search products:', error);
    throw error;
  }
};

// Prices
export const getPrices = async (productId) => {
  try {
    const { data } = await api.get(`/api/prices/${productId}`);
    return data;
  } catch (error) {
    console.error('Failed to fetch prices:', error);
    throw error;
  }
};

export const getPriceHistory = async (productId, timeframe = '3M') => {
  try {
    const { data } = await api.get(`/api/prices/${productId}/history`, {
      params: { timeframe }
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch price history:', error);
    throw error;
  }
};

// Alerts
export const createAlert = async (alert) => {
  try {
    const { data } = await api.post('/api/alerts', alert);
    return data;
  } catch (error) {
    console.error('Failed to create alert:', error);
    throw error;
  }
};

export const getAlerts = async (email) => {
  try {
    const { data } = await api.get('/api/alerts', { params: { email } });
    return data;
  } catch (error) {
    console.error('Failed to fetch alerts:', error);
    throw error;
  }
};

export const updateAlert = async (alertId, updates) => {
  try {
    const { data } = await api.put(`/api/alerts/${alertId}`, updates);
    return data;
  } catch (error) {
    console.error('Failed to update alert:', error);
    throw error;
  }
};

export const deleteAlert = async (alertId) => {
  try {
    const { data } = await api.delete(`/api/alerts/${alertId}`);
    return data;
  } catch (error) {
    console.error('Failed to delete alert:', error);
    throw error;
  }
};

// Categories
export const getCategories = async () => {
  try {
    const { data } = await api.get('/api/categories');
    return data;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
};

// Retailers
export const getRetailers = async () => {
  try {
    const { data } = await api.get('/api/retailers');
    return data;
  } catch (error) {
    console.error('Failed to fetch retailers:', error);
    throw error;
  }
};