from fastapi import APIRouter, HTTPException, status
from schemas.user import UserCreate, UserResponse  

user_router = APIRouter()

@user_router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate):
    if len(user.password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A senha deve conter pelo menos 8 caracteres."
        )

    return UserResponse(name=user.name)  # Retorna a resposta formatada com o e-mail
