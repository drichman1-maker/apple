# HEARTBEAT.md - Automated Monitoring Tasks

## Overview
Heartbeat runs every hour from 7 AM to 10 PM via cron job. It checks for deals across all aggregator categories and reports via Telegram.

## Cron Configuration
```
0 7-22 * * * cd /Users/douglasrichman/.openclaw/workspace/aggregator-dashboard && /usr/local/bin/tsx ./scripts/run-monitoring.ts >> ./logs/monitor.log 2>&1
```

**Schedule:** Hourly from 7:00 AM to 10:00 PM (silent 10 PM - 7 AM)

## Monitoring Tasks

### 1. Reddit Deal Scanning
**Subreddits monitored:**
- r/macdeals, r/appleswap, r/buildapcsales (MacTrackr)
- r/pkmntcgtrades, r/pokemontcg (MintCondition)
- r/coins, r/coincollecting (CoinCurator)
- r/GameDeals, r/NintendoSwitchDeals (RumbleDeals)

### 2. Twitter Hashtag Tracking
**Hashtags monitored:**
- #macdeals, #appledeals
- #pokemoncards, #tcgdeals
- #coincollecting, #numismatics
- #gamedeals, #nintendoswitch

### 3. Alert Triggers
- Posts with >10 engagement (upvotes/retweets)
- Positive sentiment indicators ("deal", "sale", "steal")
- Price drops mentioned in text

## Output

### Log File
`/Users/douglasrichman/.openclaw/workspace/aggregator-dashboard/logs/monitor.log`

### Telegram Alerts
If `N8N_WEBHOOK_URL` is set, posts alerts to Telegram (chat_id: 461595428)

### Dashboard
View results at: https://dist-theta-kohl-25.vercel.app

## Manual Run
```bash
cd /Users/douglasrichman/.openclaw/workspace/aggregator-dashboard
npm run monitor
```

## Disable
```bash
crontab -e
# Delete the line with aggregator-dashboard
```

## Status
✅ Enabled: Feb 21, 2026
📊 Dashboard: https://dist-theta-kohl-25.vercel.app
📝 Logs: ./logs/monitor.log
