# Deployment Guidelines — Aggregator Backends

## Overview

All backends are built and ready. These guides get them deployed and connected to your live frontends.

**Hosting Strategy:**
- **Backend:** Northflank (Docker) or Render (easier)
- **Frontend:** Vercel (already deployed)
- **Database:** Render PostgreSQL or Supabase
- **Redis:** Upstash or Redis Cloud (for rate limiting)

---

## 1. Rumble (Video Game Deals) — FastAPI

**Status:** Backend ready, web + iOS built, not deployed
**Stack:** Python 3.9+, FastAPI, eBay API
**Repo:** `drichman1-maker/video-game-agg`

### Step 1: Prepare for Deployment

```bash
# Clone/update repo
cd ~/Projects
git clone https://github.com/drichman1-maker/video-game-agg.git
cd video-game-agg

# Check structure
ls -la
# Should see: backend/, RetroRefine/, Dockerfile, requirements.txt
```

### Step 2: Environment Variables

Create `.env.production`:
```env
# eBay API (get from developer.ebay.com)
EBAY_APP_ID=your_app_id
EBAY_CERT_ID=your_cert_id
EBAY_DEV_ID=your_dev_id
EBAY_RU_NAME=your_ru_name

# Optional: For higher rate limits
EBAY_AUTH_TOKEN=your_oauth_token

# Backend config
PORT=8000
HOST=0.0.0.0
DEBUG=false

# CORS - add your Vercel domains
ALLOWED_ORIGINS=https://rumbledeals.com,https://www.rumbledeals.com
```

### Step 3: Deploy to Render (Easiest)

1. Go to [render.com](https://render.com) → New → Web Service
2. Connect GitHub repo `drichman1-maker/video-game-agg`
3. Configure:
   - **Name:** rumble-api
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan:** Free (or Starter $7/mo for always-on)
4. Add Environment Variables (from `.env.production`)
5. Click Create Web Service
6. Wait for deploy (~5 min)
7. Copy URL: `https://rumble-api.onrender.com`

### Step 4: Test Backend

```bash
curl https://rumble-api.onrender.com/health
# Should return: {"status": "healthy"}

curl "https://rumble-api.onrender.com/search?q=zelda"
# Should return game listings
```

### Step 5: Connect Frontend

Update frontend API base URL:
```javascript
// In RetroRefine web app
const API_BASE = 'https://rumble-api.onrender.com';
```

Deploy frontend to Vercel:
```bash
cd RetroRefine
vercel --prod
```

### Step 6: Custom Domain

1. Add domain `rumbledeals.com` to Vercel project
2. Set up CNAME in Cloudflare:
   - `rumbledeals.com` → `cname.vercel-dns.com` (DNS only)
3. Update Render CORS:
   - Add `https://rumbledeals.com` to `ALLOWED_ORIGINS`

---

## 2. CoinCurator — Node.js + Express + Next.js

**Status:** Backend + frontend ready, not deployed
**Stack:** Node.js 18+, Express, Next.js 14, SQLite (upgrade to PostgreSQL)
**Repo:** `drichman1-maker/coin-agg`

### Step 1: Database Upgrade (SQLite → PostgreSQL)

SQLite won't work on Render/Northflank (ephemeral storage). Upgrade:

```bash
cd ~/Projects/coin-agg

# Install PostgreSQL client
npm install pg

# Update backend/database.js (or similar)
# Change from sqlite3 to pg
```

Create `backend/config/database.js`:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Render
  }
});

module.exports = pool;
```

### Step 2: Prepare for Deployment

```bash
# Install dependencies
npm run install:all

# Build frontend
cd frontend
npm run build

# Check for build errors
```

### Step 3: Deploy Backend to Render

1. [render.com](https://render.com) → New → Web Service
2. Connect `drichman1-maker/coin-agg`
3. Configure:
   - **Name:** coincurator-api
   - **Runtime:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Plan:** Free or Starter
4. Add Environment Variables:
   ```env
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=postgres://... (from Render PostgreSQL)
   ```

### Step 4: Create PostgreSQL Database

1. Render Dashboard → New → PostgreSQL
2. Name: `coincurator-db`
3. Plan: Free (or Starter $7/mo)
4. Copy Internal Database URL
5. Add to environment variables as `DATABASE_URL`

### Step 5: Deploy Frontend to Vercel

```bash
cd frontend
vercel --prod
```

Or connect GitHub repo to Vercel:
1. [vercel.com](https://vercel.com) → New Project
2. Import `drichman1-maker/coin-agg`
3. Root Directory: `frontend`
4. Framework: Next.js
5. Build Command: `npm run build`
6. Output: `dist` (or `.next`)

### Step 6: Connect Frontend to Backend

Update frontend API config:
```javascript
// frontend/lib/api.js or similar
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://coincurator-api.onrender.com'
  : 'http://localhost:3001';
```

### Step 7: Custom Domain

1. Add `coincurator.app` to Vercel
2. Cloudflare CNAME → `cname.vercel-dns.com`
3. Update backend CORS

---

## 3. MacTrackr — Turborepo + FastAPI + Redis

**Status:** Backend complete, needs Redis + deployment
**Stack:** Turborepo, FastAPI, PostgreSQL, Redis
**Repo:** `drichman1-maker/apple`

### Step 1: Infrastructure Setup

**Redis (Required for rate limiting):**
1. [upstash.com](https://upstash.com) → New Database
2. Name: `mactrackr-redis`
3. Region: Same as your backend (US East)
4. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

**PostgreSQL:**
1. Render → New → PostgreSQL
2. Name: `mactrackr-db`
3. Plan: Starter ($7/mo) or Standard

### Step 2: Update Backend Configuration

Update `apps/backend/main.py` line 15:
```python
from slowapi.util import get_remote_address
from slowapi import Limiter

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["100/minute"],
    storage_uri=os.getenv("REDIS_URL")  # Use Redis
)
```

Update `requirements.txt`:
```
redis==5.0.1
hiredis==2.2.3
```

### Step 3: Deploy Backend to Northflank (Recommended for Docker)

1. [northflank.com](https://northflank.com) → Create Project
2. Name: `mactrackr`
3. Add Service → Docker
4. Connect GitHub: `drichman1-maker/apple`
5. Dockerfile Path: `apps/backend/Dockerfile`
6. Build Context: `apps/backend`
7. Port: `8000`
8. Environment Variables:
   ```env
   DATABASE_URL=postgres://...
   REDIS_URL=rediss://...
   SENDGRID_API_KEY=...
   AWS_ACCESS_KEY_ID=...
   AWS_SECRET_ACCESS_KEY=...
   ```

### Step 4: Deploy Frontend to Vercel

```bash
cd apps/web
vercel --prod
```

Or Vercel Dashboard:
1. Import `drichman1-maker/apple`
2. Root Directory: `apps/web`
3. Build Command: `cd ../.. && npx turbo run build --filter=web`

### Step 5: Connect Custom Domain

1. Add `mactrackr.com` to Vercel
2. Cloudflare DNS → `cname.vercel-dns.com`

---

## 4. MintCondition — Flask + eBay API

**Status:** Flask backend + React + iOS ready, not deployed
**Stack:** Python 3.8+, Flask, eBay API, React
**Repo:** `drichman1-maker/pokemon-agg`

### Step 1: Prepare Backend

```bash
cd ~/Projects/pokemon-agg/backend

# Update Flask for production
pip install gunicorn
```

Create `Procfile`:
```
web: gunicorn app:app --bind 0.0.0.0:$PORT
```

Create `runtime.txt`:
```
python-3.9.18
```

### Step 2: Environment Variables

Create `.env.production`:
```env
FLASK_ENV=production
PORT=5000
EBAY_APP_ID=your_app_id
EBAY_DEV_ID=your_dev_id
EBAY_CERT_ID=your_cert_id
POKEMONTCG_API_KEY=your_key
```

### Step 3: Deploy to Render

1. Render → New → Web Service
2. Connect `drichman1-maker/pokemon-agg`
3. Configure:
   - **Name:** mintcondition-api
   - **Runtime:** Python 3
   - **Build Command:** `cd backend && pip install -r requirements.txt`
   - **Start Command:** `cd backend && gunicorn app:app --bind 0.0.0.0:$PORT`
4. Add environment variables

### Step 4: Deploy Frontend

```bash
cd web-frontend
npm install
npm run build

# Deploy to Vercel
vercel --prod
```

### Step 5: Update iOS App

Update `NetworkManager.swift`:
```swift
private let baseURL = "https://mintcondition-api.onrender.com"
```

Rebuild iOS app for TestFlight.

---

## Quick Reference: Environment Variables

### All Projects Need:
```env
# API Keys (per project)
EBAY_APP_ID=...
EBAY_CERT_ID=...
EBAY_DEV_ID=...

# Database (if using PostgreSQL)
DATABASE_URL=postgres://user:pass@host:5432/dbname

# Redis (for rate limiting)
REDIS_URL=redis://... or rediss://...

# Email (optional)
SENDGRID_API_KEY=...

# Storage (optional)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET=...
```

---

## Deployment Checklist

### For Each Project:
- [ ] Environment variables configured
- [ ] Database created (if needed)
- [ ] Redis configured (if needed)
- [ ] Backend deployed and `/health` endpoint responds
- [ ] Frontend deployed and connects to backend
- [ ] CORS configured for production domain
- [ ] Custom domain connected
- [ ] SSL certificate active
- [ ] Rate limiting tested
- [ ] Error monitoring (Sentry?) configured

### Post-Deploy:
- [ ] Test search endpoints
- [ ] Verify affiliate links work
- [ ] Check mobile responsiveness
- [ ] Test iOS apps (if applicable)
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Configure cron jobs (M4 for scraping)

---

## Cost Estimate

| Service | Cost/Month |
|---------|-----------|
| Render Web Service (Starter) | $7 x 5 = $35 |
| Render PostgreSQL (Starter) | $7 x 3 = $21 |
| Upstash Redis (Free tier) | $0 |
| Vercel Pro (if needed) | $20 |
| **Total** | **~$76/month** |

Free tier alternatives:
- Render Free: Spins down after 15 min inactivity
- Railway: $5/month credit, then pay-as-you-go
- Fly.io: Generous free tier

---

## Troubleshooting

### "CORS error" in browser
Add frontend domain to backend CORS config:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### "Database connection refused"
- Check `DATABASE_URL` format
- Ensure SSL mode is correct for Render
- Whitelist Render IP in PostgreSQL

### "Redis connection error"
- Verify `REDIS_URL` includes password
- Check if Redis requires `rediss://` (SSL)
- Test connection locally: `redis-cli -u $REDIS_URL ping`

### "Build failed"
- Check `requirements.txt` or `package.json` exists
- Verify Python/Node version matches runtime
- Check build logs in Render/Northflank

---

## Next Steps After Deploy

1. **Set up cron jobs** on M4 for price scraping
2. **Connect affiliate programs** (add tracking IDs)
3. **Add analytics** (Plausible or Google Analytics)
4. **Set up alerts** (price drops, new listings)
5. **SEO optimization** (meta tags, sitemaps)
6. **Content publishing** (start the 75-page SEO plan)
