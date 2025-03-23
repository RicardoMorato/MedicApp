from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.medicaments import MedicamentResponse

router = APIRouter()

@router.post("/interactions/add", status_code=status.HTTP_201_CREATED)
def add_drug(drug: MedicamentResponse, db: Session = Depends(get_db)):
    return controller(db, drug)