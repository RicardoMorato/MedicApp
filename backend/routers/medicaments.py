from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.medicaments import MedicamentResponse
from controllers.medicaments import add_medicament as controller  
from dependencies.auth_dependency import get_current_user

router = APIRouter(prefix="/users", tags=["Medicamentos"])

@router.post("/{user_id}/drugs/", status_code=status.HTTP_201_CREATED)
def add_drug(drug: MedicamentResponse, db: Session = Depends(get_db)):
    return controller.add_medicament(db, drug)