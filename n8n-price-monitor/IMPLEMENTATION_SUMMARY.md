# MacTrackr Price Tracking & Alerts - Implementation Package

## 📦 What's Included

### 1. Price Monitoring (n8n Workflow)
**File:** `n8n-workflow-v1.json`

- Monitors 25 Apple products every 4 hours
- Checks for 5%+ price drops
- Sends Telegram alerts to you
- **Status:** ✅ Ready to deploy

**To deploy:**
```bash
# Railway CLI
railway login
railway init
railway add --template n8n
railway variables set TELEGRAM_BOT_TOKEN=your_token
railway up

# Import workflow in n8n UI
# Activate
```

---

### 2. Affiliate Link Integration
**Files:**
- `server-v2.1.js` - Updated backend with affiliate tracking
- `AFFILIATE_LINKS.md` - Link format reference
- `AFFILIATE_SETUP.md` - Full setup guide

**Backend Changes:**
- API now returns `affiliateUrl` for each retailer
- Environment variable based configuration
- `/api/affiliate-status` endpoint for debugging

**Environment Variables:**
```bash
AMAZON_ASSOCIATES_TAG=mactrackr-20
APPLE_AFFILIATE_ID=your_phg_id
BESTBUY_AFFILIATE_ID=your_cj_id
BH_AFFILIATE_ID=your_bh_id
ADORAMA_AFFILIATE_ID=your_avantlink_id
EBAY_CAMPAIGN_ID=your_epn_id
```

**Status:** ✅ Backend updated, pushed to GitHub

---

### 3. Email Alerts for Users (PRD)
**File:** `EMAIL_ALERTS_PRD.md`

**Features:**
- Email signup for price drop alerts
- Target price setting (optional)
- Unsubscribe functionality
- Privacy-first (no tracking)

**Database Schema:** `database-schema.sql`

**Frontend Components:**
- `PriceAlertSignup.jsx` - Modal for product pages
- `PriceAlertsPage.jsx` - Standalone alerts page

**API Endpoints Needed:**
```
POST /api/alerts/subscribe
POST /api/alerts/unsubscribe
GET  /api/alerts/status/:email
DELETE /api/alerts/:id
POST /api/newsletter/subscribe
```

**Status:** 🟡 Components built, needs backend API + database

---

### 4. Email Service (Resend)
**Status:** 🟡 Need to sign up

```bash
# 1. Sign up at https://resend.com
# 2. Verify mactrackr.com domain (add DNS records)
# 3. Get API key
# 4. Add to n8n workflow + backend
```

---

## 🚀 Deployment Order

### Phase 1: Affiliate Links (Today)
1. ✅ Backend updated and pushed
2. ⏳ Add env vars to Railway when affiliate accounts approved
3. ⏳ Update frontend to use `affiliateUrl` field

### Phase 2: Price Monitoring (Today/Tomorrow)
1. ⏳ Sign up for Resend
2. ⏳ Deploy n8n workflow to Railway
3. ⏳ Test Telegram alerts

### Phase 3: Public Email Alerts (This Weekend)
1. ⏳ Create Railway Postgres database
2. ⏳ Run database migration
3. ⏳ Build backend API endpoints
4. ⏳ Deploy email signup components
5. ⏳ Update n8n workflow to send emails

---

## 💰 Revenue Potential

### Affiliate Commissions
| Retailer | Commission | Example |
|----------|------------|---------|
| Amazon | 1-3% | $1,000 MacBook = $30 |
| Apple | 2-3% | $1,000 iPhone = $25 |
| Best Buy | 1-2% | $500 iPad = $8 |
| B&H | 1-2% | $1,500 MacBook Pro = $20 |

### Estimate (1,000 daily visitors)
- 5% click affiliate links = 50 clicks/day
- 3% conversion = 1.5 sales/day
- $800 average order
- **$24-36/day = $700-1,100/month**

---

## 📁 File Structure

```
n8n-price-monitor/
├── n8n-workflow.json              # Original 10-product workflow
├── n8n-workflow-v1.json           # Updated 25-product + email
├── DEPLOY.md                       # Deployment instructions
├── README.md                       # Overview
├── AFFILIATE_LINKS.md             # Link format reference
├── AFFILIATE_SETUP.md             # Affiliate program setup
├── EMAIL_ALERTS_PRD.md            # Email alerts requirements
├── PriceAlertSignup.jsx           # Modal component
├── PriceAlertsPage.jsx            # Standalone page
├── database-schema.sql            # Postgres schema
├── server-v2.1.js                 # Backend with affiliate tracking
└── THIS_FILE.md                   # Implementation summary
```

---

## ⏰ Reminders Set

- **Tomorrow 7 PM:** Apply to more affiliate programs (Best Buy, B&H, Adorama, eBay, Apple)

---

## ❓ Questions?

1. **Want me to deploy n8n now?** (Need Resend API key first)
2. **Want me to build the backend API for email alerts?** (Need Postgres setup first)
3. **Want me to update the MacTrackr frontend?** (Need affiliate IDs first)

