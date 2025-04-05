from typing import List
from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from database import get_db
from controllers import pharma as controller
from schemas.pharma import Pharma

router = APIRouter(tags=["Pharmaceuticals"])

@router.get(
    "/pharma",
    response_model=List[Pharma],
    status_code=status.HTTP_200_OK,
    summary="Lista os fármacos cadastrados",
    description="""
**Desrição da rota:**

Retorna uma lista de **fármacos** (medicamentos) cadastrados no sistema.  
Você pode filtrar os resultados pelo nome do fármaco utilizando o parâmetro `name`.

**Fonte dos dados:**  

A lista de fármacos é retirada diretamente do site [greghi.com.br](https://greghi.com.br), onde também é realizada a verificação de **interações medicamentosas** entre esses fármacos.
"""
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
