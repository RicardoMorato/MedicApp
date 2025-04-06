from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.interactions import InteractionCall, InteractionResult
from controllers import interactions as controller
from docs.interactions import response_check_interaction, description_check_interactions

router = APIRouter(tags=["Interactions"])


@router.post(
    "/interactions",
    summary="Verificar interação medicamentosa",
    response_model=InteractionResult,
    status_code=status.HTTP_200_OK,
    responses=response_check_interaction,
    description=description_check_interactions
)
def check_drugs(drug: InteractionCall, db: Session = Depends(get_db)):
    return controller.check_interactions(db, drug)
