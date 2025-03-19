from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from controllers import user_drugs as controller  
from database import get_db
from schemas import user_drugs as schema
from dependencies.auth_dependency import get_current_user

router = APIRouter(prefix="/drugs")

@router.post("/users/{user_id}/drugs/", status_code=status.HTTP_201_CREATED)
def add_drug_to_user(user_id: str, drug: schema.DrugCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return controller.add_drug_to_user(db, user_id, drug)
