# Build

Esse documento tem o objetivo de lhe ajudar a fazer o build e setup local do projeto. Ao fim desse walkthrough, você terá tanto o frontend quanto o backend funcionando localmente.

## Backend

### Pré-requisitos

- Python >= 3.10
- Pip >= 23.1.2

Entre no diretório do backend com:

```bash
cd backend
```

Esse será nosso diretório de trabalho padrão nessa seção.

### Criando um ambiente virtual

Antes de instalar as dependências, é recomendado iniciar um ambiente virtual Python localmente. Para isso, rode o seguinte comando no terminal:

```bash
python -m venv .venv
```

Isso irá criar uma pasta chamada `.venv` no seu diretório do backend. A inicialização do ambiente virtual irá depender do seu sistema operacional.

#### Linux ou MacOS

```bash
source .venv/bin/activate
```

#### Windows PowerShell

```bash
.venv\Scripts\Activate.ps1
```

#### Windows Bash

```bash
source .venv/Scripts/activate
```

### Instalando as dependências

As dependências do backend estão listadas no arquivo `requirements.txt`, para instalar as dependências do projeto a partir da raiz, faça:

```bash
pip install requirements.txt
```

### Rodando o projeto

Assim que todas as dependências estiverem instaladas, rode:

```bash
fastapi dev main.py
```

Isso iniciará o servidor [localmente na porta 8000](http://127.0.0.1:8000/). Para mais detalhes sobre os endpoints da API, você pode checar a documentação dela em [/docs](http://127.0.0.1:8000/docs) ou [/redoc](http://127.0.0.1:8000/redoc).

### Onde posso buscar ajuda

- Documentação do FastAPI
- Documentação do Python

## Frontend

### Pré-requisitos

- Python >= 3.10

### Instalando as dependências

### Rodando o projeto
