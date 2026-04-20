#!/bin/sh
set -e

echo "=============================="
echo " Scraper run: $(date -u)"
echo "=============================="

# Only run at 0, 6, 12, 18 UTC — Fly only supports hourly, so we gate here
HOUR=$(date -u +%H | sed 's/^0*//' | grep . || echo "0")
if [ $(( HOUR % 6 )) -ne 0 ]; then
  echo "  Skipping — run hours are 0, 6, 12, 18 UTC (current hour: $HOUR)"
  echo "=============================="
  exit 0
fi

if [ -z "$SCRAPER_API_KEY" ]; then
  echo "ERROR: SCRAPER_API_KEY is not set"
  exit 1
fi

echo ""
echo ">>> Scraping TheresMac..."
npx tsx packages/scraper/src/run.ts --site theresmac

echo ""
echo ">>> Scraping GPU Drip..."
npx tsx packages/scraper/src/run.ts --site gpudrip

echo ""
echo "=============================="
echo " Done: $(date -u)"
echo "=============================="

# Trigger Vercel rebuild so gpudrip.com shows fresh prices
echo ""
echo ">>> Triggering gpudrip.com rebuild..."
curl -s -X POST "https://api.vercel.com/v1/integrations/deploy/prj_DJ5lxzdvugugqgue5rRFZzksKNQe/2SCfnbM1sh" > /dev/null
echo "    Done."
