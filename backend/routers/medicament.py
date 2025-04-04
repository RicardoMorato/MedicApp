from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from database import get_db
from controllers import medicament as controller

router = APIRouter(tags=["Medicaments"])

@router.get("/medicament/search/", status_code=status.HTTP_200_OK)
async def search_medicamentos_route(
    db: Session = Depends(get_db),
    name: str = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=17000)
):
    return controller.search_medicaments(db, name, skip, limit)
