from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from database import get_db
from schemas.pharma import Pharma as Pharma_Schemas
from models import Pharma as Pharma_Models

router = APIRouter(tags=["Pharmaceuticals"])

@router.get("/pharma", status_code=status.HTTP_200_OK)
async def pharma(db: Session = Depends(get_db), name: str = Query(None)):

    query = db.query(Pharma_Models)

    if name:
        query = query.filter(Pharma_Models.pharma_name.ilike(f"%{name}%"))
        
    pharma = query.all()

    return [Pharma_Schemas.from_orm(pha) for pha in pharma]