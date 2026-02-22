# n8n Webhook Setup - Complete

## Step 1: Get Your Railway URL

Check Railway dashboard for your n8n service URL. It looks like:
```
https://price-tracker-production.up.railway.app
```

## Step 2: Add Webhook Node in n8n

1. Open n8n UI (your Railway URL)
2. In your workflow, click **+** to add node
3. Search **"Webhook"** → Add it
4. Configure:
   - **Method:** POST
   - **Path:** `deal-alert`
   - **Response:** 200 OK
5. Save

## Step 3: Connect Webhook

Connect the Webhook node to:
- Send Telegram Alert
- Send Email Alert (Resend)

## Step 4: Your Webhook URL

```
https://[your-railway-url]/webhook/deal-alert
```

Example:
```
https://price-tracker-production.up.railway.app/webhook/deal-alert
```

## Step 5: Set Environment Variable

```bash
export N8N_WEBHOOK_URL="https://your-url.up.railway.app/webhook/deal-alert"
```

Add to your shell profile (`.zshrc` or `.bashrc`) to make it permanent.

## Step 6: Test

```bash
cd ~/.openclaw/workspace/aggregator-dashboard
npm run monitor
```

You should see:
```
📤 Sending to n8n webhook...
✅ Sent to n8n
```

And receive Telegram alert!

## Troubleshooting

If webhook test fails:
1. Check n8n logs in Railway dashboard
2. Verify Webhook node is properly connected
3. Test webhook manually with curl:
   ```bash
   curl -X POST https://your-url.up.railway.app/webhook/deal-alert \
     -H "Content-Type: application/json" \
     -d '{"test": true}'
   ```

## Activate Workflow

Don't forget to toggle **Active** in top right of n8n UI!
