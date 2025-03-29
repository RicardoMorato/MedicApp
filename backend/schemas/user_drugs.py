from pydantic import BaseModel

class DrugCreate(BaseModel):
    name: str
    principio_ativo: str
    concentracao: str 

