#!/bin/bash

# Cria o banco de dados SQLite se não existir
if [ ! -f /app/test_db.db ]; then
    echo "Criando o banco de dados SQLite..."
    touch /app/test_db.db
fi

# Roda os testes com pytest
pytest -vvv --disable-pytest-warnings --log-cli-level=INFO
