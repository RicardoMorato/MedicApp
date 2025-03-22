from sqlalchemy.orm import Session
from models import UserDrugs
from fastapi import HTTPException
from schemas.medicament import MedicamentResponse

def search_medicaments(db: Session, termo: str):
    termo = f"%{termo}%"  
    medicamentos = db.query(UserDrugs).filter(
        (UserDrugs.name.ilike(termo))
    )

    if not medicamentos:
        raise HTTPException(status_code=404, detail="Nenhum medicamento encontrado.")

    return [MedicamentResponse.model_validate(med.__dict__) for med in medicamentos]

