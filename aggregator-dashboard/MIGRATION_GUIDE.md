# Aggregator Migration Guide

## Current Status

| Project | Frontend | Backend | Shared Backend | Status |
|---------|----------|---------|----------------|--------|
| **MacTrackr** | ✅ React + Vite | ✅ Render (mactrackr-api) | ✅ mactrackr-api-backup.fly.dev | Live |
| **MintCondition** | ✅ React | ✅ Flask (old) | ❌ Needs migration | In Progress |
| **CoinCurator** | ✅ Next.js | ✅ Node/Express (old) | ❌ Needs migration | In Progress |
| **RumbleDeals** | ❌ Needs build | ✅ Python FastAPI | ❌ Needs migration | Pending |

## Migration Steps by Project

### 1. CoinCurator (In Progress)

**Frontend Changes:**
- ✅ Updated API endpoint in `src/lib/api.ts`
- ❌ Need to update `Coin` interface to match backend product schema
- ❌ Need to transform backend response to frontend format

**Backend Data Population:**
```bash
# Add sample coins to shared backend
curl -X POST https://mactrackr-api-backup.fly.dev/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "1893-S Morgan Silver Dollar",
    "category": "coins",
    "description": "VG-10 grade Morgan dollar",
    "image_url": "https://example.com/coin.jpg",
    "attributes": {
      "year": 1893,
      "mint": "S",
      "grade": "VG-10",
      "certification": "PCGS",
      "coin_type": "Morgan Dollar"
    }
  }'
```

**Files Modified:**
- `/Users/douglasrichman/.openclaw/workspace/coin-agg/frontend/src/lib/api.ts` (updated API endpoint)

---

### 2. MintCondition (Pokemon)

**Frontend Location:** `/Users/douglasrichman/.openclaw/workspace/mintcondition-pokemon/`

**Migration Steps:**
1. Update API endpoint from old Flask backend to shared backend
2. Update product interface to use backend fields (set_name, card_number, rarity)
3. Transform backend `attributes` to Pokemon-specific fields

**Backend Schema Mapping:**
```typescript
// Old MintCondition interface
interface PokemonCard {
  name: string;
  set: string;
  cardNumber: string;
  rarity: string;
  condition: string;
  price: number;
}

// New Backend schema mapping
const transformCard = (backendProduct) => ({
  name: backendProduct.name,
  set: backendProduct.attributes.set_name,
  cardNumber: backendProduct.attributes.card_number,
  rarity: backendProduct.attributes.rarity,
  condition: backendProduct.condition,
  price: backendProduct.prices[0]?.price || 0
});
```

**Files to Modify:**
- `api.ts` - Update endpoint and add transform function
- `ProductCard.tsx` - Update to use shared components or adapter

---

### 3. RumbleDeals (Video Games)

**Status:** Needs full frontend build

**Current State:**
- Backend: Python FastAPI at `rumbledeals.com/api`
- Frontend: ❌ Not built yet

**Migration Plan:**
1. Build Next.js frontend (similar to CoinCurator structure)
2. Update backend to use shared database schema
3. Add video game specific fields (platform, genre, release_date)

---

## Backend API Endpoints (Shared)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | List products by category |
| `/api/products` | POST | Add new product |
| `/api/products/{id}` | GET | Get single product |
| `/api/products/{id}/prices` | GET | Get price history |
| `/api/prices` | GET/POST | Price management |

**Category Filter:**
```
GET /api/products?category=mac
GET /api/products?category=pokemon
GET /api/products?category=coins
GET /api/products?category=games
```

## Monitoring System

### Installation
```bash
cd /Users/douglasrichman/.openclaw/workspace/aggregator-dashboard
npm install
```

### Run Monitoring
```bash
npm run monitor
```

### Configuration
Edit `/lib/monitoring.ts` to add:
- Reddit subreddits to monitor
- Twitter hashtags to track
- n8n webhook URL for alerts

## Deployment

### Dashboard
```bash
cd aggregator-dashboard
npm run build
# Deploy dist/ to Vercel
```

### Individual Projects
1. Update frontend API endpoints to shared backend
2. Transform data on frontend to match existing UI
3. Test all functionality
4. Deploy to Vercel/Netlify

## n8n Integration

The monitoring system can send alerts to your n8n workflow:

1. Create webhook endpoint in n8n
2. Add URL to `monitoring.ts`:
   ```typescript
   const N8N_WEBHOOK_URL = 'https://your-n8n.com/webhook/deals';
   ```
3. Configure n8n to:
   - Send Telegram alerts (chat_id: 461595428)
   - Add to Notion database
   - Post to Discord channel

## Next Steps

1. **Complete CoinCurator migration** - Update transform functions
2. **Populate Pokemon data** - Add cards to shared backend
3. **Build RumbleDeals frontend** - Next.js app with game focus
4. **Configure monitoring** - Set up cron job for deal alerts
5. **Test n8n integration** - Verify alert flow works end-to-end
