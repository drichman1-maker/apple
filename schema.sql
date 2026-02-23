-- Universal Aggregator Backend Schema
-- Powers multiple verticals: Mactrackr, GPU, MintCondition, RumbleDeals, Coincurator

-- Verticals table (multi-tenant support)
CREATE TABLE verticals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL, -- 'mactrackr', 'gpudrop', 'mintcondition'
    name VARCHAR(100) NOT NULL,
    domain VARCHAR(255),
    config JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Product categories per vertical
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vertical_id UUID REFERENCES verticals(id) ON DELETE CASCADE,
    slug VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    display_order INTEGER DEFAULT 0,
    UNIQUE(vertical_id, slug)
);

-- Universal products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vertical_id UUID REFERENCES verticals(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id),
    
    -- Identity
    sku VARCHAR(100) NOT NULL, -- Universal SKU across verticals
    slug VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Vertical-specific attributes (flexible schema)
    attributes JSONB DEFAULT '{}',
    -- Examples by vertical:
    -- Mactrackr: {chip: 'M4', ram: '16GB', storage: '512GB', release_year: 2024}
    -- GPU: {chipset: 'RTX 5090', vram: '32GB', tdp: 575}
    -- MintCondition: {set: 'Base Set', condition: 'PSA 10', rarity: 'Holo'}
    
    -- Media
    image_url VARCHAR(500),
    gallery_urls JSONB DEFAULT '[]',
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_repairable BOOLEAN DEFAULT false,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(vertical_id, sku)
);

-- Retailer configurations per vertical
CREATE TABLE retailers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vertical_id UUID REFERENCES verticals(id) ON DELETE CASCADE,
    
    name VARCHAR(100) NOT NULL, -- 'Best Buy', 'Amazon', 'eBay'
    slug VARCHAR(50) NOT NULL,
    
    -- Affiliate configuration
    affiliate_network VARCHAR(50), -- 'impact', 'shareasale', 'amazon_associates'
    affiliate_template VARCHAR(500), -- URL template with placeholders
    affiliate_id VARCHAR(100),
    
    -- Display config
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    
    UNIQUE(vertical_id, slug)
);

-- Product-Retailer mappings (canonical URLs + SKUs)
CREATE TABLE product_retailers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    retailer_id UUID REFERENCES retailers(id) ON DELETE CASCADE,
    
    -- Retailer-specific identifiers
    retailer_sku VARCHAR(100), -- Best Buy SKU, Amazon ASIN, etc.
    product_code VARCHAR(100), -- Adorama product code
    
    -- Canonical URL (normalized, no affiliate params)
    canonical_url VARCHAR(500),
    
    -- Deep link tracking
    affiliate_url VARCHAR(500),
    
    -- Last verification
    last_verified_at TIMESTAMP,
    
    UNIQUE(product_id, retailer_id)
);

-- Price history (time-series data)
CREATE TABLE price_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    retailer_id UUID REFERENCES retailers(id),
    
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    condition VARCHAR(20) DEFAULT 'new', -- 'new', 'refurbished', 'used'
    in_stock BOOLEAN DEFAULT true,
    
    scraped_at TIMESTAMP DEFAULT NOW(),
    metadata JSONB DEFAULT '{}' -- Raw scraper data for debugging
);

-- Index for fast price lookups
CREATE INDEX idx_price_history_product_retailer ON price_history(product_id, retailer_id, scraped_at DESC);

-- Click tracking (the "sensor" data)
CREATE TABLE click_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Click context
    click_id UUID DEFAULT gen_random_uuid(), -- For deduplication
    session_id VARCHAR(100),
    
    -- Product/Retailer
    product_id UUID REFERENCES products(id),
    retailer_id UUID REFERENCES retailers(id),
    vertical_id UUID REFERENCES verticals(id),
    
    -- Click details
    clicked_at TIMESTAMP DEFAULT NOW(),
    price_seen DECIMAL(10,2),
    
    -- Position/Context
    click_position VARCHAR(50), -- 'product_card', 'detail_page', 'search_result'
    device_type VARCHAR(20), -- 'mobile', 'desktop', 'tablet'
    
    -- User context (privacy-first, no PII)
    country_code VARCHAR(2),
    region VARCHAR(50),
    
    -- Attribution
    referrer VARCHAR(500),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    -- Outcome
    redirect_success BOOLEAN,
    affiliate_url_used VARCHAR(500)
);

-- Indexes for analytics
CREATE INDEX idx_clicks_vertical_time ON click_logs(vertical_id, clicked_at DESC);
CREATE INDEX idx_clicks_product ON click_logs(product_id, clicked_at DESC);
CREATE INDEX idx_clicks_retailer ON click_logs(retailer_id, clicked_at DESC);

-- Stock availability tracking
CREATE TABLE stock_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    retailer_id UUID REFERENCES retailers(id),
    
    in_stock BOOLEAN NOT NULL,
    stock_level INTEGER, -- Some retailers expose this
    
    checked_at TIMESTAMP DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- User alerts (price drop notifications)
CREATE TABLE price_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    
    -- Contact (can be email, webhook, etc.)
    contact_type VARCHAR(20) NOT NULL, -- 'email', 'webhook', 'slack'
    contact_value VARCHAR(255) NOT NULL,
    
    -- Alert conditions
    target_price DECIMAL(10,2), -- Alert when price drops below this
    price_drop_percent INTEGER, -- Or when drops by X%
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    last_triggered_at TIMESTAMP,
    trigger_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- Alert history (what we sent)
CREATE TABLE alert_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alert_id UUID REFERENCES price_alerts(id),
    
    triggered_price DECIMAL(10,2),
    previous_price DECIMAL(10,2),
    
    sent_at TIMESTAMP DEFAULT NOW(),
    delivery_status VARCHAR(20), -- 'sent', 'delivered', 'bounced'
    
    metadata JSONB DEFAULT '{}'
);

-- API keys for scrapers/services
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vertical_id UUID REFERENCES verticals(id),
    
    service VARCHAR(50) NOT NULL, -- 'bestbuy_api', 'amazon_papi', 'scraper_proxy'
    key_name VARCHAR(100),
    key_value_encrypted TEXT, -- Store encrypted
    
    rate_limit_per_min INTEGER,
    last_used_at TIMESTAMP,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Jobs queue (for n8n/BullMQ integration)
CREATE TABLE job_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    job_type VARCHAR(50) NOT NULL, -- 'scrape_prices', 'check_stock', 'send_alerts'
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
    
    -- Job payload
    payload JSONB DEFAULT '{}',
    
    -- Scheduling
    scheduled_at TIMESTAMP DEFAULT NOW(),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    
    -- Results
    result JSONB,
    error_message TEXT,
    
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3
);

-- Materialized views for analytics
CREATE MATERIALIZED VIEW daily_price_stats AS
SELECT 
    vertical_id,
    product_id,
    retailer_id,
    DATE(scraped_at) as date,
    MIN(price) as min_price,
    MAX(price) as max_price,
    AVG(price)::DECIMAL(10,2) as avg_price,
    COUNT(*) as price_updates
FROM price_history ph
JOIN products p ON p.id = ph.product_id
GROUP BY vertical_id, product_id, retailer_id, DATE(scraped_at);

CREATE MATERIALIZED VIEW daily_clicks AS
SELECT 
    vertical_id,
    DATE(clicked_at) as date,
    COUNT(*) as total_clicks,
    COUNT(DISTINCT session_id) as unique_sessions,
    SUM(CASE WHEN redirect_success THEN 1 ELSE 0 END) as successful_redirects
FROM click_logs
GROUP BY vertical_id, DATE(clicked_at);

-- Functions for common operations
CREATE OR REPLACE FUNCTION get_best_price(product_uuid UUID)
RETURNS TABLE(retailer_id UUID, price DECIMAL, in_stock BOOLEAN) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT ON (ph.retailer_id)
        ph.retailer_id,
        ph.price,
        ph.in_stock
    FROM price_history ph
    WHERE ph.product_id = product_uuid
    AND ph.in_stock = true
    ORDER BY ph.retailer_id, ph.scraped_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Seed data for Mactrackr vertical
INSERT INTO verticals (slug, name, domain, config) VALUES
('mactrackr', 'MacTrackr', 'mactrackr.com', '{"currency": "USD", "focus": "apple_products"}'),
('gpudrop', 'GPUDrop', 'gpudrop.io', '{"currency": "USD", "focus": "graphics_cards"}'),
('mintcondition', 'MintCondition', 'mintcondition.app', '{"currency": "USD", "focus": "collectibles"}');

-- Seed retailers for Mactrackr
INSERT INTO retailers (vertical_id, name, slug, affiliate_network, affiliate_template, display_order)
SELECT 
    v.id,
    r.name,
    r.slug,
    r.network,
    r.template,
    r.order
FROM verticals v
CROSS JOIN LATERAL (VALUES
    ('Amazon', 'amazon', 'amazon_associates', 'https://www.amazon.com/dp/{sku}?tag={affiliate_id}', 1),
    ('Best Buy', 'bestbuy', 'impact', 'https://bestbuy.7tiv.net/c/XXXX/XXXX/XXXX?u={encoded_url}', 2),
    ('B&H Photo', 'bh', 'direct', 'https://www.bhphotovideo.com/c/product/{sku}.html?KBID={affiliate_id}', 3),
    ('Adorama', 'adorama', 'shareasale', 'https://www.adorama.com/{product_code}.html?email={affiliate_id}', 4),
    ('Apple', 'apple', 'none', 'https://apple.com/shop/buy-mac/{slug}', 5),
    ('eBay', 'ebay', 'ebay_partner', 'https://www.ebay.com/itm/{sku}?mkevt=1&mkcid={affiliate_id}', 6)
) AS r(name, slug, network, template, order)
WHERE v.slug = 'mactrackr';
