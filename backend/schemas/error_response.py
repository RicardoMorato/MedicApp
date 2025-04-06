from pydantic import BaseModel, Field


class ErrorResponse(BaseModel):
    detail: str = Field(
        ...,
        title="Detalhamento do erro",
        description="Aqui é onde será representada a mensagem do erro",
        example="Detalhe do erro"
    )