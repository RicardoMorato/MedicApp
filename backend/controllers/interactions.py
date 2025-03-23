from sqlalchemy.orm import Session
from models import Interaction, Drug
from schemas.interactions import InteractionsResponse
from schemas.medicaments import MedicamentCall
from fastapi import HTTPException, status
from sqlalchemy import or_

def add_interaction(db: Session, interaction_data: InteractionsResponse):
    existing_interaction = db.query(Interaction).filter(
        or_(
            (Interaction.principio_ativo1 == interaction_data.principio_ativo1) & 
            (Interaction.principio_ativo2 == interaction_data.principio_ativo2),

            (Interaction.principio_ativo1 == interaction_data.principio_ativo2) & 
            (Interaction.principio_ativo2 == interaction_data.principio_ativo1)
        )
    ).first()

    if existing_interaction:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Esta interação já está cadastrada."
        )

    new_interaction = Interaction(
        principio_ativo1=interaction_data.principio_ativo1,
        principio_ativo2=interaction_data.principio_ativo2,
        gravidade_interacao=interaction_data.gravidade_interacao,
        inicio_interacao=interaction_data.inicio_interacao,
        probabilidade_ocorrencia=interaction_data.probabilidade_ocorrencia,
        efeito=interaction_data.efeito
    )

    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return {"message": "Interação cadastrada com sucesso!", "interação": new_interaction}

def check_interactions(db: Session, check_data: MedicamentCall):
    drug1 = db.query(Drug.farmaco).filter(Drug.medicamento == check_data.name_1).scalar()
    drug2 = db.query(Drug.farmaco).filter(Drug.medicamento == check_data.name_2).scalar()
    print(drug1)
    print(drug2)

    existing_interaction = db.query(Interaction).filter(
        or_(
            (Interaction.principio_ativo1 == drug1) & 
            (Interaction.principio_ativo2 == drug2),

            (Interaction.principio_ativo1 == drug2) & 
            (Interaction.principio_ativo2 == drug1)
        )
    ).first()

    if not existing_interaction:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Esta interação não existe."
        )
    else:
        return {"message": "Interação medicamentosa existente", "interação =": existing_interaction}