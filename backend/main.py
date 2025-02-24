from fastapi import FastAPI
from routers import medicament, user

app = FastAPI()

app.include_router(medicament.medicament_router)
app.include_router(user.user_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
