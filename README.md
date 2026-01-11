# Weather API – Node.js + TypeScript + PostgreSQL  
> API em desenvolvimento – Teste técnico

Essa é uma API RESTful em desenvolvimento, construída com **Node.js e TypeScript**, que irá consumir dados climáticos da API pública da OpenWeather, persistir em um banco PostgreSQL e expor endpoints para consulta posteriormente.

Este repositório está sendo criado para demonstrar competências em:

- Integração com APIs externas  
- Persistência de dados com **Prisma ORM**  
- API RESTful com Express  
- Validação de entrada com **Zod**  
- Documentação via **Swagger**  
- Containerização com **Docker / Docker Compose**  
- Organização de projeto e boas práticas  
- Versionamento com commits incrementais claros

---

## 🚀 Tecnologias (planejadas)

- Node.js  
- TypeScript  
- Express  
- Prisma ORM  
- PostgreSQL  
- Swagger (OpenAPI)  
- Zod  
- Docker + Docker Compose

---

## 🧠 Status do Projeto

O projeto ainda está **em andamento**.  
As principais etapas de desenvolvimento estão sendo implementadas de forma incremental, com commits descritivos e organização clara de código.

À medida que as funcionalidades forem concluídas, esta seção será atualizada com instruções de uso completas, exemplos de requisições, respostas e comandos de execução.

---

## 📋 Roadmap / Próximas Etapas

O progresso atual do projeto inclui (em desenvolvimento):

- [ ] Configuração inicial do projeto com TypeScript  
- [ ] Estrutura de diretorias e arquivos base  
- [ ] Configuração de variáveis de ambiente  
- [ ] Serviço de integração com OpenWeather API  
- [ ] Endpoint para consultar clima por cidade  
- [ ] Persistência de dados no PostgreSQL com Prisma  
- [ ] Endpoint para consultar histórico de climas  
- [ ] Validação de entrada com Zod  
- [ ] Documentação da API com Swagger  
- [ ] Containerização com Docker / Docker Compose  
- [ ] (Opcional) Pipeline CI/CD básica

---

## 📦 Pré-requisitos

Antes de rodar o projeto quando estiver pronto, será necessário:

- Docker e Docker Compose  
- Node.js (versão 16+)  
- Uma chave de API da **OpenWeather** (gratuita)

---

## 📁 Estrutura de Pastas (planejada)

- /src
    - /config
    - /controllers
    - /services
    - /routes
    - /validations
    - /prisma
    - /docs
- app.ts
- server.ts
- /prisma
- Dockerfile
- docker-compose.yml
- .env.example
- README.md
- tsconfig.json


---

### Scripts úteis

- `npm run dev` — ambiente de desenvolvimento
- `npm run build` — build de produção
- `npm run start` — executar build
- `npm run lint` — análise estática
- `npm run audit` — verificação básica de segurança (opcional)

---

## 🧪 Desenvolvimento

Este repositório segue um plano de desenvolvimento com commits incrementais.
Cada etapa (setup, integração com API, banco, endpoints, Docker, documentação) será registrada com commits descritivos para facilitar o acompanhamento da evolução.

---

## 📜 Licença

Este projeto utiliza a licença MIT e é disponibilizado para fins de avaliação técnica e portfólio pessoal.
