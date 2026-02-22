# MacTrackr Price Monitor v1.0

## Overview
Automated price monitoring for 25 Apple products with Telegram + Email alerts.

## Status
- [x] Workflow built (v1.0 with 25 products)
- [ ] n8n deployed (Railway or local)
- [ ] Resend email configured
- [ ] Telegram bot connected
- [ ] Test run completed
- [ ] Workflow activated

## Files
- `n8n-workflow.json` - Original 10-product workflow
- `n8n-workflow-v1.json` - Expanded 25-product workflow with email
- `DEPLOY.md` - Full deployment instructions

## Quick Start
See [DEPLOY.md](DEPLOY.md) for detailed setup.

### 1. Email Setup
- Create Resend account: https://resend.com
- Verify `mactrackr.com` domain
- Get API key

### 2. Deploy n8n
```bash
# Railway (recommended - always on)
railway login
railway init
railway add --template n8n
railway up

# Or local
npx n8n
```

### 3. Configure
- Import `n8n-workflow-v1.json`
- Add Telegram credential
- Add Resend credential
- Activate workflow

## Alert Channels
- **Telegram:** Instant DM to you
- **Email:** `alerts@mactrackr.com` → `doug@codemodeapps.com`

## Monitored Products (25)
- 8 iPhones (16 series + 15)
- 5 MacBooks (Air + Pro)
- 6 iPads (Pro + Air)
- 6 Accessories (AirPods, Watch)

## Check Frequency
Every 4 hours (6 times/day)

## Alert Threshold
5% price drop triggers alert

## Cost
$0/month (all free tiers)

## Next Phase
Build public price alerts for users with email signup on mactrackr.com.
