from fastapi.testclient import TestClient
from models import Interaction, Base  # Certifique-se de importar o modelo correto
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

from controllers.interactions import check_interactions


def test_check_interactions_without_medicaments_stored_should_return_404(
    test_client, db_session
):
    assert db_session.query(Interaction).count() == 0

    response = test_client.post(
        "/interactions", json={"name_1": "paracetamol", "name_2": "dipirona"}
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "Esta interação não existe."}


def test_check_interactions_with_a_match_should_return_200(test_client, db_session):
    assert db_session.query(Interaction).count() == 0

    # Armazena um medicamento no banco de dados
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

    response = test_client.post(
        "/interactions", json={"name_1": "paracetamol", "name_2": "dipirona"}
    )

    data = response.json()

    assert response.status_code == 200
    assert data["message"] == "Interação medicamentosa existente"
    assert data["interação"]["id"] == interaction.id
    assert data["interação"]["principio_ativo1"] == interaction.principio_ativo1
    assert data["interação"]["principio_ativo2"] == interaction.principio_ativo2
