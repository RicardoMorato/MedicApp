# Como testar a API

No backend do MedicApp, utilizamos [Pytest](https://docs.pytest.org/en/8.3.x/index.html) para gerenciar o ciclo de vida de testes, tanto para testes unitários quanto para testes de integração.

## Como rodar os testes localmente

### Subir o ambiente local

Após subir o container de desenvolvimento local com o comando (certifique-se que esteja dentro da pasta `backend`):

```bash
docker compose up
```

Caso algum erro ocorra, por favor cheque nossas diretivas de [build](../BUILD.md)

### Executar os testes

Uma vez que o seu ambiente local esteja pronto para receber conexões, rode o comando abaixo:

```bash
docker exec -it MedicaAppApi /bin/bash
```

Isso deve lhe dar acesso ao `shell` do contêiner.

Agora, basta rodar o comando de testes do pytest:

```bash
pytest -vvv --disable-pytest-warnings
```

Esse comando irá:

- Rodar todos os testes da aplicação (`pytest`)
- Ser o mais verboso possível caso qualquer erro aconteça (`-vvv`)
- Desabilitar `warnings` advindos do próprio pytest (`--disable-pytest-warnings`)

# Como testar o Front-end

No Front-end do MedicApp, utilizamos a [React Native Testing Library](https://callstack.github.io/react-native-testing-library/), um wrapper em cima da React Testing Library e em cima do Jest, que facilita o gerenciamento do ciclo de vida de testes em ambientes mobile.

## Como rodar os testes localmente

### Instalar as dependências

Instale as dependências (certifique-se que esteja dentro da pasta `frontend`):

```bash
npm install
```

Caso algum erro ocorra, por favor cheque nossas diretivas de [build](../BUILD.md)

### Rodando o Jest

Por fim, rode o comando abaixo:

```bash
npx jest
```
