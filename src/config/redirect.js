// Affiliate redirect configuration
// Templates for generating deep links dynamically

export const AFFILIATE_TEMPLATES = {
  amazon: {
    name: 'Amazon',
    network: 'Amazon Associates',
    template: 'https://www.amazon.com/dp/{sku}?tag={affiliateId}',
    searchTemplate: 'https://www.amazon.com/s?k={query}&tag={affiliateId}',
    idField: 'asin',
    affiliateId: 'mactrackr-20'
  },
  
  bestbuy: {
    name: 'Best Buy',
    network: 'Impact',
    // Impact deep link format - replace XXXX with actual account ID
    template: 'https://bestbuy.7tiv.net/c/XXXX/XXXX/XXXX?u={encodedUrl}',
    canonicalPattern: 'https://www.bestbuy.com/site/{slug}/{skuId}.p',
    idField: 'skuId',
    affiliateId: 'mactrackr_bb'
  },
  
  adorama: {
    name: 'Adorama',
    network: 'ShareASale',
    template: 'https://www.adorama.com/{productCode}.html?utm_source=affiliate&utm_medium={affiliateId}',
    idField: 'productCode',
    affiliateId: 'mactrackr_adorama'
  },
  
  bh: {
    name: "B&H Photo",
    network: 'Direct',
    template: 'https://www.bhphotovideo.com/c/product/{sku}.html?KBID={affiliateId}',
    idField: 'sku',
    affiliateId: 'mactrackr_bh'
  },
  
  ebay: {
    name: 'eBay',
    network: 'eBay Partner Network',
    template: 'https://www.ebay.com/itm/{sku}?mkevt=1&mkcid={affiliateId}',
    searchTemplate: 'https://www.ebay.com/sch/i.html?_nkw={query}&mkevt=1&mkcid={affiliateId}',
    idField: 'itemId',
    affiliateId: 'mactrackr_ebay'
  }
}

// Generate affiliate URL from product data
export function generateAffiliateUrl(retailer, product) {
  const config = AFFILIATE_TEMPLATES[retailer.toLowerCase()]
  
  if (!config) {
    // Fallback to direct URL if no affiliate config
    return product.retailerUrls?.[retailer] || product.url
  }
  
  const { template, affiliateId, idField } = config
  
  // Get the identifier (SKU, ASIN, productCode, etc.)
  const identifier = product.retailerSkus?.[retailer] || product.sku
  
  if (!identifier && !product.canonicalUrl) {
    // Fallback to search if no direct product ID
    if (config.searchTemplate) {
      return config.searchTemplate
        .replace('{query}', encodeURIComponent(product.name))
        .replace('{affiliateId}', affiliateId)
    }
    return product.retailerUrls?.[retailer] || product.url
  }
  
  // Build the canonical URL if needed
  let canonicalUrl = product.canonicalUrl || product.retailerUrls?.[retailer]
  
  // Generate affiliate link
  let affiliateUrl = template
    .replace('{sku}', identifier)
    .replace('{productCode}', identifier)
    .replace('{skuId}', identifier)
    .replace('{asin}', identifier)
    .replace('{itemId}', identifier)
    .replace('{affiliateId}', affiliateId)
    .replace('{slug}', product.slug || '')
    .replace('{encodedUrl}', encodeURIComponent(canonicalUrl || ''))
  
  return affiliateUrl
}

// Normalize retailer URL to canonical form
export function normalizeRetailerUrl(url, retailer) {
  if (!url) return null
  
  const retailerKey = retailer.toLowerCase()
  
  try {
    const urlObj = new URL(url)
    
    switch(retailerKey) {
      case 'bestbuy':
        // Extract SKU ID from Best Buy URL
        // Pattern: /site/{slug}/{skuId}.p or ?skuId=XXXXX
        const bbMatch = url.match(/\/(\d+)\.p/) || url.match(/skuId=(\d+)/)
        if (bbMatch) {
          const skuId = bbMatch[1]
          const slug = urlObj.pathname.split('/')[2] || 'product'
          return `https://www.bestbuy.com/site/${slug}/${skuId}.p`
        }
        break
        
      case 'adorama':
        // Extract product code
        const adoramaMatch = url.match(/\/([a-z0-9]+)\.html/i)
        if (adoramaMatch) {
          return `https://www.adorama.com/${adoramaMatch[1].toLowerCase()}.html`
        }
        break
        
      case 'amazon':
        // Extract ASIN
        const asinMatch = url.match(/\/dp\/(\w+)/) || url.match(/\/gp\/product\/(\w+)/)
        if (asinMatch) {
          return `https://www.amazon.com/dp/${asinMatch[1]}`
        }
        break
        
      default:
        // Remove query params for other retailers
        return `${urlObj.origin}${urlObj.pathname}`
    }
  } catch (e) {
    console.error('Failed to normalize URL:', e)
  }
  
  return url
}

// Extract SKU/product code from URL
export function extractSkuFromUrl(url, retailer) {
  if (!url) return null
  
  const retailerKey = retailer.toLowerCase()
  
  switch(retailerKey) {
    case 'bestbuy':
      const bbMatch = url.match(/\/(\d+)\.p/) || url.match(/skuId=(\d+)/)
      return bbMatch ? bbMatch[1] : null
      
    case 'adorama':
      const adoramaMatch = url.match(/\/([a-z0-9]+)\.html/i)
      return adoramaMatch ? adoramaMatch[1].toLowerCase() : null
      
    case 'amazon':
      const asinMatch = url.match(/\/dp\/(\w{10})/) || url.match(/\/gp\/product\/(\w{10})/)
      return asinMatch ? asinMatch[1] : null
      
    case 'bh':
      const bhMatch = url.match(/\/c\/product\/(\d+)/)
      return bhMatch ? bhMatch[1] : null
      
    case 'ebay':
      const ebayMatch = url.match(/\/itm\/(\d+)/)
      return ebayMatch ? ebayMatch[1] : null
      
    default:
      return null
  }
}
