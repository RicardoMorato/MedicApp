# Mexer aqui depois que adicionar o regex de email no back
from models import User
from routers import users
from fastapi import FastAPI
app = FastAPI()

app.include_router(users.router)

def test_check_register_user_should_return_201(test_client, db_session):
    assert db_session.query(User).count() == 0

    teste_case = {"name": "teste", "email": "teste@gmail.com", "password": "Senha123!"}

    response = test_client.post(
        "/users/signup", json=teste_case
    )

    response_data = response.json()
    
    assert response.status_code == 201
    assert "access_token" in response_data
    assert response_data["token_type"] == "Bearer"