from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.interactions import InteractionCall
from controllers import interactions as controller

router = APIRouter(tags=["Interactions"])


@router.post("/interactions", status_code=status.HTTP_200_OK)
def check_drugs(drug: InteractionCall, db: Session = Depends(get_db)):
    return controller.check_interactions(db, drug)
