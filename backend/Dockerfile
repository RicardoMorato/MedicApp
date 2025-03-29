FROM python:3.9

WORKDIR /app

# Copia apenas o arquivo requirements.txt primeiro
COPY requirements.txt /app/

# Instala as dependências
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Instala o SQLite
RUN apt-get update && apt-get install -y sqlite3 && rm -rf /var/lib/apt/lists/* \
    && sqlite3 --version

# Copia o restante dos arquivos
COPY . .

# Previne o erro "ModuleNotFoundError"
ENV PYTHONPATH=/app

# Torna o script executável
RUN chmod +x /app/start.sh

# Usa o script como ponto de entrada
CMD ["sh", "/app/start.sh"]