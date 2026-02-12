from sqlmodel import SQLModel, create_engine
import os

DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://user:password@localhost/dbname")

# Configure connection pool for production stability
engine = create_engine(
    DATABASE_URL,
    echo=False,  # Disable SQL logging in production
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,  # Verify connections before use
    pool_recycle=300,  # Recycle connections after 5 minutes
)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

