// Session logging for visibility
// Tracks decisions, tool calls, and outcomes

class SessionLogger {
  constructor() {
    this.logs = []
    this.startTime = Date.now()
  }

  // Log a decision
  decision(what, why, context = {}) {
    this.logs.push({
      type: 'decision',
      timestamp: Date.now(),
      what,
      why,
      context
    })
  }

  // Log a tool call
  toolCall(tool, params, result) {
    this.logs.push({
      type: 'tool',
      timestamp: Date.now(),
      tool,
      params: this.truncate(params),
      result: this.truncate(result),
      duration: Date.now() - this.startTime
    })
  }

  // Log an error
  error(error, context = {}) {
    this.logs.push({
      type: 'error',
      timestamp: Date.now(),
      message: error.message,
      stack: error.stack?.split('\n')[0],
      context
    })
  }

  // Log completion
  complete(summary) {
    this.logs.push({
      type: 'complete',
      timestamp: Date.now(),
      summary,
      totalDuration: Date.now() - this.startTime
    })
    
    // Persist to file
    this.save()
  }

  // Get summary for reporting
  getSummary() {
    const decisions = this.logs.filter(l => l.type === 'decision')
    const tools = this.logs.filter(l => l.type === 'tool')
    const errors = this.logs.filter(l => l.type === 'error')
    
    return {
      duration: Date.now() - this.startTime,
      decisions: decisions.length,
      toolCalls: tools.length,
      errors: errors.length,
      errorDetails: errors.map(e => e.message)
    }
  }

  truncate(obj, maxLength = 200) {
    const str = JSON.stringify(obj)
    if (str.length <= maxLength) return obj
    return str.substring(0, maxLength) + '...[truncated]'
  }

  save() {
    // Persist to memory file
    const summary = this.getSummary()
    console.log('[SESSION_SUMMARY]', JSON.stringify(summary))
  }
}

// Singleton instance
export const sessionLogger = new SessionLogger()
export default SessionLogger
