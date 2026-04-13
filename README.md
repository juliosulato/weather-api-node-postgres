# Weather API

API RESTful para consulta de dados climáticos em tempo real com persistência completa do histórico de requisições.  
Desenvolvida com Node.js, TypeScript e PostgreSQL, com infraestrutura containerizada e pipeline CI/CD automatizado.

---

## Funcionalidades

- Consulta de dados climáticos em tempo real via integração com OpenWeatherMap
- Cache em memória com TTL de 5 minutos — reduz latência e consumo de cota da API externa
- Persistência de todas as consultas em PostgreSQL via Prisma
- Validação de payloads e variáveis de ambiente com Zod — a aplicação falha na inicialização se alguma configuração crítica estiver ausente
- Documentação automática via Swagger UI (OpenAPI 3.0)
- Ambiente completo orquestrado com Docker Compose — API, banco de dados e Adminer
- Pipeline CI/CD com GitHub Actions — lint, type check, testes de integração com containers reais e build da imagem Docker

---

## Stack

| Categoria      | Tecnologia      |
|:---------------|:----------------|
| Runtime        | Node.js 20      |
| Linguagem      | TypeScript      |
| Framework      | Express         |
| ORM            | Prisma          |
| Banco de dados | PostgreSQL 16   |
| Validação      | Zod             |
| Infraestrutura | Docker          |
| CI/CD          | GitHub Actions  |
| Documentação   | Swagger UI      |

---

## Como rodar localmente

**Pré-requisitos:** Docker e Docker Compose instalados, chave de API da OpenWeatherMap.

```bash
# Clone o repositório
git clone https://github.com/juliosulato/weather-api-node-postgres.git
cd weather-api-node-postgres

# Configure as variáveis de ambiente
cp .env.example .env
# Adicione sua OPENWEATHER_API_KEY no arquivo .env

# Suba os containers
docker compose up -d --build
```

Aguarde os containers ficarem healthy e acesse:

- **API:** `http://localhost:3000/api/v1`
- **Documentação Swagger:** `http://localhost:3000/api/v1/docs`
- **Health Check:** `http://localhost:3000/api/v1/health`
- **Adminer:** `http://localhost:8080` — sistema: PostgreSQL, servidor: `db`, usuário: `user`, senha: `password`, banco: `weather_db`

---

## Desenvolvimento sem Docker

```bash
npm install
npx prisma generate
npx prisma migrate dev   # requer instância local do PostgreSQL
npm run dev
```

---

## Qualidade de código

```bash
npm run lint        # ESLint
npx tsc --noEmit    # Type check
npm audit           # Vulnerabilidades nas dependências
```

Esses mesmos scripts são executados automaticamente no pipeline do GitHub Actions a cada push e pull request.

---

## Arquitetura

O projeto segue arquitetura em camadas com separação clara de responsabilidades:

```
src/
├── config/       # Configurações globais — env, Swagger, Prisma, rate limit
├── controllers/  # Entrada HTTP — recebe request, valida com Zod, chama service
├── services/     # Regras de negócio — cache, integração externa, persistência
├── routes/       # Definição de endpoints
├── schemas/      # Schemas Zod — payloads e variáveis de ambiente
├── types/        # Tipos TypeScript globais
├── utils/        # HttpException e utilitários
└── app.ts        # Setup do Express — middlewares e rotas
```

**Decisões de design:**
- Controllers sem regra de negócio — apenas validação e delegação ao service
- Tratamento de erros centralizado via middleware global — elimina try/catch repetitivo
- Variáveis de ambiente acessadas exclusivamente via `config/env.ts` com validação Zod — sem `process.env` direto no código
