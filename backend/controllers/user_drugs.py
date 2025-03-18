from sqlalchemy.orm import Session
from models import Drug
from schemas.user_drugs import DrugCreate

def add_medicament(db: Session, drug_data: DrugCreate):
    new_drug = Drug(
        name=drug_data.name,
        principio_ativo=drug_data.principio_ativo,
        is_generic=drug_data.is_generic,
        brand=drug_data.brand if not drug_data.is_generic else None
    )
    db.add(new_drug)
    db.commit()
    db.refresh(new_drug)
    return new_drug
