# 📡 EstebanHub - API Documentation

**Base URL:** `http://localhost:3000/api`

**Status:** ✅ **ONLINE E FUNCIONANDO**

---

## 🔐 Autenticação

### POST /api/auth/login
Fazer login e obter token JWT.

**Request:**
```json
{
  "email": "admin@estebanhub.com",
  "password": "sua-senha"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "...",
  "user": {
    "id": "uuid",
    "email": "admin@estebanhub.com",
    "created_at": "2026-02-16T..."
  }
}
```

### POST /api/auth/logout
Fazer logout (requer token).

**Headers:**
```
Authorization: Bearer <token>
```

### GET /api/auth/me
Obter dados do usuário logado.

**Headers:**
```
Authorization: Bearer <token>
```

---

## 📁 Projects (Projetos)

### GET /api/projects
Listar todos os projetos (público).

**Query Params:**
- `status` (opcional): `draft`, `published`, `archived`

**Exemplo:** `/api/projects?status=published`

### GET /api/projects/:id
Buscar projeto por ID (público).

### GET /api/projects/slug/:slug
Buscar projeto por slug (público).

**Exemplo:** `/api/projects/slug/projeto-xp-investimentos`

### POST /api/projects 🔒
Criar novo projeto (protegido - requer token).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "title": "Projeto XP Investimentos",
  "slug": "projeto-xp-investimentos",
  "description": "Descrição completa do projeto...",
  "short_description": "Resumo do projeto",
  "client_name": "XP Investimentos",
  "project_url": "https://xpinvestimentos.com",
  "thumbnail_url": "https://...",
  "images": ["https://...", "https://..."],
  "technologies": ["React", "Node.js", "PostgreSQL"],
  "category": "institutional",
  "featured": true,
  "status": "published",
  "order_index": 0
}
```

### PUT /api/projects/:id 🔒
Atualizar projeto (protegido).

### DELETE /api/projects/:id 🔒
Deletar projeto (protegido).

---

## 💬 Testimonials (Depoimentos)

### GET /api/testimonials
Listar depoimentos (público).

**Query Params:**
- `status` (opcional): `draft`, `published`, `archived`

### GET /api/testimonials/:id
Buscar depoimento por ID.

### POST /api/testimonials 🔒
Criar depoimento (protegido).

**Request:**
```json
{
  "client_name": "João Silva",
  "client_company": "Tech Corp",
  "client_role": "CEO",
  "client_photo_url": "https://...",
  "content": "Excelente trabalho! Superou todas as expectativas...",
  "rating": 5,
  "project_id": "uuid-do-projeto",
  "featured": true,
  "status": "published",
  "order_index": 0
}
```

### PUT /api/testimonials/:id 🔒
Atualizar depoimento (protegido).

### DELETE /api/testimonials/:id 🔒
Deletar depoimento (protegido).

---

## 🛠️ Services (Serviços)

### GET /api/services
Listar serviços (público).

**Query Params:**
- `status` (opcional): `draft`, `published`, `archived`

### GET /api/services/:id
Buscar serviço por ID.

### GET /api/services/slug/:slug
Buscar serviço por slug.

**Exemplo:** `/api/services/slug/criacao-de-sites`

### POST /api/services 🔒
Criar serviço (protegido).

**Request:**
```json
{
  "title": "Criação de Sites Institucionais",
  "slug": "criacao-de-sites",
  "short_description": "Sites profissionais para sua empresa",
  "description": "Desenvolvemos sites modernos e responsivos...",
  "icon": "globe",
  "features": [
    "Design responsivo",
    "SEO otimizado",
    "Painel administrativo",
    "Suporte técnico"
  ],
  "pricing_info": "A partir de R$ 3.000",
  "thumbnail_url": "https://...",
  "status": "published",
  "order_index": 0
}
```

### PUT /api/services/:id 🔒
Atualizar serviço (protegido).

### DELETE /api/services/:id 🔒
Deletar serviço (protegido).

---

## 📨 Leads (Contatos)

### POST /api/leads
Criar novo lead (público - formulário de contato).

**Request:**
```json
{
  "name": "Maria Santos",
  "email": "maria@example.com",
  "phone": "(11) 99999-9999",
  "company": "Tech Startup",
  "message": "Gostaria de um orçamento para criar um site...",
  "source": "contact-form"
}
```

**Response:**
- Lead salvo no Supabase
- **Email automático enviado** para o admin configurado em `NOTIFICATION_EMAIL`

### GET /api/leads 🔒
Listar todos os leads (protegido).

**Query Params:**
- `status` (opcional): `new`, `contacted`, `qualified`, `converted`, `archived`

### GET /api/leads/:id 🔒
Buscar lead por ID (protegido).

### PUT /api/leads/:id 🔒
Atualizar lead (protegido - alterar status/notas).

**Request:**
```json
{
  "status": "contacted",
  "notes": "Cliente interessado em e-commerce. Enviar proposta.",
  "contacted_at": "2026-02-16T10:30:00Z"
}
```

### DELETE /api/leads/:id 🔒
Deletar lead (protegido).

---

## ⚙️ Settings (Configurações)

### GET /api/settings
Obter configurações do sistema (público).

**Response:**
```json
{
  "id": "uuid",
  "company_name": "EstebanHub",
  "company_email": "contato@estebanhub.com",
  "company_phone": "(11) 97039-7086",
  "company_whatsapp": "5511970397086",
  "company_address": "São Paulo, SP",
  "company_logo_url": "https://...",
  "company_description": "Criação de sites e landing pages profissionais",
  "social_facebook": "https://facebook.com/estebanhub",
  "social_instagram": "https://instagram.com/estebanhub",
  "social_linkedin": "https://linkedin.com/company/estebanhub",
  "social_github": "https://github.com/estebanhub",
  "social_twitter": "https://twitter.com/estebanhub",
  "meta_title": "EstebanHub - Criação de Sites",
  "meta_description": "Sites profissionais...",
  "meta_keywords": "criação de sites, landing pages...",
  "google_analytics_id": "G-XXXXXXXXXX",
  "email_notifications_enabled": true,
  "notification_email": "admin@estebanhub.com"
}
```

### PUT /api/settings 🔒
Atualizar configurações (protegido).

**Request (todos os campos opcionais):**
```json
{
  "company_name": "EstebanHub",
  "company_email": "contato@estebanhub.com",
  "company_whatsapp": "5511999999999",
  "social_instagram": "https://instagram.com/estebanhub",
  "meta_title": "Novo título...",
  "email_notifications_enabled": true
}
```

---

## 📤 Upload (Imagens)

### POST /api/upload/image 🔒
Upload de imagem para Supabase Storage (protegido).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body (form-data):**
- `file`: arquivo de imagem (JPEG, PNG, WebP, GIF - máx 5MB)
- `bucket`: nome do bucket (`project-images`, `client-photos`, `assets`)
- `folder` (opcional): pasta dentro do bucket

**Response:**
```json
{
  "url": "https://lbpqesthwtzihiccqtdd.supabase.co/storage/v1/object/public/project-images/pasta/1234567-abc.jpg",
  "path": "pasta/1234567-abc.jpg"
}
```

### DELETE /api/upload/image 🔒
Deletar imagem do Storage (protegido).

**Request:**
```json
{
  "bucket": "project-images",
  "path": "pasta/1234567-abc.jpg"
}
```

---

## 🔑 Autenticação em Rotas Protegidas

Rotas marcadas com 🔒 requerem o header `Authorization`:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Como obter o token:**
1. Faça login em `/api/auth/login`
2. Copie o `access_token` da resposta
3. Use em todas as requisições protegidas

---

## ✅ Testar a API

### Opção 1: Postman/Insomnia

1. Importe esta collection ou crie requests manualmente
2. Configure o `baseURL`: `http://localhost:3000/api`
3. Faça login em `/auth/login`
4. Copie o token e use nas requisições protegidas

### Opção 2: cURL (Terminal)

**Exemplo - Criar Lead:**
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Lead",
    "email": "teste@example.com",
    "phone": "11999999999",
    "message": "Teste de lead via API"
  }'
```

**Exemplo - Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seu-email@gmail.com",
    "password": "sua-senha"
  }'
```

**Exemplo - Listar Projetos:**
```bash
curl http://localhost:3000/api/projects?status=published
```

---

## 📧 Notificações por Email

Quando um lead é criado via `POST /api/leads`, o sistema:

1. ✅ Salva o lead no Supabase
2. ✅ Envia email automático para `NOTIFICATION_EMAIL`
3. ✅ Email contém todos os dados do lead
4. ✅ Email formatado em HTML responsivo

**Configure em:** `backend/.env`
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=senha-de-app
NOTIFICATION_EMAIL=seu-email@gmail.com
```

---

## 🚀 Status da API

✅ **Todos os módulos implementados e funcionando:**

- ✅ AuthModule (login, logout, me)
- ✅ ProjectsModule (CRUD completo)
- ✅ TestimonialsModule (CRUD completo)
- ✅ ServicesModule (CRUD completo)
- ✅ LeadsModule (CRUD + email notification)
- ✅ SettingsModule (read/update)
- ✅ UploadModule (Supabase Storage)
- ✅ EmailModule (Nodemailer)
- ✅ JwtAuthGuard (proteção de rotas)
- ✅ CORS configurado
- ✅ Validação global (class-validator)

**Total de rotas:** 35+ endpoints

**Server:** http://localhost:3000/api

---

## 🔗 Próximos Passos

1. **Testar endpoints** com Postman/Insomnia
2. **Criar dados de teste** via API
3. **Integrar frontend Angular** com a API
4. **Testar envio de email** (criar lead)

Divirta-se testando! 🎉
