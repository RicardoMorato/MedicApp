from sqlalchemy.orm import Session
from models import User
from schemas import users as schema
import jwt
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status, Depends
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated
from utils.auth_utils import hash_password, verify_password, create_access_token


SECRET_KEY = "c6386616e9d837bc4a0ce79fef9469b1c34faa69d77bbebb826c1d131b1d9d21"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


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

def authorize_user(token):
    try: 
        payload =  jwt.decode(token, SECRET_KEY, algorithm=[ALGORITHM])
        username: str = payload.get("sub")

        user_exists = db.query(User).filter(User.email == login.email).first()

        if username is None or not user_exists:
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED,
                detail = "Invalid Token"
            )
        return {"login": username}

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")