#!/bin/bash

# Script: coincurator_scraper.sh
# Description: Scraper for CoinCurator (Node.js) running every 6 hours
# Logs output with timestamps and handles errors

# Variables
NODE_PATH="/usr/local/bin/node"  # Update with your Node.js path
SCRAPER_PATH="/path/to/coincurator_scraper.js"  # Update with your scraper script path
LOG_DIR="/var/log/scrapers"
LOG_FILE="$LOG_DIR/coincurator_scraper_$(date +'%Y-%m-%d').log"
MAX_RETRIES=3
RETRY_DELAY=60  # seconds

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# Log function with timestamp
log() {
    echo "$(date +'%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Run scraper with retry logic
retry=0
while [ $retry -lt $MAX_RETRIES ]; do
    log "Starting CoinCurator scraper (Attempt $((retry + 1)))"
    "$NODE_PATH" "$SCRAPER_PATH" >> "$LOG_FILE" 2>&1
    exit_code=$?

    if [ $exit_code -eq 0 ]; then
        log "CoinCurator scraper completed successfully"
        break
    else
        log "CoinCurator scraper failed with exit code $exit_code"
        if [ $retry -lt $((MAX_RETRIES - 1)) ]; then
            log "Retrying in $RETRY_DELAY seconds..."
            sleep $RETRY_DELAY
        fi
        ((retry++))
    fi
done

# Alert on failure (placeholder)
if [ $exit_code -ne 0 ]; then
    log "ALERT: CoinCurator scraper failed after $MAX_RETRIES attempts"
    # Add alerting logic here (e.g., curl to a webhook, email, etc.)
fi

exit $exit_code