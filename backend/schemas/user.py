from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    name: str
    email: EmailStr 
    password: str = Field(min_length=8, description="A senha deve ter pelo menos 8 caracteres.")  

class UserResponse(BaseModel):
    name: str  
    message: str = "Usuário registrado com sucesso!" 