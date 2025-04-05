from models import User
from dependencies.auth_dependency import hash_password
import pytest

@pytest.fixture
def create_new_user(db_session):
    user1 = User(
        name="teste", 
        email="teste@gmail.com", 
        password="Senha123!")
    
    db_session.add(user1)
    db_session.commit()

@pytest.fixture
def test_case():
    return {
        "name": "teste", 
        "email": "teste@gmail.com", 
        "password": "Senha123!"}
    
def test_register_user_with_valid_body_should_return_201(test_client, db_session, test_case):
    assert db_session.query(User).count() == 0
    
    response = test_client.post(
        "/users/signup", json=test_case
    )

    assert response.status_code == 201

    response_data = response.json()
    assert "access_token" in response_data
    assert response_data["token_type"] == "Bearer"


def test_register_user_with_user_already_created_should_return_401(test_client, test_case, create_new_user):
    response = test_client.post(
        "/users/signup", json=test_case
    )

    response_data = response.json()
    
    assert response.status_code == 401

    response_data = response.json()
    assert response_data["detail"] == "Um usuário com esse email já foi cadastrado"


def test_register_user_with_invalid_password_should_return_400(test_client, create_new_user):
    teste_case = {"name": "teste", "email": "teste@gmail.com", "password": "Senha123"}

    response = test_client.post(
        "/users/signup", json=teste_case
    )

    response_data = response.json()
    
    assert response.status_code == 400

    response_data = response.json()
    assert response_data["detail"] == "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial."


def test_user_login_with_account_created_should_return_201(test_client, db_session, test_case):
    assert db_session.query(User).count() == 0

    hashed_password = hash_password("Senha123!")
    db_session.add(User(name="teste", email="teste@gmail.com", password=hashed_password))
    db_session.commit()

    response = test_client.post(
        "/users/login", json=test_case
    )

    response_data = response.json()
    
    assert response.status_code == 201

    response_data = response.json()
    assert "access_token" in response_data
    assert response_data["token_type"] == "Bearer"


def test_user_login_with_account_not_created_should_return_401(test_client, db_session, test_case):
    assert db_session.query(User).count() == 0
    
    response = test_client.post(
        "/users/login", json=test_case
    )

    response_data = response.json()
    
    assert response.status_code == 401

    response_data = response.json()
    assert response_data["detail"] == "Usuário ou senha inválido"