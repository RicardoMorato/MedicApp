from models import Drug
import pytest

@pytest.fixture
def create_new_drug(db_session):
    drug1 = Drug(
        farmaco = 'Dipirona',
        detentor = 'H1',
        medicamento = 'Novalgina',
        registro = '19213124',
        concentracao = '25gm',
        forma_farmaceutica = 'acl no',
        data_inclusao = '21/12/2002'
    )

    db_session.add(drug1)
    db_session.commit()

    drug2 = Drug(
        farmaco = 'Tadalafil',
        detentor = 'H1',
        medicamento = 'Cialis',
        registro = '192131234424',
        concentracao = '20ml',
        forma_farmaceutica = 'ska la',
        data_inclusao = '21/12/2022'
    )

    db_session.add(drug2)
    db_session.commit()

    drug3 = Drug(
        farmaco = 'Cafeina',
        detentor = 'H3',
        medicamento = 'Dorflex',
        registro = '1935344',
        concentracao = '2ml',
        forma_farmaceutica = 'dor flex',
        data_inclusao = '01/01/2002'
    )

    db_session.add(drug3)
    db_session.commit()


def test_list_medicaments_should_return_total_correct(test_client, create_new_drug):
    response = test_client.get("/medicament/search")
    assert response.status_code == 200
    assert response.json()["total"]== 3


def test_list_medicaments_should_return_all_medicaments(test_client, create_new_drug):
    response = test_client.get("/medicament/search")
    assert response.status_code == 200
    assert len(response.json()["items"]) == 3


def test_list_medicaments_search_per_name_should_return_medicament(test_client, create_new_drug):
    response = test_client.get("/medicament/search/?name=Novalgina")

    data = response.json()

    assert response.status_code == 200
    assert len(data["items"]) == 1
    assert data["items"][0]["medicamento"] == "Novalgina"


def test_list_medicaments_search_per_half_name_should_return_medicament(test_client, create_new_drug):
    response = test_client.get("/medicament/search/?name=noval")

    data = response.json()

    assert response.status_code == 200
    assert len(data["items"]) == 1
    assert data["items"][0]["medicamento"] == "Novalgina"


def test_list_medicaments_search_per_pharma_should_return_medicament(test_client, create_new_drug):
    response = test_client.get("/medicament/search/?name=Dipirona")

    data = response.json()

    assert response.status_code == 200
    assert len(data["items"]) == 1
    assert data["items"][0]["medicamento"] == "Novalgina"


def test_list_medicaments_search_per_half_pharma_should_return_medicament(test_client, create_new_drug):
    response = test_client.get("/medicament/search/?name=dipi")

    data = response.json()

    assert response.status_code == 200
    assert len(data["items"]) == 1
    assert data["items"][0]["medicamento"] == "Novalgina"


def test_list_medicaments_skip_limit(test_client, create_new_drug):
    response = test_client.get("/medicament/search/?skip=1&limit=1")

    data = response.json()

    assert response.status_code == 200
    assert len(data["items"]) == 1
    assert data["items"][0]["medicamento"] == "Dorflex"


def test_list_medicaments_should_return_a_empty_list(test_client, create_new_drug):
    response = test_client.get("/medicament/search/?name=Zolpidem")

    data = response.json()

    assert response.status_code == 200
    assert data["items"] == []

def test_list_medicaments_limit_max_value_should_return_200(test_client, create_new_drug):
    response = test_client.get("/medicament/search/?limit=17000")

    data = response.json()

    assert response.status_code == 200
    assert len(data["items"]) == 3


def test_list_medicaments_skip_min_value_should_return_200(test_client, create_new_drug):
    response = test_client.get("/medicament/search/?skip=0")

    data = response.json()

    assert response.status_code == 200
    assert len(data["items"]) == 3
    