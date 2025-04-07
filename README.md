# MedicApp

![version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Continuous Deployment](https://github.com/RicardoMorato/MedicApp/actions/workflows/deploy.yml/badge.svg)
![Backend Tests](https://github.com/RicardoMorato/MedicApp/actions/workflows/run_tests_backend.yml/badge.svg)
![Frontend Tests](https://github.com/RicardoMorato/MedicApp/actions/workflows/run_tests_frontend.yml/badge.svg)
![License](https://img.shields.io/github/license/RicardoMorato/MedicApp)
[![Docs](https://img.shields.io/badge/docs-available-blue.svg)](https://docs.medicapp.digital)
![AWS](https://img.shields.io/badge/deploy-AWS-yellow.svg)

## Descrição

Um aplicativo que tem como objetivo permitir os usuários acessarem informações detalhadas sobre interações medicamentosas de maneira rápida e fácil, dados sobre medicamentos, incluindo composição e concentração de forma simples e prática.
Nossa solução foi pensada para dar maior autonomia e segurança aos pacientes e ao público em geral, promovendo o uso seguro e consciente de medicamentos.

### Tecnologias escolhidas :

| Tecnologia                   | Descrição                                            | Justificativa para o Uso                                                            |
| ---------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| TypeScript                   | Superset do JavaScript com tipagem estática          | Melhora a legibilidade, manutenção e reduz erros em tempo de desenvolvimento        |
| React Native                 | Framework para desenvolvimento mobile                | Permite criar aplicativos nativos para Android e iOS com uma única base de código   |
| Python                       | Linguagem de programação usada no backend            | Simples, expressiva e com vasta comunidade e bibliotecas                            |
| FastAPI                      | Framework web moderno para APIs em Python            | Rápido, eficiente e com documentação automática integrada                           |
| PostgreSQL                   | Banco de dados relacional                            | Robusto, seguro e com excelente suporte para dados estruturados                     |
| AWS (Amazon Web Services)    | Plataforma de serviços em nuvem                      | Escalável, confiável e amplamente adotada no mercado para deploy de aplicações      |
| GitHub Actions               | Ferramenta de CI/CD integrada ao GitHub              | Automatiza testes, builds e deploys diretamente a partir dos repositórios           |
| Pytest                       | Framework de testes em Python                        | Simples, flexível e adequado para testes automatizados de APIs e lógicas de negócio |
| React Native Testing Library | Biblioteca de testes para interfaces em React Native | Facilita a criação de testes focados na experiência do usuário                      |

## Funcionalidades

Abaixo está uma lista não extensiva das principais funcionalidades que daremos suporte na versão 1.0.0 do MedicApp. Para mais detalhes, por favor, consulte a seção de [Funcionalidades e Histórias de Usuário na Wiki](https://github.com/RicardoMorato/MedicApp/wiki/Funcionalidades-e-Hist%C3%B3rias-de-Usu%C3%A1rio).

- Cadastro de Usuários
- Cadastro de Medicamentos Por Parte do Usuário
- Pesquisa de Medicamentos e Fármacos
- Alertas de Interações Medicamentosas
- Perfil do usuário contendo suas informações essenciais

## Estrutura Organizacional

Os diagramas podem ser vistos também na pasta [diagrams](https://github.com/RicardoMorato/MedicApp/tree/main/diagrams), onde você pode ver o código-fonte que originou os diagramas C4 abaixo.

### Diagrama Entidade-Relacionamento:

<img width="706" alt="diagrama_ER" src="https://github.com/user-attachments/assets/81c7120f-1719-4266-ae17-1e8016d87e0e" />

### Diagramas C4

- Nível 1

![image](https://github.com/user-attachments/assets/16967cff-5a78-44fe-9206-4663642cc78f)

- Nível 2

![image](https://github.com/user-attachments/assets/de1aa9b5-e3cb-4c67-98e1-f9ccad1f0411)

- Nível 3

![image](https://github.com/user-attachments/assets/1d03b2ef-334a-417e-98cc-53b591f56785)



## Links para Recursos importantes

### Documentação

O MedicApp possui [uma Wiki](https://github.com/RicardoMorato/MedicApp/wiki)! Lá, você consegue informações sobre as funcionalidades que nosso aplicativo dá suporte, as tecnologias que estamos usando e porque optamos por elas, além das ferramentas e metodologias utilizadas no desenvolvimento do projeto. Sinta-se livre para propor atualizações na documentação, o MedicApp é de todos nós.

Além disso, o MedicApp também possuiu uma [Documentação Oficial](https://docs.medicapp.digital/), que contém todas as informações detalhadas das rotas da API, incluindo as respostas esperadas, os campos obrigatórios e não obrigatórios de entrada e o retorno da chamada da API.

Uma segunda opção de consulta a documentação do MedicApp é via [Swagger](https://api.medicapp.digital/swagger), onde além de poder visualizar as rotas, suas respostas e entradas esperadas, é possível testar elas!

### Figma

Desenvolvido pelo nosso Designer Eduardo Matos e com colaboração de Pedro Novaes e Weldon Pereira, utilizamos o figma para desenvolver as telas utilizadas e o prótotipo do nosso app: [Figma do Projeto](https://www.figma.com/design/3LQPNrQ7mijdTFiu6P2u1K/App-MedicApp?node-id=0-1&t=K4Qc69s2wt7yMr6o-1).

### Metodologia de Desenvolvimento Ágil

Para agilizar o nosso desenvolvimento, utilizamos o quadro kanban dentro do Github Projects para poder organizar nosso código de maneira que fique clara as tasks de cada desenvolvedor e como elas devem estar dentro do código: [Quadro Kanban do Projeto](https://github.com/users/RicardoMorato/projects/2).

## Guia para build local do sistema

Para ajudar a fazer a build e setup local do sistema, o MedicApp tem uma [BUILD.md](https://github.com/RicardoMorato/MedicApp/blob/main/BUILD.md), onde é ensinado tanto a como rodar o Backend como o Frontend do zero.

## Orientações sobre como Contribuir para o Projeto

Se você quer contribuir para o nosso projeto, o MedicApp tem um [CONTRIBUTING.md](https://github.com/RicardoMorato/MedicApp/blob/main/CONTRIBUTING.md), onde é passada orientações sobre como é possível contribuir para o nosso projeto.

## Orientações sobre como executar os Testes

Se você quer executar os testes, o MedicApp tem um [TESTING.md](https://github.com/RicardoMorato/MedicApp/blob/main/TESTING.md), onde é passada orientações sobre como é possível testar o nosso projeto.

## Autores do Projeto

- Eduardo Matos (Desenvolvedor Front-End e Designer UX/UI)
- Gabriel Mendonça (Desenvolvedor Back-End e responsável pelos Dados utilizados no projeto)
- João Antônio (Desenvolvedor Back-End, Responsável pelos testes e Documentador)
- Pedro Novaes (Desenvolvedor Full-Stack)
- Ricardo Morato (Gerente de Projeto, Desenvolvedor Back-End, Responsável pela Infraestrutura e Responsável pelos Testes)
- Weldon Pereira (Desenvolvedor Front-End)

## Licença

Este projeto está licenciado sob a Licença GNU General Public License v3.0 - veja o arquivo [LICENSE.md](LICENSE) para detalhes.
