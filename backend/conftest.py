import logging
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from fastapi.testclient import TestClient
from main import app
from database import get_db
from models import Base


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


@pytest.fixture(scope="function")
def db_session():
    """Create a new database session for each test."""
    LOGGER.info("[Setup] Creating a new database session for testing")

    LOGGER.info("[Setup] Dropping all tables in the test database")
    # Drop all tables in the database
    Base.metadata.drop_all(bind=engine)
    LOGGER.info("[Setup] Creating all tables in the test database")
    # Create all tables in the database
    Base.metadata.create_all(bind=engine)

    # Create a new database session
    try:
        LOGGER.info("[Setup] Creating a new database session")
        # Create a connection and start a transaction
        # This allows us to rollback changes after each test
        connection = engine.connect()
        transaction = connection.begin()  # Start a transaction
        session = TestingSessionLocal(bind=connection)

        LOGGER.info(
            "[Setup] Database session created, tables metadata below. %(payload)s",
            {"payload": {Base.metadata.tables.values()}},
        )

        yield session
    finally:
        session.close()
        transaction.rollback()  # Rollback the transaction
        connection.close()


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
