from schemas.error_response import ErrorResponse, ValidationErrorResponse

response_check_interaction = {
    200: {
    "description": "Interação medicamentosa existente",
    },
    404: {
        "model": ErrorResponse,
        "description": "Interação medicamentosa não foi encontrada",
        "content": {
            "application/json": {
                "example": {
                    "detail": "Esta interação não existe."
                }
            }
        }
    },
    422: {
            "model": ValidationErrorResponse,
            "description": "Erro de validação nos dados fornecidos.",
    }
    }

description_check_interactions = """
**Descrição da rota:**

Verifica a existência de interações medicamentosas entre dois fármacos informados.

A rota retorna informações detalhadas sobre a interação entre os princípios ativos dos medicamentos, caso exista.

**Fonte dos dados:**  

A lista de interações medicamentosas é retirada diretamente do site [greghi.com.br](https://greghi.com.br).
"""