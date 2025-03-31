from pydantic import BaseModel

class Pharma(BaseModel):
    pharma_name: str 

    class Config:
        orm_mode = True
        from_attributes = True  