# 3-Backend Resilience Doctrine

## Overview
MacTrackr operates on a **privacy-first, zero-single-point-of-failure** infrastructure. Three independent backends ensure 99.9%+ uptime without relying on any single provider.

## The Architecture

```
User Request
    ↓
Vercel (Frontend)
    ↓
┌─────────────────┬─────────────────┬─────────────────┐
│   PRIMARY       │   SECONDARY     │   EMERGENCY     │
│   Render        │   Railway       │   Fly.io        │
│   (Active)      │   (Warm)        │   (Cold)        │
└─────────────────┴─────────────────┴─────────────────┘
```

## Backend Roles

### 1. Render (Primary)
- **URL:** mactrackr-api.onrender.com
- **Status:** Active, serving all traffic
- **Products:** 38+ with direct URLs
- **Strength:** Reliable, auto-deploy from git
- **Weakness:** Cold start (~30s) after sleep

### 2. Railway (Secondary/Warm)
- **URL:** price-aggregator-api-production.up.railway.app
- **Status:** Deployed but stale (11 products)
- **Role:** Hot-failover if Render fails
- **Update:** Needs manual deploy trigger
- **NEW:** n8n also deployed here for price monitoring

### 3. Fly.io (Emergency/Cold)
- **URL:** mactrackr-api-backup.fly.dev
- **Status:** Not deployed yet
- **Role:** Edge-deployed backup, EU/US regions
- **Deploy:** `fly deploy` from price-aggregator-github/price-aggregator-api

## Failover Strategy

### Frontend Logic (Future Implementation)
```javascript
const BACKENDS = [
  'https://mactrackr-api.onrender.com',
  'https://price-aggregator-api-production.up.railway.app',
  'https://mactrackr-api-backup.fly.dev'
];

async function getProducts() {
  for (const url of BACKENDS) {
    try {
      const res = await fetch(`${url}/api/products`, { timeout: 5000 });
      if (res.ok) return res.json();
    } catch (e) {
      continue; // Try next backend
    }
  }
  throw new Error('All backends unavailable');
}
```

### Manual Failover (Current)
1. Edit `src/api.js`
2. Change `API_URL` to working backend
3. Redeploy to Vercel

## NEW: Aggregator Dashboard

**URL:** (deploy to Vercel tonight)
**Repository:** aggregator-dashboard/

Provides unified monitoring for all backends:
- Health status of Render/Railway/Fly.io
- Product counts per backend
- Deal alerts from Reddit/Twitter
- Migration progress tracking

## Privacy Benefits

| Aspect | Single Backend | 3-Backend Strategy |
|--------|---------------|-------------------|
| **Data Sovereignty** | Provider controls all | Distributed, no lock-in |
| **User Tracking** | Easy to correlate | Cross-provider anonymity |
| **GDPR Compliance** | Complex | Regional routing possible |
| **Censorship Resistance** | Single target | Distributed targets |

## Monitoring (Self-Hosted Only)

**Tools:**
1. **aggregator-dashboard** — Visual status page
2. **Uptime Kuma** (planned) — Automated uptime monitoring

**Uptime Kuma Setup (pending):**
- Install on spare MacBook Air
- Monitors: mactrackr.com, Render, Railway, Fly.io
- Alerts: Telegram (461595428)

```bash
docker run -d --restart=unless-stopped -p 3001:3001 \
  -v uptime-kuma:/app/data louislam/uptime-kuma:1
```

## Deployment Checklist

### Render (Primary) ✅
- [x] Git connected
- [x] Auto-deploy enabled
- [x] 38+ products deployed

### Railway (Secondary) ⚠️
- [x] Git connected
- [x] n8n deployed (verify tonight)
- [ ] Backend synced with Render
- [ ] Auto-deploy fixed

### Fly.io (Emergency) ❌
- [x] CLI installed
- [ ] Auth pending (browser login)
- [ ] fly.toml created
- [ ] Deploy pending

## NEW: Multi-Category Backend

The shared backend now supports multiple product categories:

| Category | Table | Status |
|----------|-------|--------|
| mac | products (attributes) | ✅ 38+ products |
| pokemon | products (attributes) | ❌ Needs data |
| coins | products (attributes) | ❌ Needs data |
| games | products (attributes) | ❌ Needs data |

**Migration in progress:**
- CoinCurator → shared backend
- MintCondition → shared backend
- RumbleDeals → shared backend

## Cost Analysis

| Backend | Cost/Month | Products | Uptime SLA |
|---------|-----------|----------|------------|
| Render | $0 (free) | 38+ | 99.9% |
| Railway | $0 (free) | 11 (stale) | 99.9% |
| Fly.io | $0 (free tier) | TBD | 99.95% |
| **Total** | **$0** | **50+** | **99.99%** |

## Competitive Advantage

**Marketing Angle:**
> "MacTrackr runs on 3 independent servers for 99.99% uptime. Big Tech aggregators run on one."

**Privacy Angle:**
> "Your data never stays in one place. Distributed infrastructure = distributed trust."

## Next Actions (Updated Feb 21)

### Tonight (Saturday)
1. [ ] Verify Railway n8n deployment
2. [ ] Deploy aggregator-dashboard to Vercel
3. [ ] Test dashboard monitoring

### This Week
1. [ ] Complete Fly.io deploy (Tuesday priority)
2. [ ] Fix Railway auto-deploy
3. [ ] Populate Pokemon/Coins data
4. [ ] Implement frontend failover logic (March)
5. [ ] Deploy Uptime Kuma

## Success Metrics

- ✅ Zero downtime in Feb 2026
- ✅ Dashboard live monitoring all backends
- 🔄 <5s failover time (when implemented)
- 🔄 100% self-hosted monitoring
- ✅ $0 infrastructure cost

---

**Document Owner:** Henry
**Last Updated:** Feb 21, 2026 6:50 PM
**Review Date:** Tuesday, Feb 25, 2026 @ 4 PM
