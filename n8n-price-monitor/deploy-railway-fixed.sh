#!/bin/bash
# Deploy n8n to Railway with proper config

cd ~/.openclaw/workspace/n8n-price-monitor

echo "Adding config files to git..."
git add start.sh nixpacks.toml package.json

echo "Committing..."
git commit -m "Add Railway build config files"

echo "Pushing to trigger Railway deploy..."
git push

echo "Done! Check Railway dashboard for deployment status."
