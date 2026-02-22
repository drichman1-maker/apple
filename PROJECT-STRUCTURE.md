# MacTrackr Project Structure

## Active Projects (USE THESE)

### 1. MacTrackr Frontend
**Location:** `/mactrackr-frontend/`
**Type:** React + Vite
**Current Status:** Ready to deploy
**Build Output:** `dist/` folder exists
**Deploy Target:** Fly.io (static site)
**API Endpoint:** Should point to `https://mactrackr-api-backup.fly.dev`

**Commands:**
```bash
cd /mactrackr-frontend/
npm run build  # Creates dist/
# Deploy with fly deploy
```

### 2. MacTrackr API (Monorepo)
**Location:** `/price-aggregator-github/price-aggregator-api/`
**Type:** Python FastAPI
**Current Status:** Deployed at `https://mactrackr-api-backup.fly.dev`
**Features:** 40+ products, multi-category support
**Database:** SQLite (on Fly.io volume)

**Commands:**
```bash
cd /price-aggregator-github/price-aggregator-api/
fly deploy --app mactrackr-api-backup
```

## Deprecated (DO NOT USE)

### ❌ mactrackr-backend
**Location:** `/mactrackr-backend/`
**Status:** OLD Node.js app, BROKEN
**Action:** Archive/delete - replaced by Python API

### ❌ mactrackr-web
**Location:** `/mactrackr-web/`
**Status:** Static HTML prototype
**Action:** Archive - replaced by React frontend

## Deployment Map

| Component | Fly.io App | URL | Status |
|-----------|-----------|-----|--------|
| Frontend | `mactrackr-web` | https://mactrackr-web.fly.dev | ✅ Active |
| API | `mactrackr-api-backup` | https://mactrackr-api-backup.fly.dev | ✅ Active |
| Old Backend | `mactrackr-backend` | - | ✅ Deleted |

## Current Status
✅ **Frontend**: Deployed and serving from `mactrackr-web.fly.dev`
✅ **API**: Deployed with 40+ products, SQLite database on persistent volume
✅ **Old Backend**: Destroyed

## Architecture
```
User → https://mactrackr-web.fly.dev (React Frontend)
  ↓
API calls → https://mactrackr-api-backup.fly.dev (FastAPI)
  ↓
SQLite DB on /data (persistent volume)
```
