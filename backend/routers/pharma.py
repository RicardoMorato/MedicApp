from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from database import get_db
from schemas.pharma import Pharma
from models import Pharma

router = APIRouter()

@router.get("/search/pharma/", status_code=status.HTTP_200_OK)
async def search_pharma(db: Session = Depends(get_db), name: str = Query(None)):

    if name:
        query = query.filter(Pharma.pharma_name.ilike(f"%{name}%"),)
        
    pharma = db.query(Pharma).all()

    return [Pharma.from_orm(med) for med in pharma]