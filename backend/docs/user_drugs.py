from schemas.error_response import ErrorResponse, ValidationErrorResponse

response_user_drug_create={
    201: {
    "description": "Medicamento cadastrado com sucesso",
    },
    400: {
        "model": ErrorResponse,
        "description": "Medicamento do usuário já foi cadastrado",
        "content": {
            "application/json": {
                "example": {
                    "detail": "Este medicamento já está cadastrado"
                }
            }
        }
    },
    422: {
            "model": ValidationErrorResponse,
            "description": "Erro de validação nos dados fornecidos.",
    }
    }

description_user_drug_create = """
**Descrição da rota:**
Esta rota permite cadastrar um novo medicamento no sistema e associá-lo a um usuário específico identificado pelo `user_id`.

**Regras de autorização:**

- A operação só pode ser realizada pelo **próprio usuário autenticado**..
"""


response_user_drug_list={
    200: {
    "description": "Busca pelos medicamentos",
    },
    422: {
            "model": ValidationErrorResponse,
            "description": "Erro de validação nos dados fornecidos.",
    }
    }
    
description_user_drug_list = """
**Descrição da rota:**

Retorna os medicamentos cadastrados pelo usuário autenticado, com possibilidade de filtragem por nome ou fármaco.

**Regras de autorização:**

- A operação só pode ser realizada pelo **próprio usuário autenticado**.
- O `user_id` deve corresponder ao usuário autenticado. Caso contrário, o acesso a lista será negado.
"""


response_user_drug_delete={
    204: {
    "description": "Medicamento deletado com sucesso",
    },
    404: {
        "model": ErrorResponse,
        "description": "Medicamento pra ser deletado não foi encontrado",
        "content": {
            "application/json": {
                "example": {
                    "detail": "Medicamento não encontrado"
                }
            }
        }
    },
    422: {
            "model": ValidationErrorResponse,
            "description": "Erro de validação nos dados fornecidos.",
    }
    }

description_user_drug_delete = """
**Descrição da rota:**

Deleta o medicamento criado pelo usuário do banco de dados.

**Regras de autorização:**

- A operação só pode ser realizada pelo **próprio usuário autenticado**.
- A tentativa de deletar uma associação que não pertence ao usuário resultará em um erro de medicamento não encontrado.
"""