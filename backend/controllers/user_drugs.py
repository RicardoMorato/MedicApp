from sqlalchemy.orm import Session
from models import  UserDrugs
from schemas.user_drugs import DrugCreate
from fastapi import HTTPException, status

def add_medicament_to_user(db: Session, user, drug_data: DrugCreate):
    user_id = user.id

    existing_drug = db.query(UserDrugs).filter(
        UserDrugs.name == drug_data.name,
        UserDrugs.principio_ativo == drug_data.principio_ativo,
        UserDrugs.concentracao == drug_data.concentracao,
        UserDrugs.user_id == user_id
    ).first()

    if existing_drug:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este medicamento já está cadastrado."
        )

    new_drug = UserDrugs(
        user_id=user_id,
        name=drug_data.name,
        principio_ativo=drug_data.principio_ativo,
        concentracao=drug_data.concentracao,
    )

    db.add(new_drug)
    db.commit()
    db.refresh(new_drug)

    return {"message": "Medicamento cadastrado com sucesso e associado ao usuário!", "drug": new_drug,"user_drug_association": user_id}
