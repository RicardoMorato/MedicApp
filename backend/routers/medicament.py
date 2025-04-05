from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from database import get_db
from controllers import medicament as controller
from schemas.medicament import MedicamentListResponse
from typing import List

router = APIRouter(tags=["Medicaments"])

@router.get(
    "/medicament/search/",
    status_code=status.HTTP_200_OK,
    response_model=MedicamentListResponse,
    summary="Buscar medicamentos por nome",
    description="""
**Descrição da rota:**

Busca medicamentos ou fármacos pelo nome informado (total ou parcial) e retorna os dados principais relacionados ao produto.

**Parâmetros da consulta:**

- `name` (opcional): Nome ou parte do nome do medicamento a ser pesquisado.
- `skip`: Quantidade de registros a serem pulados (para paginação). Mínimo 0.
- `limit`: Número máximo de registros a retornar. Mínimo 1, máximo 17.000.

**Campos retornados:**

- `id`: Identificador único do medicamento.
- `farmaco`: Nome do princípio ativo.
- `detentor`: Empresa detentora do registro.
- `medicamento`: Nome comercial.
- `registro`: Registro na Anvisa.
- `concentracao`: Dosagem do princípio ativo.
- `forma_farmaceutica`: Forma de apresentação.
- `data_inclusao`: Data de entrada no sistema.

**Respostas possíveis:**

- `200 OK` — Lista de medicamentos encontrados.
- `422 Unprocessable Entity` — Algum parâmetro da query está inválido.
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
