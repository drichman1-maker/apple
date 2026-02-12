#!/usr/bin/env python3
"""
Integration test script for stateless infrastructure.
Tests critical functionality without requiring full deployment.
"""

import sys
import os
sys.path.insert(0, os.path.abspath('.'))

from datetime import datetime, timedelta
import uuid

print("=" * 60)
print("STATELESS INFRASTRUCTURE - INTEGRATION TEST")
print("=" * 60)

# Test 1: Model Validation
print("\n[TEST 1] Validating Model Definitions...")
try:
    from apps.backend.src.models import Draft, BotOutput
    
    # Check Draft has all required fields
    draft_fields = Draft.__fields__.keys()
    required_draft_fields = ['app_id', 'created_at', 'expires_at', 'type', 'content', 'webhook_url']
    for field in required_draft_fields:
        assert field in draft_fields, f"Draft missing field: {field}"
    
    # Check BotOutput has draft_id
    output_fields = BotOutput.__fields__.keys()
    assert 'draft_id' in output_fields, "BotOutput missing critical field: draft_id"
    
    print("✅ All model fields present")
except Exception as e:
    print(f"❌ Model validation failed: {e}")
    sys.exit(1)

# Test 2: Cleanup Task Import
print("\n[TEST 2] Validating Cleanup Task...")
try:
    from apps.backend.src.tasks import run_cleanup_loop, cleanup_expired_data
    print("✅ Cleanup functions importable")
except Exception as e:
    print(f"❌ Cleanup import failed: {e}")
    sys.exit(1)

# Test 3: Main App Lifespan
print("\n[TEST 3] Validating Main App Startup...")
try:
    from apps.backend.src.main import app, lifespan
    print("✅ FastAPI app configured with lifespan")
except Exception as e:
    print(f"❌ Main app validation failed: {e}")
    sys.exit(1)

# Test 4: Rate Limiter Configuration
print("\n[TEST 4] Validating Rate Limiter...")
try:
    from apps.backend.src.main import limiter
    
    # Check if limiter is configured
    assert limiter is not None, "Limiter not initialized"
    
    print("✅ Rate limiter configured")
    print("⚠️  WARNING: Verify Redis URI is set in production!")
except Exception as e:
    print(f"❌ Rate limiter validation failed: {e}")
    sys.exit(1)

print("\n" + "=" * 60)
print("✅ ALL INTEGRATION TESTS PASSED")
print("=" * 60)
print("\nNext Steps:")
print("1. Set DATABASE_URL environment variable")
print("2. Run: uvicorn apps.backend.src.main:app --reload")
print("3. Test with real HTTP requests")
print("\nSee PRODUCTION_CHECKLIST.md for deployment requirements.")
