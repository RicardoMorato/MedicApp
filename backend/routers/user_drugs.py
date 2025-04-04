from fastapi import APIRouter, Depends, status, Query, HTTPException
from sqlalchemy.orm import Session
from controllers import user_drugs as controller  
from database import get_db
from schemas.user_drugs import DrugCreate
from dependencies.auth_dependency import get_current_user

router = APIRouter(tags=["User Drugs"])

@router.post("/users/{user_id}/drugs/", status_code=status.HTTP_201_CREATED)
def add_drug(drug: DrugCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return controller.add_medicament_to_user(db, current_user, drug)

@router.get("/user/{user_id}/medications/", status_code=status.HTTP_200_OK)
async def search_medicamentos_route(db: Session = Depends(get_db), current_user=Depends(get_current_user), name: str = Query(None), skip: int = Query(0, ge=0), limit: int = Query(100, ge=1, le=17000)):
    return controller.search_medicament_user(db, current_user, name, skip, limit)
