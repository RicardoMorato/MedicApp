from sqlalchemy.orm import Session
from models import Interaction
from schemas.interactions import InteractionsResponse
from fastapi import HTTPException, status

def add_interaction(db: Session, interaction_data: InteractionsResponse):
    existing_interaction = db.query(Interaction).filter(
        Interaction.principio_ativo1 == interaction_data.principio_ativo1, Interaction.principio_ativo2 == interaction_data.principio_ativo2
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
