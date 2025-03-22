from fastapi import FastAPI, Depends
from routers.users import router as users_router
from routers.user_drugs import router as user_drugs
from routers.medicament import router as pesquisar_medicamentos
from dependencies.auth_dependency import router as auth
from database import get_db
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(user_drugs)
app.include_router(auth)
app.include_router(pesquisar_medicamentos)


@app.get("/")
def read_root(db: Session = Depends(get_db)):
    return {"Hello": "World"}
