from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.user_drugs import DrugCreate 
from dependencies.auth_dependency import get_current_user

router = APIRouter(prefix="/users", tags=["Medicamentos"])

@router.post("/{user_id}/drugs/", status_code=status.HTTP_201_CREATED)
def add_drug(drug: DrugCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return controller.add_medicament(db, current_user, drug)