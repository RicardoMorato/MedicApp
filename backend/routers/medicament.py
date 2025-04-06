from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from database import get_db
from controllers import medicament as controller
from schemas.medicament import MedicamentListResponse
from schemas.error_response import ValidationErrorResponse

router = APIRouter(tags=["Medicaments"])

@router.get(
    "/medicament/search/",
    summary="Listagem de medicamentos",
    status_code=status.HTTP_200_OK,
    response_model=MedicamentListResponse,
    responses={
    200: {
    "description": "Medicamentos listados com sucesso",
    },
    422: {
            "model": ValidationErrorResponse,
            "description": "Erro de validação nos dados fornecidos.",
    }
    },
    description="""
**Descrição da rota:**

Busca pelos medicamentos ou fármacos via nome informado (total ou parcial) e retorna os dados principais relacionados ao produto.

**Fonte dos dados:**  

A lista de medicamentos do tipo A é retirada diretamente do site oficial da ANVISA.
"""
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
        example=0
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
