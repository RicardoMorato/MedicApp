from sqlalchemy.orm import Session
from models import User
from schemas import users as schema
import jwt
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


SECRET_KEY = "c6386616e9d837bc4a0ce79fef9469b1c34faa69d77bbebb826c1d131b1d9d21"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta= None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(db: Session, login):
    user = db.query(User).filter(User.email == login.email).first()
    if not user:
        return False
    if not verify_password(login.password, user.password):
        return False
    return user

def create_new_user(db: Session, user: schema.UserCreate):
    user_exists = authenticate_user(db, user)

    if user_exists:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User already created",
            headers={"WWW-Authenticate": "Bearer"},
        )

    hashed_password = get_password_hash(user.password)
    print(hashed_password)

    new_user = User(name=user.name, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "Bearer"}

def login_user(db: Session, login: schema.UserLogin):
    user = authenticate_user(db, login)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": login.email})
    return {"access_token": access_token, "token_type": "Bearer"}