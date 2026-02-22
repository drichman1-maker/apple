#!/bin/bash
# deploy-n8n.sh - Run this to deploy n8n to Railway
# 
# IMPORTANT: Set these environment variables BEFORE running:
#   export RESEND_API_KEY="your-resend-key"
#   export TELEGRAM_BOT_TOKEN="your-bot-token"

cd ~/.openclaw/workspace/n8n-price-monitor

echo "Checking environment variables..."
if [ -z "$RESEND_API_KEY" ]; then
    echo "❌ ERROR: RESEND_API_KEY not set"
    echo "Run: export RESEND_API_KEY=your-key-here"
    exit 1
fi

if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
    echo "❌ ERROR: TELEGRAM_BOT_TOKEN not set"
    echo "Run: export TELEGRAM_BOT_TOKEN=your-token-here"
    exit 1
fi

echo "Logging into Railway..."
railway login --browserless

echo "Initializing project..."
railway init

echo "Adding n8n template..."
railway add --template n8n

echo "Setting environment variables..."
railway variables set RESEND_API_KEY="$RESEND_API_KEY"
railway variables set TELEGRAM_BOT_TOKEN="$TELEGRAM_BOT_TOKEN"

echo "Deploying..."
railway up

echo "Done! Check Railway dashboard for the URL."
