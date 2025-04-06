from schemas.error_response import ErrorResponse, ValidationErrorResponse

response_user_create = {
    201: {
        "description": "Recurso criado com sucesso.",
    },
    400: {
        "model": ErrorResponse,
        "description": "Erro de requerimentos da senha",
        "content": {
            "application/json": {
                "example": {
                    "detail": "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial."
                }
            }
        }
    },
    401: {
        "model": ErrorResponse,
        "description": "Usuário com email já cadastrado",
        "content": {
            "application/json": {
                "example": {
                    "detail": "Um usuário com esse email já foi cadastrado"
                }
            }
        }
    },
    422: {
        "model": ValidationErrorResponse,
        "description": "Erro de validação nos dados fornecidos.",
    }
}

description_user_create="""
**Descrição da rota:**

Cria um novo usuário a partir dos dados fornecidos: `nome`, `e-mail` e `senha`.
"""

response_user_login = {
    201: {
    "description": "Usuário logado com sucesso.",
    },
    401: {
        "model": ErrorResponse,
        "description": "Email ou senha inválidos",
        "content": {
            "application/json": {
                "example": {
                    "detail": "Usuário ou senha inválido"
                }
            }
        }
    },
    422: {
            "model": ValidationErrorResponse,
            "description": "Erro de validação nos dados fornecidos.",
    }
    }

description_user_login="""
**Descrição da rota:**

Realiza o login de um usuário previamente cadastrado utilizando `e-mail` e `senha`.

**Requisitos para autenticação:**

- O e-mail deve estar cadastrado no sistema.
- A senha deve corresponder à senha cadastrada para o usuário.
"""