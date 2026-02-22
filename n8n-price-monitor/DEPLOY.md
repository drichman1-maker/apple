# MacTrackr Price Monitor - Deployment Guide

## Overview
- **Products monitored:** 25 (expanded from 10)
- **Check frequency:** Every 4 hours
- **Alerts:** Telegram + Email (Resend)
- **Hosting:** Railway (free tier) or local

## Step 1: Email Provider Setup (Resend)

### 1. Create Resend Account
1. Go to https://resend.com
2. Sign up (free tier: 3,000 emails/day)
3. Verify domain: `mactrackr.com`
   - Add DNS records in Cloudflare:
     - Type: TXT, Name: `_dmarc`, Value: `v=DMARC1; p=quarantine;`
     - Type: TXT, Name: `resend._domainkey`, Value: [from Resend]
     - Type: TXT, Name: `bounces`, Value: [from Resend]
4. Get API key from Resend dashboard

### 2. Verify Sender Email
- Add `alerts@mactrackr.com` as sender in Resend
- Verify via email

## Step 2: Deploy n8n

### Option A: Railway (Recommended - Always On)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create project
railway init

# Add n8n template
railway add --template n8n

# Set environment variables
railway variables set N8N_BASIC_AUTH_ACTIVE=true
railway variables set N8N_BASIC_AUTH_USER=admin
railway variables set N8N_BASIC_AUTH_PASSWORD=[strong-password]
railway variables set RESEND_API_KEY=[your-resend-api-key]
railway variables set TELEGRAM_BOT_TOKEN=[your-bot-token]

# Deploy
railway up
```

### Option B: Local (Free, Mac must stay on)
```bash
# Install n8n globally
npm install n8n -g

# Start n8n
n8n start

# Open http://localhost:5678
```

## Step 3: Configure Workflow

### Import Workflow
1. Open n8n UI (Railway URL or localhost:5678)
2. Click "Add Workflow"
3. Import from file: `n8n-workflow-v1.json`
4. Configure credentials:

#### Telegram Credential
- **Credential Type:** Telegram Bot
- **Bot Token:** From BotFather (`7651492044:AAFB9CSh3CumwbV4nwPTcYPqVVWVOJFIjmc`)
- **Chat ID:** `461595428`

#### Resend Credential
- **Credential Type:** Resend API
- **API Key:** From Resend dashboard

### Update Backend URL (if needed)
Current: `https://price-aggregator-api-production.up.railway.app/api/products`
Change if backend moves to Render primary.

## Step 4: Test & Activate

### Test Run
1. Click "Execute Workflow"
2. Check execution results
3. Verify Telegram message received
4. Check email delivered

### Activate
1. Toggle workflow to "Active"
2. Monitor first few runs

## Email Alert Preview
```
Subject: 🚨 MacTrackr: 2 Price Drops Detected

Hi Doug,

We detected 2 price drops on MacTrackr:

• iPhone 16 Pro 256GB: $1199 → $1099 (Save $100)
• MacBook Air 13" M4: $1299 → $1199 (Save $100)

Total savings opportunity: $200

View all deals: https://mactrackr.com

—
MacTrackr Price Alerts
Unsubscribe: https://mactrackr.com/unsubscribe
```

## Products Monitored (25 Total)

### iPhones (8)
- iPhone 16 128GB/256GB
- iPhone 16 Pro 128GB/256GB
- iPhone 16 Pro Max 256GB/512GB
- iPhone 15 128GB/Pro 128GB

### MacBooks (5)
- MacBook Air 13" M4 (16GB/24GB)
- MacBook Air 15" M4 (16GB/24GB)
- MacBook Pro 14" M4 Pro 24GB
- MacBook Pro 16" M4 Pro 36GB
- MacBook Pro 14" M4 Max

### iPads (6)
- iPad Pro 11" M4 (256GB/512GB)
- iPad Pro 13" M4 256GB
- iPad Air 11" M3 (128GB/256GB)
- iPad Air 13" M3 256GB

### Accessories (6)
- AirPods Pro 2
- AirPods 4
- AirPods Max
- Apple Watch Series 10 46mm
- Apple Watch Ultra 2

## Next Steps

### Public Price Alerts (User-facing)
- Build email signup on mactrackr.com
- Store user emails in Railway Postgres
- Add "Watch This Product" button
- Send batch alerts (daily digest vs instant)
- Unsubscribe link management

### Future Enhancements
- Historical price charts
- Deal velocity tracking
- Refurbished price alerts
- Category-wide sales (e.g., "All MacBooks 10% off")

## Monitoring

### Railway Dashboard
- Monitor n8n executions
- Check for failed runs
- View logs

### Alert Fatigue Prevention
- Current threshold: 5% price drop
- Consider: Only alert on historical lows
- Daily digest option for frequent drops

## Troubleshooting

### No alerts receiving?
1. Check n8n execution logs
2. Verify backend API is responding
3. Test Telegram bot manually
4. Check Resend email logs

### False positives?
- Adjust threshold in Code node (currently 0.95 = 5% drop)
- Add minimum dollar amount filter ($50+ savings only)

## Costs

| Service | Cost |
|---------|------|
| Railway n8n | $0 (free tier) |
| Railway Postgres | $0 (free tier) |
| Resend Email | $0 (3K/day free) |
| Telegram Bot | $0 |
| **Total** | **$0/month** |
