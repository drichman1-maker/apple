// Permission gating for risky operations
// Implements approval flow for spending, posting, external actions

const RISK_THRESHOLDS = {
  spending: 50,      // Ask before spending >$50
  emergencySpending: 500, // Can spend up to $500 if unreachable
  socialPost: true,  // Always ask before social media
  externalEmail: true // Ask before sending to non-test recipients
}

// Check if operation needs approval
export function needsApproval(operation, details = {}) {
  switch(operation) {
    case 'spend':
      return details.amount > RISK_THRESHOLDS.spending
    
    case 'socialPost':
      return RISK_THRESHOLDS.socialPost
    
    case 'externalEmail':
      // Test emails to yourself are OK
      if (details.to?.includes('douglasrichman') || details.to?.includes('test')) {
        return false
      }
      return RISK_THRESHOLDS.externalEmail
    
    case 'databaseChange':
      // Destructive operations only
      return details.destructive === true
    
    default:
      return false
  }
}

// Log operation for audit trail
export function logOperation(operation, details, approved = false) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    operation,
    details: sanitizeDetails(details),
    approved,
    sessionId: getSessionId()
  }
  
  // Write to session log
  appendToSessionLog(logEntry)
  
  return logEntry
}

// Auto-backup memory before risky operations
export async function backupBeforeOperation(operation) {
  const backupPath = `memory/backup-${Date.now()}.md`
  
  try {
    // Copy current memory files
    await copyFile('MEMORY.md', backupPath)
    return { success: true, backupPath }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

// Sanitize sensitive details from logs
function sanitizeDetails(details) {
  const sensitive = ['password', 'token', 'key', 'secret', 'creditCard']
  const sanitized = { ...details }
  
  for (const key of Object.keys(sanitized)) {
    if (sensitive.some(s => key.toLowerCase().includes(s))) {
      sanitized[key] = '[REDACTED]'
    }
  }
  
  return sanitized
}

function getSessionId() {
  return globalThis.sessionId || 'unknown'
}

function appendToSessionLog(entry) {
  // Implementation depends on environment
  console.log('[SESSION_LOG]', JSON.stringify(entry))
}

async function copyFile(src, dest) {
  // Implementation depends on environment
  const fs = await import('fs/promises')
  await fs.copyFile(src, dest)
}
