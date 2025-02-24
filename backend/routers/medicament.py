from fastapi import APIRouter
from schemas.medicament import Medicament
from typing import Union

medicament_router = APIRouter()

@medicament_router.get("/medicaments/{medicament_id}")
def read_medicament(medicament_id: int, q: Union[str, None] = None):
    return {"medicament_id": medicament_id, "q": q}


@medicament_router.put("/medicaments/{medicament_id}")
def update_medicament(medicament_id: int, medicament: Medicament):
    return {"medicament_id": medicament_id, "medicament_name": medicament.name}

