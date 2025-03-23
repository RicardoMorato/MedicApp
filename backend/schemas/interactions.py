from pydantic import BaseModel

class InteractionsResponse(BaseModel):
    principio_ativo1: str
    principio_ativo2: str
    gravidade_interacao: str
    inicio_interacao: int
    probabilidade_ocorrencia: str
    efeito: str