from schemas.error_response import ValidationErrorResponse

response_medicament = {
    200: {
    "description": "Medicamentos listados com sucesso",
    },
    422: {
            "model": ValidationErrorResponse,
            "description": "Erro de validação nos dados fornecidos.",
    }
    }

description_medicament = """
**Descrição da rota:**

Busca pelos medicamentos ou fármacos via nome informado (total ou parcial) e retorna os dados principais relacionados ao produto.

**Fonte dos dados:**  

A lista de medicamentos do tipo A é retirada diretamente do site oficial da ANVISA.
"""