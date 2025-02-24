from pydantic import BaseModel

class Medicament(BaseModel):
    name: str
    description: str
    price: float
    is_offer: bool | None = None
