#!/bin/bash
# Setup script for aggregator monitoring cron job
# Run this to install the monitoring cron

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DASHBOARD_DIR="$SCRIPT_DIR"
LOG_DIR="$DASHBOARD_DIR/logs"

# Create log directory
mkdir -p "$LOG_DIR"

# Add to crontab - runs every 30 minutes
CRON_JOB="*/30 * * * * cd $DASHBOARD_DIR && /usr/local/bin/tsx ./scripts/run-monitoring.ts >> $LOG_DIR/monitor.log 2>&1"

# Check if already in crontab
if crontab -l 2>/dev/null | grep -q "$DASHBOARD_DIR"; then
    echo "✅ Monitoring already scheduled in crontab"
else
    # Add to crontab
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    echo "✅ Added monitoring to crontab (runs every 30 min)"
fi

echo ""
echo "Setup complete!"
echo "Logs will be saved to: $LOG_DIR/monitor.log"
echo ""
echo "To verify: crontab -l"
echo "To remove: crontab -e (delete the line with monitoring)"
