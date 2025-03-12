from fastapi import APIRouter, status
from schemas.user import UserCreate, UserResponse  

user_router = APIRouter()

@user_router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreate):
    return UserResponse(name=user.name)  
