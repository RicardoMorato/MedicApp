from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MedicamentResponse(BaseModel):
    id: int
    name: str
    principio_ativo: str
    is_generic: bool
    brand: Optional[str] = None
    active: bool
    total: Optional[int] = None
    taked: Optional[int] = None
    created_at: datetime
