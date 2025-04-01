from models import Drug

def test_list_medicaments_should_retun_200(test_client, db_session):
    assert db_session.query(Drug).count() == 0

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


    response = test_client.get("/medicament/search")
    assert response.status_code == 200
    assert len(response.json()) == 2

    response_filtered = test_client.get("/medicament/search?name=Dipirona")
    assert response_filtered.status_code == 200
    assert len(response_filtered.json()) == 1

    response_filtered = test_client.get("/medicament/search?name=Novalgina")
    assert response_filtered.status_code == 200
    assert len(response_filtered.json()) == 1

    response_filtered = test_client.get("/medicament/search?name=Dorflex")
    assert response_filtered.status_code == 200
    assert len(response_filtered.json()) == 0