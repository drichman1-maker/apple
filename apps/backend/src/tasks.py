import asyncio
from typing import Callable
from datetime import datetime
from sqlmodel import Session, select, delete
from .database import engine
from .models import Draft, BotOutput

async def run_cleanup_loop(interval_seconds: int = 3600):
    while True:
        try:
            cleanup_expired_data()
        except Exception as e:
            print(f"Cleanup failed: {e}")
        await asyncio.sleep(interval_seconds)

def cleanup_expired_data():
    """
    Delete expired data in batches to prevent table locks.
    Uses chunked deletes with a maximum batch size.
    """
    now = datetime.utcnow()
    BATCH_SIZE = 1000  # Delete max 1000 rows per iteration
    
    total_drafts_deleted = 0
    total_outputs_deleted = 0
    
    with Session(engine) as session:
        # Batch delete expired outputs first (child table)
        while True:
            # Select IDs to delete (with limit)
            stmt = select(BotOutput.id).where(BotOutput.expires_at < now).limit(BATCH_SIZE)
            ids_to_delete = session.exec(stmt).all()
            
            if not ids_to_delete:
                break
            
            delete_stmt = delete(BotOutput).where(BotOutput.id.in_(ids_to_delete))
            session.exec(delete_stmt)
            session.commit()
            total_outputs_deleted += len(ids_to_delete)
            
            if len(ids_to_delete) < BATCH_SIZE:
                break  # No more rows to delete
        
        # Batch delete expired drafts (parent table)
        while True:
            stmt = select(Draft.id).where(Draft.expires_at < now).limit(BATCH_SIZE)
            ids_to_delete = session.exec(stmt).all()
            
            if not ids_to_delete:
                break
            
            delete_stmt = delete(Draft).where(Draft.id.in_(ids_to_delete))
            session.exec(delete_stmt)
            session.commit()
            total_drafts_deleted += len(ids_to_delete)
            
            if len(ids_to_delete) < BATCH_SIZE:
                break
    
    print(f"[CLEANUP] Executed at {now.isoformat()}")
    print(f"[CLEANUP] Deleted {total_drafts_deleted} drafts, {total_outputs_deleted} outputs")
