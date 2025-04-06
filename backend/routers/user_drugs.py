from fastapi import APIRouter, Depends, status, Query, Path
from sqlalchemy.orm import Session
from controllers import user_drugs as controller  
from database import get_db
from schemas.user_drugs import DrugCreate, DrugCreateResponse, DrugResponse
from docs.user_drugs import response_user_drug_list, response_user_drug_create, response_user_drug_delete, description_user_drug_create, description_user_drug_delete, description_user_drug_list
from dependencies.auth_dependency import get_current_user
from typing import List

router = APIRouter(tags=["User Drugs"])

@router.post(
    "/users/{user_id}/drugs/",
    summary="Adicionar medicamento do usuário",
    status_code=status.HTTP_201_CREATED,
    response_model= DrugCreateResponse,
    responses=response_user_drug_create,
    description=description_user_drug_create
)
def add_drug(drug: DrugCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return controller.add_medicament_to_user(db, current_user, drug)


@router.get(
    "/user/{user_id}/medications/",
    summary="Listar medicamentos do usuário",
    status_code=status.HTTP_200_OK,
    response_model=List[DrugResponse],
    responses=response_user_drug_list,
    description=description_user_drug_list
)
async def search_user_medications_route(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
    name: str = Query(
        None,
        title="Nome do Medicamento",
        description="Nome (ou parte do nome) do medicamento a ser buscado.",
        example="Ibuprofeno"
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
        ge=0,
        le=17000,
        title="Limite de resultados",
        description="Número máximo de medicamentos a serem retornados.",
        example=20
    )
):
    return controller.search_medicament_user(db, current_user, name, skip, limit)

@router.delete(
    "/users/{user_id}/drugs/{drug_id}",
    summary="Deletar medicamentos do usuário",
    status_code=status.HTTP_204_NO_CONTENT,
    responses=response_user_drug_delete,
    description=description_user_drug_delete
)
def delete_drug(drug_id: int = Path(
        ...,
        title="ID do medicamento do usuário",
        description="ID no banco de dados do medicamento cadastrado pelo usuário",
        example=10), 
        db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return controller.delete_user_drug(db, current_user, drug_id)
