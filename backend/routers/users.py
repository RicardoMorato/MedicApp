from fastapi import APIRouter, Depends
from controllers import users as controller
from database import get_db
from sqlalchemy.orm import Session
from schemas import users as schema

router = APIRouter(prefix="/users")


@router.post("/signup")
def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    return controller.create_new_user(db, user)
    # return "user created"

@router.post("/login")
def login_user(login: schema.UserLogin, db: Session = Depends(get_db)):
    return controller.login_user(db, login)