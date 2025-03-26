from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.medicament import MedicamentResponse
from models import Drug

router = APIRouter()

@router.get("/medicament/search/", status_code=status.HTTP_200_OK)
async def search_medicamentos_route(db: Session = Depends(get_db)):
    medicamentos = db.query(Drug).all()
    return [MedicamentResponse.from_orm(med) for med in medicamentos]
