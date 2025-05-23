from sqlalchemy.orm import Session
from models import  UserDrugs
from schemas.user_drugs import DrugCreate, DrugResponse
from fastapi import HTTPException, status
from utils.pascal_case import to_pascal_case
from sqlalchemy import or_

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


def delete_user_drug(db: Session, user: int, drug_id: int):
    user_id = user.id
    medicamento = db.query(UserDrugs).filter(
        UserDrugs.user_id == user_id,
        UserDrugs.id == drug_id
    ).first()

    if not medicamento:
        raise HTTPException(status_code=404, detail="Medicamento não encontrado")

    db.delete(medicamento)
    db.commit()
    
    return


def search_medicament_user(db: Session, current_user, name: str, skip: int, limit: int):
    user_id = current_user.id
    query = db.query(UserDrugs).filter(UserDrugs.user_id == user_id).order_by(UserDrugs.name)

    if name:
        query = query.filter(
            or_(
                UserDrugs.name.ilike(f"%{name}%"),
                UserDrugs.principio_ativo.ilike(f"%{name}%")
               )
            )
    else:
        query = query.offset(skip).limit(limit)

    medicamentos = query.all()

    for med in medicamentos:
        med.medicamento = to_pascal_case(med.name)

    return [DrugResponse.from_orm(med) for med in medicamentos]
