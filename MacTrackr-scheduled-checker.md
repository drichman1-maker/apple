# MacTrackr Scheduled Checker

## Overview
This script runs periodically to check product prices against user-defined alert thresholds and sends email notifications when conditions are met.

## Dependencies
- Node.js (v16+)
- PostgreSQL (for querying alerts)
- Nodemailer (for sending emails)
- Axios (for fetching product prices)

## Installation
```bash
npm install nodemailer axios pg
```

## Script (`priceChecker.js`)
```javascript
const { Pool } = require('pg');
const axios = require('axios');
const nodemailer = require('nodemailer');

// PostgreSQL connection
const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'mactrackr',
  password: 'your_db_password',
  port: 5432,
});

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password',
  },
});

async function checkPrices() {
  try {
    // Fetch active alerts
    const { rows: alerts } = await pool.query(
      'SELECT * FROM alerts WHERE is_active = true'
    );

    for (const alert of alerts) {
      // Fetch current product price (mock API call)
      const response = await axios.get(`https://api.example.com/products/${alert.product_id}`);
      const currentPrice = response.data.price;

      // Check if price meets alert condition
      if (currentPrice <= alert.target_price) {
        // Fetch user details
        const { rows: [user] } = await pool.query(
          'SELECT * FROM users WHERE id = $1',
          [alert.user_id]
        );

        // Send email
        await transporter.sendMail({
          from: 'your_email@gmail.com',
          to: user.email,
          subject: 'Price Alert: Your tracked product is now below your target!',
          html: require('./MacTrackr-email-template.html')({
            productName: alert.product_name,
            currentPrice: currentPrice,
            targetPrice: alert.target_price,
          }),
        });

        // Mark alert as inactive (optional)
        await pool.query(
          'UPDATE alerts SET is_active = false WHERE id = $1',
          [alert.id]
        );
      }
    }
  } catch (error) {
    console.error('Error in price checker:', error);
  }
}

// Run every hour
setInterval(checkPrices, 60 * 60 * 1000);
```

## Deployment Notes
1. **Environment Variables**: Replace placeholder credentials with actual values.
2. **Cron Job**: Deploy the script to a server and schedule it to run periodically (e.g., using `cron`).
3. **Logging**: Add logging for debugging and monitoring.
4. **Error Handling**: Extend error handling for production use.
