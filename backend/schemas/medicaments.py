from pydantic import BaseModel

class MedicamentResponse(BaseModel):
    farmaco: str
    detentor: str
    medicamento: str
    registro: int
    concentracao: str
    forma_farmaceutica: str
    data_inclusao: str