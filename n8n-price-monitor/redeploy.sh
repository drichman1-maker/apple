#!/bin/bash
# Fix Railway deployment - Link service and redeploy

cd ~/.openclaw/workspace/n8n-price-monitor

echo "Linking to Railway project..."
railway link

# Select 'price tracker' when prompted

echo ""
echo "Redeploying..."
railway up

echo ""
echo "Done! Check Railway dashboard for deployment status."
