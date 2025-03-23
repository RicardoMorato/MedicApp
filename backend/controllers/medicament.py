from sqlalchemy.orm import Session
from models import Drug
from fastapi import HTTPException
from schemas.medicament import MedicamentResponse
from sqlalchemy import or_

def search_medicaments(db: Session, termo: str, categoria: str = None, skip: int = 0, limit: int = 10):
    termo = f"%{termo}%"
    query = db.query(Drug).filter(Drug.medicamento.ilike(termo))

    medicamentos = query.offset(skip).limit(limit).all()

    if not medicamentos:
        raise HTTPException(status_code=404, detail="Nenhum medicamento encontrado.")

    return [MedicamentResponse.model_validate(med.__dict__) for med in medicamentos]
