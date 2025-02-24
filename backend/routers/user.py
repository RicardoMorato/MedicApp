from fastapi import APIRouter, HTTPException, status

user_router = APIRouter()

@user_router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user():
    return {"message": "Usuário registrado com sucesso!"}
