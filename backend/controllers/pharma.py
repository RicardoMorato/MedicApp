from sqlalchemy.orm import Session
from schemas.pharma import Pharma as Pharma_Schemas
from models import Pharma as Pharma_Models

def list_all_pharma(db: Session, name: str): 
    query = db.query(Pharma_Models)

    if name:
        query = query.filter(Pharma_Models.pharma_name.ilike(f"%{name}%"))
        
    pharma = query.all()

    return [Pharma_Schemas.from_orm(pha) for pha in pharma]