from fastapi import APIRouter, Depends, status
from controllers import users as controller
from database import get_db
from sqlalchemy.orm import Session
from schemas import users as schema
from dependencies.auth_dependency import Token
from docs.users import response_user_create, response_user_login, description_user_create, description_user_login

router = APIRouter(prefix="/users", tags=["User"])


@router.post(
    "/signup",
    summary="Cadastrar usuário",
    response_model=Token,
    status_code=status.HTTP_201_CREATED,
    responses=response_user_create,
    description=description_user_create
)
def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    return controller.create_new_user(db, user)


@router.post(
    "/login",
    summary="Login do usuário",
    response_model=Token,
    status_code=status.HTTP_201_CREATED,
    responses=response_user_login,
    description=description_user_login
)
def login_user(login: schema.UserLogin, db: Session = Depends(get_db)):
    return controller.login_user(db, login)
