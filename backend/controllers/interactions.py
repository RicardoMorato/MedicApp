from sqlalchemy.orm import Session
from models import Interaction
from schemas.interactions import InteractionCall
from fastapi import HTTPException, status
from sqlalchemy import or_, and_

<<<<<<< HEAD
=======
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
>>>>>>> b043f2a (feat: check interaction if there is more than one Med in db)

def check_interactions(db: Session, interaction_data: InteractionCall):
    drug1 = interaction_data.name_1
    drug2 = interaction_data.name_2
    interaction = existing_interaction(db, drug1, drug2)

    if interaction:
        return {
            "message": "Interação medicamentosa existente",
            "interação": interaction,
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Esta interação não existe."
        )

def existing_interaction(db: Session, drug1, drug2):
    return (
        db.query(Interaction)
        .filter(
            or_(
                and_(
                    Interaction.principio_ativo1 == drug1,
                    Interaction.principio_ativo2 == drug2,
                ),
                and_(
                    Interaction.principio_ativo1 == drug2,
                    Interaction.principio_ativo2 == drug1,
                ),
            )
        )
        .first()
    )
