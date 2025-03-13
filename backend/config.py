from pydantic_settings import BaseSettings

SECRET_KEY = "c6386616e9d837bc4a0ce79fef9469b1c34faa69d77bbebb826c1d131b1d9d21"
ALGORITHM = "HS256"


class Settings(BaseSettings):
    db_user: str
    db_password: str
    db_name: str
    db_host: str
    db_port: int
