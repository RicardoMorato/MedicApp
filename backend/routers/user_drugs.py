from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from controllers.user_drugs import add_medicament
from schemas.user_drugs import DrugCreate

router = APIRouter(prefix="/medicaments")

@router.post("/")
def create_medicament(drug_data: DrugCreate, db: Session = Depends(get_db)):
    return add_medicament(db, drug_data)