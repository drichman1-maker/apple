#!/bin/bash
# Auto-deploy script for all 11 sites when Vercel resets

deploy_site() {
  local site_path=$1
  local site_name=$2
  echo "Deploying $site_name..."
  cd "$site_path" && npx vercel --prod --yes 2>&1 | tail -3
  echo ""
}

# Priority sites first
deploy_site "/Users/douglasrichman/.openclaw/workspace/rumbledeals-codemode" "RumbleDeals"
deploy_site "/Users/douglasrichman/.openclaw/workspace/babygear-codemode" "BabyGear"
deploy_site "/Users/douglasrichman/.openclaw/workspace/appliances-codemode" "Appliances"
deploy_site "/Users/douglasrichman/.openclaw/workspace/robot-aggregator" "Robot Aggregator"
deploy_site "/Users/douglasrichman/.openclaw/workspace/sluggerdata" "SluggerData"
deploy_site "/Users/douglasrichman/.openclaw/workspace/mintcondition-pokemon/web-frontend" "MintCondition"
deploy_site "/Users/douglasrichman/.openclaw/workspace/coincurator-codemode/frontend" "CoinCurator"
deploy_site "/Users/douglasrichman/.openclaw/workspace/auto-antigravity" "Auto"
deploy_site "/Users/douglasrichman/.openclaw/workspace/fixed-income-antigravity/frontend" "Fixed Income"
deploy_site "/Users/douglasrichman/.openclaw/workspace/mactrackr-frontend" "MacTrackr"
deploy_site "/Users/douglasrichman/.openclaw/workspace/healthindex-frontend" "Health Index"

echo "All deployments complete!"
