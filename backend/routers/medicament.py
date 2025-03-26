from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from database import get_db
from schemas.medicament import MedicamentResponse 
from schemas.user_drugs import DrugCreate
from models import Drug, UserDrugs
from dependencies.auth_dependency import get_current_user

router = APIRouter()

@router.get("/medicament/search/", status_code=status.HTTP_200_OK)
async def search_medicamentos_route(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    medicamentos = db.query(Drug).all()
    user_data = vars(current_user)
    user_id = user_data.get("id")
    
    medicamentos = db.query(Drug).all()
    
    medicamentos_user = db.query(UserDrugs).filter(
        UserDrugs.user_id == user_id
    ).all()

    return {
        "medicamentos": [MedicamentResponse.from_orm(med) for med in medicamentos],
        "medicamentos_user": [DrugCreate.from_orm(med) for med in medicamentos_user]
    }
