from sqlalchemy.orm import Session
from models import Drug
from schemas.medicaments import MedicamentResponse
from fastapi import HTTPException, status

def add_medicament(db: Session, drug_data: MedicamentResponse):
    existing_med = db.query(Drug).filter(
        MedicamentResponse.id == drug_data.id
    ).first()

    if existing_med:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este medicamento já está cadastrado."
        )

    new_drug = Drug(
        farmaco=drug_data.farmaco,
        detentor=drug_data.detentor,
        medicamento=drug_data.medicamento,
        registro=drug_data.registro,
        concentracao=drug_data.concentracao,
        forma_farmaceutica=drug_data.forma_farmaceutica,
        data_inclusao=drug_data.data_inclusao
    )

    db.add(new_drug)
    db.commit()
    db.refresh(new_drug)

    return {"message": "Medicamento cadastrado com sucesso!", "drug": new_drug}
