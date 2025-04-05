from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.interactions import InteractionCall, InteractionResult
from controllers import interactions as controller

router = APIRouter(tags=["Interactions"])


@router.post(
    "/interactions",
    summary="Verificar interação medicamentosa",
    response_model=InteractionResult,
    status_code=status.HTTP_200_OK,
    description="""
**Descrição da rota:**

Verifica a existência de interações medicamentosas entre dois fármacos informados.

A rota retorna informações detalhadas sobre a interação entre os princípios ativos dos medicamentos, caso exista.

**Fonte dos dados:**  

A lista de interações medicamentosas é retirada diretamente do site [greghi.com.br](https://greghi.com.br).
"""
)
def check_drugs(drug: InteractionCall, db: Session = Depends(get_db)):
    return controller.check_interactions(db, drug)
