from pydantic import BaseModel, validator, Field
from fastapi import HTTPException, status
import re

class UserBase(BaseModel):
    name: str = Field(
        ...,
        title="Nome completo",
        description="Nome completo do usuário que será cadastrado.",
        example="João da Silva"
    )

    email: str = Field(
        ...,
        title="E-mail do usuário",
        description="Endereço de e-mail válido que será usado para login.",
        example="joao@email.com"
    )


class UserCreate(UserBase):
    password: str = Field(
        ...,
        title="Senha segura",
        description=(
            "Senha do usuário. Deve conter no mínimo 8 caracteres, incluindo:\n"
            "- Uma letra maiúscula\n"
            "- Uma letra minúscula\n"
            "- Um caractere especial"
        ),
        example="Senha@123"
    )

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
    email: str
    password: str
