import pytest
import asyncio
from datetime import datetime, timedelta
from sqlmodel import Session, select
from apps.backend.src.models import Draft, BotOutput
from apps.backend.src.tasks import cleanup_expired_data
from apps.backend.src.database import engine

def test_cleanup_deletes_expired_drafts():
    """Test that cleanup task removes drafts past their expiration date"""
    with Session(engine) as session:
        # Create expired draft
        expired_draft = Draft(
            app_id="test-app",
            type="marketing",
            content="Test content",
            created_at=datetime.utcnow() - timedelta(days=2),
            expires_at=datetime.utcnow() - timedelta(days=1)
        )
        session.add(expired_draft)
        session.commit()
        draft_id = expired_draft.id
    
    # Run cleanup
    cleanup_expired_data()
    
    # Verify deletion
    with Session(engine) as session:
        result = session.get(Draft, draft_id)
        assert result is None, "Expired draft should be deleted"

def test_cleanup_preserves_active_drafts():
    """Test that cleanup task does NOT delete drafts before expiration"""
    with Session(engine) as session:
        # Create active draft
        active_draft = Draft(
            app_id="test-app",
            type="email",
            content="Active content",
            created_at=datetime.utcnow(),
            expires_at=datetime.utcnow() + timedelta(days=7)
        )
        session.add(active_draft)
        session.commit()
        draft_id = active_draft.id
    
    # Run cleanup
    cleanup_expired_data()
    
    # Verify preservation
    with Session(engine) as session:
        result = session.get(Draft, draft_id)
        assert result is not None, "Active draft should NOT be deleted"
        assert result.content == "Active content"

def test_webhook_delivery():
    """Test webhook is dispatched when draft completes"""
    # This would require a mock HTTP server
    # Placeholder for integration test
    pass

if __name__ == "__main__":
    pytest.main([__file__, "-v"])
