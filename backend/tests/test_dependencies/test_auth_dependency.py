from models import User
from dependencies.auth_dependency import get_password_hash
from models import User

def create_test_user(db, email="test@example.com", password="Senha123!"):
    hashed_pw = get_password_hash(password)
    user = User(name="teste", email=email, password=hashed_pw)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def test_login_success(test_client, db_session):
    create_test_user(db_session)

    response = test_client.post(
        "/token",
        data={"username": "test@example.com", "password": "Senha123!"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )

    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_incorrect_email(test_client):
    response = test_client.post(
        "/token",
        data={"username": "naoexiste@example.com", "password": "Senha123!"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect username or password"


def test_login_incorrect_password(test_client, db_session):
    create_test_user(db_session)

    response = test_client.post(
        "/token",
        data={"username": "test@example.com", "password": "SenhaErrada!"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect username or password"


def test_login_missing_username(test_client):
    response = test_client.post(
        "/token",
        data={"password": "Senha123!"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )

    assert response.status_code == 422


def test_login_missing_password(test_client):
    response = test_client.post(
        "/token",
        data={"username": "test@example.com"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )

    assert response.status_code == 422
