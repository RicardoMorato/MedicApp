from fastapi import FastAPI
from routers import medicament  

app = FastAPI()

app.include_router(medicament.router)
