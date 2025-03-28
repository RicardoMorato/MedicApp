FROM python:3.9

WORKDIR /app

# Copia apenas o arquivo requirements.txt primeiro
COPY requirements.txt /app/

# Instala as dependências
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copia o restante dos arquivos
COPY . .

# Previne o erro "ModuleNotFoundError"
ENV PYTHONPATH=/app

# Torna o script executável
RUN chmod +x /app/start.sh

# Usa o script como ponto de entrada
CMD ["sh", "/app/start.sh"]