from pydantic import BaseModel
from typing import Optional

class DrugCreate(BaseModel):
    name: str
    principio_ativo: str
    is_generic: bool
    brand: Optional[str] = None

    class Config:
        from_attributes = True