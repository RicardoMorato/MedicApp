from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.interactions import InteractionCall
from controllers.interactions import check_interactions

router = APIRouter()

@router.post("/interactions/check-pharm-interaction", status_code=status.HTTP_201_CREATED)
def check_drugs(drug: InteractionCall, db: Session = Depends(get_db)):
    return check_interactions(db, drug)
