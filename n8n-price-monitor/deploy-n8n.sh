#!/bin/bash
# deploy-n8n.sh - Run this to deploy n8n to Railway

cd ~/.openclaw/workspace/n8n-price-monitor

echo "Logging into Railway..."
railway login --browserless

echo "Initializing project..."
railway init

echo "Adding n8n template..."
railway add --template n8n

echo "Setting environment variables..."
railway variables set RESEND_API_KEY=re_PjmMuXPP_P6YZVeXFE5dyEK2B6jbj3Prh
railway variables set TELEGRAM_BOT_TOKEN=7651492044:AAFB9CSh3CumwbV4nwPTcYPqVVWVOJFIjmc

echo "Deploying..."
railway up

echo "Done! Check Railway dashboard for the URL."
