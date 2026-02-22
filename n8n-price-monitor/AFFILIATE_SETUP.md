# MacTrackr Affiliate Integration

## Overview
Backend now supports affiliate tracking for 6 major retailers. Links are automatically generated on API responses.

## Affiliate Programs Status

| Retailer | Program | Status | Action Required |
|----------|---------|--------|-----------------|
| Amazon | Amazon Associates | 🟡 Apply | [Apply here](https://affiliate-program.amazon.com/) |
| Apple | PHG Network | 🟡 Apply | [Apply here](https://www.apple.com/affiliate/) |
| Best Buy | CJ Affiliate | 🟡 Apply | [Apply here](https://www.bestbuy.com/affiliate/) |
| B&H | B&H Affiliate | 🟡 Apply | [Apply here](https://www.bhphotovideo.com/affiliate) |
| Adorama | AvantLink/impact.com | 🟡 Apply | [Apply here](https://www.adorama.com/affiliate) |
| eBay | eBay Partner Network | 🟡 Apply | [Apply here](https://partnernetwork.ebay.com/) |

## Quick Start

### 1. Apply to Amazon Associates (Priority #1)
- URL: https://affiliate-program.amazon.com/
- Requirements: Website with content, privacy policy
- MacTrackr has: ✅ Privacy policy at /privacy
- Approval time: 1-3 days (usually instant for US)

### 2. Set Environment Variables

```bash
# Railway dashboard or .env file
AMAZON_ASSOCIATES_TAG=mactrackr-20
APPLE_AFFILIATE_ID=your_phg_id
BESTBUY_AFFILIATE_ID=your_cj_id
BH_AFFILIATE_ID=your_bh_kw
ADORAMA_AFFILIATE_ID=your_avantlink_id
EBAY_CAMPAIGN_ID=your_epn_campaign
```

### 3. Deploy Updated Backend

```bash
# Copy server-v2.1.js to your backend repo
cp server-v2.1.js src/server.js

# Commit and push
git add src/server.js
git commit -m "Add affiliate link tracking"
git push origin main

# Railway will auto-deploy
```

### 4. Verify

```bash
# Check affiliate status endpoint
curl https://your-api.com/api/affiliate-status

# Response:
{
  "status": {
    "amazon": { "configured": true, "id": "CONFIGURED" },
    "apple": { "configured": false, "id": "NOT_CONFIGURED" },
    ...
  }
}
```

## API Changes

### Before (v2.0)
```json
{
  "id": "iphone-16-128-unlocked",
  "prices": {
    "amazon": {
      "price": 799,
      "inStock": true,
      "url": "https://amazon.com/dp/B0DHTYW7P8"
    }
  }
}
```

### After (v2.1)
```json
{
  "id": "iphone-16-128-unlocked",
  "prices": {
    "amazon": {
      "price": 799,
      "inStock": true,
      "url": "https://amazon.com/dp/B0DHTYW7P8",
      "affiliateUrl": "https://amazon.com/dp/B0DHTYW7P8?tag=mactrackr-20"
    }
  }
}
```

## Frontend Updates Needed

Update your frontend to use `affiliateUrl` when available:

```javascript
// ProductCard.jsx or similar
<a 
  href={price.affiliateUrl || price.url}
  target="_blank"
  rel="noopener noreferrer sponsored"
>
  Buy at {retailer}
</a>
```

Add `sponsored` rel attribute for SEO compliance.

## Link Formats

### Amazon
```
https://amazon.com/dp/ASIN?tag=mactrackr-20
```

### Apple (PHG)
```
https://apple.sjv.io/c/AFFILIATE_ID?u=URL_ENCODED_LINK
```

### Best Buy
```
https://bestbuy.com/site/...?ref=CJ_AFFILIATE_ID
```

### B&H
```
https://bhphotovideo.com/c/product/...?kw=BH_AFFILIATE_ID
```

### Adorama
```
https://adorama.com/...?aff=AVANTLINK_ID
```

### eBay
```
https://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=CAMPAIGN_ID&toolid=10001&mpre=URL_ENCODED_LINK
```

## Compliance

### Required Disclosures
- Privacy policy must mention affiliate links ✅ (already done)
- Add disclosure: "We may earn a commission when you buy through our links"
- Location: Footer or near affiliate links

### FTC Guidelines
- Clear and conspicuous disclosure
- Before the affiliate link
- Example: "Affiliate links — we may earn a commission"

## Testing

### Verify Affiliate Links Work
1. Check API returns `affiliateUrl` field
2. Click test link
3. Verify tracking parameter in URL
4. Check retailer shows your affiliate tag

### Amazon Link Checker
```bash
# Should contain your tag
curl -s https://your-api.com/api/products/iphone-16-128-unlocked | \
  jq '.prices.amazon.affiliateUrl'

# Expected output:
# "https://amazon.com/dp/B0DHTYW7P8?tag=mactrackr-20"
```

## Revenue Tracking

### Amazon Associates Dashboard
- Real-time earnings
- Click-through rates
- Conversion tracking

### Expected Performance
| Metric | Estimate |
|--------|----------|
| Click-through rate | 5-10% |
| Conversion rate | 2-5% |
| Commission (electronics) | 1-3% |
| Avg order value | $800 |

### Revenue Math (Example)
- 1,000 daily visitors
- 5% CTR = 50 clicks/day
- 3% conversion = 1.5 sales/day
- $800 AOV × 2% commission = $16/sale
- **$24/day = $720/month**

## Next Steps

1. ✅ Apply to Amazon Associates today
2. ✅ Update privacy policy with affiliate disclosure (if needed)
3. ✅ Deploy backend v2.1
4. ✅ Update frontend to use affiliateUrl
5. ⏳ Apply to other programs (parallel)
6. ⏳ Monitor Amazon for 180 days (need 3 sales)

## Files Created
- `server-v2.1.js` - Updated backend with affiliate tracking
- `AFFILIATE_LINKS.md` - Reference for link formats
- `DEPLOY.md` - Deployment instructions

