# Weather API 🌦️

API RESTful robusta desenvolvida com Node.js, TypeScript e PostgreSQL para consulta e histórico de dados climáticos. O projeto utiliza containerização completa e segue boas práticas de engenharia de software, incluindo SOLID, Clean Code e CI/CD.

## 🚀 Funcionalidades

Este projeto vai além de um simples CRUD, implementando funcionalidades de uma aplicação real pronta para produção:

*   **🌎 Consulta Climática:** Integração com a API externa OpenWeatherMap para buscar dados em tempo real.
*   **⚡ Cache Inteligente:** Implementação de estratégia de Caching em memória (TTL de 5 minutos). Se uma cidade já foi consultada recentemente, a API retorna os dados locais instantaneamente, economizando cotas da API externa e reduzindo a latência.
*   **💾 Persistência de Dados:** Histórico completo de todas as consultas salvas automaticamente em banco de dados PostgreSQL.
*   **🛡️ Validação Rigorosa (Zod):**
    *   Validação de entrada de dados (Payloads da API).
    *   Validação de Variáveis de Ambiente: A aplicação falha graciosamente na inicialização se alguma configuração crítica (como API Keys ou URL do Banco) estiver faltando, prevenindo erros silenciosos em produção.
*   **🐳 Containerização (Docker):** Ambiente de desenvolvimento completo (API + Banco de Dados + Interface de Banco) orquestrado via Docker Compose.
*   **🤖 CI/CD Automatizado:** Pipeline no GitHub Actions que executa a cada push/PR:
    *   Linting e Análise Estática.
    *   Verificação de Tipagem (Type Checking).
    *   Testes de Integração: Sobe containers reais do PostgreSQL e da API para validar o fluxo completo (E2E).
    *   Build da imagem Docker de produção.
*   **📄 Documentação Automática:** Swagger UI (OpenAPI 3.0) integrado e acessível via navegador.

## 🛠️ Stack Tecnológica

| Categoria       | Tecnologia    | Descrição                                                              |
| :-------------- | :------------ | :--------------------------------------------------------------------- |
| Runtime         | Node.js 20    | JavaScript runtime assíncrono orientado a eventos                      |
| Linguagem       | TypeScript    | Superset tipado do JavaScript para maior segurança                     |
| Framework       | Express       | Framework web rápido e minimalista                                     |
| ORM             | Prisma        | ORM moderno para Node.js e TypeScript                                  |
| Banco de Dados  | PostgreSQL 16 | Banco de dados relacional robusto (Alpine image)                       |
| Validação       | Zod           | Validação de esquemas TypeScript-first                                 |
| Infraestrutura  | Docker        | Containerização de aplicações                                          |
| CI/CD           | GitHub Actions| Automação de pipelines de teste e build                                |
| Docs            | Swagger UI    | Interface visual para documentação de API                              |

## 📦 Como Rodar o Projeto

### Pré-requisitos

*   Docker e Docker Compose instalados na máquina.
*   Uma chave de API gratuita da OpenWeather.

### Passo 1: Configuração

1.  Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/weather-api.git
    cd weather-api
    ```

2.  Crie o arquivo de variáveis de ambiente:

    ```bash
    cp .env.example .env
    ```

3.  Edite o arquivo `.env` e insira sua chave da OpenWeather:

    ```ini
    OPENWEATHER_API_KEY=sua_chave_aqui_12345
    # As demais variáveis (DATABASE_URL, PORT, etc.) já vêm com padrões prontos para Docker
    ```

### Passo 2: Execução (Via Docker) 🐳

A maneira recomendada e mais simples de rodar a aplicação. Este comando irá construir a imagem da API, baixar a imagem do Postgres e configurar tudo automaticamente.

```bash
docker compose up -d --build
```

Aguarde alguns instantes até que os containers estejam saudáveis (healthy).

### Acessando a Aplicação

*   **API Base:** `http://localhost:3000/api/v1`
*   **Documentação Swagger:** `http://localhost:3000/api/v1/docs`
*   **Health Check:** `http://localhost:3000/api/v1/health`
*   **Adminer (Gerenciador do Banco):** `http://localhost:8080`
    *   Sistema: `PostgreSQL`
    *   Servidor: `db`
    *   Usuário: `user`
    *   Senha: `password`
    *   Banco: `weather_db`

## 🧪 Desenvolvimento Local (Sem Docker)

Caso prefira rodar o Node.js diretamente na sua máquina (fora do container), você precisará de uma instância local do PostgreSQL rodando.

1.  Instale as dependências:

    ```bash
    npm install
    ```

2.  Gere o cliente do Prisma:

    ```bash
    npx prisma generate
    ```

3.  Rode as migrações do banco (Certifique-se que o Postgres está rodando e a `DATABASE_URL` no `.env` está correta para `localhost`):

    ```bash
    npx prisma migrate dev
    ```

4.  Inicie em modo de desenvolvimento:

    ```bash
    npm run dev
    ```

## ✅ Testes e Qualidade de Código

O projeto possui scripts configurados para garantir a qualidade do código. Estes mesmos scripts são executados automaticamente pelo GitHub Actions.

*   **Rodar o Linter (ESLint) para encontrar problemas de estilo e erros:**

    ```bash
    npm run lint
    ```

*   **Rodar verificação de tipos do TypeScript (sem emitir arquivos):**

    ```bash
    npx tsc --noEmit
    ```

*   **Verificar vulnerabilidades nas dependências:**

    ```bash
    npm audit
    ```

## 📂 Arquitetura do Projeto

O projeto segue uma arquitetura em camadas (Layered Architecture) para garantir separação de responsabilidades, facilitando a manutenção e testes.

```
src/
├── config/ # Configurações globais (Env, Swagger, Prisma, Rate Limit)
├── controllers/ # Camada de entrada (Request/Response HTTP)
├── services/ # Regras de negócio, Lógica de Cache e Integrações Externas
├── routes/ # Definição das rotas e endpoints
├── schemas/ # Schemas de validação Zod (Entradas da API e Variáveis de Ambiente)
├── types/ # Definições de Tipos TypeScript globais
├── utils/ # Classes utilitárias (ex: HttpException)
├── generated/ # Cliente Prisma gerado automaticamente
└── app.ts # Configuração do App Express (Middlewares, Rotas)
```

### Decisões de Design

1.  **MSC (Model-Service-Controller):**
    *   **Controller:** Apenas recebe a requisição, valida os dados com Zod e chama o serviço. Não contém regra de negócio.
    *   **Service:** Contém a inteligência. Decide se busca do cache ou da API externa, processa os dados e chama o repositório (Prisma).
2.  **Tratamento de Erros Centralizado:** Um middleware global intercepta erros (`HttpException`) e padroniza a resposta JSON para o cliente, evitando `try/catch` repetitivos em todo lugar.
3.  **Configuração Centralizada (`config/env.ts`):** Nenhuma variável `process.env` é acessada diretamente no código. Todas passam por validação do Zod, garantindo que a aplicação tenha tipos fortes para suas configurações.

## 📜 Licença

Este projeto foi desenvolvido como parte de um teste técnico e é disponibilizado sob a licença MIT.

<p align="center">
Feito com 💙 e muito café.
</p>
