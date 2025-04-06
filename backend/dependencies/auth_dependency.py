from datetime import datetime, timedelta, timezone
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from schemas.error_response import ErrorResponse, ValidationErrorResponse
import jwt
from passlib.context import CryptContext
from database import get_db
from models import User
from config import SECRET_KEY, ALGORITHM


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ACCESS_TOKEN_EXPIRE_MINUTES = 100

router = APIRouter(tags=["Token"])

class Token(BaseModel):
    access_token: str = Field(
        ...,
        title="Token do usuário",
        description="Token contendo informações do usuário como ID, nome e Email",
        example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZmMwNDg3Ni1jYmRhLTQwN2UtYjA3Mi0yZjVlZDNiMzMyYTQiLCJ0b2tlbl90eXBlIjoiQmVhcmVyIiwibmFtZSI6IkpvXHUwMGUzbyBkYSBTaWx2YSIsImVtYWlsIjoiam9hbzNAZW1haWwuY29tIiwiZXhwIjoxNzQzODg3MTg4fQ.orscdYQpnO04sO1qPVakNfdoFBTIQg4d8LrkpOEd-g4"
    )
    token_type: str =  Field(
        ...,
        title="Tipo do Token do usuário",
        description="Tipo do Token que contém informações do usuário como ID, nome e Email",
        example="Bearer"
    )


@router.post(
    "/token",
    response_model=Token,
    summary="Gerar token de acesso para autorização",
    status_code=status.HTTP_200_OK,
    responses={
    200: {
    "description": "Token Retornado com sucesso",
    },
    401: {
        "model": ErrorResponse,
        "description": "Erro de credencial ao verificar existência de usuário",
        "content": {
            "application/json": {
                "example": {
                    "detail": "Incorrect username or password",
                    "headers": {"WWW-Authenticate": "Bearer"}
                }
            }
        }
    },
    422: {
            "model": ValidationErrorResponse,
            "description": "Erro de validação nos dados fornecidos.",
    }
    },
    description="""
**Descrição da rota:**

Autentica um usuário via email e senha.

Se as credenciais estiverem corretas, retorna um token de acesso (JWT) que pode ser usado para autenticação nas próximas requisições.
"""
)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db) ) -> Token:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get("sub")
        if id is None:
            raise credentials_exception
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == id).first()
    if user is None:
        raise credentials_exception

    return user

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def hash_password(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta= None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(db: Session, username: str, password: str):
    user = get_user(db, username)  
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

def get_user(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()
