from models import Pharma
import pytest

@pytest.fixture
def create_pharma(db_session):
    pharma = Pharma(
        pharma_name="Dipirona"
    )

    db_session.add(pharma)
    db_session.commit()

    pharma2 = Pharma(
        pharma_name="Aspirina"
    )

    db_session.add(pharma2)
    db_session.commit()

def test_list_pharma_with_none_input_should_return_all_pharmas(test_client, create_pharma):
    response = test_client.get("/pharma")
    assert response.status_code == 200
    assert len(response.json()) == 2

def test_list_pharma_with_a_valid_input_should_return_the_searched_pharma(test_client, create_pharma):
    response_filtered = test_client.get("/pharma?name=Dipirona")
    assert response_filtered.status_code == 200
    assert len(response_filtered.json()) == 1


def test_list_pharma_with_a_half_input_should_return_the_half_searched_pharma(test_client, create_pharma):
    response_filtered = test_client.get("/pharma?name=dipi")
    assert response_filtered.status_code == 200
    assert len(response_filtered.json()) == 1


def test_list_pharma_with_an_invalid_input_should_return_an_empty_list(test_client, create_pharma):
    response_filtered = test_client.get("/pharma?name=Zolpidem")
    assert response_filtered.status_code == 200
    assert len(response_filtered.json()) == 0