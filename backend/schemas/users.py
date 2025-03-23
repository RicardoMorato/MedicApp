from pydantic import BaseModel, EmailStr, validator
from fastapi import HTTPException, status
import re

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

    @validator('password')
    def validate_password(cls, password: str):
        password_regex = r'^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+={}:;,.<>?/-]).{8,}$'

        if not re.match(password_regex, password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial."
                )
            )

        return password
class UserLogin(BaseModel):
    email: EmailStr
    password: str