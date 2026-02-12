"""
Shared model definitions for both backend and worker.
This prevents model drift between services.
"""
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid


class EphemeralBase(SQLModel):
    """Base class for all ephemeral data with auto-expiry."""
    app_id: str = Field(index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: datetime = Field(index=True)


class Draft(EphemeralBase, table=True):
    """Content draft awaiting bot processing."""
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    type: str  # 'marketing', 'email', 'social'
    content: str
    metadata_json: Optional[str] = None
    webhook_url: Optional[str] = None


class BotOutput(EphemeralBase, table=True):
    """Generated content from Clawi bot."""
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    draft_id: uuid.UUID = Field(foreign_key="draft.id")
    generated_content: Optional[str] = None
    platform: str = "email"
    status: str = "pending"
