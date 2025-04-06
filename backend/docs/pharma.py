from schemas.error_response import ValidationErrorResponse

response_pharma_list={
    200: {
    "description": "Fármacos listados com sucesso",
    },
    422: {
            "model": ValidationErrorResponse,
            "description": "Erro de validação nos dados fornecidos.",
    }
    }

description_pharma_list = """
**Desrição da rota:**

Retorna uma lista de **fármacos** (medicamentos) cadastrados no sistema.  
Você pode filtrar os resultados pelo nome do fármaco utilizando o parâmetro `name`.

**Fonte dos dados:**  

A lista de fármacos é retirada diretamente do site [greghi.com.br](https://greghi.com.br), onde também é realizada a verificação de **interações medicamentosas** entre esses fármacos.
"""