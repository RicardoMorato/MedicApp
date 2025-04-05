from pydantic import BaseModel, Field

class InteractionsResponse(BaseModel):
    principio_ativo1: str = Field(
        ...,
        title="Princípio Ativo 1",
        description="Nome padronizado do primeiro princípio ativo envolvido na interação.",
        example="Paracetamol"
    )
    principio_ativo2: str = Field(
        ...,
        title="Princípio Ativo 2",
        description="Nome padronizado do segundo princípio ativo envolvido na interação.",
        example="Ibuprofeno"
    )
    gravidade_interacao: str = Field(
        ...,
        title="Gravidade da Interação",
        description="Nível de gravidade clínica da interação entre os medicamentos.",
        example="Moderada"
    )
    inicio_interacao: str = Field(
        ...,
        title="Início da Interação",
        description="Tempo estimado, em horas, para o início da interação medicamentosa.",
        example="12 horas"
    )
    probabilidade_ocorrencia: str = Field(
        ...,
        title="Probabilidade de Ocorrência",
        description="Chance estimada da interação ocorrer com base em estudos clínicos.",
        example="Alta"
    )
    efeito: str = Field(
        ...,
        title="Efeito da Interação",
        description="Descrição dos possíveis efeitos da interação medicamentosa.",
        example="Aumento do risco de sangramento gastrointestinal"
    )

class InteractionCall(BaseModel):
    name_1: str = Field(
        ...,
        title="Medicamento 1",
        description="Nome do primeiro medicamento ou princípio ativo a ser analisado.",
        example="Paracetamol"
    )
    name_2: str = Field(
        ...,
        title="Medicamento 2",
        description="Nome do segundo medicamento ou princípio ativo a ser analisado.",
        example="Ibuprofeno"
    )


class InteractionResult(BaseModel):
    message: str = Field(
        ...,
        title="message",
        description="Mensagem indicando que a interação foi encontrada com sucesso",
        example="Interação medicamentosa existente"
    )
    interação: InteractionsResponse = Field(
        ...,
        title="Interação",
        description="Mensagem retornando todos os dados da possível interação medicamentosa"
    )