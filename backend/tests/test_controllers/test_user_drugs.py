import pytest
from models import UserDrugs, User
from dependencies.auth_dependency import get_password_hash, create_access_token
import jwt
from config import SECRET_KEY, ALGORITHM
from datetime import datetime, timedelta, timezone

@pytest.fixture
def user(db_session):
    hashed_password = get_password_hash("Senha123!")
    user = User(name="João", email="joao@email.com", password=hashed_password)
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)  
    return user 


@pytest.fixture
def test_case():
    return {
        "name": "Paracetamol",
        "principio_ativo": "paracetamol",
        "concentracao": "500mg"
    }


@pytest.fixture
def new_drug(db_session, user):
    drug1 = UserDrugs(
        user_id=user.id,
        name="Paracetamol",
        principio_ativo="acarbose",
        concentracao="500mg"
    )
    db_session.add(drug1)
    db_session.commit()

    drug2 = UserDrugs(
        user_id=user.id,
        name="Novalgina",
        principio_ativo="dipirona",
        concentracao="25ml"
    )
    db_session.add(drug2)
    db_session.commit()

    return [drug1, drug2]

@pytest.fixture
def auth_header(token):
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def token(user):
    data = {
        "sub": str(user.id),
        "name": user.name,
        "email": user.email
    }
    access_token = create_access_token(
        data=data,
        expires_delta=timedelta(minutes=60)
    )
    return access_token


@pytest.fixture
def expired_token(user):
    payload = {
        "sub": str(user.id),
        "email": user.email,
        "exp": datetime.now(timezone.utc) - timedelta(minutes=1),  # já expirado
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

@pytest.fixture
def auth_header_expired(expired_token):
    return {"Authorization": f"Bearer {expired_token}"}


def test_add_medicament_with_success_should_return_201(test_client, user, auth_header, test_case):
    response = test_client.post(
        f"/users/{user.id}/drugs",
        headers=auth_header,
        json=test_case
    )

    assert response.status_code == 201

    response_data = response.json()
    assert response_data["message"] == "Medicamento cadastrado com sucesso e associado ao usuário!"
    assert response_data["drug"]["name"] == "Paracetamol"


def test_add_medicament_already_created_should_return_400(test_client, user, new_drug, auth_header, test_case):
    user_id = user.id
    response = test_client.post(
        f"/users/{user_id}/drugs",
        headers=auth_header,
        json=test_case
    )

    response_duplicated = test_client.post(
        f"/users/{user_id}/drugs",
        headers=auth_header,
        json=test_case
    )

    assert response.status_code == 201
    assert response_duplicated.status_code == 400

    response_duplicated = response_duplicated.json()
    assert response_duplicated["detail"] == "Este medicamento já está cadastrado."


def test_add_medicament_with_same_name_different_concentration_should_succeed(test_client, user, auth_header):
    new_different_drug = {
        "name": "Paracetamol",
        "principio_ativo": "acarbose",
        "concentracao": "750mg"
    }

    response = test_client.post(
        f"/users/{user.id}/drugs",
        headers=auth_header,
        json=new_different_drug
    )

    assert response.status_code == 201
    assert response.json()["drug"]["concentracao"] == "750mg"


def test_list_medicament_with_none_input_should_return_all_medicaments(test_client, user, new_drug, auth_header):
    response = test_client.get(f"/user/{user.id}/medications", headers=auth_header)
    assert response.status_code == 200
    assert len(response.json()) == 2


def test_list_medicament_with_med_name_should_return_all_equivalent_medicaments(test_client, user, new_drug, auth_header):
    response = test_client.get(f"/user/{user.id}/medications?name=Novalgina", headers=auth_header)
    assert response.status_code == 200
    assert response.json()[0]["concentracao"] == "25ml"
    assert len(response.json()) == 1


def test_list_medicament_with_half_med_name_should_return_all_equivalent_medicaments(test_client, user, new_drug, auth_header):
    response = test_client.get(f"/user/{user.id}/medications?name=noval", headers=auth_header)
    assert response.status_code == 200
    assert response.json()[0]["concentracao"] == "25ml"
    assert len(response.json()) == 1


def test_list_medicament_with_pharma_name_should_return_all_equivalent_medicaments(test_client, user, new_drug, auth_header):
    response = test_client.get(f"/user/{user.id}/medications?name=dipirona", headers=auth_header)
    assert response.status_code == 200
    assert response.json()[0]["concentracao"] == "25ml"
    assert len(response.json()) == 1


def test_list_medicament_with_half_pharma_name_should_return_all_equivalent_medicaments(test_client, user, new_drug, auth_header):
    response = test_client.get(f"/user/{user.id}/medications?name=dipir", headers=auth_header)
    assert response.status_code == 200
    assert response.json()[0]["concentracao"] == "25ml"
    assert len(response.json()) == 1


def test_list_medicament_with_med_name_non_existed_should_return_an_empty_list(test_client, user, new_drug, auth_header):
    response = test_client.get(f"/user/{user.id}/medications?name=Zolpidem", headers=auth_header)
    assert response.status_code == 200
    assert len(response.json()) == 0


def test_delete_existing_medicament_should_return_204(test_client, user, new_drug, auth_header, db_session):
    drug_id = db_session.query(UserDrugs).filter_by(name="Paracetamol", user_id=user.id).first().id

    response = test_client.delete(
        f"/users/{user.id}/drugs/{drug_id}",
        headers=auth_header
    )

    assert response.status_code == 204

    deleted_drug = db_session.query(UserDrugs).filter_by(id=drug_id).first()
    assert deleted_drug is None


def test_delete_non_existent_medicament_should_return_404(test_client, user, auth_header):
    response = test_client.delete(
        f"/users/{user.id}/drugs/9999",
        headers=auth_header
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Medicamento não encontrado"


def test_list_medicaments_without_token_should_return_401(test_client, user):
    response = test_client.get(f"/user/{user.id}/medications")
    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated"


def test_delete_medicament_without_token_should_return_401(test_client, user, new_drug):
    drug_id = new_drug[0].id
    response = test_client.delete(f"/users/{user.id}/drugs/{drug_id}")
    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated"


def test_add_medicament_without_token_should_return_401(test_client, user, test_case):
    response = test_client.post(
        f"/users/{user.id}/drugs",
        json=test_case
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated"


def test_add_medicament_with_expired_token_should_return_401(test_client, user, test_case, auth_header_expired):
    response = test_client.post(
        f"/users/{user.id}/drugs",
        headers=auth_header_expired,
        json=test_case
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Token expired"


def test_list_medicaments_with_expired_token_should_return_401(test_client, user, auth_header_expired):
    response = test_client.get(f"/user/{user.id}/medications", headers=auth_header_expired)
    assert response.status_code == 401
    assert response.json()["detail"] == "Token expired"


def test_delete_medicament_with_expired_token_should_return_401(test_client, user, new_drug, auth_header_expired):
    drug_id = new_drug[0].id
    response = test_client.delete(f"/users/{user.id}/drugs/{drug_id}", headers=auth_header_expired)
    assert response.status_code == 401
    assert response.json()["detail"] == "Token expired"
