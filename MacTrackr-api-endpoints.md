# MacTrackr API Endpoints

## Product Endpoints

`GET /products` - List all tracked products
- Returns: Array of product objects

`POST /products` - Add new product to track
- Parameters: `url`, `name`
- Returns: Created product object

`GET /products/:id` - Get product details
- Returns: Single product object with price history

## Alert Endpoints

`GET /users/:userId/alerts` - List user's price alerts
- Returns: Array of alert objects

`POST /users/:userId/alerts` - Create new price alert
- Parameters: `productId`, `targetPrice`
- Returns: Created alert object

`DELETE /users/:userId/alerts/:alertId` - Cancel price alert
- Returns: Success/failure

## System Endpoints

`POST /check-prices` - Internal endpoint for scheduled price checks
- Returns: Count of triggered alerts

`POST /send-alerts` - Internal endpoint to send triggered alerts
- Returns: Count of emails sent