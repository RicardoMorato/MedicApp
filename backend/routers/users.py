from fastapi import APIRouter, Depends, status
from controllers import users as controller
from database import get_db
from sqlalchemy.orm import Session
from schemas import users as schema

router = APIRouter(prefix="/users", tags=["User"])


@router.post("/signup", status_code=status.HTTP_201_CREATED)
def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    return controller.create_new_user(db, user)


@router.post("/login", status_code=status.HTTP_201_CREATED)
def login_user(login: schema.UserLogin, db: Session = Depends(get_db)):
    return controller.login_user(db, login)
