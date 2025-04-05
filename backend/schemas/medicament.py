from pydantic import BaseModel, Field
from typing import List

class MedicamentResponse(BaseModel):
    id: int = Field(
        ...,
        title="ID do Medicamento",
        description="Identificador único do medicamento no sistema.",
        example=123
    )
    farmaco: str = Field(
        ...,
        title="Fármaco",
        description="Nome do princípio ativo do medicamento.",
        example="Paracetamol"
    )
    detentor: str = Field(
        ...,
        title="Detentor",
        description="Nome do laboratório ou empresa detentora do registro.",
        example="Medley S/A"
    )
    medicamento: str = Field(
        ...,
        title="Medicamento",
        description="Nome comercial do medicamento.",
        example="Tylenol"
    )
    registro: int = Field(
        ...,
        title="Registro",
        description="Número de registro do medicamento na Anvisa.",
        example=123456789
    )
    concentracao: str = Field(
        ...,
        title="Concentração",
        description="Dosagem ou quantidade do princípio ativo no medicamento.",
        example="500mg"
    )
    forma_farmaceutica: str = Field(
        ...,
        title="Forma Farmacêutica",
        description="Forma de apresentação do medicamento.",
        example="Comprimido"
    )
    data_inclusao: str = Field(
        ...,
        title="Data de Inclusão",
        description="Data em que o medicamento foi adicionado ao sistema.",
        example="2024-03-15"
    )

    class Config:
        orm_mode = True
        from_attributes = True
    

class MedicamentListResponse(BaseModel):
    total: int = Field(
        ...,
        title="Total de medicamentos",
        description="Retorna o tamanho total da lista de medicamentos",
        example=1
    )
    items: List[MedicamentResponse] = Field(
        ...,
        title="Lista de Medicamentos",
        description="Retorna a lista de todos os medicamentos",
        example=[
    {
      "id": 1253,
      "farmaco": "paracetamol",
      "detentor": "Halex Istar",
      "medicamento": "Halexminophen",
      "registro": 103110178,
      "concentracao": "10 mg/mL",
      "forma_farmaceutica": "sol infus",
      "data_inclusao": "02/09/2022"
    }
    ]
    )