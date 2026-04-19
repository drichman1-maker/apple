// api.js
import axios from 'axios';

const API_URL = 'https://agg-api-hub.fly.dev';
const SITE = 'theresmac';

// Transform product from agg-api-hub format to UI format
function transformProduct(p) {
  const prices = {};
  for (const [retailer, data] of Object.entries(p.prices || {})) {
    prices[retailer] = {
      price: data.price,
      inStock: data.status === 'in_stock',
      url: data.affiliateUrl || data.url,
      verified: data.verified,
    };
  }
  return { ...p, prices };
}

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_URL}/api/${SITE}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Health check
export const checkHealth = async () => {
  try {
    const { data } = await api.get('/health');
    return data;
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'error', message: error.message };
  }
};

// Products
export const getProducts = async (filters = {}) => {
  try {
    const { data } = await api.get('/products', { params: filters });
    const products = (Array.isArray(data) ? data : []).map(transformProduct);
    return { products, count: products.length };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const getProduct = async (productId) => {
  try {
    const { data } = await api.get(`/products/${productId}`);
    return transformProduct(data);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    const { data } = await api.get('/products', { params: { q: query } });
    return (Array.isArray(data) ? data : []).map(transformProduct);
  } catch (error) {
    console.error('Failed to search products:', error);
    throw error;
  }
};

// Prices
export const getPrices = async (productId) => {
  try {
    const { data } = await api.get(`/products/${productId}`);
    return transformProduct(data).prices;
  } catch (error) {
    console.error('Failed to fetch prices:', error);
    throw error;
  }
};

export const getPriceHistory = async (productId, timeframe = '3M') => {
  // Price history not yet available via public API
  return null;
};

// Alerts
export const createAlert = async (alert) => {
  try {
    const { data } = await api.post('/alerts', alert);
    return data;
  } catch (error) {
    console.error('Failed to create alert:', error);
    throw error;
  }
};

export const getAlerts = async (email) => {
  // Not available via public API
  return [];
};

export const updateAlert = async (alertId, updates) => {
  // Not available via public API
  return null;
};

export const deleteAlert = async (alertId) => {
  try {
    const { data } = await api.delete(`/alerts/${alertId}`);
    return data;
  } catch (error) {
    console.error('Failed to delete alert:', error);
    throw error;
  }
};

// Categories
export const getCategories = async () => {
  // Derived from products
  return [];
};

// Retailers
export const getRetailers = async () => {
  // Derived from products
  return [];
};