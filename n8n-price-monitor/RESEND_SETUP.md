# Resend Setup Checklist for MacTrackr Price Alerts

## Step 1: Sign Up (2 minutes)
1. Go to https://resend.com
2. Click "Get Started"
3. Sign up with: `doug@codemodeapps.com` (or your preferred email)
4. Verify email

## Step 2: Add Domain (3 minutes)
1. In Resend dashboard, click "Add Domain"
2. Enter: `mactrackr.com`
3. Choose "Cloudflare" as your DNS provider
4. Copy the DNS records shown

## Step 3: Add DNS Records to Cloudflare
1. Go to https://dash.cloudflare.com → mactrackr.com
2. Click **DNS** tab → **Add Record**
3. Add each record from Resend:
   
   **Type: TXT**
   - Name: `_dmarc`
   - Content: `v=DMARC1; p=quarantine;`
   
   **Type: TXT** (from Resend)
   - Name: `resend._domainkey`
   - Content: [copy from Resend]
   
   **Type: TXT** (from Resend)
   - Name: `resend`
   - Content: [copy from Resend]

4. Click **Verify** in Resend
5. Wait 2-5 minutes for propagation

## Step 4: Get API Key (1 minute)
1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name: `MacTrackr Production`
4. Copy the key (starts with `re_`)

## Step 5: Save Credentials
Save these somewhere secure:
```
RESEND_API_KEY=re_xxxxx
ALERTS_FROM_EMAIL=alerts@mactrackr.com
```

## Step 6: Deploy n8n to Railway (after Resend verified)

```bash
# Clone the price monitor setup
cd ~/.openclaw/workspace/n8n-price-monitor

# Railway login
railway login

# Initialize project
railway init

# Add n8n template
railway add --template n8n

# Set environment variables
railway variables set RESEND_API_KEY=re_your_key_here
railway variables set TELEGRAM_BOT_TOKEN=7651492044:AAFB9CSh3CumwbV4nwPTcYPqVVWVOJFIjmc

# Deploy
railway up
```

## Step 7: Import & Activate Workflow
1. Open Railway-provided URL (ends in .up.railway.app)
2. Login with default credentials (or create account)
3. Click "Add Workflow" → Import
4. Upload: `n8n-workflow-v1.json` from this folder
5. Replace placeholder email with: `doug@codemodeapps.com`
6. Activate workflow

## Verification
- Workflow runs every 4 hours
- Telegram alerts: instant (to @henrydoesitbot)
- Email alerts: when price drops 5%+

## Troubleshooting
**DNS not verifying?**
- Ensure TTL in Cloudflare is set to "Auto" or 300
- Wait up to 10 minutes
- Try clicking "Verify" again in Resend

**Railway deploy fails?**
- Check `railway status` for logs
- Ensure Node.js version compatible

## Done When
- [ ] Resend domain verified
- [ ] API key saved
- [ ] n8n deployed and running
- [ ] Test email received
- [ ] Workflow shows "Active" status
