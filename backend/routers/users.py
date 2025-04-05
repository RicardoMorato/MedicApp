from fastapi import APIRouter, Depends, status
from controllers import users as controller
from database import get_db
from sqlalchemy.orm import Session
from schemas import users as schema
from dependencies.auth_dependency import Token

router = APIRouter(prefix="/users", tags=["User"])


@router.post(
    "/signup",
    response_model=Token,
    status_code=status.HTTP_201_CREATED,
    summary="Cria um novo usuário no sistema",
    description="""
**Descrição da rota:**

Cria um novo usuário a partir dos dados fornecidos: `nome`, `e-mail` e `senha`.

**Regras de validação da senha:**

- Mínimo de **8 caracteres**
- Pelo menos **1 letra maiúscula**
- Pelo menos **1 letra minúscula**
- Pelo menos **1 caractere especial** (ex: `@!#%`)

**Campos obrigatórios:**

- `name`: Nome do usuário
- `email`: E-mail válido e único
- `password`: Senha que obedeça às regras acima

**Respostas de erro possíveis:**

- `400 Bad Request` — A senha não atende aos critérios de segurança.
- `401 Unauthorized` — Tentar criar usuário já existente.
- `422 Unprocessable Entity` — Campos ausentes ou com formato inválido.
"""
)
def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    return controller.create_new_user(db, user)


@router.post("/login", status_code=status.HTTP_201_CREATED)
def login_user(login: schema.UserLogin, db: Session = Depends(get_db)):
    return controller.login_user(db, login)
