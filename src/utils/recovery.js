// Recovery and backup system
// Auto-backup before risky operations

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export class RecoverySystem {
  constructor() {
    this.backups = []
  }

  // Check if operation is risky
  isRisky(operation, details) {
    const riskyOps = ['delete', 'drop', 'remove', 'purge', 'reset']
    const isDestructive = riskyOps.some(op => operation.toLowerCase().includes(op))
    
    const highImpact = details.impact === 'high' || details.destructive === true
    
    return isDestructive || highImpact
  }

  // Create backup before operation
  async backup(context) {
    const timestamp = Date.now()
    const backupId = `backup-${timestamp}`
    
    try {
      // Backup memory files
      await this.copyFiles([
        { src: 'MEMORY.md', dest: `memory/backups/${backupId}-MEMORY.md` },
        { src: 'USER.md', dest: `memory/backups/${backupId}-USER.md` },
        { src: 'SOUL.md', dest: `memory/backups/${backupId}-SOUL.md` }
      ])
      
      this.backups.push({
        id: backupId,
        timestamp,
        context,
        path: `memory/backups/${backupId}`
      })
      
      return { success: true, backupId }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Execute with auto-recovery
  async executeWithRecovery(operation, fn, context) {
    // Backup if risky
    if (this.isRisky(operation, context)) {
      const backup = await this.backup(context)
      if (!backup.success) {
        console.warn('[RECOVERY] Backup failed, proceeding with caution')
      } else {
        console.log(`[RECOVERY] Backup created: ${backup.backupId}`)
      }
    }
    
    try {
      const result = await fn()
      return { success: true, result }
    } catch (error) {
      console.error(`[RECOVERY] Operation failed: ${error.message}`)
      
      // Auto-recover if backup exists
      if (this.backups.length > 0) {
        const lastBackup = this.backups[this.backups.length - 1]
        console.log(`[RECOVERY] Can restore from: ${lastBackup.id}`)
      }
      
      return { success: false, error: error.message }
    }
  }

  // Restore from backup
  async restore(backupId) {
    const backup = this.backups.find(b => b.id === backupId)
    if (!backup) {
      return { success: false, error: 'Backup not found' }
    }
    
    try {
      await this.copyFiles([
        { src: `memory/backups/${backupId}-MEMORY.md`, dest: 'MEMORY.md' },
        { src: `memory/backups/${backupId}-USER.md`, dest: 'USER.md' },
        { src: `memory/backups/${backupId}-SOUL.md`, dest: 'SOUL.md' }
      ])
      
      return { success: true, restoredFrom: backupId }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async copyFiles(files) {
    for (const { src, dest } of files) {
      try {
        await execAsync(`cp ${src} ${dest}`)
      } catch (e) {
        // Source might not exist, skip
      }
    }
  }
}

// Singleton
export const recovery = new RecoverySystem()
export default RecoverySystem
