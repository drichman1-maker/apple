# MacTrackr Database Schema

## Tables

### products
- id (PK)
- name (string)
- url (string)
- current_price (decimal)
- last_checked (timestamp)
- created_at (timestamp)

### users
- id (PK)
- email (string, unique)
- name (string)
- verified (boolean)
- created_at (timestamp)

### price_alerts
- id (PK)
- user_id (FK → users.id)
- product_id (FK → products.id)
- target_price (decimal)
- status (enum: active/triggered/cancelled)
- created_at (timestamp)
- triggered_at (timestamp)

## Indexes
- products(url) - for quick product lookup
- price_alerts(user_id, status) - for user alert management
- price_alerts(product_id, status) - for price checking