from pydantic import BaseModel

class MedicamentResponse(BaseModel):
    id: int
    farmaco: str
    detentor: str
    medicamento: str
    registro: int
    concentracao: str
    forma_farmaceutica: str
    data_inclusao: str

    class Config:
        orm_mode = True 
        from_attributes = True 
