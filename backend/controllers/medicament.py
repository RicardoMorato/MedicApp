from sqlalchemy.orm import Session
from schemas.medicament import MedicamentResponse
from models import Drug
from utils.pascal_case import to_pascal_case
from sqlalchemy import or_

def search_medicaments(db: Session, name: str, skip: int, limit: int):
    base_query = db.query(Drug).order_by(Drug.medicamento)

    if name:
        base_query = base_query.filter(
            or_(
                Drug.medicamento.ilike(f"%{name}%"),
                Drug.farmaco.ilike(f"%{name}%")
            )
        )

    total_count = base_query.count()

    paginated_query = base_query.offset(skip).limit(limit)
    medicamentos = paginated_query.all()

    for med in medicamentos:
        med.medicamento = to_pascal_case(med.medicamento)

    return {
        "total": total_count,
        "items": [MedicamentResponse.from_orm(med) for med in medicamentos]
    }


