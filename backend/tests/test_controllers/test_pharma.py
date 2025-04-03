from models import Pharma

def test_list_pharma_with_a_valid_input_should_return_the_searched_pharma(test_client, db_session):
    assert db_session.query(Pharma).count() == 0

    pharma = Pharma(
        pharma_name="Dipirona"
    )

    db_session.add(pharma)
    db_session.commit()

    response = test_client.get("/pharma")
    assert response.status_code == 200
    assert len(response.json()) == 1

    response_filtered = test_client.get("/pharma?name=Dipirona")
    assert response_filtered.status_code == 200
    assert len(response_filtered.json()) == 1


def test_list_pharma_with_an_invalid_input_should_return_an_empty_list(test_client, db_session):
    assert db_session.query(Pharma).count() == 0

    pharma = Pharma(
        pharma_name="Dipirona"
    )

    db_session.add(pharma)
    db_session.commit()

    response = test_client.get("/pharma")
    assert response.status_code == 200
    assert len(response.json()) == 1
    
    response_filtered = test_client.get("/pharma?name=Novalgina")
    assert response_filtered.status_code == 200
    assert len(response_filtered.json()) == 0