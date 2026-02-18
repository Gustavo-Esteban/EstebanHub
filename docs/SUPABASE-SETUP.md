# Guia de Setup do Supabase - EstebanHub

Este guia contém as instruções passo a passo para configurar o projeto Supabase para o EstebanHub.

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Preencha:
   - **Name:** EstebanHub
   - **Database Password:** Gu070899#gu#
   - **Region:** South America (São Paulo) ou mais próximo
5. Clique em "Create new project"
6. Aguarde 2-3 minutos até o projeto ficar pronto

## 2. Executar SQL Schema (Database)

1. No dashboard do Supabase, vá em **SQL Editor** (menu lateral esquerdo)
2. Clique em "+ New query"
3. Copie TODO o conteúdo do arquivo `supabase-schema.sql`
4. Cole no editor SQL
5. Clique em "Run" (ou pressione Ctrl+Enter)
6. Verifique se apareceu "Success. No rows returned" (significa que deu certo!)

**O que foi criado:**
- ✅ 5 tabelas (projects, testimonials, leads, services, settings)
- ✅ Indexes para performance
- ✅ Triggers de `updated_at` automático
- ✅ Row Level Security (RLS) com policies públicas e admin
- ✅ 1 registro inicial na tabela `settings`

## 3. Configurar Storage (Buckets de Imagens)

1. Ainda no **SQL Editor**, crie outra query ("+")
2. Copie TODO o conteúdo do arquivo `supabase-storage.sql`
3. Cole e execute (Run)
4. Verifique se deu sucesso

**O que foi criado:**
- ✅ Bucket `project-images` (imagens de projetos)
- ✅ Bucket `client-photos` (fotos de clientes/depoimentos)
- ✅ Bucket `assets` (logos, ícones, etc)
- ✅ Policies de leitura pública e upload/delete apenas autenticados

### 3.1 Verificar Buckets

1. Vá em **Storage** (menu lateral esquerdo)
2. Você deve ver 3 buckets criados:
   - project-images
   - client-photos
   - assets

## 4. Criar Usuário Admin (Autenticação)

1. Vá em **Authentication** > **Users** (menu lateral esquerdo)
2. Clique em "+ Add user" ou "Create new user"
3. Preencha:
   - **Email:** seu-email@gmail.com (use um email real)
   - **Password:** (escolha uma senha forte para o admin)
   - **Auto Confirm User:** ✅ MARQUE esta opção (importante!)
4. Clique em "Create user"

**IMPORTANTE:** Este será o usuário admin que você usará para fazer login no painel administrativo do EstebanHub.

## 5. Obter Credenciais (API Keys)

Agora você precisa pegar as credenciais para configurar o projeto:

1. Vá em **Settings** > **API** (menu lateral esquerdo)
2. Você verá:

### Project URL
```
https://xxxxxxxxxxx.supabase.co
```
**Copie e guarde!** (você vai usar no `.env`)
https://lbpqesthwtzihiccqtdd.supabase.co

### API Keys

**anon / public:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz... (longo)
```

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicHFlc3Rod3R6aWhpY2NxdGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyODg3MjMsImV4cCI6MjA4Njg2NDcyM30.zO2hBsmjE6M3B7caSFlMaTc-B7orEeyjGLjiUosAQlM


**Copie e guarde!** (key pública - vai no frontend)

**service_role / secret:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz... (longo, diferente)
```

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicHFlc3Rod3R6aWhpY2NxdGRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTI4ODcyMywiZXhwIjoyMDg2ODY0NzIzfQ.pJfxiv5EyUwY-1Ub8zoA63Z-NDNAOpcRP4x_pd-n5eE


**Copie e guarde!** (key privada - NUNCA exponha publicamente, só no backend!)

## 6. Verificar se está tudo OK

### 6.1 Verificar Tabelas

1. Vá em **Table Editor** (menu lateral esquerdo)
2. Você deve ver 5 tabelas:
   - projects
   - testimonials
   - leads
   - services
   - settings ✅ (deve ter 1 registro com dados da EstebanHub)

### 6.2 Verificar RLS (Segurança)

1. Clique em qualquer tabela (ex: `projects`)
2. Clique na aba **Policies**
3. Você deve ver:
   - "Public can view published projects"
   - "Authenticated users can manage projects"
   - ✅ RLS enabled

### 6.3 Verificar Storage

1. Vá em **Storage**
2. Deve ter 3 buckets:
   - project-images
   - client-photos
   - assets
3. Clique em qualquer bucket
4. Clique em **Policies** (canto superior direito)
5. Deve ter 4 policies (SELECT, INSERT, UPDATE, DELETE)

### 6.4 Verificar Usuário Admin

1. Vá em **Authentication** > **Users**
2. Deve ter 1 usuário (seu email)
3. Status: **Confirmed** ✅

## 7. Próximo Passo

✅ **Parabéns!** Seu Supabase está configurado.

Agora você precisa configurar as variáveis de ambiente no projeto:

1. **Backend:** Criar arquivo `.env` em `backend/` com as credenciais
2. **Frontend:** Criar arquivo de environment em `frontend/src/environments/`

Consulte o arquivo `ENVIRONMENT-SETUP.md` para configurar as variáveis de ambiente.

---

## Troubleshooting (Problemas Comuns)

### Erro ao executar SQL

**Problema:** "permission denied" ou "already exists"

**Solução:**
- Certifique-se de que você está usando o SQL Editor do Supabase (não outro cliente)
- Se der "already exists", significa que já foi criado (pode ignorar)
- Tente executar novamente ou execute linha por linha

### RLS não funciona

**Problema:** Admin não consegue criar/editar dados

**Solução:**
- Verifique se o usuário está autenticado (token válido)
- Confirme que as policies estão ativas (Table Editor > Policies)
- Teste com o service_role key no backend (bypass RLS)

### Storage não funciona

**Problema:** Erro ao fazer upload de imagens

**Solução:**
- Verifique se os buckets foram criados (Storage)
- Confirme que as policies estão ativas (bucket > Policies)
- Teste com um arquivo pequeno (<1MB) primeiro

---

## Recursos Úteis

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security)

---

**Dica:** Mantenha as credenciais (URL e API keys) em um local seguro. Você vai precisar delas para configurar o `.env` do backend e do frontend.
