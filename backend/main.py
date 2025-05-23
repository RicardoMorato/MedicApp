from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_redoc_html
from routers.users import router as users_router
from routers.user_drugs import router as user_drugs
from routers.medicament import router as pesquisar_medicamentos
from routers.interactions import router as interactions
from routers.pharma import router as pharma
from dependencies.auth_dependency import router as auth

app = FastAPI(docs_url="/swagger", redoc_url="/")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(user_drugs)
app.include_router(pesquisar_medicamentos)
app.include_router(interactions)
app.include_router(pharma)
app.include_router(auth)


@app.get("/redoc", include_in_schema=False)
async def custom_redoc():
    return get_redoc_html(
        openapi_url="https://api.medicapp.digital/openapi.json",  # Corrige erro por conta do proxy reverso do NGINX
        title="Documentação MedicaApp",
    )
