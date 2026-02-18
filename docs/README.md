# EstebanHub - Documentação

Bem-vindo à documentação do projeto EstebanHub!

## 📚 Índice de Documentação

### 1. Setup Inicial

- **[SUPABASE-SETUP.md](SUPABASE-SETUP.md)** - Guia completo de configuração do Supabase
  - Criar projeto
  - Executar SQL schema
  - Configurar Storage
  - Criar usuário admin
  - Obter credenciais (API keys)

- **[ENVIRONMENT-SETUP.md](ENVIRONMENT-SETUP.md)** - Configuração de variáveis de ambiente
  - Backend (.env)
  - Frontend (environment.ts)
  - Verificação de funcionamento

### 2. Database

- **[supabase-schema.sql](supabase-schema.sql)** - Schema completo do PostgreSQL
  - 5 tabelas (projects, testimonials, leads, services, settings)
  - Indexes
  - Triggers
  - Row Level Security (RLS)

- **[supabase-storage.sql](supabase-storage.sql)** - Configuração de Storage
  - 3 buckets (project-images, client-photos, assets)
  - Policies de acesso

## 🚀 Quick Start

### Pré-requisitos Instalados

- ✅ Node.js 18+
- ✅ npm
- ✅ Angular CLI
- ✅ NestJS CLI

### Estrutura Criada

```
EstebanHub/
├── frontend/           ✅ Angular 18 + SSR
│   └── node_modules/  ✅ Dependências instaladas
├── backend/            ✅ NestJS
│   └── node_modules/  ✅ Dependências instaladas
├── shared/             ✅ Interfaces TypeScript
├── docs/               ✅ Documentação
└── README.md           ✅ Guia principal
```

### Dependências Instaladas

**Frontend:**
- `@supabase/supabase-js` - Cliente Supabase
- `aos` - Animações on scroll
- `swiper` - Carrossel
- `ngx-image-compress` - Compressão de imagens

**Backend:**
- `@supabase/supabase-js` - Cliente Supabase
- `@nestjs/config` - Configurações
- `@nestjs/jwt` - JWT auth
- `nodemailer` - Envio de emails
- `class-validator` - Validação
- `multer` - Upload de arquivos

## 📋 Próximos Passos

### Fase 1: Setup (COMPLETO ✅)

- [x] Estrutura de pastas
- [x] Angular 18 + SSR
- [x] NestJS
- [x] Interfaces compartilhadas
- [x] Guias de setup

### Fase 2: Configuração Manual (VOCÊ PRECISA FAZER)

Siga estes guias na ordem:

1. **[SUPABASE-SETUP.md](SUPABASE-SETUP.md)**
   - Criar projeto no Supabase
   - Executar SQL schemas
   - Criar usuário admin
   - Guardar credenciais

2. **[ENVIRONMENT-SETUP.md](ENVIRONMENT-SETUP.md)**
   - Configurar `.env` no backend
   - Configurar `environment.ts` no frontend
   - Testar se está funcionando

### Fase 3: Desenvolvimento Backend

Após configurar Supabase e variáveis:

- [ ] Configurar Supabase provider (NestJS)
- [ ] AuthModule (login)
- [ ] JwtAuthGuard
- [ ] ProjectsModule (CRUD)
- [ ] TestimonialsModule (CRUD)
- [ ] ServicesModule (CRUD)
- [ ] LeadsModule (create + list)
- [ ] SettingsModule
- [ ] UploadModule
- [ ] EmailModule

### Fase 4: Desenvolvimento Frontend

- [ ] Core services (Supabase, Auth, SEO)
- [ ] Shared components
- [ ] Guards e Interceptors
- [ ] Admin Panel (CMS)
- [ ] Site Público

## 🔧 Comandos Úteis

### Backend

```bash
# Development
cd backend
npm run start:dev

# Build
npm run build

# Production
npm run start:prod
```

### Frontend

```bash
# Development (SSR)
cd frontend
npm run dev:ssr

# Build
npm run build

# Serve SSR
npm run serve:ssr:estebanhub
```

### Monorepo (raiz)

```bash
# Instalar todas as dependências
npm run install:all

# Dev frontend
npm run frontend:dev

# Dev backend
npm run backend:dev
```

## 📁 Arquivos Importantes

### Backend

- `backend/.env.example` - Template de variáveis de ambiente
- `backend/src/main.ts` - Entry point
- `backend/src/app.module.ts` - Root module

### Frontend

- `frontend/src/environments/environment.ts` - Configurações de dev
- `frontend/src/environments/environment.prod.ts` - Configurações de prod
- `frontend/src/app/app.routes.ts` - Rotas
- `frontend/src/app/app.config.ts` - App config

### Shared

- `shared/src/interfaces/` - Interfaces TypeScript compartilhadas
- `shared/src/index.ts` - Exports principais

## 🔐 Segurança

### ⚠️ NUNCA EXPONHA:

- `SUPABASE_SERVICE_KEY` (backend only)
- `JWT_SECRET`
- `EMAIL_PASSWORD`
- Arquivos `.env`

### ✅ PODE EXPOR (frontend):

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## 🆘 Suporte

Se encontrar problemas, consulte a seção "Troubleshooting" em:
- [SUPABASE-SETUP.md](SUPABASE-SETUP.md)
- [ENVIRONMENT-SETUP.md](ENVIRONMENT-SETUP.md)

## 📊 Status do Projeto

**Fase Atual:** Setup Inicial ✅ COMPLETO

**Próxima Fase:** Configuração Manual do Supabase

**Timeline:**
- ✅ Fase 1: Setup Inicial (COMPLETO)
- ⏳ Fase 2: Configuração Manual (AGUARDANDO)
- 🔜 Fase 3: Backend Core
- 🔜 Fase 4: Frontend Admin
- 🔜 Fase 5: Frontend Público
- 🔜 Fase 6: Deploy

---

**Desenvolvido por EstebanHub** | Angular 18 + NestJS + Supabase
