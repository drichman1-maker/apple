# n8n Price Monitoring Workflow

## Overview
Automated price tracking for MacTrackr, Health Index, and other aggregator sites.

## Workflow Structure

### 1. Price Check Node (HTTP Request)
- Endpoint: MacTrackr backend API
- Frequency: Every 6 hours
- Data: Current prices for tracked products

### 2. Price Comparison (Function Node)
- Compare current vs stored prices
- Calculate price change %
- Determine if alert threshold met

### 3. Alert Conditions (IF Node)
- Price drop > 10%: Send notification
- Price drop > 20%: Send urgent notification
- Product back in stock: Send notification

### 4. Notification Nodes
- **Telegram**: Send to user via Signal/Telegram bot
- **Email**: Send via SendGrid/ConvertKit
- **Storage**: Update database with new prices

## Environment Variables Needed
```
MACTRACKR_API_URL=https://mactrackr-backend-new.onrender.com/api
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_CHAT_ID=xxx
SENDGRID_API_KEY=xxx
FROM_EMAIL=alerts@mactrackr.com
```

## MacTrackr Specific
- Monitor: iPhone 16, MacBook Air M4, iPad Pro M5, Apple Watch Series 11
- Retailers: Amazon, Best Buy, Adorama, eBay
- Alert thresholds: 5% price drop = notify, 15% = urgent

## Health Index Specific
- Monitor: High-ticket items (cryotherapy, hyperbaric chambers)
- Alert on: Any price drop > 5%
- Note: Long sales cycles, less frequent monitoring (daily)

## Future Expansion
- Add RumbleDeals video game price tracking
- Add CoinCurator crypto price alerts
- Add SluggerData baseball card value tracking
