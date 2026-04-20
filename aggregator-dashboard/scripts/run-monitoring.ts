/**
 * Monitoring Runner Script
 * 
 * Usage: tsx scripts/run-monitoring.ts
 * 
 * This script runs the monitoring cycle and outputs results.
 * Can be scheduled via cron for automated deal discovery.
 */

import { runMonitoringCycle, sendToN8NWebhook, DealAlert } from '../lib/monitoring';

// n8n Webhook URL for deal alerts (optional).
// Get this from your n8n Webhook node: https://[your-app].up.railway.app/webhook/deal-alert
// Set via: export N8N_WEBHOOK_URL="https://..."
// If not set, alerts are still logged locally — webhook posting is skipped.
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

async function main() {
  console.log('🔍 Starting monitoring cycle...');
  console.log(`⏰ ${new Date().toISOString()}\n`);

  try {
    // Run monitoring for all projects
    const alerts = await runMonitoringCycle();
    
    console.log(`✅ Found ${alerts.length} deal alerts\n`);
    
    // Group alerts by project
    const byProject = alerts.reduce((acc, alert) => {
      acc[alert.project] = acc[alert.project] || [];
      acc[alert.project].push(alert);
      return acc;
    }, {} as Record<string, DealAlert[]>);
    
    // Print results by project
    Object.entries(byProject).forEach(([project, projectAlerts]) => {
      console.log(`\n📦 ${project.toUpperCase()} (${projectAlerts.length} alerts)`);
      console.log('─'.repeat(50));
      
      projectAlerts.slice(0, 5).forEach((alert, i) => {
        const emoji = alert.source === 'reddit' ? '📱' : '🐦';
        const sentiment = alert.sentiment === 'positive' ? '👍' : 
                         alert.sentiment === 'negative' ? '👎' : '➖';
        console.log(`${emoji} ${i + 1}. ${alert.title.slice(0, 60)}...`);
        console.log(`   ${sentiment} Engagement: ${alert.engagement} | ${alert.url}`);
      });
      
      if (projectAlerts.length > 5) {
        console.log(`   ... and ${projectAlerts.length - 5} more`);
      }
    });
    
    // Send to n8n if configured
    if (N8N_WEBHOOK_URL && alerts.length > 0) {
      console.log('\n📤 Sending to n8n webhook...');
      await sendToN8NWebhook(alerts, N8N_WEBHOOK_URL);
      console.log('✅ Sent to n8n');
    }
    
    // Save to local log file
    const fs = await import('fs');
    const logEntry = {
      timestamp: new Date().toISOString(),
      alertsFound: alerts.length,
      byProject: Object.fromEntries(
        Object.entries(byProject).map(([k, v]) => [k, v.length])
      ),
      topAlerts: alerts.slice(0, 10)
    };
    
    const logPath = './monitoring-log.jsonl';
    fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
    console.log(`\n📝 Logged to ${logPath}`);
    
  } catch (error) {
    console.error('❌ Monitoring failed:', error);
    process.exit(1);
  }
  
  console.log('\n✅ Monitoring cycle complete');
}

main();
