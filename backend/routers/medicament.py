from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas.medicament import MedicamentResponse
from controllers.medicament import search_medicaments

router = APIRouter(prefix="/medicamentos")

from fastapi import Query

@router.get("/search/", response_model=list[MedicamentResponse])
def search_medicamentos(termo: str, db: Session = Depends(get_db), skip: int = Query(0, ge=0), limit: int = Query(10, le=100)):
    try:
        medicamentos = search_medicaments(db, termo, skip=skip, limit=limit)
        return medicamentos
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
