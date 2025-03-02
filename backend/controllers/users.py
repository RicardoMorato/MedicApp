from sqlalchemy.orm import Session
from models import User
from schemas import users as schema
from fastapi import HTTPException, status
from typing import Annotated
from utils.auth_utils import hash_password, verify_password, create_access_token


def create_new_user(db: Session, user: schema.UserCreate):
    user_exists = db.query(User).filter(User.email == user.email).first()

    if user_exists:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User already created",
            headers={"WWW-Authenticate": "Bearer"},
        )

    hashed_password = hash_password(user.password)

    new_user = User(name=user.name, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "Bearer"}

def login_user(db: Session, login: schema.UserLogin):
    user = db.query(User).filter(User.email == login.email).first()

    if not user or not verify_password(login.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": login.email})
    return {"access_token": access_token, "token_type": "Bearer"}