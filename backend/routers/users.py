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
    description="""
**Descrição da rota:**

Cria um novo usuário a partir dos dados fornecidos: `nome`, `e-mail` e `senha`.
"""
)
def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    return controller.create_new_user(db, user)


@router.post(
    "/login",
    response_model=Token,
    status_code=status.HTTP_201_CREATED,
    description="""
**Descrição da rota:**

Realiza o login de um usuário previamente cadastrado utilizando `e-mail` e `senha`.

**Requisitos para autenticação:**

- O e-mail deve estar cadastrado no sistema.
- A senha deve corresponder à senha cadastrada para o usuário.
"""
)
def login_user(login: schema.UserLogin, db: Session = Depends(get_db)):
    return controller.login_user(db, login)
