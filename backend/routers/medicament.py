from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from database import get_db
from schemas.medicament import MedicamentResponse
from models import Drug
import re

router = APIRouter()

@router.get("/medicament/search/", status_code=status.HTTP_200_OK)
async def search_medicamentos_route(db: Session = Depends(get_db), name: str = Query(None), skip: int = Query(0, ge=0), limit: int = Query(100, ge=1, le=17000)):
    query = db.query(Drug).order_by(Drug.medicamento)

    if name:
        query = query.filter(Drug.medicamento.ilike(f"%{name}%"))
    else:
        query = query.offset(skip).limit(limit)

    medicamentos = query.all()

    for med in medicamentos:
        med.medicamento = to_pascal_case(med.medicamento)

    return [MedicamentResponse.from_orm(med) for med in medicamentos]

import re

def to_pascal_case(text: str) -> str:
    words = re.sub(r'[-_]', ' ', text).split()
    pascal_case_text = ' '.join(word.capitalize() for word in words)
    return pascal_case_text