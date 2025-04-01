from models import Pharma

def test_list_pharma_should_retun_200(test_client, db_session):
    assert db_session.query(Pharma).count() == 0

    pharma = Pharma(
        pharma_name="Dipirona",
    )

    db_session.add(pharma)
    db_session.commit()

    response = test_client.get("/pharma")
    assert response.status_code == 200
    assert len(response.json()) == 1

    response_filtered = test_client.get("/pharma?name=Dipirona")
    assert response_filtered.status_code == 200
    assert len(response_filtered.json()) == 1

    response_filtered = test_client.get("/pharma?name=Novalgina")
    assert response_filtered.status_code == 200
    assert len(response_filtered.json()) == 0