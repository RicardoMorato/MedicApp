from fastapi import APIRouter, Depends, Header
from controllers import users as controller
from database import get_db
from sqlalchemy.orm import Session
from schemas import users as schema
from typing import Annotated
from dependencies.auth_dependency import get_current_user

router = APIRouter(prefix="/users")


@router.post("/signup")
def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    return controller.create_new_user(db, user)


@router.post("/login")
def login_user(login: schema.UserLogin, db: Session = Depends(get_db)):
    return controller.login_user(db, login)


def get_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Token missing")
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")

    token = authorization.split("Bearer ")[1]  # Extract the token part
    return token


@router.get("/me")
def get_user(current_user=Depends(get_current_user)):
    return current_user
