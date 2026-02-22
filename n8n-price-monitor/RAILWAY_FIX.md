# n8n Railway Deployment Fix

## Problem
Railway's Railpack can't auto-detect the build configuration for n8n.

## Solution 1: Use Railway Template (Easiest)

Instead of CLI deployment, use Railway's web UI:

1. Go to https://railway.app/template/n8n
2. Click "Deploy Now"
3. Select your "price tracker" project
4. Add environment variables:
   - `RESEND_API_KEY=re_PjmMuXPP_P6YZVeXFE5dyEK2B6jbj3Prh`
   - `TELEGRAM_BOT_TOKEN=7651492044:AAFB9CSh3CumwbV4nwPTcYPqVVWVOJFIjmc`

## Solution 2: Add nixpacks.toml (For CLI)

Create this file in `n8n-price-monitor/`:

```toml
# nixpacks.toml
[phases.build]
cmds = ["npm install -g n8n"]

[phases.setup]
nixPkgs = ["nodejs_20"]

[start]
cmd = "n8n start"
```

Then redeploy:
```bash
cd ~/.openclaw/workspace/n8n-price-monitor
railway up
```

## Solution 3: Use Dockerfile

Create `Dockerfile` in `n8n-price-monitor/`:

```dockerfile
FROM n8nio/n8n:latest
ENV N8N_BASIC_AUTH_ACTIVE=true
ENV N8N_BASIC_AUTH_USER=admin
ENV N8N_BASIC_AUTH_PASSWORD=admin
ENV WEBHOOK_URL=https://your-railway-url.up.railway.app/
CMD ["n8n", "start"]
```

Then add env vars in Railway dashboard.

## Recommended: Solution 1 (Template)

Fastest path - click deploy, add env vars, done.

Then import workflow:
1. Open n8n UI
2. Settings → Import workflow
3. Upload `n8n-workflow-v1.json`
4. Activate

## After Deployment

Test the webhook URL from aggregator-dashboard monitoring by setting:
```bash
export N8N_WEBHOOK_URL="https://your-railway-url.up.railway.app/webhook/deals"
```
