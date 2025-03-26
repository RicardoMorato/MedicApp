from sqlalchemy.orm import Session
from models import Interaction
from schemas.interactions import InteractionCall
from fastapi import HTTPException, status
from sqlalchemy import or_, and_


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
