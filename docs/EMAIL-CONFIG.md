# Configuração de Email (SMTP)

O sistema envia emails automáticos quando um lead é criado através do formulário de contato. Para isso, você precisa configurar um servidor SMTP.

## ⚠️ AÇÃO NECESSÁRIA

Você precisa configurar as variáveis de email no arquivo `backend/.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=contato@estebanhub.com
EMAIL_PASSWORD=sua-senha-de-app-aqui
EMAIL_FROM=EstebanHub <contato@estebanhub.com>
NOTIFICATION_EMAIL=seu-email@gmail.com
```

## Opção 1: Gmail (Recomendado para desenvolvimento)

### Passo a passo:

1. **Acesse sua conta Google:**
   - https://myaccount.google.com/security

2. **Ative a verificação em 2 etapas:**
   - Procure por "2-Step Verification"
   - Ative se ainda não estiver ativado

3. **Gere uma senha de app:**
   - Acesse: https://myaccount.google.com/apppasswords
   - Selecione "Mail" como app
   - Clique em "Generate"
   - Copie a senha gerada (16 caracteres, sem espaços)

4. **Configure no `.env`:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # Senha de app gerada
EMAIL_FROM=EstebanHub <seu-email@gmail.com>
NOTIFICATION_EMAIL=seu-email@gmail.com  # Email que receberá notificações
```

### Limitações do Gmail:
- ⚠️ Limite de 500 emails/dia
- ⚠️ Pode ser marcado como spam se enviar muitos emails
- ✅ Grátis e fácil de configurar
- ✅ Ideal para desenvolvimento e MVP

## Opção 2: SendGrid (Recomendado para produção)

### Vantagens:
- ✅ 100 emails/dia grátis
- ✅ Melhor deliverability (não cai em spam)
- ✅ Analytics de emails

### Configuração:

1. **Criar conta:** https://signup.sendgrid.com/
2. **Criar API Key:** Settings > API Keys > Create API Key
3. **Configurar `.env`:**

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=SG.xxxxxxxxxxxxxxxxxxxxx  # Sua API Key
EMAIL_FROM=contato@estebanhub.com
NOTIFICATION_EMAIL=seu-email@gmail.com
```

## Opção 3: Resend (Alternativa moderna)

### Vantagens:
- ✅ 3000 emails/mês grátis
- ✅ Interface moderna
- ✅ Fácil configuração

### Configuração:

1. **Criar conta:** https://resend.com/
2. **Criar API Key**
3. **Configurar `.env`:**

```env
EMAIL_HOST=smtp.resend.com
EMAIL_PORT=465
EMAIL_USER=resend
EMAIL_PASSWORD=re_xxxxxxxxxxxxxxxxxxxxx  # Sua API Key
EMAIL_FROM=contato@estebanhub.com
NOTIFICATION_EMAIL=seu-email@gmail.com
```

## Testar Configuração

Após configurar, você pode testar enviando um lead pelo formulário de contato:

1. **Inicie o backend:**
```bash
cd backend
npm run start:dev
```

2. **Crie um lead de teste** (via Postman ou formulário frontend)

3. **Verifique o email** no endereço configurado em `NOTIFICATION_EMAIL`

## Troubleshooting

### Erro: "Invalid login"
- Verifique se a senha de app está correta (Gmail)
- Confirme se a API key é válida (SendGrid/Resend)

### Emails não chegam
- Verifique a pasta de spam
- Confirme que `NOTIFICATION_EMAIL` está correto
- Teste com outro provedor de email

### Erro de conexão
- Verifique `EMAIL_HOST` e `EMAIL_PORT`
- Alguns antivírus/firewalls podem bloquear SMTP

## Recomendação

**Para desenvolvimento/MVP:** Use Gmail (mais rápido de configurar)

**Para produção:** Migre para SendGrid ou Resend (melhor deliverability)

---

**Depois de configurar, você pode testar o sistema de envio de emails!** 📧
