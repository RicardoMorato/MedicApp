from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.interactions import InteractionCall, InteractionResult
from controllers import interactions as controller

router = APIRouter(tags=["Interactions"])


@router.post(
    "/interactions",
    response_model=InteractionResult,
    status_code=status.HTTP_200_OK,
    description="""
**Descrição da rota:**

Verifica a existência de interações medicamentosas entre dois fármacos informados.

A rota retorna informações detalhadas sobre a interação entre os princípios ativos dos medicamentos, caso exista.

**Fonte dos dados:**  

A lista de interações medicamentosas é retirada diretamente do site [greghi.com.br](https://greghi.com.br).

**Campos obrigatórios:**

- `name_1`: Nome do primeiro princípio ativo
- `name_2`: Nome do segundo princípio ativo

**Resposta bem-sucedida (`200 OK`):**

Retorna um objeto contendo:

- `principio_ativo1`: Nome do primeiro princípio ativo
- `principio_ativo2`: Nome do segundo princípio ativo
- `gravidade_interacao`: Grau de severidade da interação (ex: leve, moderada, grave)
- `inicio_interacao`: Tempo estimado para o início da interação (em horas)
- `probabilidade_ocorrencia`: Nível de probabilidade da interação ocorrer
- `efeito`: Descrição do efeito da interação entre os medicamentos
"""
)
def check_drugs(drug: InteractionCall, db: Session = Depends(get_db)):
    return controller.check_interactions(db, drug)
