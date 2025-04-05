from pydantic import BaseModel, Field
from uuid import UUID

class DrugCreate(BaseModel):
    name: str = Field(
        ...,
        title="Nome do Medicamento",
        description="Nome comercial do medicamento a ser cadastrado.",
        example="Tylenol"
    )
    principio_ativo: str = Field(
        ...,
        title="Princípio Ativo",
        description="Nome da substância farmacológica do medicamento.",
        example="Paracetamol"
    )
    concentracao: str = Field(
        ...,
        title="Concentração",
        description="Dosagem do princípio ativo presente no medicamento.",
        example="500mg"
    )

    class Config:
        orm_mode = True
        from_attributes = True



class DrugCreateResponse(BaseModel):
    message: str = Field(
        ...,
        title="Mensagem de Sucesso",
        description="Mensagem indicando que o medicamento foi cadastrado e associado ao usuário.",
        example="Medicamento cadastrado com sucesso e associado ao usuário!"
    )
    drug: DrugCreate = Field(
        ...,
        title="Medicamento Cadastrado",
        description="Objeto com os dados do medicamento recém cadastrado."
    )
    user_drug_association: UUID = Field(
        ...,
        title="ID do Usuário Associado",
        description="Identificador do usuário ao qual o medicamento foi vinculado.",
        example=42
    )


class DrugResponse(BaseModel):
    id:int = Field(
        ..., 
        title="ID", 
        description="Identificador único do medicamento.", 
        example=123)
    name: str = Field(
        ..., 
        title="Nome Comercial", 
        description="Nome comercial do medicamento.", 
        example="Paracetamol")
    principio_ativo: str = Field(
        ..., 
        title="Princípio Ativo", 
        description="Nome do princípio ativo do medicamento.", 
        example="Paracetamol")
    concentracao: str = Field(
        ..., 
        itle="Concentração", 
        description="Dosagem do princípio ativo.", 
        example="500mg")

    class Config:
        orm_mode = True 
        from_attributes = True 