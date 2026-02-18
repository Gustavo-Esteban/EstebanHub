# 🚀 Getting Started - EstebanHub

Bem-vindo ao projeto EstebanHub! Este guia rápido vai te ajudar a começar.

## ✅ O que já está pronto

A **Fase 1 - Setup Inicial** está completa:

- ✅ Estrutura de pastas (monorepo)
- ✅ Angular 18 com SSR configurado
- ✅ NestJS configurado
- ✅ Interfaces TypeScript compartilhadas
- ✅ SQL schemas preparados
- ✅ Documentação completa

## 📋 O que você precisa fazer agora

### Passo 1: Configurar Supabase (15-20 minutos)

1. Abra o guia: **[docs/SUPABASE-SETUP.md](docs/SUPABASE-SETUP.md)**
2. Siga todas as etapas:
   - Criar projeto no Supabase
   - Executar SQL schema
   - Configurar Storage (buckets)
   - Criar usuário admin
   - Copiar credenciais (URL e API keys)

**Importante:** Guarde as credenciais em um local seguro!

### Passo 2: Configurar Variáveis de Ambiente (5 minutos)

1. Abra o guia: **[docs/ENVIRONMENT-SETUP.md](docs/ENVIRONMENT-SETUP.md)**
2. Configure:
   - `backend/.env` (com as credenciais do Supabase)
   - `frontend/src/environments/environment.ts` (com URL e anon key)

### Passo 3: Testar se está funcionando (2 minutos)

**Backend:**
```bash
cd backend
npm run start:dev
```
✅ Deve aparecer: "Nest application successfully started"

**Frontend:**
```bash
cd frontend
npm run dev:ssr
```
✅ Deve aparecer: "Angular Live Development Server is listening on localhost:4200"

## 🎯 Próximos Passos (Desenvolvimento)

Após configurar tudo, você estará pronto para começar a Fase 2 - Backend Core:

1. Implementar módulos NestJS (Auth, Projects, Leads, etc.)
2. Criar endpoints da API
3. Testar com Postman/Insomnia

## 📚 Documentação Completa

Consulte **[docs/README.md](docs/README.md)** para índice completo da documentação.

## 🆘 Precisa de Ajuda?

- **Problemas com Supabase?** → [docs/SUPABASE-SETUP.md](docs/SUPABASE-SETUP.md) (seção Troubleshooting)
- **Problemas com .env?** → [docs/ENVIRONMENT-SETUP.md](docs/ENVIRONMENT-SETUP.md)
- **Dúvidas sobre a arquitetura?** → Consulte o plano em `.claude/plans/steady-bouncing-dawn.md`

## ⚡ Quick Commands

```bash
# Instalar todas as dependências (se necessário)
npm run install:all

# Backend dev
npm run backend:dev

# Frontend dev
npm run frontend:dev

# Limpar node_modules
npm run clean
```

---

**Vamos começar!** 🚀

Siga os passos acima na ordem e você terá o projeto rodando em menos de 30 minutos.
