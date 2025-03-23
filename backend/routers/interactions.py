from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.interactions import InteractionsResponse
from controllers.interactions import add_interaction as controller

router = APIRouter()

@router.post("/interactions/add", status_code=status.HTTP_201_CREATED)
def add_drug(drug: InteractionsResponse, db: Session = Depends(get_db)):
    return controller(db, drug)