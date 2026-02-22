# Affiliate Link Structure Reference

## Amazon Associates
**Parameter:** `&tag=YOUR_ASSOCIATES_ID`

**Format:**
```
https://www.amazon.com/dp/ASIN/?tag=mactrackr-20
https://www.amazon.com/gp/product/ASIN?tag=mactrackr-20
```

**Notes:**
- Store ID = Tracking ID (same thing)
- Add `&tag=` to any Amazon URL
- Only one tag per link (no double-dipping)

---

## Apple (PHG Affiliate Network)
**Parameter:** `?afid=` or PHG redirect URL

**Format:**
```
https://www.apple.com/product?afid=AFFILIATE_ID
```

**Notes:**
- Uses Performance Horizon Group (PHG)
- Need to generate links via PHG dashboard
- Or wrap URLs with PHG redirect

---

## Best Buy Affiliate
**Parameter:** `&ref=` or `&aid=` (depends on network)

**Format:**
```
https://www.bestbuy.com/site/product.p?skuId=XXXX&ref=REF_ID
```

**Notes:**
- Uses CJ Affiliate (Commission Junction)
- Links generated via CJ dashboard
- May need to wrap through CJ redirect

---

## B&H Photo Affiliate
**Parameter:** `?kw=` or `?clickid=`

**Format:**
```
https://www.bhphotovideo.com/c/product/ITEM.html?kw=BH_ID
```

**Notes:**
- B&H uses in-house affiliate program
- kw parameter for keyword tracking
- May use impact.com for some affiliates

---

## Adorama Affiliate
**Parameter:** `?utm_source=` or similar

**Format:**
```
https://www.adorama.com/ITEM.html?aff=AFFILIATE_ID
```

**Notes:**
- Uses AvantLink or impact.com
- Check affiliate platform for link format

---

## eBay Partner Network (EPN)
**Parameter:** `?campid=` and `&toolid=`

**Format:**
```
https://www.ebay.com/itm/ITEM_ID?campid=CAMPAIGN_ID&toolid=TOOL_ID
```

**Notes:**
- Uses eBay Partner Network
- Links generated via EPN dashboard
- Need campaign ID and tool ID

---

## Implementation Notes

### Current MacTrackr Products
Products are in backend with prices array:
```json
{
  "id": "iphone-16-128-unlocked",
  "name": "iPhone 16 128GB",
  "prices": [
    {
      "retailer": "Amazon",
      "price": 799,
      "url": "https://amazon.com/dp/...",
      "affiliateUrl": null  // Add this field
    }
  ]
}
```

### Affiliate IDs Needed
| Retailer | Affiliate ID Format | Status |
|----------|---------------------|--------|
| Amazon | mactrackr-20 | Need to apply |
| Apple | PHG account | Need to apply |
| Best Buy | CJ account | Need to apply |
| B&H | B&H affiliate ID | Need to apply |
| Adorama | AvantLink/impact | Need to apply |
| eBay | EPN campaign ID | Need to apply |

### Link Building Logic
```javascript
function buildAffiliateUrl(retailer, baseUrl, affiliateId) {
  switch(retailer) {
    case 'Amazon':
      return baseUrl.includes('?') 
        ? `${baseUrl}&tag=${affiliateId}`
        : `${baseUrl}?tag=${affiliateId}`;
    
    case 'Apple':
      return `https://apple.sjv.io/c/12345/123456/1234?u=${encodeURIComponent(baseUrl)}`;
    
    case 'Best Buy':
      return baseUrl.includes('?')
        ? `${baseUrl}&ref=${affiliateId}`
        : `${baseUrl}?ref=${affiliateId}`;
    
    case 'B&H':
      return baseUrl.includes('?')
        ? `${baseUrl}&kw=${affiliateId}`
        : `${baseUrl}?kw=${affiliateId}`;
    
    case 'eBay':
      return `https://rover.ebay.com/rover/1/711-53200-19255-0/1?campid=${affiliateId}&toolid=10001&customid=&mpre=${encodeURIComponent(baseUrl)}`;
    
    default:
      return baseUrl;
  }
}
```

### Application Priority
1. **Amazon Associates** - Highest volume, easiest approval
2. **B&H Photo** - Apple products specialist
3. **eBay Partner Network** - Good for used/refurbished
4. **Apple PHG** - Direct brand relationship
5. **Best Buy** - Retail presence
6. **Adorama** - Photography/electronics focus

### Next Steps
1. Apply to Amazon Associates (free, 3 sales in 180 days)
2. Update backend to support affiliate URLs
3. Add link builder utility
4. Track clicks for optimization
