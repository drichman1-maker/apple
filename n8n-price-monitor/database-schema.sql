-- MacTrackr Price Alerts Database Schema
-- Run this on your Railway Postgres instance

-- ==========================================
-- PRICE ALERTS TABLE
-- Stores user subscriptions for price drops
-- ==========================================
CREATE TABLE IF NOT EXISTS price_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  product_id VARCHAR(100) NOT NULL,
  product_name VARCHAR(255), -- cached for display
  target_price DECIMAL(10,2), -- NULL = notify on any 5%+ drop
  is_active BOOLEAN DEFAULT true,
  email_confirmed BOOLEAN DEFAULT false,
  confirmation_token VARCHAR(255),
  unsubscribe_token VARCHAR(255) DEFAULT encode(gen_random_bytes(32), 'hex'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_notified_at TIMESTAMP WITH TIME ZONE,
  
  -- Prevent duplicate alerts per email+product
  UNIQUE(email, product_id)
);

-- Index for faster lookups
CREATE INDEX idx_price_alerts_email ON price_alerts(email);
CREATE INDEX idx_price_alerts_product ON price_alerts(product_id);
CREATE INDEX idx_price_alerts_active ON price_alerts(is_active) WHERE is_active = true;

-- ==========================================
-- EMAIL SUBSCRIBERS TABLE
-- For newsletter/marketing emails
-- ==========================================
CREATE TABLE IF NOT EXISTS email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  email_confirmed BOOLEAN DEFAULT false,
  confirmation_token VARCHAR(255),
  unsubscribe_token VARCHAR(255) DEFAULT encode(gen_random_bytes(32), 'hex'),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  confirmation_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- PRICE HISTORY TABLE
-- Track price changes over time
-- ==========================================
CREATE TABLE IF NOT EXISTS price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id VARCHAR(100) NOT NULL,
  retailer VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  url TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for price history queries
CREATE INDEX idx_price_history_product ON price_history(product_id);
CREATE INDEX idx_price_history_recorded ON price_history(recorded_at);
CREATE INDEX idx_price_history_product_retailer ON price_history(product_id, retailer);

-- ==========================================
-- NOTIFICATION LOG
-- Track sent emails to prevent duplicates
-- ==========================================
CREATE TABLE IF NOT EXISTS notification_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id UUID REFERENCES price_alerts(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  product_id VARCHAR(100) NOT NULL,
  old_price DECIMAL(10,2) NOT NULL,
  new_price DECIMAL(10,2) NOT NULL,
  retailer VARCHAR(50) NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_provider_response TEXT -- Resend/etc response
);

CREATE INDEX idx_notification_log_alert ON notification_log(alert_id);
CREATE INDEX idx_notification_log_sent ON notification_log(sent_at);

-- ==========================================
-- VIEWS FOR COMMON QUERIES
-- ==========================================

-- Active alerts with user info
CREATE OR REPLACE VIEW active_price_alerts AS
SELECT 
  pa.*,
  es.email_confirmed as user_confirmed
FROM price_alerts pa
LEFT JOIN email_subscribers es ON pa.email = es.email
WHERE pa.is_active = true 
  AND (es.email_confirmed = true OR es.email IS NULL);

-- Price drop candidates (alerts where price dropped)
-- This view would need price comparison logic in application layer

-- ==========================================
-- FUNCTIONS
-- ==========================================

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_price_alerts_updated_at 
  BEFORE UPDATE ON price_alerts 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Get latest price for a product
CREATE OR REPLACE FUNCTION get_latest_price(p_product_id VARCHAR, p_retailer VARCHAR)
RETURNS DECIMAL AS $$
DECLARE
  latest_price DECIMAL;
BEGIN
  SELECT price INTO latest_price
  FROM price_history
  WHERE product_id = p_product_id AND retailer = p_retailer
  ORDER BY recorded_at DESC
  LIMIT 1;
  
  RETURN latest_price;
END;
$$ LANGUAGE plpgsql;

-- Clean up old price history (keep last 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_price_history()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM price_history
  WHERE recorded_at < NOW() - INTERVAL '90 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- SAMPLE DATA (Optional - for testing)
-- ==========================================

-- Uncomment to add test data
/*
INSERT INTO price_alerts (email, product_id, product_name, target_price, email_confirmed)
VALUES 
  ('test@example.com', 'iphone-16-128-unlocked', 'iPhone 16 128GB', 699, true),
  ('test@example.com', 'macbook-air-13-m4', 'MacBook Air 13" M4', 999, true);

INSERT INTO email_subscribers (email, email_confirmed)
VALUES ('test@example.com', true);

INSERT INTO price_history (product_id, retailer, price, recorded_at)
VALUES 
  ('iphone-16-128-unlocked', 'amazon', 799, NOW() - INTERVAL '1 day'),
  ('iphone-16-128-unlocked', 'amazon', 749, NOW());
*/

-- ==========================================
-- VERIFICATION
-- ==========================================

-- Check tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('price_alerts', 'email_subscribers', 'price_history', 'notification_log');
