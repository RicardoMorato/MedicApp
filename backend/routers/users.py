from fastapi import APIRouter, Depends, status
from controllers import users as controller
from database import get_db
from sqlalchemy.orm import Session
from schemas import users as schema
from dependencies.auth_dependency import Token
from schemas.error_response import ErrorResponse

router = APIRouter(prefix="/users", tags=["User"])


@router.post(
    "/signup",
    summary="Cadastrar usuário",
    response_model=Token,
    status_code=status.HTTP_201_CREATED,
        responses={
    201: {
    "description": "Recurso criado com sucesso.",
    },
    400: {
        "model": ErrorResponse,
        "description": "Erro de validação da senha. A senha não atende aos requisitos mínimos de segurança.",
        "content": {
            "application/json": {
                "example": {
                    "detail": "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial."
                }
            }
        }
    },
    401: {
        "model": ErrorResponse,
        "description": "Usuário ou senha inválidos",
        "content": {
            "application/json": {
                "example": {
                    "detail": "Usuário ou senha inválidos"
                }
            }
        }
    }
    },
    description="""
**Descrição da rota:**

Cria um novo usuário a partir dos dados fornecidos: `nome`, `e-mail` e `senha`.
"""
)
def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    return controller.create_new_user(db, user)


@router.post(
    "/login",
    summary="Login do usuário",
    response_model=Token,
    status_code=status.HTTP_201_CREATED,
    responses={
    201: {
    "description": "Usuário logado com sucesso.",
    },
    401: {
        "model": ErrorResponse,
        "description": "Usuário ou senha errados",
        "content": {
            "application/json": {
                "example": {
                    "detail": "Usuário ou senha inválidos"
                }
            }
        }
    }
    },
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
