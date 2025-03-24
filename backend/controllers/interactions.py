from sqlalchemy.orm import Session
from models import Interaction, Drug
from schemas.interactions import InteractionsResponse
from schemas.medicaments import MedicamentCall
from fastapi import HTTPException, status
from sqlalchemy import or_

def add_interaction(db: Session, interaction_data: InteractionsResponse):
    if existing_interaction(db,  interaction_data.principio_ativo1,  interaction_data.principio_ativo2):
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

def check_interactions(db: Session, interaction_data: MedicamentCall):
    drug1 = db.query(Drug.farmaco).filter(Drug.medicamento == interaction_data.name_1).first()
    drug2 = db.query(Drug.farmaco).filter(Drug.medicamento == interaction_data.name_2).first()
    drug1= drug1[0]  
    drug2 = drug2[0] 

    interaction = existing_interaction(db, drug1, drug2)

    if interaction:
        return {"message": "Interação medicamentosa existente", "interação =": interaction}
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Esta interação não existe."
        )

def existing_interaction(db: Session, drug1, drug2):
    existing_interaction = db.query(Interaction).filter(
        or_(
            (Interaction.principio_ativo1.ilike(f"%{drug1}%")) & 
            (Interaction.principio_ativo2.ilike(f"%{drug2}%")),
            
            (Interaction.principio_ativo1.ilike(f"%{drug2}%")) & 
            (Interaction.principio_ativo2.ilike(f"%{drug1}%"))
        )
    ).first()
    return existing_interaction