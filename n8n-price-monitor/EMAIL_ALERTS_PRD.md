# MacTrackr Price Alerts - Product Requirements Document

## Overview
Enable users to sign up for price drop alerts via email. When a product's price drops by 5% or more, send an email notification to subscribed users.

## Components

### 1. Database Schema (Railway Postgres)

```sql
-- Price alerts table
CREATE TABLE price_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  product_id VARCHAR(100) NOT NULL,
  target_price DECIMAL(10,2) NULL, -- NULL = any price drop
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  last_notified_at TIMESTAMP NULL,
  UNIQUE(email, product_id)
);

-- Email subscribers table (for marketing/announcements)
CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP NULL,
  is_active BOOLEAN DEFAULT true
);

-- Price history table (for tracking drops)
CREATE TABLE price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id VARCHAR(100) NOT NULL,
  retailer VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  recorded_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Backend API Endpoints

```javascript
// POST /api/alerts/subscribe
// Subscribe to price alerts
{
  "email": "user@example.com",
  "productId": "iphone-16-128-unlocked",
  "targetPrice": 699 // optional
}

// POST /api/alerts/unsubscribe
// Unsubscribe from alerts
{
  "email": "user@example.com",
  "token": "unsubscribe_token"
}

// GET /api/alerts/status/:email
// Get user's active alerts

// POST /api/newsletter/subscribe
// Subscribe to newsletter
{
  "email": "user@example.com"
}
```

### 3. Email Signup Page (React Component)

**Location:** `/alerts` or `/price-alerts`

**Features:**
- Email input field
- Product selection (dropdown or search)
- Target price input (optional)
- Privacy notice ("We don't share your email")
- CAPTCHA (optional, for spam protection)
- Success/error states

### 4. n8n Workflow Updates

Current: 25 products monitored → Telegram only

New: 
- Check price drops
- Query database for subscribers of affected products
- Send batch emails via Resend
- Update `last_notified_at` to prevent spam

### 5. Email Templates

**Price Drop Alert:**
```
Subject: 🚨 Price Drop: iPhone 16 128GB - $799 → $699

Hi [Name],

Good news! The price dropped on a product you're watching:

iPhone 16 128GB
$799 → $699 (12% off)

Buy now: [Affiliate Link]
View all prices: https://mactrackr.com/product/iphone-16-128-unlocked

You're receiving this because you signed up for price alerts on MacTrackr.
Unsubscribe: [Unsubscribe Link]
```

## Implementation Steps

### Phase 1: Database & API (1-2 hours)
1. Create Railway Postgres instance
2. Run schema migrations
3. Add API endpoints to backend
4. Test with curl/Postman

### Phase 2: Frontend (2-3 hours)
1. Build email signup component
2. Add to product detail pages
3. Style to match MacTrackr dark theme
4. Add form validation

### Phase 3: n8n Integration (1 hour)
1. Update n8n workflow to query database
2. Add email sending node (Resend)
3. Test with sample data
4. Activate workflow

### Phase 4: Testing & Launch (1 hour)
1. End-to-end test
2. Verify unsubscribe works
3. Check email deliverability
4. Monitor for spam flags

## Cost Estimate

| Service | Cost |
|---------|------|
| Railway Postgres | $0 (free tier: 500MB) |
| Resend Email | $0 (3,000 emails/day free) |
| n8n on Railway | $0 (free tier) |
| **Total** | **$0/month** |

## Files Created
- `EMAIL_ALERTS_PRD.md` - This document
- `email-signup.jsx` - React component (next)
- Database migration script (next)

## Notes
- Use double opt-in for email verification
- Rate limit: Max 1 alert per product per day per user
- Include unsubscribe link in every email (required by law)
- Honor GDPR/CCPA delete requests
