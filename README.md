# EstebanHub

Site institucional profissional para serviços de criação de sites e landing pages.

## Stack Técnica

- **Frontend:** Angular 18+ com SSR (Server-Side Rendering)
- **Backend:** NestJS
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Deploy:** Hostinger VPS com PM2

## Estrutura do Monorepo

```
EstebanHub/
├── frontend/     # Angular Application (SSR)
├── backend/      # NestJS API
├── shared/       # Types e interfaces compartilhadas
└── docs/         # Documentação
```

## Instalação

### Pré-requisitos

- Node.js 18+ e npm
- Conta no Supabase
- Angular CLI (`npm install -g @angular/cli`)
- NestJS CLI (`npm install -g @nestjs/cli`)

### Setup

1. **Clone o repositório:**
```bash
git clone <repo-url>
cd EstebanHub
```

2. **Instalar dependências do Frontend:**
```bash
cd frontend
npm install
cd ..
```

3. **Instalar dependências do Backend:**
```bash
cd backend
npm install
cd ..
```

4. **Configurar variáveis de ambiente:**
   - Copiar `.env.example` para `.env` em `backend/`
   - Copiar `environment.example.ts` para `environment.ts` em `frontend/src/environments/`
   - Preencher as credenciais do Supabase

5. **Rodar o projeto:**

**Backend:**
```bash
cd backend
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm run dev:ssr
```

## Desenvolvimento

### Frontend (Angular)
- **Dev:** `npm run dev:ssr` (http://localhost:4200)
- **Build:** `npm run build`
- **Prod:** `npm run serve:ssr:estebanhub`

### Backend (NestJS)
- **Dev:** `npm run start:dev` (http://localhost:3000)
- **Build:** `npm run build`
- **Prod:** `npm run start:prod`

## Deploy

Consultar [docs/deploy.md](docs/deploy.md) para instruções detalhadas de deploy na Hostinger.

## Funcionalidades

### Site Público
- Hero section com CTAs
- Seção de serviços (4 serviços)
- Portfólio de projetos
- Depoimentos de clientes
- Formulário de contato
- Botão WhatsApp flutuante
- SEO otimizado

### Painel Admin
- Dashboard com métricas
- CRUD de projetos
- CRUD de depoimentos
- Gerenciamento de leads
- Configurações gerais

## Licença

Propriedade de EstebanHub. Todos os direitos reservados.
