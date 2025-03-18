from typing import Union

from fastapi import FastAPI, Depends
from pydantic import BaseModel
from routers.users import router as users_router
from routers.user_drugs import router as user_drugs
from database import get_db
from sqlalchemy.orm import Session
from models import User
from enviroment import origins
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(user_drugs)


class Medicament(BaseModel):
    name: str
    description: str
    price: float
    is_offer: Union[bool, None] = None


@app.get("/")
def read_root(db: Session = Depends(get_db)):
    return {"Hello": "World"}


@app.get("/medicaments/{medicament_id}")
def read_medicament(
    medicament_id: int, q: Union[str, None] = None, db: Session = Depends(get_db)
):
    return db.query(User).all()
    # return {"medicament_id": medicament_id, "q": q}


@app.put("/medicaments/{medicament_id}")
def update_medicament(medicament_id: int, medicament: Medicament):
    return {"medicament_id": medicament_id, "medicament_name": medicament.name}
