from typing import List
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from database import get_db
from controllers import pharma as controller
from schemas.pharma import Pharma
from docs.pharma import response_pharma_list, description_pharma_list

router = APIRouter(tags=["Pharmaceuticals"])

@router.get(
    "/pharma",
    summary="Listagem de fármacos",
    response_model=List[Pharma],
    status_code=status.HTTP_200_OK,
    responses=response_pharma_list,
    description=description_pharma_list
)
async def pharma(
    db: Session = Depends(get_db),
    name: str = Query(
        default=None,
        title="Nome do fármaco",
        description="Filtra os resultados retornando apenas fármacos cujo nome contenha esse valor.",
        example="Dipirona"
    )
):
    return controller.list_all_pharma(db, name)
