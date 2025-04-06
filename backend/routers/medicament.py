from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from database import get_db
from controllers import medicament as controller
from schemas.medicament import MedicamentListResponse
from docs.medicament import response_medicament, description_medicament

router = APIRouter(tags=["Medicaments"])

@router.get(
    "/medicament/search/",
    summary="Listagem de medicamentos",
    status_code=status.HTTP_200_OK,
    response_model=MedicamentListResponse,
    responses=response_medicament,
    description=description_medicament
)
async def search_medicamentos_route(
    db: Session = Depends(get_db),
    name: str = Query(
        None,
        title="Nome do Medicamento",
        description="Nome (ou parte do nome) do medicamento a ser buscado.",
        example="Paracetamol"
    ),
    skip: int = Query(
        0,
        ge=0,
        title="Pular registros",
        description="Número de registros a serem ignorados (útil para paginação).",
        example=1
    ),
    limit: int = Query(
        100,
        ge=1,
        le=17000,
        title="Limite de resultados",
        description="Número máximo de medicamentos a serem retornados.",
        example=50
    )
):
    return controller.search_medicaments(db, name, skip, limit)
