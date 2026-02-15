#!/bin/bash

# Script: rumble_scraper.sh
# Description: Scraper for Rumble (FastAPI) running every 2 hours
# Logs output with timestamps and handles errors

# Variables
VENV_PATH="/path/to/venv"  # Update with your virtual environment path
SCRAPER_PATH="/path/to/rumble_scraper.py"  # Update with your scraper script path
LOG_DIR="/var/log/scrapers"
LOG_FILE="$LOG_DIR/rumble_scraper_$(date +'%Y-%m-%d').log"
MAX_RETRIES=3
RETRY_DELAY=60  # seconds

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# Log function with timestamp
log() {
    echo "$(date +'%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Activate virtual environment
if [ -f "$VENV_PATH/bin/activate" ]; then
    source "$VENV_PATH/bin/activate"
    log "Activated virtual environment at $VENV_PATH"
else
    log "Virtual environment not found at $VENV_PATH"
    exit 1
fi

# Run scraper with retry logic
retry=0
while [ $retry -lt $MAX_RETRIES ]; do
    log "Starting Rumble scraper (Attempt $((retry + 1)))"
    python "$SCRAPER_PATH" >> "$LOG_FILE" 2>&1
    exit_code=$?

    if [ $exit_code -eq 0 ]; then
        log "Rumble scraper completed successfully"
        break
    else
        log "Rumble scraper failed with exit code $exit_code"
        if [ $retry -lt $((MAX_RETRIES - 1)) ]; then
            log "Retrying in $RETRY_DELAY seconds..."
            sleep $RETRY_DELAY
        fi
        ((retry++))
    fi
done

# Alert on failure (placeholder)
if [ $exit_code -ne 0 ]; then
    log "ALERT: Rumble scraper failed after $MAX_RETRIES attempts"
    # Add alerting logic here (e.g., curl to a webhook, email, etc.)
fi

exit $exit_code