from pydantic import BaseModel
from typing import Optional

class DrugCreate(BaseModel):
    name: str
    active_principle: str
    is_generic: bool
    brand: Optional[str] = None

    class Config:
        orm_mode = True
