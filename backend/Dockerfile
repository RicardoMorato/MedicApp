FROM python:3.9

WORKDIR /app

COPY . .

# Previne o erro "ModuleNotFoundError"
ENV PYTHONPATH=/app

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Torna o script executável
RUN chmod +x /app/start.sh

# Usa o script como ponto de entrada
CMD ["sh", "/app/start.sh"]