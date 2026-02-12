from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid

class EphemeralBase(SQLModel):
    app_id: str = Field(index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: datetime = Field(index=True)

class Draft(EphemeralBase, table=True):
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    type: str  # 'marketing', 'email', 'social'
    content: str
    metadata_json: Optional[str] = None # Store minimal non-PII metadata
    webhook_url: Optional[str] = None # Async callback URL

class BotOutput(EphemeralBase, table=True):
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    draft_id: uuid.UUID = Field(foreign_key="draft.id")
    generated_content: str
    platform: str # 'twitter', 'linkedin', 'email'
    status: str = "pending"
