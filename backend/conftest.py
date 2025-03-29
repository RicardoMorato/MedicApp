import logging
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from fastapi.testclient import TestClient
from main import app
from database import Base, get_db
from alembic import command
from alembic.config import Config

SQLITE_DATABASE_URL = "sqlite:///test_db.db"

LOGGER = logging.getLogger(__name__)

# Create a SQLAlchemy engine
engine = create_engine(
    SQLITE_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

# Create a sessionmaker to manage sessions
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables in the database
Base.metadata.create_all(bind=engine)


@pytest.fixture(scope="function")
def db_session():
    """Create a new database session for each test."""
    LOGGER.info("[Setup] Creating a new database session for testing")
    connection = engine.connect()
    transaction = connection.begin()  # Start a transaction
    session = TestingSessionLocal(bind=connection)
    try:
        # Drop all tables to ensure a clean state
        LOGGER.info("[Setup] Dropping all tables...")
        Base.metadata.drop_all(bind=engine)

        # Create all tables before applying migrations
        LOGGER.info("[Setup] Creating all tables...")
        Base.metadata.create_all(bind=engine)

        # Apply migrations
        alembic_cfg = Config("alembic.ini")  # Path to Alembic configuration file
        alembic_cfg.set_main_option("sqlalchemy.url", SQLITE_DATABASE_URL)
        LOGGER.info("[Setup] Applying migrations...")
        command.upgrade(alembic_cfg, "head")  # Apply all migrations
        LOGGER.info("[Setup] Migrations applied successfully.")

        yield session
    finally:
        session.close()
        transaction.rollback()  # Rollback the transaction
        connection.close()
        LOGGER.info("[Teardown] Database session closed and transaction rolled back.")


@pytest.fixture(scope="function")
def test_client(db_session):
    """Create a test client that uses the override_get_db fixture to return a session."""

    def override_get_db():
        try:
            yield db_session
        finally:
            db_session.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
