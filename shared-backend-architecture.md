# Shared Backend Architecture

## Overview

One FastAPI backend serving multiple apps. Saves cost, simplifies ops.

```
┌─────────────────────────────────────────────────────────┐
│                    Cloudflare (CDN/DNS)                 │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
┌───────────────┐           ┌───────────────┐
│  Web Apps     │           │  iOS Apps     │
│  (Cloudflare  │           │  (App Store)  │
│   Pages)      │           │               │
└───────┬───────┘           └───────┬───────┘
        │                           │
        └─────────────┬─────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │   API Gateway           │
        │   api.yourdomain.com    │
        │   (Render)              │
        └─────────────┬───────────┘
                      │
        ┌─────────────┴─────────────┐
        │      FastAPI Backend      │
        │                           │
        │  /api/v1/lowkeymode/...   │
        │  /api/v1/healthindex/...  │
        │  /api/v1/[future-app]/... │
        └─────────────┬─────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
┌───────────┐  ┌───────────┐  ┌───────────┐
│  Postgres │  │ Cloudflare│  │   APNs    │
│  (Render) │  │    R2     │  │  (Apple)  │
│           │  │  (files)  │  │  (push)   │
└───────────┘  └───────────┘  └───────────┘
```

---

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app entry
│   ├── config.py            # Environment settings
│   ├── database.py          # Postgres connection
│   │
│   ├── routers/
│   │   ├── lowkeymode.py    # /api/v1/lowkeymode/*
│   │   ├── healthindex.py   # /api/v1/healthindex/*
│   │   └── shared.py        # /api/v1/shared/* (auth, etc.)
│   │
│   ├── models/
│   │   ├── user.py          # Shared user model
│   │   ├── lowkeymode.py    # App-specific models
│   │   └── healthindex.py   # Products, orders, etc.
│   │
│   ├── services/
│   │   ├── push.py          # APNs integration
│   │   ├── email.py         # Postmark/SES
│   │   └── storage.py       # R2 uploads
│   │
│   └── utils/
│       ├── auth.py          # JWT / Apple Sign-In
│       └── privacy.py       # Data handling helpers
│
├── Dockerfile
├── requirements.txt
├── docker-compose.yml       # Local dev
└── render.yaml              # Render deployment config
```

---

## API Routes

### Shared (all apps)
```
POST   /api/v1/auth/apple          # Apple Sign-In
POST   /api/v1/auth/refresh        # Refresh token
DELETE /api/v1/auth/account        # Delete account (privacy)
```

### LowkeyMode
```
GET    /api/v1/lowkeymode/profile          # User profile
POST   /api/v1/lowkeymode/quiet-score      # Submit score
GET    /api/v1/lowkeymode/leaderboard      # Anonymous leaderboard
POST   /api/v1/lowkeymode/streak           # Log meditation
GET    /api/v1/lowkeymode/streak           # Get streak count
POST   /api/v1/lowkeymode/referral/redeem  # Redeem code
```

### HealthIndex
```
GET    /api/v1/healthindex/products        # List products
GET    /api/v1/healthindex/products/:id    # Product detail
GET    /api/v1/healthindex/categories      # Categories
POST   /api/v1/healthindex/cart            # Add to cart
GET    /api/v1/healthindex/cart            # View cart
POST   /api/v1/healthindex/checkout        # Create order
GET    /api/v1/healthindex/orders          # Order history
```

---

## Database Schema (Postgres)

### Shared Tables
```sql
-- Users (shared across apps)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    apple_id VARCHAR UNIQUE,          -- Apple Sign-In
    pseudonym VARCHAR,                 -- Display name
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP              -- Soft delete for privacy
);

-- App-specific user data
CREATE TABLE user_apps (
    user_id UUID REFERENCES users(id),
    app VARCHAR NOT NULL,              -- 'lowkeymode', 'healthindex'
    preferences JSONB,
    PRIMARY KEY (user_id, app)
);
```

### LowkeyMode Tables
```sql
CREATE TABLE quiet_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    db_level INTEGER,
    recorded_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE meditation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    duration_seconds INTEGER,
    logged_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE referral_codes (
    code VARCHAR PRIMARY KEY,
    ambassador_id UUID REFERENCES users(id),
    redemptions INTEGER DEFAULT 0,
    max_redemptions INTEGER DEFAULT 50,
    active BOOLEAN DEFAULT true
);
```

### HealthIndex Tables
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL,
    description TEXT,
    price_cents INTEGER,
    category VARCHAR,
    image_url VARCHAR,              -- R2 URL
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    status VARCHAR DEFAULT 'pending',
    total_cents INTEGER,
    stripe_session_id VARCHAR,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
    order_id UUID REFERENCES orders(id),
    product_id UUID REFERENCES products(id),
    quantity INTEGER,
    price_cents INTEGER,
    PRIMARY KEY (order_id, product_id)
);
```

---

## Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Auth
JWT_SECRET=your-secret-key
APPLE_TEAM_ID=your-team-id
APPLE_KEY_ID=your-key-id
APPLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...

# Push Notifications
APNS_KEY_ID=your-key-id
APNS_TEAM_ID=your-team-id
APNS_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...

# Storage (R2)
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY=your-access-key
R2_SECRET_KEY=your-secret-key
R2_BUCKET=your-bucket

# Email
POSTMARK_API_KEY=your-key
# or
SENDGRID_API_KEY=your-key

# Payments (HealthIndex)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Render Deployment

### render.yaml
```yaml
services:
  - type: web
    name: api
    env: docker
    dockerfilePath: ./Dockerfile
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: main-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
    healthCheckPath: /health
    autoDeploy: true

databases:
  - name: main-db
    plan: starter  # $7/mo
```

---

## Cost Estimate

| Service | Plan | Cost |
|---------|------|------|
| Render Web Service | Starter | $7/mo |
| Render Postgres | Starter | $7/mo |
| Cloudflare R2 | Free tier | $0 (10GB) |
| Cloudflare Pages | Free | $0 |
| APNs | Free | $0 |
| Postmark | Free tier | $0 (100 emails/mo) |
| Apple Developer | Annual | $99/year |
| **Total** | | **~$14/mo + $99/yr** |

---

## Next Steps

1. [ ] Set up Render account
2. [ ] Create Postgres database
3. [ ] Deploy FastAPI skeleton
4. [ ] Test health endpoint
5. [ ] Add first router (LowkeyMode or HealthIndex)
6. [ ] Connect iOS app to API
