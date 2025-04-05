from pydantic import BaseModel, Field

class Pharma(BaseModel):
    pharma_name: str = Field(..., description="Nome do fármaco", example="Dipirona")

    class Config:
        orm_mode = True
        from_attributes = True
        