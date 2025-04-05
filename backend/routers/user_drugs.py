from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from controllers import user_drugs as controller  
from database import get_db
from schemas.user_drugs import DrugCreate, DrugCreateResponse, DrugResponse
from dependencies.auth_dependency import get_current_user
from typing import List

router = APIRouter(tags=["User Drugs"])

@router.post(
    "/users/{user_id}/drugs/",
    status_code=status.HTTP_201_CREATED,
    response_model= DrugCreateResponse,
    description= 
    """
**Descrição da rota:**
Esta rota permite cadastrar um novo medicamento no sistema e associá-lo a um usuário específico identificado pelo `user_id`.

**Requisitos para o cadastro**:

- O usuário deve estar autenticado via token JWT válido.
- O `user_id` deve ser válido.
- O corpo da requisição deve conter todos os campos obrigatórios corretamente preenchidos.

**Campos obrigatórios no corpo da requisição:**
- **name**: Nome comercial do medicamento. Exemplo: `"Tylenol"`
- **principio_ativo**: Substância ativa do medicamento. Exemplo: `"Paracetamol"`
- **concentracao**: Dosagem da substância ativa. Exemplo: `"500mg"`
"""
)
def add_drug(drug: DrugCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return controller.add_medicament_to_user(db, current_user, drug)


@router.get(
    "/user/{user_id}/medications/",
    status_code=status.HTTP_200_OK,
    response_model=List[DrugResponse],
    description=
"""
**Descrição da rota:**

Retorna os medicamentos cadastrados pelo usuário autenticado, com possibilidade de filtragem por nome ou fármaco.

**Regras de acesso:**

- Apenas usuários autenticados podem acessar esta rota.
- O `user_id` deve corresponder ao usuário autenticado. Caso contrário, o acesso será negado.

**Parâmetros da consulta:**

- `name` (opcional): Filtro pelo nome (ou parte do nome) do medicamento.
- `skip`: Quantidade de registros a serem ignorados (paginação). Mínimo: 0.
- `limit`: Número máximo de registros a retornar. Mínimo: 0, Máximo: 17.000.
"""
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
    status_code=status.HTTP_204_NO_CONTENT,
    description="""
**Descrição da rota:**

Deleta o medicamento criado pelo usuário do banco de dados.

**Regras de autorização:**

- A operação só pode ser realizada pelo **próprio usuário autenticado**.
- A tentativa de deletar uma associação que não pertence ao usuário resultará em um erro de medicamento não encontrado.
"""
)
def delete_drug(drug_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return controller.delete_user_drug(db, current_user, drug_id)
