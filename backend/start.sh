#!/bin/sh

# Inicia o servidor FastAPI em segundo plano
uvicorn main:app --host 0.0.0.0 --port 80 &

# Aguarda alguns segundos para garantir que o servidor esteja rodando
sleep 5

# Executa as migrações do Alembic
alembic upgrade head

# Mantém o container ativo
wait
