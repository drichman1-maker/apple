# SCHEDULES.md - Future Reminders & Tasks

## This Week (Feb 24-28, 2026)

### Monday, Feb 24
- [ ] Verify Railway n8n deployment complete
- [ ] Test Telegram + Email alerts
- [ ] Create Railway Postgres database
- [ ] Deploy aggregator-dashboard to Vercel
- [ ] Run database schema

### Tuesday, Feb 25
- **4:00 PM** — Henry report: Multi-backend status check (Render/Railway/Fly.io)
- [ ] Build backend email API (subscribe/unsubscribe/status)
- [ ] Test API endpoints
- [ ] Start Fly.io backup deployment

### Wednesday, Feb 26
- [ ] Connect frontend to email API
- [ ] Add "Set Price Alert" button to product pages
- [ ] Test end-to-end alert flow
- [ ] Continue Fly.io deployment

### Thursday, Feb 27
- [ ] Apply to affiliate programs (Best Buy, B&H, Adorama, eBay)
- [ ] Add affiliate IDs to Railway env vars
- [ ] Verify affiliate links working

### Friday, Feb 28
- [ ] Write 2 blog posts
- [ ] Plan Reddit strategy
- [ ] Review metrics, celebrate wins

---

## Pending Tasks (No Fixed Date)

### Infrastructure
- [ ] Complete Fly.io backup deployment
  - Run: `fly auth login` in browser
  - Deploy: `fly deploy` from price-aggregator-github/price-aggregator-api
  - Verify: `curl https://mactrackr-api-backup.fly.dev/api/products`
  
- [ ] Uptime Kuma self-hosted monitoring
  - Install on spare MacBook Air
  - Monitor: mactrackr.com, Render, Railway, Fly.io
  - Alerts: Telegram bot
  - Install cmd: `docker run -d --restart=unless-stopped -p 3001:3001 -v uptime-kuma:/app/data louislam/uptime-kuma:1`

- [ ] Client-side price alerts (zero-knowledge)
  - Service Worker for browser notifications
  - No email storage required
  - 100% privacy-preserving

### Aggregator Migrations (NEW PRIORITY)
- [ ] **MintCondition** - Update API endpoint, add Pokemon data
- [ ] **CoinCurator** - Test integration, add coin data
- [ ] **RumbleDeals** - Build frontend, connect to backend
- [ ] **Dashboard** - Deploy to Vercel, set up cron monitoring

### Content
- [ ] Blog facelift hero images
- [ ] 2 articles for Monday/Thursday publishing
- [ ] SEO optimization pass

### Affiliate
- [ ] Amazon Associates application
- [ ] B&H Photo affiliate application
- [ ] Adorama affiliate application
- [ ] eBay Partner Network application
- [ ] Best Buy affiliate application

---

## Recurring Reminders

### Daily
- Morning: Check backend health (use dashboard)
- Evening: Review price drop alerts (manual)

### Weekly
- **Sunday 3 PM:** n8n price monitoring review
- **Sunday 4 PM:** Refurbished product updates
- **Tuesday 4 PM:** Multi-backend status report

### NEW: Monitoring Schedule
- **Every 30 min:** Reddit/Twitter deal monitoring (automated)
- **Every 4 hours:** n8n price checks
- **Daily:** Dashboard health check

## Long-Term (March 2026)

- [ ] Health Index full deployment
- [ ] MintCondition launch (with shared backend)
- [ ] CoinCurator launch (with shared backend)
- [ ] RumbleDeals launch
- [ ] Investor dashboard planning
- [ ] First $100 affiliate revenue

---

## Recently Completed

### Saturday, Feb 21
- ✅ Built aggregator-dashboard with monitoring
- ✅ Updated CoinCurator API integration
- ✅ Created migration guide
- ✅ Fixed CoinCurator transform functions
