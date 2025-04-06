from pydantic import BaseModel, Field
from typing import List, Any


class ErrorResponse(BaseModel):
    detail: str = Field(
        ...,
        title="Detalhamento do erro",
        description="Error Message",
        example="Detalhe do erro"
    )


class ValidationErrorItem(BaseModel):
    type: str = Field(
        ...,
        title="Tipo do erro",
        description="Identificador do tipo de erro ocorrido (por exemplo: 'value_error', 'missing', etc.).",
        example="missing"
    )
    loc: List[Any] = Field(
        ...,
        title="Localização do erro",
        description="Localização onde o erro ocorreu, como ['body', 'email'] ou ['query', 'id'].",
        example=["body", "email"]
    )
    msg: str = Field(
        ...,
        title="Mensagem do erro",
        description="Mensagem explicando o motivo do erro.",
        example="Campo obrigatório"
    )
    input: Any = Field(
        ...,
        title="Valor recebido",
        description="Valor fornecido pelo usuário que causou o erro (quando aplicável).",
        example={"name": "João"}
    )

class ValidationErrorResponse(BaseModel):
    detail: List[ValidationErrorItem] = Field(
        ...,
        title="Lista de erros",
        description="Lista contendo os detalhes de todos os erros de validação encontrados na requisição.",
        example=[
            {
                "type": "missing",
                "loc": ["body", "email"],
                "msg": "Campo obrigatório",
                "input": {"name": "João"}
            },
            {
                "type": "value_error",
                "loc": ["body", "password"],
                "msg": "Tipo de erro da Validação",
                "input": "123"
            }
        ]
    )