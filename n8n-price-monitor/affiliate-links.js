// Affiliate Link Builder for MacTrackr
// Add this to server.js or as a separate module

// Placeholder affiliate IDs - replace with real ones after approval
const AFFILIATE_IDS = {
  amazon: 'mactrackr-20',      // Amazon Associates
  apple: 'phg_affiliate_id',    // PHG Network
  bestbuy: 'cj_affiliate_id',   // CJ Affiliate
  bh: 'bh_affiliate_kw',        // B&H Photo
  adorama: 'avantlink_id',      // AvantLink
  ebay: 'epn_campaign_id'       // eBay Partner Network
};

// Build affiliate URL for each retailer
function buildAffiliateUrl(retailer, baseUrl) {
  if (!baseUrl || baseUrl === '#') return '#';
  
  const affiliateId = AFFILIATE_IDS[retailer];
  if (!affiliateId) return baseUrl;
  
  switch(retailer) {
    case 'amazon':
      // Amazon: &tag=ASSOCIATES_ID
      return baseUrl.includes('?') 
        ? `${baseUrl}&tag=${affiliateId}`
        : `${baseUrl}?tag=${affiliateId}`;
    
    case 'apple':
      // Apple PHG: Wrap through redirect
      // Example: https://apple.sjv.io/c/12345/123456/1234?u=ENCODED_URL
      return `https://apple.sjv.io/c/${affiliateId}?u=${encodeURIComponent(baseUrl)}`;
    
    case 'bestbuy':
      // Best Buy CJ: Add ref parameter
      return baseUrl.includes('?')
        ? `${baseUrl}&ref=${affiliateId}`
        : `${baseUrl}?ref=${affiliateId}`;
    
    case 'bh':
      // B&H: kw parameter
      return baseUrl.includes('?')
        ? `${baseUrl}&kw=${affiliateId}`
        : `${baseUrl}?kw=${affiliateId}`;
    
    case 'adorama':
      // Adorama: aff parameter
      return baseUrl.includes('?')
        ? `${baseUrl}&aff=${affiliateId}`
        : `${baseUrl}?aff=${affiliateId}`;
    
    case 'ebay':
      // eBay Partner Network: Wrap through rover
      return `https://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=${affiliateId}&toolid=10001&customid=&mpre=${encodeURIComponent(baseUrl)}`;
    
    default:
      return baseUrl;
  }
}

// Process all products and add affiliate URLs
function addAffiliateUrlsToProducts(products) {
  return products.map(product => {
    const updatedPrices = {};
    
    for (const [retailer, data] of Object.entries(product.prices)) {
      updatedPrices[retailer] = {
        ...data,
        affiliateUrl: buildAffiliateUrl(retailer, data.url)
      };
    }
    
    // Handle refurbished prices too
    const updatedRefurbished = {};
    if (product.refurbishedPrices) {
      for (const [retailer, data] of Object.entries(product.refurbishedPrices)) {
        updatedRefurbished[retailer] = {
          ...data,
          affiliateUrl: buildAffiliateUrl(retailer, data.url)
        };
      }
    }
    
    return {
      ...product,
      prices: updatedPrices,
      ...(product.refurbishedPrices && { refurbishedPrices: updatedRefurbished })
    };
  });
}

// Direct product URLs with affiliate tracking (replace search URLs)
const DIRECT_PRODUCT_URLS = {
  // iPhone 16 series
  'iphone-16-128-unlocked': {
    apple: 'https://www.apple.com/shop/buy-iphone/iphone-16',
    amazon: 'https://amazon.com/dp/B0DHTYW7P8',
    bestbuy: 'https://www.bestbuy.com/site/apple-iphone-16-128gb-unlocked/6418599.p',
    walmart: 'https://www.walmart.com/ip/11469110090',
    target: 'https://www.target.com/p/apple-iphone-16-128gb-white/-/A-86076262',
    bh: 'https://www.bhphotovideo.com/c/product/1810538-REG/apple_mynf3ll_a_iphone_16_128gb_white.html',
    adorama: 'https://www.adorama.com/acmynf3lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=iPhone+16+128GB+unlocked'
  },
  'iphone-16-256-unlocked': {
    apple: 'https://www.apple.com/shop/buy-iphone/iphone-16',
    amazon: 'https://amazon.com/dp/B0DHTZ2CZQ',
    bestbuy: 'https://www.bestbuy.com/site/apple-iphone-16-256gb-unlocked/6418600.p',
    walmart: 'https://www.walmart.com/ip/11469110091',
    target: 'https://www.target.com/p/apple-iphone-16-256gb-white/-/A-86076263',
    bh: 'https://www.bhphotovideo.com/c/product/1810539-REG/apple_mynh3ll_a_iphone_16_256gb_white.html',
    adorama: 'https://www.adorama.com/acmynh3lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=iPhone+16+256GB+unlocked'
  },
  'iphone-16-pro-128': {
    apple: 'https://www.apple.com/shop/buy-iphone/iphone-16-pro',
    amazon: 'https://amazon.com/dp/B0DHTZ8F7H',
    bestbuy: 'https://www.bestbuy.com/site/apple-iphone-16-pro-128gb-unlocked/6418603.p',
    walmart: 'https://www.walmart.com/ip/11469110094',
    target: 'https://www.target.com/p/apple-iphone-16-pro-128gb/-/A-86076266',
    bh: 'https://www.bhphotovideo.com/c/product/1810545-REG/apple_mynq3ll_a_iphone_16_pro_128gb.html',
    adorama: 'https://www.adorama.com/acmynq3lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=iPhone+16+Pro+128GB'
  },
  'iphone-16-pro-256': {
    apple: 'https://www.apple.com/shop/buy-iphone/iphone-16-pro',
    amazon: 'https://amazon.com/dp/B0DHTZQM7L',
    bestbuy: 'https://www.bestbuy.com/site/apple-iphone-16-pro-256gb-unlocked/6418604.p',
    walmart: 'https://www.walmart.com/ip/11469110095',
    target: 'https://www.target.com/p/apple-iphone-16-pro-256gb/-/A-86076267',
    bh: 'https://www.bhphotovideo.com/c/product/1810546-REG/apple_mynr3ll_a_iphone_16_pro_256gb.html',
    adorama: 'https://www.adorama.com/acmynr3lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=iPhone+16+Pro+256GB'
  },
  'iphone-16-pro-max-256': {
    apple: 'https://www.apple.com/shop/buy-iphone/iphone-16-pro',
    amazon: 'https://amazon.com/dp/B0DHTZ9L1B',
    bestbuy: 'https://www.bestbuy.com/site/apple-iphone-16-pro-max-256gb-unlocked/6418606.p',
    walmart: 'https://www.walmart.com/ip/11469110097',
    target: 'https://www.target.com/p/apple-iphone-16-pro-max-256gb/-/A-86076269',
    bh: 'https://www.bhphotovideo.com/c/product/1810549-REG/apple_mynt3ll_a_iphone_16_pro_max_256gb.html',
    adorama: 'https://www.adorama.com/acmynt3lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=iPhone+16+Pro+Max+256GB'
  },
  'iphone-16-pro-max-512': {
    apple: 'https://www.apple.com/shop/buy-iphone/iphone-16-pro',
    amazon: 'https://amazon.com/dp/B0DHTZ9B9F',
    bestbuy: 'https://www.bestbuy.com/site/apple-iphone-16-pro-max-512gb-unlocked/6418607.p',
    walmart: 'https://www.walmart.com/ip/11469110098',
    target: 'https://www.target.com/p/apple-iphone-16-pro-max-512gb/-/A-86076270',
    bh: 'https://www.bhphotovideo.com/c/product/1810550-REG/apple_mynw3ll_a_iphone_16_pro_max_512gb.html',
    adorama: 'https://www.adorama.com/acmynw3lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=iPhone+16+Pro+Max+512GB'
  },
  
  // MacBook Air M4
  'macbook-air-13-m4-16gb': {
    apple: 'https://www.apple.com/shop/buy-mac/macbook-air',
    amazon: 'https://amazon.com/dp/B0DKLHHMZ7',
    bestbuy: 'https://www.bestbuy.com/site/apple-macbook-air-13-inch-laptop-m4-chip-16gb-memory-256gb-ssd/6600600.p',
    walmart: 'https://www.walmart.com/ip/Apple-MacBook-Air-13-inch-Laptop-M4-chip-16GB-256GB-SSD/14202738271',
    bh: 'https://www.bhphotovideo.com/c/product/1853841-REG/apple_mc5x3ll_a_13_macbook_air_m4.html',
    adorama: 'https://www.adorama.com/acmc5x3lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=MacBook+Air+13+M4+16GB'
  },
  'macbook-air-13-m4-24gb': {
    apple: 'https://www.apple.com/shop/buy-mac/macbook-air',
    amazon: 'https://amazon.com/dp/B0DKLHJBWH',
    bestbuy: 'https://www.bestbuy.com/site/apple-macbook-air-13-inch-laptop-m4-chip-24gb-memory-512gb-ssd/6600601.p',
    walmart: 'https://www.walmart.com/ip/Apple-MacBook-Air-13-inch-Laptop-M4-chip-24GB-512GB-SSD/14202738272',
    bh: 'https://www.bhphotovideo.com/c/product/1853842-REG/apple_mc7v3ll_a_13_macbook_air_m4.html',
    adorama: 'https://www.adorama.com/acmc7v3lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=MacBook+Air+13+M4+24GB'
  },
  'macbook-air-15-m4-16gb': {
    apple: 'https://www.apple.com/shop/buy-mac/macbook-air',
    amazon: 'https://amazon.com/dp/B0DKLHHMZ8',
    bestbuy: 'https://www.bestbuy.com/site/apple-macbook-air-15-inch-laptop-m4-chip-16gb-memory-256gb-ssd/6600602.p',
    walmart: 'https://www.walmart.com/ip/Apple-MacBook-Air-15-inch-Laptop-M4-chip-16GB-256GB-SSD/14202738273',
    bh: 'https://www.bhphotovideo.com/c/product/1853843-REG/apple_mc9c3ll_a_15_macbook_air_m4.html',
    adorama: 'https://www.adorama.com/acmc9c3lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=MacBook+Air+15+M4+16GB'
  },
  'macbook-air-15-m4-24gb': {
    apple: 'https://www.apple.com/shop/buy-mac/macbook-air',
    amazon: 'https://amazon.com/dp/B0DKLHJBWJ',
    bestbuy: 'https://www.bestbuy.com/site/apple-macbook-air-15-inch-laptop-m4-chip-24gb-memory-512gb-ssd/6600603.p',
    walmart: 'https://www.walmart.com/ip/Apple-MacBook-Air-15-inch-Laptop-M4-chip-24GB-512GB-SSD/14202738274',
    bh: 'https://www.bhphotovideo.com/c/product/1853844-REG/apple_mc9f3ll_a_15_macbook_air_m4.html',
    adorama: 'https://www.adorama.com/acmc9f3lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=MacBook+Air+15+M4+24GB'
  },
  
  // MacBook Pro M4
  'macbook-pro-14-m4-pro-24gb': {
    apple: 'https://www.apple.com/shop/buy-mac/macbook-pro',
    amazon: 'https://amazon.com/dp/B0DKLHHMZ9',
    bestbuy: 'https://www.bestbuy.com/site/apple-macbook-pro-14-inch-laptop-m4-pro-chip-24gb-memory-512gb-ssd/6600604.p',
    walmart: 'https://www.walmart.com/ip/Apple-MacBook-Pro-14-inch-Laptop-M4-Pro-chip-24GB-512GB-SSD/14202738275',
    bh: 'https://www.bhphotovideo.com/c/product/1853845-REG/apple_mrx33ll_a_14_macbook_pro_m4.html',
    adorama: 'https://www.adorama.com/acmrx33lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=MacBook+Pro+14+M4+Pro'
  },
  'macbook-pro-16-m4-pro-36gb': {
    apple: 'https://www.apple.com/shop/buy-mac/macbook-pro',
    amazon: 'https://amazon.com/dp/B0DKLHJBWK',
    bestbuy: 'https://www.bestbuy.com/site/apple-macbook-pro-16-inch-laptop-m4-pro-chip-36gb-memory-512gb-ssd/6600605.p',
    walmart: 'https://www.walmart.com/ip/Apple-MacBook-Pro-16-inch-Laptop-M4-Pro-chip-36GB-512GB-SSD/14202738276',
    bh: 'https://www.bhphotovideo.com/c/product/1853846-REG/apple_mrw13ll_a_16_macbook_pro_m4.html',
    adorama: 'https://www.adorama.com/acmrw13lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=MacBook+Pro+16+M4+Pro'
  },
  
  // iPad Pro M4
  'ipad-pro-11-m4-256': {
    apple: 'https://www.apple.com/shop/buy-ipad/ipad-pro',
    amazon: 'https://amazon.com/dp/B0D3J6L2G7',
    bestbuy: 'https://www.bestbuy.com/site/apple-ipad-pro-11-inch-wi-fi-256gb-with-m4-chip/6534582.p',
    walmart: 'https://www.walmart.com/ip/Apple-iPad-Pro-11-inch-Wi-Fi-256GB-with-M4-chip/13608767673',
    bh: 'https://www.bhphotovideo.com/c/product/1851995-REG/apple_mvv83ll_a_11_ipad_pro_m4.html',
    adorama: 'https://www.adorama.com/acmvv83lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=iPad+Pro+11+M4+256GB'
  },
  'ipad-pro-13-m4-256': {
    apple: 'https://www.apple.com/shop/buy-ipad/ipad-pro',
    amazon: 'https://amazon.com/dp/B0D3J7H7K8',
    bestbuy: 'https://www.bestbuy.com/site/apple-ipad-pro-13-inch-wi-fi-256gb-with-m4-chip/6534583.p',
    walmart: 'https://www.walmart.com/ip/Apple-iPad-Pro-13-inch-Wi-Fi-256GB-with-M4-chip/13608767674',
    bh: 'https://www.bhphotovideo.com/c/product/1851996-REG/apple_mvx23ll_a_13_ipad_pro_m4.html',
    adorama: 'https://www.adorama.com/acmvx23lla.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=iPad+Pro+13+M4+256GB'
  },
  
  // AirPods
  'airpods-pro-2': {
    apple: 'https://www.apple.com/shop/product/MTJV3AM/A/airpods-pro',
    amazon: 'https://amazon.com/dp/B0D1XD1ZV3',
    bestbuy: 'https://www.bestbuy.com/site/apple-airpods-pro-2-wireless-earbuds/6418595.p',
    walmart: 'https://www.walmart.com/ip/Apple-AirPods-Pro-2/11469110123',
    bh: 'https://www.bhphotovideo.com/c/product/1764658-REG/apple_mtjv3am_a_airpods_pro_2nd.html',
    adorama: 'https://www.adorama.com/acmtjv3ama.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=AirPods+Pro+2'
  },
  'airpods-4': {
    apple: 'https://www.apple.com/shop/product/MXP63AM/A/airpods-4',
    amazon: 'https://amazon.com/dp/B0DHTYW7P9',
    bestbuy: 'https://www.bestbuy.com/site/apple-airpods-4-wireless-earbuds/6418596.p',
    walmart: 'https://www.walmart.com/ip/Apple-AirPods-4/11469110124',
    bh: 'https://www.bhphotovideo.com/c/product/1810551-REG/apple_mxp63am_a_airpods_4.html',
    adorama: 'https://www.adorama.com/acmxp63ama.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=AirPods+4'
  },
  'airpods-max': {
    apple: 'https://www.apple.com/shop/product/airpods-max',
    amazon: 'https://amazon.com/dp/B08PZJN7BD',
    bestbuy: 'https://www.bestbuy.com/site/apple-airpods-max/6418597.p',
    walmart: 'https://www.walmart.com/ip/Apple-AirPods-Max/11469110125',
    bh: 'https://www.bhphotovideo.com/c/product/1597614-REG/apple_mgyj3am_a_airpods_max_space.html',
    adorama: 'https://www.adorama.com/acmgyj3ama.html',
    ebay: 'https://www.ebay.com/sch/i.html?_nkw=AirPods+Max'
  }
};

// Apply direct URLs and affiliate tracking to products
function enrichProductsWithUrls(products) {
  return products.map(product => {
    const directUrls = DIRECT_PRODUCT_URLS[product.id];
    if (!directUrls) return product; // Keep search URLs for unmapped products
    
    const updatedPrices = {};
    for (const [retailer, data] of Object.entries(product.prices)) {
      const directUrl = directUrls[retailer];
      const url = directUrl || data.url;
      
      updatedPrices[retailer] = {
        ...data,
        url: url,
        affiliateUrl: buildAffiliateUrl(retailer, url)
      };
    }
    
    return {
      ...product,
      prices: updatedPrices
    };
  });
}

module.exports = {
  buildAffiliateUrl,
  addAffiliateUrlsToProducts,
  enrichProductsWithUrls,
  AFFILIATE_IDS,
  DIRECT_PRODUCT_URLS
};
