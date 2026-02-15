# Retail Arbitrage Strategy - Feb 2026

## Core Philosophy
Step over bars, not hop fences. Low-friction, local-first, minimal shipping.

## Active Strategies

### 1. LEGO Arbitrage (High Margin)
**Monitor:** LEGO.com "Retiring Soon" + eBay sold listings
**Target Sets:**
- Ideas series (limited run)
- Disney collaborations
- Star Wars UCS
- Polybags ($5 → $15-20)

**Buy:** LEGO.com, Amazon deals, Target clearance, FB Marketplace local sealed
**Sell:** eBay, StockX (sealed), BrickLink (collectors)

**Bot Setup:** Distill.io monitoring LEGO.com/retiring-soon + eBay sold prices

### 2. Discount Card Stacking
**Buy Gift Cards:** Raise.com, CardCash, Reddit r/giftcardexchange (15-25% off)
**Stack Strategy:**
- Item retail: $100
- Store sale: 25% off → $75
- Pay with gift card bought at 20% discount → $60 cost
- **Effective: $60 for $100 item**

### 3. Local Furniture Flipping (Lowest Friction)
**Sources:**
- Craigslist alerts (Distill.io): "free", "curb alert", "moving"
- Nextdoor app (free section)
- Estate sales (estatesales.net, Saturday 50% off)
- Apartment turnovers (contact property managers)

**Process:**
1. Pick up free/cheap furniture
2. Clean/stage
3. Resell FB Marketplace/OfferUp same day
4. **Profit:** $50-300 per piece, cash

**Integration:** Handyman app + Nextdoor = "Free removal" → flip/scrap

### 4. Liquidation Sourcing
**Source:** BULQ.com (individual boxes, not pallets)
**Pre-sell Strategy:** Post in liquidation groups before buying
**Sell Channels:**
- OfferUp (no fees)
- Mercari (easier than eBay)
- Consignment stores (they price/sell)
- Flea markets (weekend cash)

### 5. Domain Flipping
**Watch:** DropCatch.com, ExpiredDomains.net
**Criteria:** 2-3 words, .com only, brandable
**Sell:** Afternic.com, Dan.com
**Example:** UrbanNest.com ($12 → $800-2,000)

### 6. Estate Sales (No Facebook)
**Sources:**
- estatesales.net (email alerts)
- MaxSold.com (online auctions)
- Craigslist "estate" section
- Nextdoor posts

**Strategy:** Saturday afternoon (50% off), target mid-century furniture, tools, decor

## Monitoring Stack (Distill.io)

| Monitor | URL Pattern | Frequency |
|---------|-------------|-----------|
| Craigslist Free | `/search/zip?query=free+furniture` | 5 min |
| LEGO Retiring | lego.com/retiring-soon | 1 hour |
| Estate Sales | estatesales.net/[zipcode] | Daily |
| Domain Drops | dropcatch.com | Real-time |

## Tools
- **Distill.io:** Price/availability alerts
- **OfferUp/Mercari:** Selling (lower fees than eBay)
- **BULQ.com:** Liquidation sourcing
- **Raise/CardCash:** Discount gift cards

## Rules
1. Pre-sell before buying liquidation
2. Cash same day > Shipping hassle
3. Stack discounts (sale + gift card)
4. Track everything in spreadsheet
