# Aggregator Dashboard + Monitoring System

## 📊 Dashboard

Unified dashboard showing all price aggregator projects:
- **TheresMac** (theresmac.com) - Apple products ✅ Live
- **MintCondition** (mintcondition.app) - Pokemon cards 🔄 In Progress
- **CoinCurator** (coincurator.app) - Rare coins 🔄 In Progress
- **RumbleDeals** (rumbledeals.com) - Video games ⏳ Pending

### Quick Start

```bash
cd aggregator-dashboard
npm install
npm run build
# Deploy dist/ folder to Vercel
```

### Features
- Real-time project status monitoring
- Migration progress tracking
- Quick links to all aggregator sites
- Revenue and product count overview

---

## 🔍 Monitoring System

Automated Reddit/Twitter monitoring for deal discovery across all categories.

### Monitored Sources

| Project | Reddit Subreddits | Twitter Hashtags |
|---------|-------------------|------------------|
| TheresMac | macdeals, appleswap, buildapcsales | #macdeals, #appledeals |
| MintCondition | pkmntcgtrades, pokemontcg | #pokemoncards, #tcgdeals |
| CoinCurator | coins, coincollecting | #coincollecting, #numismatics |
| RumbleDeals | GameDeals, NintendoSwitchDeals | #gamedeals, #nintendoswitch |

### Run Manually

```bash
npm run monitor
```

### Setup Automated Monitoring (Cron)

```bash
# Make script executable
chmod +x scripts/setup-cron.sh

# Run setup
./scripts/setup-cron.sh
```

This installs a cron job that runs every 30 minutes.

### n8n Integration

Set environment variable to enable webhook alerts:

```bash
export N8N_WEBHOOK_URL="https://your-n8n-instance.com/webhook/deals"
npm run monitor
```

The monitoring system will POST deal alerts to your n8n workflow.

---

## 🔄 Migration Status

### Completed ✅
- **TheresMac**: Fully migrated to shared backend (mactrackr-api-backup.fly.dev)
- **Shared Backend**: Python/FastAPI serving multiple categories

### In Progress 🔄
- **CoinCurator**: Frontend updated, needs test & deploy
- **MintCondition**: Frontend ready, needs backend data

### Pending ⏳
- **RumbleDeals**: Needs frontend build

### Migration Steps

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed steps per project.

Quick fixes needed:

**CoinCurator** (`/coin-agg/frontend/src/lib/api.ts`):
- ✅ API endpoint updated to shared backend
- ✅ Transform function added
- ❌ Need to populate backend with coin data
- ❌ Test and deploy

**MintCondition** (`/mintcondition-pokemon/`):
- ❌ Update API endpoint
- ❌ Add transform function for Pokemon cards
- ❌ Populate backend with card data
- ❌ Test and deploy

---

## 📁 File Structure

```
aggregator-dashboard/
├── pages/
│   ├── index.tsx           # Main dashboard
│   └── _app.tsx            # App wrapper
├── components/             # Shared UI components
├── lib/
│   └── monitoring.ts       # Monitoring logic
├── scripts/
│   ├── run-monitoring.ts   # Monitoring runner
│   └── setup-cron.sh       # Cron installation
├── styles/
│   └── globals.css         # Global styles
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind config
├── next.config.ts          # Next.js config
├── MIGRATION_GUIDE.md      # Detailed migration docs
└── README.md               # This file
```

---

## 🔧 Development

### Add New Aggregator

1. Update `MONITORING_CONFIGS` in `lib/monitoring.ts`
2. Add to `AGGREGATORS` array in `pages/index.tsx`
3. Add migration status to dashboard

### Backend Schema

The shared backend supports multiple product categories:

```typescript
{
  name: string,
  category: 'mac' | 'pokemon' | 'coins' | 'games',
  attributes: {},  // Category-specific fields
  prices: [...]
}
```

---

## 🚀 Next Steps

1. ✅ Dashboard built and ready to deploy
2. ✅ Monitoring system created
3. 🔄 Complete CoinCurator migration (test & deploy)
4. 🔄 Complete MintCondition migration
5. 🔄 Build RumbleDeals frontend
6. 🔄 Configure n8n webhook for deal alerts
7. 🔄 Set up cron job for automated monitoring
