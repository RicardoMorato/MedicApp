from models import Interaction # Certifique-se de importar o modelo correto
import pytest

@pytest.fixture
def seed_interaction(db_session):
    interaction = Interaction(
        principio_ativo1="paracetamol",
        principio_ativo2="dipirona",
        gravidade_interacao="teste",
        probabilidade_ocorrencia="teste",
        efeito="teste",
        inicio_interacao="teste",
    )

    db_session.add(interaction)
    db_session.commit()

def test_check_interactions_without_medicaments_stored_should_return_404(
    test_client, db_session
):
    assert db_session.query(Interaction).count() == 0

    response = test_client.post(
        "/interactions", json={"name_1": "paracetamol", "name_2": "dipirona"}
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "Esta interação não existe."}


def test_check_interactions_with_a_match_should_return_200(test_client, seed_interaction):
    response = test_client.post(
        "/interactions", json={"name_1": "paracetamol", "name_2": "dipirona"}
    )

    data = response.json()

    assert response.status_code == 200
    assert data["message"] == "Interação medicamentosa existente"
    assert data["interação"]["principio_ativo1"] == "paracetamol"
    assert data["interação"]["principio_ativo2"] == "dipirona"
