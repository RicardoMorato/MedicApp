from fastapi import APIRouter, Depends, status, Query, HTTPException
from sqlalchemy.orm import Session
from controllers import user_drugs as controller  
from database import get_db
from schemas.user_drugs import DrugCreate, DrugResponse
from dependencies.auth_dependency import get_current_user
from models import UserDrugs
import re
from sqlalchemy import or_

router = APIRouter(tags=["User Drugs"])

@router.post("/users/{user_id}/drugs/", status_code=status.HTTP_201_CREATED)
def add_drug(drug: DrugCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return controller.add_medicament_to_user(db, current_user, drug)

@router.get("/user/{user_id}/medications/", status_code=status.HTTP_200_OK)
async def search_medicamentos_route(db: Session = Depends(get_db), current_user=Depends(get_current_user), name: str = Query(None), skip: int = Query(0, ge=0), limit: int = Query(100, ge=1, le=17000)):
    user_id = current_user.id
    query = db.query(UserDrugs).filter(UserDrugs.user_id == user_id).order_by(UserDrugs.name)

    if name:
        query = query.filter(
            or_(
                UserDrugs.name.ilike(f"%{name}%"),
                UserDrugs.principio_ativo.ilike(f"%{name}%")
               )
            )
    else:
        query = query.offset(skip).limit(limit)

    medicamentos = query.all()

    for med in medicamentos:
        med.medicamento = to_pascal_case(med.name)

    return [DrugResponse.from_orm(med) for med in medicamentos]


@router.delete("/users/{user_id}/drugs/{drug_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_drug(user_id: str, drug_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Você não tem permissão para deletar este medicamento")

    deleted = controller.delete_user_drug(db, user_id, drug_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Medicamento não encontrado")


    raise HTTPException(status_code=200, detail="Medicamento deletado com sucesso")


def to_pascal_case(text: str) -> str:
    words = re.sub(r'[-_]', ' ', text).split()
    pascal_case_text = ' '.join(word.capitalize() for word in words)
    return pascal_case_text