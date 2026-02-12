import time
import os
import random
import requests
from sqlmodel import Session, select, create_engine, SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid

# Database configuration with connection pooling
DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://user:password@localhost/dbname")
engine = create_engine(
    DATABASE_URL,
    pool_size=5,
    max_overflow=10,
    pool_pre_ping=True,
    pool_recycle=300,
)

# Define models ONCE at module level (not inside functions)
class Draft(SQLModel, table=True):
    """Parent draft with webhook URL."""
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    app_id: str = Field(index=True)
    type: str = "email"
    content: str = ""
    webhook_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: datetime = Field(default_factory=datetime.utcnow)


class BotOutput(SQLModel, table=True):
    """Bot output linked to a draft."""
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    draft_id: uuid.UUID
    generated_content: Optional[str] = None
    status: str = "pending"
    app_id: str = Field(index=True)
    platform: str = "email"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: datetime = Field(default_factory=datetime.utcnow)


def run_worker():
    """Main worker loop."""
    print("Clawi Worker Started...")
    while True:
        try:
            process_pending_tasks()
        except Exception as e:
            print(f"[WORKER] Error in main loop: {e}")
        time.sleep(5)


def is_safe_webhook_url(url: str) -> bool:
    """
    Basic SSRF protection - block internal/private URLs.
    """
    if not url:
        return False
    
    blocked_patterns = [
        '127.0.0.1', 'localhost', '0.0.0.0',
        '10.', '172.16.', '172.17.', '172.18.', '172.19.',
        '172.20.', '172.21.', '172.22.', '172.23.',
        '172.24.', '172.25.', '172.26.', '172.27.',
        '172.28.', '172.29.', '172.30.', '172.31.',
        '192.168.', '169.254.', 'metadata',
    ]
    
    url_lower = url.lower()
    for pattern in blocked_patterns:
        if pattern in url_lower:
            return False
    
    return True


def process_pending_tasks():
    """
    Process pending bot tasks with per-task commits.
    This prevents duplicate webhooks on partial failures.
    """
    with Session(engine) as session:
        # Find pending tasks
        statement = select(BotOutput).where(BotOutput.status == "pending").limit(5)
        results = session.exec(statement).all()
        
        for task in results:
            try:
                print(f"[WORKER] Processing task {task.id}")
                
                # Generate content
                generated = generate_draft_content()
                task.generated_content = generated
                task.status = "completed"
                session.add(task)
                
                # COMMIT PER TASK - prevents duplicate webhooks on failure
                session.commit()
                
                # Only dispatch webhook AFTER successful commit
                dispatch_webhook(session, task, generated)
                
            except Exception as e:
                print(f"[WORKER] Error processing task {task.id}: {e}")
                session.rollback()


def dispatch_webhook(session: Session, task: BotOutput, content: str):
    """
    Dispatch webhook with SSRF protection.
    Runs AFTER task is committed to prevent duplicates.
    """
    try:
        draft = session.get(Draft, task.draft_id)
        if not draft or not draft.webhook_url:
            return
        
        # SSRF protection
        if not is_safe_webhook_url(draft.webhook_url):
            print(f"[WEBHOOK] Blocked unsafe URL for draft {task.draft_id}")
            return
        
        print(f"[WEBHOOK] Dispatching to {draft.webhook_url}")
        try:
            response = requests.post(
                draft.webhook_url,
                json={
                    "event": "draft.completed",
                    "draft_id": str(task.draft_id),
                    "output_id": str(task.id),
                    "content": content
                },
                timeout=15
            )
            
            if response.status_code >= 400:
                print(f"[WEBHOOK] Failed with status {response.status_code}")
            else:
                print(f"[WEBHOOK] Success for draft {task.draft_id}")
                
        except requests.exceptions.Timeout:
            print(f"[WEBHOOK] Timeout for draft {task.draft_id}")
        except Exception as e:
            print(f"[WEBHOOK] Error: {e}")
            
    except Exception as e:
        print(f"[WEBHOOK] Draft lookup failed: {e}")


def generate_draft_content():
    """Generate mock content (replace with LLM call)."""
    templates = [
        "Hey! Check out our new feature...",
        "Limited time offer: Get 50% off...",
        "Thanks for signing up! Here is your code...",
    ]
    return random.choice(templates) + f" [Generated at {datetime.utcnow()}]"


if __name__ == "__main__":
    run_worker()
