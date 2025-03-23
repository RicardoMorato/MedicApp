from pydantic import BaseModel

<<<<<<< HEAD
class InteractionsResponse(BaseModel):
=======
class MedicamentResponse(BaseModel):
>>>>>>> 735361f (feat: creating schemas and routers to the interactions creating)
    principio_ativo1: str
    principio_ativo2: str
    gravidade_interacao: str
    inicio_interacao: int
    probabilidade_ocorrencia: str
<<<<<<< HEAD
    efeito: str

class InteractionCall(BaseModel):
    name_1: str
    name_2: str
=======
    efeito: str
>>>>>>> 735361f (feat: creating schemas and routers to the interactions creating)
