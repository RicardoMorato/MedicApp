from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()



class Medicament(BaseModel):
    name: str
    description: str
    price: float
    is_offer: Union[bool, None] = None


@app.get("/")
def read_root(db: Session = Depends(get_db)):
    # return db.query(User).all()
    return {"Hello": "World"}


@app.get("/medicaments/{medicament_id}")
def read_medicament(medicament_id: int, q: Union[str, None] = None, db: Session = Depends(get_db)):
    return db.query(User).all()
    # return {"medicament_id": medicament_id, "q": q}


@app.put("/medicaments/{medicament_id}")
def update_medicament(medicament_id: int, medicament: Medicament):
    return {"medicament_id": medicament_id, "medicament_name": medicament.name}
