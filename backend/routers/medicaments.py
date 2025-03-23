from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.medicaments import MedicamentResponse, MedicamentCall
from controllers.medicaments import add_medicament as controller  
from controllers.interactions import check_interactions 
router = APIRouter()

@router.post("/drugs/add", status_code=status.HTTP_201_CREATED)
def add_drug(drug: MedicamentResponse, db: Session = Depends(get_db)):
    return controller(db, drug)

@router.post("/drug/check drug interaction", status_code=status.HTTP_201_CREATED)
def check_drugs(drug: MedicamentCall, db: Session = Depends(get_db)):
    return check_interactions(db, drug)