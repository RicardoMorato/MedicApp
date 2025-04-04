from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.orm import Session
from database import get_db
from controllers import pharma as controller

router = APIRouter(tags=["Pharmaceuticals"])

@router.get("/pharma", status_code=status.HTTP_200_OK)
async def pharma(db: Session = Depends(get_db), name: str = Query(None)):
    return controller.list_all_pharma(db, name)