// Redirect service for affiliate links
// /go/{productId}/{retailer} → affiliate URL

import { generateAffiliateUrl, AFFILIATE_TEMPLATES } from '../config/redirect.js'

// Track click for analytics
export async function trackClick(productId, retailer, userData = {}) {
  try {
    // Send to analytics/logging endpoint
    const clickData = {
      productId,
      retailer,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      ...userData
    }
    
    // Fire and forget - don't block redirect
    fetch('/api/clicks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clickData),
      keepalive: true
    }).catch(() => {})
  } catch (e) {
    // Silent fail - don't break redirect
  }
}

// Get redirect URL for product/retailer
export function getRedirectUrl(product, retailer) {
  if (!product) return '/'
  
  // Generate affiliate URL
  const affiliateUrl = generateAffiliateUrl(retailer, product)
  
  return affiliateUrl
}

// Build /go/ path
// Formula: /go/{productId}/{retailer} → affiliate_link = template + encode(canonical_url)
export function buildGoPath(productId, retailer) {
  return `/go/${productId}/${retailer.toLowerCase()}`
}

// Handle redirect (for use in click handlers or API routes)
// Uses /go/{productId}/{retailer} endpoint which:
// 1. Tracks the click
// 2. Generates affiliate_link = template + encode(canonical_url)
// 3. Redirects to affiliate URL
export function handleRedirect(productId, retailer, productData) {
  // Build /go/ path
  const goPath = buildGoPath(productId, retailer)
  
  // Navigate to /go/ endpoint (opens in new tab)
  window.open(goPath, '_blank')
}

// Get all available retailers for a product
export function getAvailableRetailers(product) {
  if (!product?.prices) return []
  
  return product.prices
    .filter(p => p.inStock && p.url)
    .map(p => ({
      name: p.retailer,
      price: p.price,
      url: p.url,
      inStock: p.inStock,
      template: AFFILIATE_TEMPLATES[p.retailer?.toLowerCase()]
    }))
    .sort((a, b) => a.price - b.price)
}

// Find best price across retailers
export function getBestPrice(product) {
  if (!product?.prices) return null
  
  const inStockPrices = product.prices.filter(p => p.inStock)
  if (inStockPrices.length === 0) return null
  
  return inStockPrices.reduce((min, p) => 
    p.price < min.price ? p : min
  , inStockPrices[0])
}
