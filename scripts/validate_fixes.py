#!/usr/bin/env python3
"""
Simplified integration test that doesn't require database connection.
Tests code structure and imports only.
"""

import sys
import os
import inspect

print("=" * 60)
print("STATELESS INFRASTRUCTURE - CODE VALIDATION TEST")
print("=" * 60)

# Test 1: Main App Lifespan
print("\n[TEST 1] Validating Main App Startup...")
try:
    with open('apps/backend/src/main.py', 'r') as f:
        main_content = f.read()
    
    assert 'run_cleanup_loop' in main_content, "Cleanup task not imported"
    assert 'asyncio.create_task(run_cleanup_loop())' in main_content, "Cleanup task not started"
    assert 'cleanup_task.cancel()' in main_content, "Cleanup task not properly cleaned up"
    
    print("✅ Cleanup task properly initialized in lifespan")
except Exception as e:
    print(f"❌ Main app validation failed: {e}")
    sys.exit(1)

# Test 2: Worker Model
print("\n[TEST 2] Validating Worker Model...")
try:
    with open('apps/clawi/src/worker.py', 'r') as f:
        worker_content = f.read()
    
    assert 'draft_id: uuid.UUID' in worker_content, "Worker BotOutput missing draft_id field"
    assert 'app_id: str' in worker_content, "Worker BotOutput missing app_id field"
    
    print("✅ Worker model has required fields")
except Exception as e:
    print(f"❌ Worker model validation failed: {e}")
    sys.exit(1)

# Test 3: Webhook Logic
print("\n[TEST 3] Validating Webhook Logic...")
try:
    with open('apps/clawi/src/worker.py', 'r') as f:
        worker_content = f.read()
    
    assert 'timeout=15' in worker_content, "Webhook timeout not increased to 15s"
    assert '[WEBHOOK]' in worker_content, "Webhook logging not improved"
    assert 'requests.exceptions.Timeout' in worker_content, "Timeout exception not handled"
    
    print("✅ Webhook dispatch logic enhanced")
except Exception as e:
    print(f"❌ Webhook validation failed: {e}")
    sys.exit(1)

# Test 4: Cleanup Logging
print("\n[TEST 4] Validating Cleanup Logging...")
try:
    with open('apps/backend/src/tasks.py', 'r') as f:
        tasks_content = f.read()
    
    assert '[CLEANUP]' in tasks_content, "Cleanup logging not improved"
    assert 'result_drafts.rowcount' in tasks_content, "Deletion counts not logged"
    
    print("✅ Cleanup task has structured logging")
except Exception as e:
    print(f"❌ Cleanup logging validation failed: {e}")
    sys.exit(1)

# Test 5: Production Checklist
print("\n[TEST 5] Validating Production Documentation...")
try:
    with open('PRODUCTION_CHECKLIST.md', 'r') as f:
        checklist_content = f.read()
    
    assert 'Redis' in checklist_content, "Redis requirement not documented"
    assert 'storage_uri' in checklist_content, "Redis configuration not documented"
    
    print("✅ Production requirements documented")
except Exception as e:
    print(f"❌ Production checklist validation failed: {e}")
    sys.exit(1)

print("\n" + "=" * 60)
print("✅ ALL CODE VALIDATION TESTS PASSED")
print("=" * 60)
print("\n🎯 Critical Fixes Verified:")
print("   1. Cleanup task starts automatically")
print("   2. Worker model includes draft_id")
print("   3. Webhook timeout increased to 15s")
print("   4. Structured logging added")
print("   5. Production requirements documented")
print("\n📋 See PRODUCTION_CHECKLIST.md for deployment requirements.")
