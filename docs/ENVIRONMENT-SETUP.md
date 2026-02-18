# Guia de Configuração de Variáveis de Ambiente

Após configurar o Supabase (consulte `SUPABASE-SETUP.md`), você precisa configurar as variáveis de ambiente nos projetos frontend e backend.

## Backend (.env)

### 1. Criar arquivo `.env`

```bash
cd backend
touch .env
```

Ou crie manualmente o arquivo `.env` na pasta `backend/`

### 2. Preencher com as credenciais

Use o arquivo `.env.example` como base e preencha com suas credenciais:

```env
# Server
PORT=3000
NODE_ENV=development

# Supabase
SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# JWT
JWT_SECRET=sua-chave-secreta-super-segura-aqui
JWT_EXPIRES_IN=7d

# Email (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=contato@estebanhub.com
EMAIL_PASSWORD=sua-senha-de-app-do-gmail
EMAIL_FROM=EstebanHub <contato@estebanhub.com>
NOTIFICATION_EMAIL=seu-email@gmail.com

# CORS
FRONTEND_URL=http://localhost:4200
```

### Obter Credenciais

**SUPABASE_URL e SUPABASE_SERVICE_KEY:**
1. Dashboard Supabase > Settings > API
2. **Project URL** = `SUPABASE_URL`
3. **service_role** key = `SUPABASE_SERVICE_KEY` (⚠️ NUNCA exponha!)

**JWT_SECRET:**
- Gere uma string aleatória segura:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**EMAIL (Gmail):**

Se usar Gmail:
1. Acesse [Google Account Security](https://myaccount.google.com/security)
2. Ative "2-Step Verification"
3. Vá em "App Passwords"
4. Gere uma senha para "Mail"
5. Use essa senha em `EMAIL_PASSWORD`

Outras opções de SMTP:
- **SendGrid:** smtp.sendgrid.net:587
- **Mailgun:** smtp.mailgun.org:587
- **Resend:** smtp.resend.com:465

---

## Frontend (environment.ts)

### 1. Criar arquivo de environment

```bash
cd frontend/src/environments
```

Já deve existir `environment.ts` criado pelo Angular CLI.

### 2. Atualizar `environment.ts`

Edite o arquivo `frontend/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'https://xxxxxxxxxxx.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', // anon/public key
  apiUrl: 'http://localhost:3000/api',
};
```

### 3. Atualizar `environment.prod.ts`

Para produção, crie ou edite `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  supabaseUrl: 'https://xxxxxxxxxxx.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  apiUrl: 'https://api.estebanhub.com/api', // URL da API em produção
};
```

### Obter Credenciais

**supabaseUrl e supabaseAnonKey:**
1. Dashboard Supabase > Settings > API
2. **Project URL** = `supabaseUrl`
3. **anon / public** key = `supabaseAnonKey` (✅ seguro expor no frontend)

**apiUrl:**
- Desenvolvimento: `http://localhost:3000/api`
- Produção: URL do seu backend (ex: `https://api.estebanhub.com/api`)

---

## Verificar se está funcionando

### Backend

1. Inicie o backend:
```bash
cd backend
npm run start:dev
```

2. Deve aparecer:
```
[Nest] LOG [NestApplication] Nest application successfully started
```

3. Acesse: http://localhost:3000
   - Deve retornar: "Hello World!"

### Frontend

1. Inicie o frontend:
```bash
cd frontend
npm run dev:ssr
```

2. Deve aparecer:
```
** Angular Live Development Server is listening on localhost:4200 **
```

3. Acesse: http://localhost:4200
   - Deve aparecer a página padrão do Angular

---

## Segurança

### ⚠️ NUNCA EXPONHA:
- `SUPABASE_SERVICE_KEY` (backend only)
- `JWT_SECRET`
- `EMAIL_PASSWORD`
- Arquivos `.env`

### ✅ PODE EXPOR (frontend):
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` (key pública)

### .gitignore

Certifique-se de que `.env` está no `.gitignore`:

```gitignore
# Environment variables
.env
.env.local
.env.*.local
*.env
```

---

## Exemplo Completo

### backend/.env

```env
PORT=3000
NODE_ENV=development

SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjc4OTAwMDAwLCJleHAiOjE5OTQ0NzYwMDB9.exemplo123

JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
JWT_EXPIRES_IN=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=contato@estebanhub.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
EMAIL_FROM=EstebanHub <contato@estebanhub.com>
NOTIFICATION_EMAIL=esteban@gmail.com

FRONTEND_URL=http://localhost:4200
```

### frontend/src/environments/environment.ts

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'https://abcdefghijklmnop.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY3ODkwMDAwMCwiZXhwIjoxOTk0NDc2MDAwfQ.exemplo456',
  apiUrl: 'http://localhost:3000/api',
};
```

---

## Próximo Passo

✅ Após configurar as variáveis de ambiente, você pode:
1. Rodar o backend: `cd backend && npm run start:dev`
2. Rodar o frontend: `cd frontend && npm run dev:ssr`
3. Começar a desenvolver as features!
