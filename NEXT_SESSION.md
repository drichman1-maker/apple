# Next Session Context - MacTrackr Monorepo

## ✅ Completed (Feb 20, 2026)

### Infrastructure
- **Frontend**: https://mactrackr-web.fly.dev (React + Vite)
- **API**: https://mactrackr-api-backup.fly.dev (FastAPI)
- **Custom Domain**: mactrackr.com + www certificates created
- **DNS**: A/AAAA records ready to configure at DNS provider

### Products
- **43 products** across 5 categories (iPhone, Mac, iPad, Watch, AirPods)
- Real prices from 8 retailers (Apple, Amazon, Best Buy, Walmart, Target, B&H, Adorama, eBay)
- Direct product URLs (not search pages)

### Features Working
- ✅ Product catalog with filtering
- ✅ Category navigation
- ✅ Price comparison across retailers
- ✅ Price alerts (create/get/delete)
- ✅ Search functionality
- ✅ Price history (mock data)

### Project Structure
```
/Users/douglasrichman/.openclaw/workspace/
├── mactrackr-frontend/          # ACTIVE - React frontend
│   ├── fly.toml                 # Fly.io config
│   ├── Dockerfile.static        # Static site container
│   └── dist/                    # Build output
├── price-aggregator-github/
│   └── price-aggregator-api/    # ACTIVE - API backend
│       ├── app/routers/
│       │   └── mactrackr.py     # 43 products, all endpoints
│       ├── fly.toml
│       └── Dockerfile
├── _ARCHIVED/                   # Old projects moved here
│   ├── mactrackr-backend/
│   └── mactrackr-web/
└── PROJECT-STRUCTURE.md         # Documentation
```

## 🔄 Next Priorities

### 1. Domain DNS Configuration
**Action Required**: Add DNS records at your domain registrar
```
A     mactrackr.com     66.241.124.172
AAAA  mactrackr.com     2a09:8280:1::d6:9dcc:0
A     www               66.241.124.172
AAAA  www               2a09:8280:1::d6:9dcc:0
```

### 2. API Subdomain (Optional)
Set up api.mactrackr.com for cleaner API URLs:
```bash
cd price-aggregator-github/price-aggregator-api
fly certs add api.mactrackr.com --app mactrackr-api-backup
# Then add CNAME: api.mactrackr.com → mactrackr-api-backup.fly.dev
```

### 3. Missing Products to Add
- Apple Vision Pro
- Apple TV 4K
- HomePod / HomePod mini
- Studio Display
- Pro Display XDR
- Mac Pro
- Xserve (vintage)

### 4. Affiliate Integration
- Amazon Associates links
- B&H Photo affiliate
- Adorama affiliate
- ShareASale integration

### 5. Price Alert Automation
- Currently alerts stored in-memory (lost on restart)
- Need: SQLite persistence or Postgres
- n8n workflow for price checking
- Email notifications (ConvertKit/Postmark)

### 6. Data Accuracy
- Prices are static/sample data
- Need: Live price scraping via n8n
- Price history tracking
- Stock availability updates

## 🔧 Technical Notes

### API Endpoints (All Working)
```
GET  /api/health              # Health check
GET  /api/products            # List all (43 products)
GET  /api/products?category=  # Filter by category
GET  /api/products/{id}       # Single product
GET  /api/products/search?q=  # Search
GET  /api/categories          # List categories
GET  /api/prices/{id}         # Get prices
GET  /api/prices/{id}/history # Mock history
POST /api/alerts              # Create alert
GET  /api/alerts?email=       # List alerts
PUT  /api/alerts/{id}         # Update alert
DELETE /api/alerts/{id}       # Delete alert
GET  /api/retailers           # List retailers
```

### Adding New Apps to Monorepo
To plug in a new app (e.g., HealthIndex):
1. Create router in `app/routers/healthindex.py`
2. Add to `app/main.py`:
   ```python
   from app.routers import healthindex
   app.include_router(healthindex.router, prefix="/api/v1", tags=["healthindex"])
   ```
3. Deploy: `fly deploy --app mactrackr-api-backup`

### Frontend API URL
Current: `VITE_API_URL=https://mactrackr-api-backup.fly.dev`
Location: `mactrackr-frontend/.env.production`

## 🚨 Known Issues
1. **Alerts are in-memory** - lost on deploy/restart
2. **Prices are static** - not live scraped
3. **Price history is mock data** - not real historical data
4. **No user auth** - alerts not tied to accounts
5. **No caching** - API fetches full product list every time

## 📊 Stats
- Products: 43
- Categories: 5
- Retailers: 8
- Deployed: Fly.io (free tier)
- Database: SQLite on persistent volume
- Frontend: React + Vite
- Backend: FastAPI + Python 3.11

## 🎯 Session Strategy
1. **Short sessions** (2-4 tasks max)
2. **Verify each step** before moving on
3. **Update this file** with progress
4. **Test endpoints** after each deploy
