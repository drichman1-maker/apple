# Deal Bot Setup

## Quick Start

1. **Create bot with @BotFather**
   - Message @BotFather on Telegram
   - Type `/newbot`
   - Name it "DealAlertBot" (or your choice)
   - Save the token

2. **Create channels**
   - Create public channel: @YourDealAlerts
   - Create private channel for VIP (paid subscribers)
   - Add bot as admin to both channels

3. **Set environment variables**
```bash
export DEAL_BOT_TOKEN="your_bot_token_here"
export FREE_CHANNEL_ID="@YourDealAlerts"
export VIP_CHANNEL_ID="-1001234567890"  # Private channel ID
```

4. **Install dependencies**
```bash
pip install python-telegram-bot aiohttp
```

5. **Run**
```bash
python bot.py
```

## Deployment Options

### Option 1: Render (Free)
- Create new web service
- Connect GitHub repo
- Add environment variables
- Free tier: sleeps after 15 min idle

### Option 2: Railway ($5/mo)
- Better uptime than Render free
- Simple deployment
- Auto-restart

### Option 3: VPS (DigitalOcean, etc.)
- Most reliable
- Use PM2: `pm2 start bot.py --name deal-bot`

## Monetization

**Free Channel:**
- 5-10 deals/day
- 30%+ discounts
- Build audience to 1000+ subs

**VIP Channel ($10/mo):**
- All deals instantly
- Arbitrage opportunities
- Price mistake alerts
- Early access

**Payment:**
- Use @BotFather /setpayments
- Stripe integration
- Or manual: PayPal/Venmo + manual add to VIP channel

## Integration with Scrapers

Connect to existing scrapers:
```python
async def fetch_deals_from_scrapers():
    # Call MacTrackr API
    # Call HealthIndex API
    # Call MintCondition API
    # Aggregate and filter
    pass
```

## Next Steps

1. [ ] Create bot with @BotFather
2. [ ] Set up free public channel
3. [ ] Deploy bot to Render/Railway
4. [ ] Integrate with one scraper (MacTrackr)
5. [ ] Grow to 1000 free subs
6. [ ] Launch VIP tier
