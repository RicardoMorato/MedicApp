from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
<<<<<<< HEAD
from schemas.interactions import InteractionCall
from controllers.interactions import check_interactions

router = APIRouter()


@router.post("/interactions", status_code=status.HTTP_200_OK)
def check_drugs(drug: InteractionCall, db: Session = Depends(get_db)):
    return check_interactions(db, drug)
=======
from schemas.medicaments import MedicamentResponse

router = APIRouter()

@router.post("/interactions/add", status_code=status.HTTP_201_CREATED)
def add_drug(drug: MedicamentResponse, db: Session = Depends(get_db)):
    return controller(db, drug)
>>>>>>> 735361f (feat: creating schemas and routers to the interactions creating)
