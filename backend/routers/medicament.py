from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.medicament import MedicamentResponse
from controllers.medicament import search_medicaments

router = APIRouter(prefix="/medicamentos", tags=["Medicamentos"])

@router.get("/search/", response_model=list[MedicamentResponse])
def search_medicamentos(termo: str, db: Session = Depends(get_db)):
    try:
        medicamentos = search_medicaments(db, termo)
        return medicamentos
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
